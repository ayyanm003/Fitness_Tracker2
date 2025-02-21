const workout = require("../Model/Workout");

const addworkout = async (req, res) =>{
    const {name, sets, reps, weight} = req.body;
    try {
        const result = await workout.create.findOne({
            name : name,
            sets : sets,
            reps : reps,
            weight : weight
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something Went Wrong"})
    }
}
module.exports = {addworkout}