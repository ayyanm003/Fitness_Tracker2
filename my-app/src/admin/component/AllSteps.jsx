import React, { useEffect, useState } from "react";
import axios from "axios";

const AllSteps = () => {
  const [steps, setSteps] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSteps();
  }, [page]);

  const fetchSteps = async () => {
    try {
      setErrorMessage("");

      let apiUrl = `http://localhost:3005/step/steps?page=${page}&limit=10`;

      console.log("Fetching API:", apiUrl);

      const response = await axios.get(apiUrl);
      console.log("API Response:", response.data);

      if (response.data.steps.length === 0) {
        setErrorMessage("No step records found.");
        setSteps([]);
        return;
      }

      setSteps(response.data.steps);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setErrorMessage("Failed to fetch data. Please try again.");
      setSteps([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-success fw-bold mb-4">🚶 Step Tracking</h2>

      {errorMessage && <p className="text-danger text-center fs-5 fw-bold">{errorMessage}</p>}

      {steps.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Date</th>
                <th>Steps</th>
                <th>Walk Type</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step) => (
                <tr key={step._id}>
                  <td className="fw-bold">{step.userId?.name || "Unknown"}</td>
                  <td>{step.userId?.email || "N/A"}</td>
                  <td>{new Date(step.date).toLocaleDateString()}</td>
                  <td>{step.steps}</td>
                  <td>{step.walkType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !errorMessage && <p className="text-center text-secondary fs-5">Loading steps data...</p>
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

export default AllSteps;
