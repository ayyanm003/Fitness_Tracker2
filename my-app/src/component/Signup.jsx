import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";



const Signup = () => {



    const navigate = useNavigate();

    useEffect(() => {
            // Check if admin or user is logged in
            const userData = JSON.parse(localStorage.getItem("userdata"));
            const adminData = JSON.parse(localStorage.getItem("admindata"));
          
            // If userData exists and role is "user", navigate to user panel
            if (userData && userData.role === "user") {
              navigate('/userpanel');
            } 
            // If adminData exists and role is "admin", navigate to admin dashboard
            else if (adminData && adminData.role === "admin") {
              navigate('/admindeshboard');
            } 
            // If neither userData nor adminData exists, stay on signin page
            else {
              navigate('/signup');
            }
          
          }, [navigate]);

    const [name, setname] = useState("")
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [gender, setGender] = useState('');

    const handel = (e) => {
        e.preventDefault();

        // let userdata = {
        //     name,
        //     email,
        //     password,
        // }

        try {
            let res = axios.post("http://localhost:3005/user/register", {
                name: name, email: email, password: password,gender:gender
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => { console.log("User Registered Successfully") }).catch((a) => { console.log(a) });
            alert("Successful")
            navigate("/signin");
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center">Signup - Fitness Tracker</h3>
                <form onSubmit={handel}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => { setname(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => { setpassword(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Gender</label>

                                <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Signup
                    </button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/signin">Signin</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
