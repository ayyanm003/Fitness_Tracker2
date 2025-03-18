import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Upaddworkout = () => {
  const [categoryName, setCategoryName] = useState("");
  const [name, setName] = useState(""); // Not used directly
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // ✅ Get user ID from localStorage safely
  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("userdata");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log("Parsed User Data:", parsedUserData); // Debugging
        if (parsedUserData && parsedUserData.id) {
          setUserId(parsedUserData.id);
        } else {
          console.warn("User ID not found in localStorage data!");
        }
      } else {
        console.warn("No userdata found in localStorage.");
      }
    } catch (error) {
      console.error("Error parsing localStorage userdata:", error);
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

  // ✅ Update exercise list based on category selection
  useEffect(() => {
    if (categoryName) {
      setFilteredExercises(exercises[categoryName] || []);
      setSearch(""); // Reset search when category changes
    }
  }, [categoryName]);

  // ✅ Handle exercise search
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

  // ✅ Handle exercise selection
  const handleSelect = (exercise) => {
    setSearch(exercise);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("User ID not found! Please log in again.");
      return;
    }

    if (!categoryName || !search || !sets || !reps || !weight) {
      toast.warning("Please fill in all fields before submitting.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3005/rworkout/workouts",
        { userId, categoryName, name: search, sets, reps, weight },
        { headers: { "Content-Type": "application/json" } }
      ).then(() => {
        toast.success("Workout Added Successfully");
        navigate("../upshowworkout");
      }).catch((err) => {
        console.error("API Error:", err);
        toast.error("Failed to add workout. Try again.");
      });

    } catch (error) {
      console.error("Request Error:", error);
      toast.error("Something went wrong!");
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
                  min="1"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  min="1"
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
                min="0"
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
