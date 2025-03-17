import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line 
} from "recharts";
import { toast } from "react-toastify";

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
  
      // ✅ Fetch nutrition data
      const nutritionResponse = await axios.get(`http://localhost:3005/rnutrition/${userId}`);
      console.log("Nutrition Data:", nutritionResponse.data); // Debugging log
  
      const nutritionChartData = nutritionResponse.data.flatMap(nutrition =>
        nutrition.meals.map(meal => ({
          name: meal.name,
          Carbs: meal.carbs,
          Protein: meal.protein,
          Calories: meal.calories,
        }))
      );
  
      // ✅ Fetch workout data using the new API
      const workoutResponse = await axios.get(`http://localhost:3005/rworkout/workout-chart/${userId}`);
      console.log("Workout API Response:", workoutResponse.data); // Debugging log
  
      const workoutChartData = workoutResponse.data.chartData.map(workout => ({
        date: workout.date || "Unknown", // Ensure date exists
        Workout: workout.duration || 0, // Ensure duration exists
      }));
  
      console.log("Processed Workout Data:", workoutChartData); // Debugging log
  
      setNutritionData(nutritionChartData);
      setWorkoutData(workoutChartData);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      toast.error("Failed to load user data!");
    }
  };

  
  

  return (
    <div className="container mt-4">
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
      <h3 className="text-center mt-4">🏋️‍♂️ Workout Duration</h3>
      {/* Show line chart only if workout data exists */}
{workoutData.length > 0 ? (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={workoutData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Workout" stroke="#ff8042" />
    </LineChart>
  </ResponsiveContainer>
) : (
  <p className="text-center text-muted">🚫 No workout data available</p>
)}

    </div>
  );
};

export default Updeshboard;
