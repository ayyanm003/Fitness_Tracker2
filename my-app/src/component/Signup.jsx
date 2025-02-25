import React from 'react';
import axios from 'axios';


const Signup = () => {
    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center">Signup - Fitness Tracker</h3>
                <form >
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            //   value={formData.name}
                            //   onChange={handleChange}
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
                            //   value={formData.email}
                            //   onChange={handleChange}
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
                            //   value={formData.password}
                            //   onChange={handleChange}
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

export default Signup
