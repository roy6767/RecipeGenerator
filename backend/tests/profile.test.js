const request = require('supertest'); 
const jwt = require('jsonwebtoken');
const app = require('../server'); 
const pool = require('../db');

//test user data
const testUser = {
  email: 'demouser@test.com',
  password: 'demo123'
};

let authToken;

describe('Simple Profile Tests', () => {
  
  beforeAll(async () => {
    try {
      //Delete any existing demo user from previous tests (preferences first, then user because of the foreign key constraint)
      await pool.query('DELETE FROM preferences WHERE user_id IN (SELECT id FROM users WHERE email = ?)', [testUser.email]);
      await pool.query('DELETE FROM users WHERE email = ?', [testUser.email]);
      
      //Create a demo user directly in database
      const [result] = await pool.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [testUser.email, testUser.password]
      );
      
      const userId = result.insertId;
      
      //Generate a JWT token manually
      authToken = jwt.sign(
        { id: userId, email: testUser.email },
        process.env.JWT_SECRET,                
        { expiresIn: '1h' }                     
      );
      console.log('Demo user created and token generated');

    } catch (error) {
      console.error( 'setting up user failed',error);
    }
  });


  // Delete the demo user and closes database connection
  afterAll(async () => {
    try {
      await pool.query('DELETE FROM preferences WHERE user_id IN (SELECT id FROM users WHERE email = ?)', [testUser.email]);
      await pool.query('DELETE FROM users WHERE email = ?', [testUser.email]);
      await pool.end(); 
      console.log('✅ Cleanup complete');
    } catch (error) {
      console.error(' Cleanup failed:', error);
    }
  });

  // Test: Access profile WITHOUT token should FAIL
  test('Test 1: Cannot access profile without auth token', async () => {
    const response = await request(app)
      .get('/api/profile');
    
    expect(response.status).toBe(401);
    expect(response.body.message).toBeDefined();
    
    console.log('✅ Test 1 passed: Blocked access without token');
  });

  // Test: Access profile WITH valid token should PASS
  test('Test 2: Can access profile with valid auth token', async () => {
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(testUser.email);
    
    console.log('✅ Test 2 passed: Accessed profile with valid token');
  });


  // Test: Access profile WITH wrong/fake token should FAIL
  test('Test 3: Cannot access profile with wrong token', async () => {
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer this_is_a_fake_token_12345');
    
    expect(response.status).toBe(401);
    expect(response.body.message).toContain('Invalid or expired token');
    
    console.log('✅ Test 3 passed: Blocked access with invalid token');
  });

  // Test: Update profile WITH token and verify data saved in database
  test('Test 4: Can update profile and data is saved in database', async () => {
    // Update profile with new data
    const updateData = {
      experience_level: 'intermediate',
      cuisines: ['Italian', 'Chinese'],
      dietary_restrictions: ['vegetarian'],
      allergies: ['nuts']
    };
    
    const updateResponse = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData);
    

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.message).toContain('Profile updated successfully');

    // Fetch profile again to verify data was SAVED in database
    const getResponse = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.preferences.experience_level).toBe('intermediate');
    expect(getResponse.body.preferences.cuisines).toEqual(['Italian', 'Chinese']);
    expect(getResponse.body.preferences.dietary_restrictions).toEqual(['vegetarian']);
    expect(getResponse.body.preferences.allergies).toEqual(['nuts']);
    
    console.log('✅ Test 4 passed: Profile updated and saved in database');
  });
});
