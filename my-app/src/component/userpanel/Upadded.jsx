// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const Upadded = () => {

//     const [height, setheight] = useState();
//     const [weight, setweight] = useState();
//     const [gender, setgender] = useState();
//     const [bmiindex, setbmiindex] = useState();

//     const [userid, setuserid] = useState(0);

//     useEffect(() => {
//         // Check if admin is logged in
//         const userData = JSON.parse(localStorage.getItem("userdata"));
//         // console.log(userData.id)
//         setuserid(userData.id)
//         // If admin is not logged in, redirect to signin
//         // if (!userData || userData.role !== "user") {
//         //   navigate('/signin');
//         // }
//     }, []);

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();

//     //     const res = axios.put(`http://localhost:3005/user/users/${userid}`, height, weight, gender, bmiindex, {
//     //         header: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         // body:JSON.stringify(userdata)
//     //     });

//     //     // const data = async ()  => {
//     //     //     let res = await axios.get(`http://localhost:3005/user/users/${userid}`);
//     //     //     let result = res.data;
//     //     //     console.log(result)
//     //     // }
//     // }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//             const res = await axios.put(
//                 `http://localhost:3005/user/users/${userid}`, 
//                 { height, weight, gender, bmiindex }, // ✅ Corrected request body
//                 {
//                     headers: { "Content-Type": "application/json" } // ✅ Fixed `headers` key
//                 }
//             );
//             alert("Added")
    
//             console.log("User Updated:", res.data);
//         } catch (error) {
//             console.error("Error updating user:", error.response ? error.response.data : error.message);
//         }
//     };
    

//     return (
//         <>
//             <div className="container mt-5">
//                 {/* <ToastContainer /> */}
//                 <div className="card shadow-lg">
//                     <div className="card-body">
//                         <div className="text-center">
//                             <h2 className="mb-4">Add Workout</h2>
//                         </div>
//                         <form onSubmit={handleSubmit}>


//                             <div className="row">
//                                 <div className="col-md-6 mb-3">
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         placeholder="Height"
//                                         value={height}
//                                         onChange={(e) => setheight(e.target.value)}
//                                     />
//                                 </div>

//                                 {/* <div className="mb-3">
//                                 <input
//                                     type="number"
//                                     className="form-control"
//                                     placeholder="Weight (kg)"
//                                     value={weight}
//                                     onChange={(e) => setWeight(e.target.value)}
//                                 />
//                             </div> */}

//                                 <div className="col-md-6 mb-3">
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         placeholder="Weight"
//                                         value={weight}
//                                         onChange={(e) => setweight(e.target.value)}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mb-3">
//                                 <input
//                                     type="number"
//                                     className="form-control"
//                                     placeholder="bmi index"
//                                     value={bmiindex}
//                                     onChange={(e) => setbmiindex(e.target.value)}
//                                 />
//                                 {/* <select className='form-control' name="" id="" value={gender} onChange={(e)=> setgender(e.target.value)}>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>

//                                 </select> */}
//                             </div>

//                             <div className="mb-3">
//                                 {/* <input
//                                     type="number"
//                                     className="form-control"
//                                     placeholder="Weight (kg)"
//                                     value={weight}
//                                     onChange={(e) => setWeight(e.target.value)}
//                                 /> */}
//                                 <select className='form-control' name="" id="" value={gender} onChange={(e) => setgender(e.target.value)}>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>

//                                 </select>
//                             </div>

//                             {/* <div className="mb-3 position-relative">
//                                 <input
//                                     type="text"
//                                     value={search}
//                                     onChange={handleSearch}
//                                     onFocus={() => setIsDropdownOpen(true)}
//                                     className="form-control"
//                                     placeholder="Search exercise..."
//                                 />
//                                 {isDropdownOpen && (
//                                     <ul className="list-group position-absolute w-100 mt-1 shadow-sm">
//                                         {filteredExercises.length > 0 ? (
//                                             filteredExercises.map((exercise, index) => (
//                                                 <li
//                                                     key={index}
//                                                     className="list-group-item list-group-item-action"
//                                                     onClick={() => handleSelect(exercise)}
//                                                 >
//                                                     {exercise}
//                                                 </li>
//                                             ))
//                                         ) : (
//                                             <li className="list-group-item text-muted text-center">
//                                                 No exercise found
//                                             </li>
//                                         )}
//                                     </ul>
//                                 )}
//                             </div> */}
//                             <button type="submit" className="btn btn-primary w-100">
//                                 Add Workout
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Upadded


import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Upadded = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [bmiindex, setBmiindex] = useState('');
    const [userid, setUserid] = useState(0);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userdata"));
        if (userData && userData.id) {
            setUserid(userData.id);
        }
    }, []);

    // ✅ BMI ko auto-calculate karna jab height ya weight change ho
    useEffect(() => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmiindex(calculatedBmi);
        }
    }, [height, weight]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `http://localhost:3005/user/users/${userid}`,
                { height, weight, gender, bmiindex },
                { headers: { "Content-Type": "application/json" } }
            );

            alert("User Updated Successfully");
            console.log("User Updated:", res.data);
        } catch (error) {
            console.error("Error updating user:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <div className="text-center">
                            <h2 className="mb-4">Add Workout</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Height (cm)"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
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
                                    placeholder="BMI Index (Auto-calculated)"
                                    value={bmiindex}
                                    readOnly // ✅ Auto-calculate ho raha hai, user edit nahi karega
                                />
                            </div>

                            <div className="mb-3">
                                <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Add Workout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upadded;
