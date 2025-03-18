import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllNutrition = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/rnutrition/");
      console.log("Fetched Nutrition Data:", response.data);
      setNutritionData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      toast.error("Failed to load data!");
      setLoading(false);
    }
  };

  /*** DELETE Meal ***/
  const handleDeleteMeal = async (nutritionId, mealId) => {
    console.log("Deleting Meal - Nutrition ID:", nutritionId);
    console.log("Deleting Meal - Meal ID:", mealId);

    if (!nutritionId) {
      toast.error("Nutrition ID is missing! Can't delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3005/rnutrition/${nutritionId}/meal/${mealId}`);
      fetchNutritionData();
      toast.success("Meal deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete meal!");
    }
  };

  /*** UPDATE Meal ***/
  const handleUpdateMeal = async (nutritionId, meal) => {
    try {
      await axios.put(`http://localhost:3005/rnutrition/${nutritionId}/meal/${meal._id}`, meal);
      fetchNutritionData();
      toast.success("Meal updated successfully!");
    } catch (error) {
      toast.error("Failed to update meal!");
    }
  };

  /*** FILTER Meals Based on Search ***/
  const filteredMeals = nutritionData.flatMap(nutrition =>
    nutrition.meals
      .filter(meal => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(meal => ({ ...meal, nutritionId: nutrition._id })) // Add `nutritionId`
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: "#2c3e50" }}>🍎 Nutrition Data</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        className="form-control mb-4 shadow-sm"
        placeholder="🔍 Search meals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          borderRadius: "25px",
          padding: "10px 15px",
          border: "1px solid #ccc",
          width: "50%",
          margin: "0 auto",
          display: "block"
        }}
      />

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Meal Name</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <tr key={meal._id}>
                    <td style={{ fontWeight: "bold", color: "#2c3e50" }}>{meal.name}</td>
                    <td>{meal.calories}</td>
                    <td>{meal.protein}</td>
                    <td>{meal.carbs}</td>
                    <td>{meal.fats}</td>
                    <td>
                                                                                                                                                                                                                                                                                                                                                                                  
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteMeal(meal.nutritionId, meal._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    🚫 No meals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AllNutrition;
