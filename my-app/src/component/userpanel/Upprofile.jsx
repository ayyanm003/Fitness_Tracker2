import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Upprofile = () => {

  const [localstroge, setlocalstroge] = useState([]);
  const [id, setid] = useState(0);
  const [profiledata, setprofiledata] = useState([])


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userdata"));
    setlocalstroge(userData)
    setid(userData.id)
    // console.log(localstroge)
    // console.log(userData)

  }, [])

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

  useEffect(() => {
    const fetchdata = async () => {
      if (!id) return;  // Don't run if id is undefined
      try {
        const req = await axios.get(`http://localhost:3005/user/users/${id}`);
        const save = req.data;
        // console.log("data", req.data);
        setprofiledata(save);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchdata();
  }, [id]); // Ad

  // console.log(profiledata)

  const update = () => {

  }

  return (
    <>
      <div className="container">

        {/* <!-- Outer Row --> */}
        <div className="row d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>

          <div className="col-xl-6 col-lg-8 col-md-10">

            <div className="card o-hidden border-0 shadow-lg mt-3"> {/* Reduced top space */}
              <div className="card-body p-4">
                {/* <!-- Nested Row within Card Body --> */}
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

      </div>
    </>
  )
}

export default Upprofile;
