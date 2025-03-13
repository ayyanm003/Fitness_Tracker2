import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Upaddworkout = () => {
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
      const parsedUserData = JSON.parse(storedUserData); // JSON parse
      if (parsedUserData && parsedUserData.id) {
        setUserId(parsedUserData.id); // User ID set karo
      }
    }
    
  }, []);
  // console.log("id", userId)

  const exercises = [
    "Push-ups",
    "Squats",
    "Deadlifts",
    "Bench Press",
    "Pull-ups",
    "Plank",
    "Jumping Jacks",
    "Burpees",
    "Leg Raises",
    "Shoulder Press",
  ];

  const [search, setSearch] = useState("");
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Search function
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredExercises(
      exercises.filter((exercise) => exercise.toLowerCase().includes(value))
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
    // http://localhost:3005/rworkout/workouts
    try {
      await axios.post(
        "http://localhost:3005/rworkout/workout",
        { userId, name: search, sets, reps, weight },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // navigate('upshowworkout')
      navigate('../upshowworkout')
      // alert("Workout Added Successfully!");
      // toast("Workout Add")
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* <ToastContainer /> */}
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="text-center">
            <h2 className="mb-4">Add Workout</h2>
          </div>
          <form onSubmit={handleSubmit}>


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

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                onFocus={() => setIsDropdownOpen(true)}
                className="form-control"
                placeholder="Search exercise..."
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
