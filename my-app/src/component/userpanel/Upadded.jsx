import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upadded = () => {
    const [heightFeet, setHeightFeet] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiindex, setBmiindex] = useState('');
    const [userid, setUserid] = useState(null);

    // ✅ Get user ID from localStorage
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userdata"));
        if (userData && userData.id) {
            setUserid(userData.id);
        }
    }, []);

    // ✅ Fetch existing user data from API
    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:3005/user/users/${userid}`)
                .then((res) => {
                    if (res.data) {
                        setHeightCm(res.data.height || '');
                        setWeight(res.data.weight || '');
                        setBmiindex(res.data.bmiindex || '');
                        
                        // ✅ Convert CM to Feet for input field
                        if (res.data.height) {
                            const feet = (res.data.height / 30.48).toFixed(2);
                            setHeightFeet(feet);
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userid]);

    // ✅ Convert Feet to CM
    useEffect(() => {
        if (heightFeet) {
            const cm = (heightFeet * 30.48).toFixed(2);
            setHeightCm(cm);
        }
    }, [heightFeet]);

    // ✅ Auto-calculate BMI
    useEffect(() => {
        if (heightCm && weight) {
            const heightInMeters = heightCm / 100;
            const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmiindex(calculatedBmi);
        }
    }, [heightCm, weight]);

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:3005/user/users/${userid}`,
                { height: heightCm, weight, bmiindex },
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("User Updated Successfully! 🎉");
        } catch (error) {
            toast.error("Error updating user: " + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <div className="text-center">
                            <h2 className="mb-4">Update User Details</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Height (feet)"
                                        value={heightFeet}
                                        onChange={(e) => setHeightFeet(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Weight (kg)"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Height (cm) - Auto-converted"
                                    value={heightCm}
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="BMI Index (Auto-calculated)"
                                    value={bmiindex}
                                    readOnly
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Update Details
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default Upadded;
