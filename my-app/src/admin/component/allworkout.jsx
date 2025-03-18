import React, { useEffect, useState } from "react";
import axios from "axios";

const AllWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [selectedCategory, page]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3005/rworkout/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchWorkouts = async () => {
    try {
      setErrorMessage("");

      let apiUrl = `http://localhost:3005/rworkout?page=${page}&limit=5`;
      if (selectedCategory) apiUrl += `&category=${selectedCategory}`;

      console.log("Fetching API:", apiUrl);

      const response = await axios.get(apiUrl);
      console.log("API Response:", response.data);

      if (response.data.workouts.length === 0) {
        setErrorMessage("No workouts found.");
        setWorkouts([]);
        return;
      }

      setWorkouts(response.data.workouts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setErrorMessage("No Data Found. Please try again.");
      setWorkouts([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary fw-bold mb-4">🏋️ Workout List</h2>

      {/* Filters */}
      <div className="mb-4 align-items-center justify-content-center">
      <div className="row">
        <div className="col-md-12">
          <label className="fw-bold">Select Category:</label>
          <select
            className="form-control shadow-sm"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1); // Reset to page 1
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
</div>
      {errorMessage && <p className="text-danger text-center fs-5 fw-bold">{errorMessage}</p>}

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

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="fs-5">Page {page} of {totalPages}</span>
        <button
          className="btn btn-primary ms-2"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllWorkout;
