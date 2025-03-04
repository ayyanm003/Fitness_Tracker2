import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Addworkout = () => {

  const[name, setname] = useState("");
  const[sets, setsets] = useState("");
  const[reps, setreps] = useState("");
  const[weight, setweight] = useState("");



  const handel = (e) => {
    e.preventDefault();
    const adddata = axios.post("http://localhost:3005/rworkout/workout",
    {name, sets, reps, weight},{
      headers:{
        "Content-Type":"application-json"
      },
    }
  );
  alert("Successful")
  }

  return (
    <>
      <div class="container">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div class="row">
              <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Add Workout</h1>
                  </div>
                  <form onSubmit={handel} class="user">
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                          placeholder="Workout Name" value={name} onChange={(e)=>{setname(e.target.value)}} />
                      </div>
                      <div class="col-sm-6">
                        <input type="number" class="form-control form-control-user" id="exampleLastName"
                          placeholder="Sets" value={sets} onChange={(e)=>{setsets(e.target.value)}}/>
                      </div>
                    </div>
                    {/* <div class="form-group">
                      <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                        placeholder="Email Address"/>
                    </div> */}
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input type="number" class="form-control form-control-user"
                          id="exampleInputPassword" placeholder="Reps"  value={reps} onChange={(e)=>{setreps(e.target.value)}}/>
                      </div>
                      <div class="col-sm-6">
                        <input type="number" class="form-control form-control-user"
                          id="exampleRepeatPassword" placeholder="Weight"  value={weight} onChange={(e)=>{setweight(e.target.value)}}/>
                      </div>
                    </div>
                    <button type="submit" href="login.html" class="btn btn-primary btn-user btn-block">
                      Add
                    </button>
                    <hr/>
                      {/* <a href="index.html" class="btn btn-google btn-user btn-block">
                        <i class="fab fa-google fa-fw"></i> Register with Google
                      </a>
                      <a href="index.html" class="btn btn-facebook btn-user btn-block">
                        <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                      </a> */}
                  </form>
                  {/* <hr/>
                    <div class="text-center">
                      <a class="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div class="text-center">
                      <a class="small" href="login.html">Already have an account? Login!</a>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Addworkout
