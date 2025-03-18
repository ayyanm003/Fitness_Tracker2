import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Upprofile = () => {

  const [userdatab, setuserdata] = useState([]);
  // const [id, setid] = useState("");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [id, setid] = useState("");

  useEffect(() => {
    // Check if admin is logged in
    const userData = JSON.parse(localStorage.getItem("userdata"));
    // setadmindata(adminData)
    // console.log("id", adminData.id)

    const axiosdata = async () => {
      const res = await axios.get(`http://localhost:3005/user/users/${userData.id}`);
      setuserdata(res.data)
      const data = (res.data)
      // console.log("data", data);
      setname(data.name)
      setemail(data.email)
      setpassword(data.password)
      setid(data._id)
      // console.log("id", id) 
    }
    axiosdata()

  }, []);

  const handel = (e) => {
    e.preventDefault();

    let userdata = {
      name
    }

    try {
      const res = axios.put(`http://localhost:3005/user/users/${id}`, userdata, {
        header: {
          "Content-Type": "application/json"
        },
        // body:JSON.stringify(userdata)
      });
      // navigate("/")
      alert("Update")
    } catch (error) {
      console.log(error)
    }
  }

  // const [localstroge, setlocalstroge] = useState([]);
  // const [id, setid] = useState(0);
  // const [profiledata, setprofiledata] = useState([])


  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem("userdata"));
  //   setlocalstroge(userData)
  //   setid(userData.id)
  //   // console.log(localstroge)
  //   // console.log(userData)

  // }, [])

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const req = await axios.get(`http://localhost:3005/user/users/${id}`);
  //     const save = req.data;
  //     console.log("data", req.data)
  //     setprofiledata(save);
  //     // console.log("data", save)
  //   }
  //   fetchdata()
  // }, [])

  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem("userdata"));
  //   setlocalstroge(userData);
  //   setid(userData?.id);  // Ensure id is set properly
  // }, []);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     if (!id) return;  // Don't run if id is undefined
  //     try {
  //       const req = await axios.get(`http://localhost:3005/user/users/${id}`);
  //       const save = req.data;
  //       // console.log("data", req.data);
  //       setprofiledata(save);

  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchdata();
  // }, [id]); // Ad

  // console.log(profiledata)

  const update = () => {

  }

  return (
    <>
      {/* <div className="container">

        <div className="row d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>

          <div className="col-xl-6 col-lg-8 col-md-10">

            <div className="card o-hidden border-0 shadow-lg mt-3"> 
              <div className="card-body p-4">
                <div className="row">
                  <div className="col">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-3">Welcome Back!</h1>
                    </div>
                    <form className="user" onSubmit={update}>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user"
                          id="exampleInputEmail" aria-describedby="emailHelp"
                          placeholder="Enter Email Address..." />
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user"
                          id="exampleInputEmail" aria-describedby="emailHelp"
                          placeholder="Enter Email Address..." />
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user"
                          id="exampleInputEmail" aria-describedby="emailHelp"
                          placeholder="Enter Email Address..." />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user"
                          id="exampleInputPassword" placeholder="Password" />
                      </div>
                      <button className="btn btn-primary btn-user btn-block" type='submit'>
                        Login
                      </button>
                      <hr />
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div> */}

      <div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form onSubmit={handel} className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user" id="exampleFirstName"
                          value={name} onChange={(e) => { setname(e.target.value) }} />
                      </div>
                      <div className="col-sm-6">
                        <input type="email" className="form-control form-control-user" id="exampleLastName"
                          value={`Email: ${email}`} disabled />
                      </div>
                    </div>

                    {/* <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user" id="exampleFirstName"
                          value={`Height: ${userdatab.height} CM`} disabled />
                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" id="exampleLastName"
                          value={`Weight: ${userdatab.weight} KG`} disabled />
                      </div>
                    </div> */}

                    {/* <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user" id="exampleFirstName"
                          value={`Gender: ${userdatab.gender}`} disabled />
                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" id="exampleLastName"
                          value={`Bmiindex: ${userdatab.bmiindex} `} disabled />
                      </div>
                    </div> */}

                    {/* <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input type="password" className="form-control form-control-user"
                                    id="exampleInputPassword" placeholder="Password" />
                            </div>
                            <div className="col-sm-6">
                                <input type="password" className="form-control form-control-user"
                                    id="exampleRepeatPassword" placeholder="Repeat Password" />
                            </div>
                        </div> */}

                    {/* <div className="form-group">
                      <input type="password" className="form-control form-control-user" id="exampleInputEmail"
                        value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    </div> */}

                    <button type='submit' href="login.html" className="btn btn-primary btn-user btn-block">
                      Edit Profile
                    </button>
                    <hr />
                    {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                                <i className="fab fa-google fa-fw"></i> Register with Google
                            </a>
                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                            </a> */}
                  </form>
                  {/* <hr/>
                        <div className="text-center">
                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                        <div className="text-center">
                            <a className="small" href="login.html">Already have an account? Login!</a>
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

export default Upprofile;
