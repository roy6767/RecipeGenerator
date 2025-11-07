const PreferenceModel = {
  tableName: 'preferences',

  columns: {
    id: 'INT PRIMARY KEY AUTO_INCREMENT',
    user_id: 'INT',
    experience_level: 'VARCHAR(50)',
    cuisines: 'JSON',
    dietary_restrictions: 'JSON',
    allergies: 'JSON',
  },

  
  toDbObject(data) {
    return {
      user_id: data.user_id,
      experience_level: data.experience_level || '',
      cuisines: JSON.stringify(data.cuisines || []),
      dietary_restrictions: JSON.stringify(data.dietary_restrictions || []),
      allergies: JSON.stringify(data.allergies || []),
    };
  },


  fromDbRow(row) {
    function parseArray(value) {
      if (!value || value === '') return []; 
      if (Array.isArray(value)) return value;
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    }

    return {
      id: row.id,
      user_id: row.user_id,
      experience_level: row.experience_level || '',
      cuisines: parseArray(row.cuisines),
      dietary_restrictions: parseArray(row.dietary_restrictions),
      allergies: parseArray(row.allergies),
    };
  },
};

module.exports = PreferenceModel;
