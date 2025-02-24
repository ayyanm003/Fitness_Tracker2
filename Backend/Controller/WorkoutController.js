const workout = require("../Model/Workout");

const conworkout = async (req, res) => {
    const { name, sets, reps, weight } = req.body;
    try {
        const result = await workout.create({
            name: name,
            sets: sets,
            reps: reps,
            weight: weight 

            // name: "puchup",
            // sets: 12,
            // reps: 3,
            // weight: 80
        })
        // res.send("hello")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" })
    }
}
module.exports = { conworkout }