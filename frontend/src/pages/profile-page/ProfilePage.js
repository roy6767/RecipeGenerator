import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
  // State for storing profile data
  const [profile, setProfile] = useState({
    email: '',
    password: '',
    experience_level: '',
    cuisines: [],
    dietary_restrictions: [],
    allergies: []
  });

  // State to track original email (to detect changes)
  const [originalEmail, setOriginalEmail] = useState('');

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for temporary input fields when adding items
  const [newCuisine, setNewCuisine] = useState('');
  const [newRestriction, setNewRestriction] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  // State for loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch profile data when component loads
  useEffect(() => {
    fetchProfile();
  }, []);

  // Function to get profile from backend
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');

      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      // Call backend API
      const response = await fetch('http://127.0.0.1:5000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Set profile data from response
        const userEmail = data.user.email || '';
        setProfile({
          email: userEmail,
          password: '', // Never show password
          experience_level: data.preferences.experience_level || '',
          cuisines: data.preferences.cuisines || [],
          dietary_restrictions: data.preferences.dietary_restrictions || [],
          allergies: data.preferences.allergies || []
        });
        // Store original email to track changes
        setOriginalEmail(userEmail);
      } else {
        setError(data.message || 'Failed to load profile');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to save profile
  const handleSave = async () => {
    try {
      setError('');
      setSuccess('');

      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Please login first');
        return;
      }

      // Prepare data to send - only include preferences by default
      const updateData = {
        experience_level: profile.experience_level,
        cuisines: profile.cuisines,
        dietary_restrictions: profile.dietary_restrictions,
        allergies: profile.allergies
      };

      // Only include email if it changed
      if (profile.email !== originalEmail) {
        updateData.email = profile.email;
      }

      // Only include password if user entered a new one
      if (profile.password && profile.password.trim() !== '') {
        updateData.password = profile.password;
      }

      // Call backend API
      const response = await fetch('http://127.0.0.1:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (response.ok) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        
        // If password or email changed, show message to re-login
        if (data.requireRelogin) {
          alert('Please login again with your new credentials');
          localStorage.removeItem('authToken');
          window.location.href = '/login'; // Redirect to login page
        }
      } else {
        setError(data.message || 'Failed to update profile');
        console.error('Update failed:', data);
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
      console.error('Error details:', err);
    }
  };

  // Function to add item to array
  const addItem = (field, value) => {
    if (value.trim() === '') return;
    
    setProfile({
      ...profile,
      [field]: [...profile[field], value.trim()]
    });

    // Clear input
    if (field === 'cuisines') setNewCuisine('');
    if (field === 'dietary_restrictions') setNewRestriction('');
    if (field === 'allergies') setNewAllergy('');
  };

  // Function to remove item from array
  const removeItem = (field, index) => {
    const newArray = profile[field].filter((_, i) => i !== index);
    setProfile({
      ...profile,
      [field]: newArray
    });
  };

  // Show loading message
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Icon */}
        <div className="profile-icon">
          <User size={80} />
        </div>

        <h1>My Profile</h1>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Success Message */}
        {success && <div className="success-message">{success}</div>}

        {/* Email Field */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={!isEditing}
            className="input-field"
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            disabled={!isEditing}
            placeholder={isEditing ? "Enter new password (leave empty to keep current)" : "••••••••"}
            className="input-field"
          />
        </div>

        {/* Experience Level Dropdown */}
        <div className="form-group">
          <label>Experience Level</label>
          <select
            value={profile.experience_level}
            onChange={(e) => setProfile({ ...profile, experience_level: e.target.value })}
            disabled={!isEditing}
            className="input-field"
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        {/* Cuisines Array */}
        <div className="form-group">
          <label>Cuisines</label>
          <div className="tag-container">
            {profile.cuisines.map((cuisine, index) => (
              <div key={index} className="tag">
                {cuisine}
                {isEditing && (
                  <button
                    onClick={() => removeItem('cuisines', index)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="add-item">
              <input
                type="text"
                value={newCuisine}
                onChange={(e) => setNewCuisine(e.target.value)}
                placeholder="Add cuisine (e.g., Italian)"
                className="input-field"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem('cuisines', newCuisine);
                  }
                }}
              />
              <button
                onClick={() => addItem('cuisines', newCuisine)}
                className="add-button"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Dietary Restrictions Array */}
        <div className="form-group">
          <label>Dietary Restrictions</label>
          <div className="tag-container">
            {profile.dietary_restrictions.map((restriction, index) => (
              <div key={index} className="tag">
                {restriction}
                {isEditing && (
                  <button
                    onClick={() => removeItem('dietary_restrictions', index)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="add-item">
              <input
                type="text"
                value={newRestriction}
                onChange={(e) => setNewRestriction(e.target.value)}
                placeholder="Add restriction (e.g., vegetarian)"
                className="input-field"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem('dietary_restrictions', newRestriction);
                  }
                }}
              />
              <button
                onClick={() => addItem('dietary_restrictions', newRestriction)}
                className="add-button"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Allergies Array */}
        <div className="form-group">
          <label>Allergies</label>
          <div className="tag-container">
            {profile.allergies.map((allergy, index) => (
              <div key={index} className="tag">
                {allergy}
                {isEditing && (
                  <button
                    onClick={() => removeItem('allergies', index)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="add-item">
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergy (e.g., peanuts)"
                className="input-field"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem('allergies', newAllergy);
                  }
                }}
              />
              <button
                onClick={() => addItem('allergies', newAllergy)}
                className="add-button"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="button-group">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Update Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="save-button">
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile(); // Reload original data
                  setError('');
                  setSuccess('');
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
