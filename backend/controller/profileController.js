const pool = require('../db');
const User = require('../model/User');
const Preferences = require('../model/Preferences');


const getProfile = async (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [users] = await pool.query(
      `SELECT id, email FROM ${User.tableName} WHERE id = ?`,
      [userId]
    );
    
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    const [prefRows] = await pool.query(
      `SELECT * FROM ${Preferences.tableName} WHERE user_id = ?`,
      [userId]
    );

    let preferences;
    if (prefRows && prefRows.length > 0) {
      preferences = Preferences.fromDbRow(prefRows[0]);
    } else {
      preferences = {
        experience_level: '',
        cuisines: [],
        dietary_restrictions: [],
        allergies: []
      };
    }

    res.json({
      user: user,
      preferences: preferences
    });
  } catch (err) {
    console.error('Error getting profile:', err);
    res.status(500).json({ message: 'Error getting profile' });
  }
};


const updateProfile = async (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const {
    email,
    password,
    experience_level,
    cuisines,
    dietary_restrictions,
    allergies,
  } = req.body;

  try {

    if (email) {
      if (password) {
        await pool.query(
          `UPDATE ${User.tableName} SET email=?, password=? WHERE id=?`,
          [email, password, userId]
        );
      } else {
        await pool.query(
          `UPDATE ${User.tableName} SET email=? WHERE id=?`,
          [email, userId]
        );
      }
    }


    const [existing] = await pool.query(
      `SELECT * FROM ${Preferences.tableName} WHERE user_id=?`,
      [userId]
    );

    const prefData = Preferences.toDbObject({
      user_id: userId,
      experience_level: experience_level || '',
      cuisines: cuisines || [],
      dietary_restrictions: dietary_restrictions || [],
      allergies: allergies || [],
    });

    if (existing && existing.length > 0) {

      await pool.query(
        `UPDATE ${Preferences.tableName} 
         SET experience_level=?, cuisines=?, dietary_restrictions=?, allergies=? 
         WHERE user_id=?`,
        [prefData.experience_level, prefData.cuisines, prefData.dietary_restrictions, prefData.allergies, userId]
      );
    } else {

      await pool.query(
        `INSERT INTO ${Preferences.tableName} (user_id, experience_level, cuisines, dietary_restrictions, allergies)
         VALUES (?, ?, ?, ?, ?)`,
        [prefData.user_id, prefData.experience_level, prefData.cuisines, prefData.dietary_restrictions, prefData.allergies]
      );
    }

    if (email || password) {
      res.json({ 
        message: 'Profile updated successfully. Please login again with your new credentials.',
        requireRelogin: true
      });
    } else {
      res.json({ message: 'Profile updated successfully' });
    }
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports = { getProfile, updateProfile };
