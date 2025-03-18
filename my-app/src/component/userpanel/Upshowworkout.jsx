import React, { useEffect, useState } from "react";
import axios from "axios";

const Upshowworkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [categoryName, setCategoryName] = useState(""); // Active category
  const [categories, setCategories] = useState([]); // All categories
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // ✅ Retrieve logged-in user ID
    const storedUserData = localStorage.getItem("userdata");
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData);
      if (parsedUser.id) {
        setUserId(parsedUser.id);
      }
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchCategories(userId); 
    }
  }, [userId]);
  
  useEffect(() => {
    if (userId !== null) {
      setPage(1); // Reset page to 1 when category changes
      fetchWorkouts(userId, 1, categoryName, selectedDate);
    }
  }, [userId, categoryName, selectedDate]);
  

  // ✅ Fetch all unique categories for the user
  const fetchCategories = async (userId) => {
    try {
        console.log("🚀 Fetching categories for user:", userId);

        const response = await axios.get(
            `http://localhost:3005/rworkout/workouts/${userId}/categories`
        );

        console.log("✅ Category API Response:", response.data);

        if (response.data.categories && Array.isArray(response.data.categories)) {
            setCategories(response.data.categories);
        } else {
            setCategories([]);
            console.warn("⚠️ Categories data is not an array:", response.data);
        }
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        setCategories([]);
    }
};


  // ✅ Fetch workouts category-wise
  const fetchWorkouts = async (userId, page, category, date) => {
    try {
        setErrorMessage(""); // Reset error message

        console.log("🚀 Fetching workouts with:");
        console.log("✅ User ID:", userId);
        console.log("✅ Page:", page);
        console.log("✅ Category:", category || "All");
        console.log("✅ Date:", date || "Not Selected");

        const apiUrl = `http://localhost:3005/rworkout/workouts/category/${userId}?page=${page}&limit=5${
            category ? `&categoryName=${encodeURIComponent(category)}` : ""
        }${date ? `&date=${date}` : ""}`;

        console.log("🔍 API Request URL:", apiUrl);

        const response = await axios.get(apiUrl);

        console.log("✅ API Response:", response.data);

        if (!response.data.workouts.length) {
            setErrorMessage("No workouts found for the selected category and date.");
            setWorkouts([]);
            return;
        }

        setWorkouts(response.data.workouts);
        setTotalPages(response.data.totalPages);
    } catch (error) {
        console.error("❌ Error fetching workouts:", error);
        setErrorMessage("No Data Found. Please try again.");
        setWorkouts([]);
    }
};



  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary fw-bold mb-4">
        🏋️ Workout Category: <span className="text-dark">{categoryName || "Select Category"}</span>
      </h2>
      <div className="mb-4 d-flex align-items-center justify-content-center gap-3">
      {/* Category Selection Dropdown */}
      <select
    className="form-control w-auto shadow-sm mx-2"
    value={categoryName}
    onChange={(e) => {
      setCategoryName(e.target.value);
      setPage(1); // Reset to first page when category changes
  }}
  
>
    <option value="">All Categories</option>
    {categories.length > 0 ? (
        categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
        ))
    ) : (
        <option disabled>No Categories Found</option>
    )}
</select>
</div>

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
