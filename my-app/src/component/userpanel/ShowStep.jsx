import axios from "axios";
import React, { useEffect, useState } from "react";

const StepHistory = () => {
    const [stepsData, setStepsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [totalSteps, setTotalSteps] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userdata"));
        if (userData && userData.id) {
            setUserId(userData.id);
            fetchSteps(userData.id);
        }
    }, []);

    const fetchSteps = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3005/step/steps/${userId}`);
            setStepsData(response.data);
            setFilteredData(response.data);
            calculateTotalSteps(response.data);
        } catch (error) {
            console.error("Error fetching step data:", error);
        }
    };

    const calculateTotalSteps = (data) => {
        const total = data.reduce((sum, step) => sum + step.steps, 0);
        setTotalSteps(total);
    };

    const handleFilter = () => {
        const filtered = stepsData.filter((step) => {
            const stepDate = new Date(step.date);
            return (!startDate || stepDate >= new Date(startDate)) && (!endDate || stepDate <= new Date(endDate));
        });
        setFilteredData(filtered);
        calculateTotalSteps(filtered);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="text-center mb-4">Step History</h2>

                    {/* Total Steps */}
                    <h4 className="text-center text-primary">Total Steps: {totalSteps}</h4>

                    {/* Date Filters */}
                    <div className="row my-3">
                        <div className="col-md-5">
                            <input
                                type="date"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-5">
                            <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100" onClick={handleFilter}>
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Table Data */}
                    {filteredData.length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Steps</th>
                                    <th>Walk Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((step, index) => (
                                    <tr key={index}>
                                        <td>{new Date(step.date).toLocaleDateString()}</td>
                                        <td>{step.steps}</td>
                                        <td>{step.walkType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">No step data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepHistory;
