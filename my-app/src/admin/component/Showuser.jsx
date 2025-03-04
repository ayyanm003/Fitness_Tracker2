import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Showuser = () => {

    const [userdata, setuserdata] = useState([]);

    useEffect(() => {
        const axiosdata = async () => {
            const res = await axios.get("http://localhost:3005/user/users");
            setuserdata(res.data);
            console.log(res.data);
        }
        axiosdata();
    }, [])

    const deletedata = async (id) => {
        const res = await axios.delete(`http://localhost:3005/user/users/${id}`);
        setuserdata(userdata.filter((e) => id !== e._id))
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">Password</th> */}
                        <th scope="col">Delete</th>


                    </tr>
                </thead>
                <tbody>
                    {userdata.map((data) => (
                        <tr>
                            {/* <th scope="row">1</th> */}
                            <td>{data._id}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            {/* <td>{data.password}</td> */}
                            <td> <button className="btn btn-danger"  onClick={() => deletedata(data._id)}  >Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Showuser