import React, { useEffect, useState } from "react";
import axios from "axios";

const Upshowworkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState(""); // Date filter state
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  useEffect(() => {
    fetchWorkouts(page, selectedDate);
  }, [page, selectedDate]);

  const fetchWorkouts = async (page, date) => {
    try {
      setErrorMessage(""); // Reset error before making request

      const response = await axios.get(
        `http://localhost:3005/rworkout/workouts?page=${page}&limit=1${date ? `&date=${date}` : ""}`
      );

      if (response.data.workouts.length === 0) {
        setErrorMessage("No workouts found for the selected date.");
        setWorkouts([]);
        return;
      }

      setWorkouts(response.data.workouts);
      setCategoryName(response.data.categoryName);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setErrorMessage(" No Data Found. Please try again.");
      setWorkouts([]); // Clear workouts if API call fails
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary fw-bold mb-4">
        🏋️ Workout Category: <span className="text-dark">{categoryName || "N/A"}</span>
      </h2>

      {/* Date Filter */}
      <div className="mb-4 d-flex align-items-center justify-content-center gap-3">
        <label className="fw-bold">📅 Select Date:</label>
        <input
          type="date"
          className="form-control w-auto shadow-sm mx-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="btn btn-danger shadow-sm" onClick={() => setSelectedDate("")}>
          Clear
        </button>
      </div>

      {/* Show Error Message */}
      {errorMessage && (
        <p className="text-danger text-center fs-5 fw-bold">{errorMessage}</p>
      )}

      {/* Workout Table */}
      {workouts.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Workout Name</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) =>
                workout.exercises.map((exercise) => (
                  <tr key={exercise._id}>
                    <td className="fw-bold">{exercise.name}</td>
                    <td>{exercise.sets}</td>
                    <td>{exercise.reps}</td>
                    <td>{exercise.weight}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        !errorMessage && <p className="text-center text-secondary fs-5">Loading workouts...</p>
      )}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-primary shadow-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅️ Previous
        </button>
        <span className="fw-bold fs-5">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary shadow-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Upshowworkout;
