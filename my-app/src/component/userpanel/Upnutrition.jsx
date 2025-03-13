import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upnutrition = () => {
  const [nutritionData, setNutritionData] = useState({
    user: '', // Yahan user ka ID aayega (agar required ho)
    meals: [{ name: '', calories: '', protein: '', carbs: '', fats: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Debounce ke liye state
  const [mealQuery, setMealQuery] = useState('');

  // Meal ka naam change hone par API se data fetch karega (debounce effect)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mealQuery) {
        fetchNutritionData(mealQuery);
      }
    }, 1000); // 1 second ka debounce time

    return () => clearTimeout(timer);
  }, [mealQuery]);

  // API se meal ka nutrition data fetch karna
  const fetchNutritionData = async (mealName) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await axios.get(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "c425ac69",  // Replace with Nutritionix API Key
            "x-app-key": "50b5882cbfcbd5b8e20ebea4f82ae737	",
          },
          data: { query: mealName }
        }
      );

      const food = response.data.foods[0];
      if (!food) {
        setErrorMessage("No nutrition data found!");
        setLoading(false);
        return;
      }

      // Update nutrition state
      setNutritionData({
        ...nutritionData,
        meals: [
          {
            name: food.food_name,
            calories: food.nf_calories || 0,
            protein: food.nf_protein || 0,
            carbs: food.nf_total_carbohydrate || 0,
            fats: food.nf_total_fat || 0,
          },
        ],
      });

    } catch (error) {
      setErrorMessage("Error fetching nutrition data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Input change handle karna
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMeals = [...nutritionData.meals];
    updatedMeals[index][name] = value;
    setNutritionData({ ...nutritionData, meals: updatedMeals });

    if (name === "name") {
      setMealQuery(value);
    }
  };

  // Form submit karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/rnutrition/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nutritionData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Nutrition Data Added Successfully!');
        setNutritionData({
          user: '',
          meals: [{ name: '', calories: '', protein: '', carbs: '', fats: '' }],
        });
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
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

                  {loading && <p>Loading nutrition data...</p>}
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}

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
                  <button type="submit" className="btn btn-primary btn-user btn-block">
                    Add Nutrition
                  </button>
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upnutrition;
