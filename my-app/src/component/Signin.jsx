import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signin = () => {

    const navigate = useNavigate;

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [savedata, setsavedata] = useState("")
    const handel = async (e) => {
        e.preventDefault();

        const datasw = axios.get("http://localhost:3005/user/signin");
        const fetch_data = (await datasw).data
        console.log(fetch_data)
        const save = fetch_data.find((e)=> e.email === email && e.password === password)
        console.log(save)
        if(save){
            navigate("/signup")
        }
        else{
            alert("Something Went Wrong")
        }

        // try {
        //     let data = axios.get("http://localhost:3005/user/signin")
        //     let fetch_data = (await data).data;
        //     let save = fetch_data.find((e) => e.email === email && e.password === password);
        //     setsavedata("data", fetch_data);
        //     navigate("/signup")
        // } catch (error) {
        //     console.log(error)
        // }
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
                        Signup
                    </button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    )
}

export default Signin
