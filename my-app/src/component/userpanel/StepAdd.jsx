import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const StepTracker = () => {
    const [steps, setSteps] = useState("");
    const [walkType, setWalkType] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userdata"));
        if (userData && userData.id) {
            setUserId(userData.id);
        }
    }, []);

    const walkTypes = ["Casual Walk", "Brisk Walk", "Running", "Hiking"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !steps || !walkType) {
            toast.error("Please fill all fields!");
            return;
        }

        try {
            await axios.post("http://localhost:3005/step/steps", {
                userId,
                steps,
                walkType
            });

            toast.success("Steps recorded successfully");
            setSteps("");
            setWalkType("");
        } catch (error) {
            toast.error("Error recording steps!");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="text-center">Step Counter</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Steps"
                                value={steps}
                                onChange={(e) => setSteps(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-control"
                                value={walkType}
                                onChange={(e) => setWalkType(e.target.value)}
                            >
                                <option value="">Select Walk Type</option>
                                {walkTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Add Steps
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default StepTracker;
