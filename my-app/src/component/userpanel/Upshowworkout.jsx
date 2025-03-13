import React, { useEffect, useState } from "react";
import axios from "axios";

const Upshowworkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState(""); // Date filter state

  useEffect(() => {
    fetchWorkouts(page, selectedDate);
  }, [page, selectedDate]);

  const fetchWorkouts = async (page, date) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/rworkout/workouts?page=${page}&limit=1${date ? `&date=${date}` : ""}`
      );

      setWorkouts(response.data.workouts);
      setCategoryName(response.data.categoryName);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Workout Category: {categoryName}</h2>

      {/* Date Filter */}
      <div className="mb-3 d-flex align-items-center justify-content-center">
        <label className="me-2">Select Date:</label>
        <input
          type="date"
          className="form-control w-auto"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="btn btn-secondary ms-2" onClick={() => setSelectedDate("")}>
          Clear
        </button>
      </div>

      {/* Workout Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Workout Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout =>
            workout.exercises.map(exercise => (
              <tr key={exercise._id}>
                <td>{exercise.name}</td>
                <td>{exercise.sets}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous Category
        </button>
        <span> Page {page} of {totalPages} </span>
        <button className="btn btn-primary" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next Category
        </button>
      </div>
    </div>
  );
};

export default Upshowworkout;
