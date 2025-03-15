import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Signin = () => {

    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [savedata, setsavedata] = useState([])
    const handel = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3005/user/signin", {
                email: email,
                password: password
            }, {
                headers: { "Content-Type": "application/json" }
            });
            // setsavedata(response.data)
            const a = response.data
            console.log(a.result.role)
            // const localdata = (a.result.role,a.result.email,a.result._id)
            // console.log("data g",localdata)
            // console.log("Login Successful", response.data);
            if (a.result.role === "admin") {
                // localStorage.setItem("admindata",JSON.stringify(a.result.role,a.result.email,a.result._id))
                localStorage.setItem("admindata", JSON.stringify({
                    role: a.result.role,
                    email: a.result.email,
                    id: a.result._id
                }));
                // alert("Successful")
                navigate('/admindeshboard')
            }else if (a.result.role === "user") {
                localStorage.setItem("userdata", JSON.stringify({
                    role: a.result.role,
                    email: a.result.email,
                    id: a.result._id
                }));
                navigate("/userpanel")
            }
            // alert("Successful")
            // console.log("role", a.role)
            // navigate('/admindeshboard'); 
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center">Signup - Fitness Tracker</h3>
                <form onSubmit={handel} >
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
                    <button type="submit" className="btn btn-primary w-100">
                        Signin
                    </button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    )
}

export default Signin
