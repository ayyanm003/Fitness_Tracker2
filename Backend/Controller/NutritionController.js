// const Nutrition = require("../Model/Nutrition");

// const addnutrition = async (req, res) => {
//         const {name, calories, protein, carbs, fats} = req.body;
//     try {

//     const result = await Nutrition.create.findOne({
//         name : name,
//         calories : calories,
//         protein : protein,
//         carbs : carbs,
//         fats : fats
//     })
//     res.status(201).json({ message: "Nutrition added successfully", nutrition: result });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: "Server Error", details: error.message });
//     }
    
// }



// module.exports = {addnutrition} ;


const Nutrition = require("../Model/Nutrition");

const addNutrition = async (req, res) => {
    try {
        const nutrition = await Nutrition.create(req.body);
        res.status(201).json({ message: "Nutrition added", nutrition });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addNutrition };
