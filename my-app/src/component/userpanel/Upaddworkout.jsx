import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Upaddworkout = () => {
  const [categoryName, setCategoryName] = useState("");
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // ✅ Local Storage se userdata get karo aur ID extract karo
  useEffect(() => {
    const storedUserData = localStorage.getItem("userdata");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      if (parsedUserData && parsedUserData.id) {
        setUserId(parsedUserData.id);
      }
    }
  }, []);

  const categories = ["Strength", "Cardio", "Flexibility", "Endurance", "Balance"];

  const exercises = {
    Strength: ["Deadlifts", "Bench Press", "Shoulder Press"],
    Cardio: ["Jumping Jacks", "Burpees", "Running"],
    Flexibility: ["Yoga", "Stretching", "Pilates"],
    Endurance: ["Cycling", "Swimming", "Rowing"],
    Balance: ["Plank", "Single-Leg Squat", "Tai Chi"]
  };

  const [search, setSearch] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Update exercise options based on selected category
  useEffect(() => {
    if (categoryName) {
      setFilteredExercises(exercises[categoryName] || []);
      setSearch(""); // Reset selected exercise when category changes
    }
  }, [categoryName]);

  // Search function
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredExercises(
      (exercises[categoryName] || []).filter((exercise) =>
        exercise.toLowerCase().includes(value)
      )
    );
    setIsDropdownOpen(true);
  };

  // Select Item
  const handleSelect = (exercise) => {
    setSearch(exercise);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID not found in local storage!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3005/rworkout/workouts",
        { userId, categoryName, name: search, sets, reps, weight },
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("../upshowworkout");
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="text-center">
            <h2 className="mb-4">Add Workout</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Category Selection */}
          

            {/* Sets & Reps */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Sets"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
            </div>

            {/* Weight Input */}
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Exercise Search */}
            <div className="mb-3 position-relative">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                onFocus={() => setIsDropdownOpen(true)}
                className="form-control"
                placeholder="Search exercise..."
                disabled={!categoryName} // Disable if category not selected
              />
              {isDropdownOpen && (
                <ul className="list-group position-absolute w-100 mt-1 shadow-sm">
                  {filteredExercises.length > 0 ? (
                    filteredExercises.map((exercise, index) => (
                      <li
                        key={index}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSelect(exercise)}
                      >
                        {exercise}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted text-center">
                      No exercise found
                    </li>
                  )}
                </ul>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Workout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upaddworkout;
