const generateService = require("../services/generate.service");

const generateController = {
  generateRecipe: async (req, res) => {
    try {
      const userId = req.user?.id; // ✅ This now works
      const { ingredients } = req.body || {};

      if (
        !userId ||
        !Array.isArray(ingredients) ||
        ingredients.length === 0 ||
        ingredients.some((i) => typeof i !== "string" || i.trim() === "")
      ) {
        return res
          .status(400)
          .json({ message: "Missing or invalid input data." });
      }

      const recipe = await generateService.generateRecipeForUser(
        Number(userId),
        ingredients
      );
      return res
        .status(201)
        .json({ message: "Recipe generated successfully", recipe });
    } catch (err) {
      console.error("Error generating recipe:", err);
      return res
        .status(500)
        .json({ message: err.message || "Internal server error." });
    }
  },
};

module.exports = generateController;
