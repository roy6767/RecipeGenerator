const { GoogleGenAI } = require('@google/genai');
const db = require('../db');

const MODEL_NAME = 'gemini-2.5-flash';

// Initialize client; pick up API key from env if supported
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const generateService = {
  /**
   * Main function: generates a recipe and saves it to the database.
   * @param {number} userId
   * @param {string[]} ingredients
   * @returns {Promise<string>} The recipe text
   */
  generateRecipeForUser: async (userId, ingredients) => {
    // Fetch user preferences (if preferences table exists, try to fetch; otherwise fallback)
    // For simplicity, try users table first. If preferences exist, prefer it.
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (!users || users.length === 0) {
      throw new Error('User not found');
    }

    // Attempt to read preferences from separate table if present
    let preferencesString = 'No specific preferences';
    try {
      const [pref] = await db.query('SELECT * FROM preferences WHERE user_id = ? LIMIT 1', [userId]);
      if (pref && pref.length > 0) {
        const p = pref[0];
        // preferences columns may be JSON strings; stringify concise summary
        const cuisines = p.cuisines ? JSON.stringify(p.cuisines) : '';
        const dietary = p.dietary_restrictions ? JSON.stringify(p.dietary_restrictions) : '';
        const allergies = p.allergies ? JSON.stringify(p.allergies) : '';
        preferencesString = `experience_level=${p.experience_level || ''}; cuisines=${cuisines}; dietary_restrictions=${dietary}; allergies=${allergies}`;
      }
    } catch (_) {
      // Ignore if table missing; keep default string
    }

    const ingredientList = ingredients.join(', ');

    const systemInstruction = `You are a professional chef. Generate a unique recipe using the ingredients provided.
Response MUST be a single block of text: title, ingredients, then step-by-step instructions.
Separate sections with newlines only. No JSON or introductions.`;

    const userPrompt = `Create a detailed recipe using: ${ingredientList}.
The user's preferences are: ${preferencesString}.`;

    // Call Gemini via SDK (shape based on provided blueprint)
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const recipeText = response.text || String(response || '');

    // Save to results table
    await db.query(
      'INSERT INTO results (user_id, input_value, output_value) VALUES (?, ?, ?)',
      [userId, ingredientList, recipeText]
    );

    return recipeText;
  },
};

module.exports = generateService;
