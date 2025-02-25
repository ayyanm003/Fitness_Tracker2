const Progress = require("../Model/Progress");

const addprogress = async ()=>{
        const {user, weight, bodyFatPercentage, muscleMass, chest, waist, hips, arms, legs, runTime, maxLiftWeight, pushups, date} = req.body;
try {
    const result = {
        user,
        weight,
        bodyFatPercentage,
        bodyFatPercentage,
        muscleMass,
        chest,
        waist,
        hips,
        arms,
        legs,
        performanceMetrics:{
        runTime,
        maxLiftWeight,
        pushups,
        date
        }
    } 
} catch (error) {
    console.log(error)
}
}