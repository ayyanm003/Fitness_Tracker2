const workout = require("../Model/Workout");

const conworkout = async (req, res) => {
    const { name, sets, reps, weight } = req.body;
    try {
        const result = await workout.create({
            // user: userId,  // User ka ID required hai
            exercises: [{ name, sets, reps, weight }]
        });
        
        // const result = await workout.create({
        //     name,
        //     sets,
        //     reps,
        //     weight
        // })
        // res.send("hello")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" })
    }
}
module.exports = { conworkout }