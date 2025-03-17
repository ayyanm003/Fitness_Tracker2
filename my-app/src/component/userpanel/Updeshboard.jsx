import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line 
} from "recharts";
import { toast } from "react-toastify";
import BMICard from "./BMICARD";

const Updeshboard = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userdata"));
      if (!userData || !userData.id) {
        toast.error("User not logged in!");
        return;
      }
  
      const userId = userData.id;
  
      // ✅ Nutrition data fetch karo
      const nutritionResponse = await axios.get(`http://localhost:3005/rnutrition/${userId}`);
      console.log("Nutrition Data:", nutritionResponse.data);
  
      const nutritionChartData = nutritionResponse.data.flatMap(nutrition =>
        nutrition.meals.map(meal => ({
          name: meal.name,
          Carbs: meal.carbs,
          Protein: meal.protein,
          Calories: meal.calories,
        }))
      );
  
      // ✅ Workout data fetch with sets
      const workoutResponse = await axios.get(`http://localhost:3005/rworkout/workout-chart/${userId}`);
      console.log("Workout API Response:", workoutResponse.data);
  
      const workoutChartData = workoutResponse.data.chartData.map(workout => ({
        date: workout.date || "Unknown", 
        exercise: workout.exercise || "Unnamed", 
        sets: workout.sets || 0,  // ✅ Sets ko yaha rakho
      }));
  
      console.log("Processed Workout Data:", workoutChartData);
  
      setNutritionData(nutritionChartData);
      setWorkoutData(workoutChartData);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      toast.error("Failed to load user data!");
    }
};



  
  

  return (
    <div className="container mt-4">
      <BMICard />
      <h2 className="text-center mb-4">📊 User Nutrition & Workout Dashboard</h2>

      {/* Bar Chart for Nutrition Data */}
      <h3 className="text-center mt-4">🥦 Carbs, Protein, and Calories</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={nutritionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Carbs" fill="#8884d8" />
          <Bar dataKey="Protein" fill="#82ca9d" />
          <Bar dataKey="Calories" fill="#ffcc00" />
        </BarChart>
      </ResponsiveContainer>

      {/* Line Chart for Workout Duration */}
      <h3 className="text-center mt-4">🏋️‍♂️ Workout Sets per Exercise</h3>
{workoutData.length > 0 ? (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={workoutData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="exercise" />  {/* ✅ Exercise name X-axis pe */}
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sets" stroke="#ff8042" />  {/* ✅ Sets dikhao */}
    </LineChart>
  </ResponsiveContainer>
) : (
  <p className="text-center text-muted">🚫 No workout data available</p>
)}


    </div>
  );
};

export default Updeshboard;
