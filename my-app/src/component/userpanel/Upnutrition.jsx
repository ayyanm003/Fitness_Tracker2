import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Upnutrition = () => {
  const [nutritionData, setNutritionData] = useState({
    user: '',
    meals: [{ name: '', calories: '', protein: '', carbs: '', fats: '' }],
  });
  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata"); // 🎯 "userdata" fetch karo
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData);
      if (parsedUser.id) {
        setNutritionData((prev) => ({ ...prev, user: parsedUser.id }));
      }
    }
  }, []);
   // ✅ Dependency array empty hai, ek baar hi chalega
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [mealQuery, setMealQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mealQuery) {
        fetchNutritionData(mealQuery);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [mealQuery]);

  const fetchNutritionData = async (mealName) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        { query: mealName },
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "c425ac69",
            "x-app-key": "59169b04cfc3d6ad6a03cfc19bcd5add",
          },
        }
      );

      if (response.data.foods.length > 0) {
        const food = response.data.foods[0];

        setNutritionData((prevData) => ({
          ...prevData,
          meals: [{
            name: food.food_name,
            calories: food.nf_calories || 0,
            protein: food.nf_protein || 0,
            carbs: food.nf_total_carbohydrate || 0,
            fats: food.nf_total_fat || 0,
          }],
        }));
      } else {
        setErrorMessage("No nutrition data found!");
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage("Error fetching nutrition data! Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMeals = [...nutritionData.meals];
    updatedMeals[index][name] = value;
    setNutritionData({ ...nutritionData, meals: updatedMeals });

    if (name === "name") {
      setMealQuery(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
        if (!nutritionData.meals.length || !nutritionData.meals[0].name) {
            toast.error("Please enter at least one meal!");
            setLoading(false);
            return;
        }

        const response = await fetch('http://localhost:3005/rnutrition/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: nutritionData.user, // 🔄 Change "user" to "userId"
                meals: nutritionData.meals
            }),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success("Nutrition Data Added Successfully!");
            setNutritionData((prev) => ({
                user: prev.user,
                meals: [{ name: '', calories: '', protein: '', carbs: '', fats: '' }],
            }));
        } else {
            toast.error(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error('Something went wrong!');
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Add Nutrition Data</h1>
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      name="name"
                      placeholder="Meal Name"
                      value={nutritionData.meals[0].name}
                      onChange={(e) => handleChange(e, 0)}
                      required
                    />
                  </div>

                  {loading && <p>⏳ Loading nutrition data...</p>}
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}
                  {successMessage && <p className="text-success">{successMessage}</p>}

                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control form-control-user"
                      name="calories"
                      placeholder="Calories"
                      value={nutritionData.meals[0].calories}
                      onChange={(e) => handleChange(e, 0)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control form-control-user"
                      name="protein"
                      placeholder="Protein (g)"
                      value={nutritionData.meals[0].protein}
                      onChange={(e) => handleChange(e, 0)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control form-control-user"
                      name="carbs"
                      placeholder="Carbohydrates (g)"
                      value={nutritionData.meals[0].carbs}
                      onChange={(e) => handleChange(e, 0)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control form-control-user"
                      name="fats"
                      placeholder="Fats (g)"
                      value={nutritionData.meals[0].fats}
                      onChange={(e) => handleChange(e, 0)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-user btn-block" disabled={loading}>
                    {loading ? "Adding..." : "Add Nutrition"}
                  </button>
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Upnutrition;
