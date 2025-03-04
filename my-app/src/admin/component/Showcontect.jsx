import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Showcontect = () => {

  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    const axiosdata = async () => {
      const res = await axios.get("http://localhost:3005/usercontect/contacts");
      setuserdata(res.data);
      console.log(res.data);
    }
    axiosdata();
  }, [])

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((data) => (
            <tr>
            {/* <th scope="row">1</th> */}
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.message}</td>
          </tr>
          ))}

          
        </tbody>
      </table>
    </>
  )
}

export default Showcontect
