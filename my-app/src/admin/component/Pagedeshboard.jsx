import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Pagedeshboard = () => {

    const [condata, setcondata] = useState(0);
    const [userdata, setuserdata] = useState(0);


    useEffect(() => {
        const fetchdat = async () => {
            const req = await axios.get("http://localhost:3005/usercontect/contacts")
            const save = (await req).data;
            setcondata(save.length)
            console.log("data", save.length)
        }
        fetchdat();
    }, [])

    useEffect(() => {
        const fetchdata = async () => {
            const req = await axios.get("http://localhost:3005/user/users")
            const save = (await req).data;
            setuserdata(save.length)
            // setuserdata(save)
            // console.log(save)
        }
        fetchdata();
    }, [])

    return (
        <>
            <div class="col-md-6">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Contect</h6>
                    </div>
                    <div class="card-body">
                     <h2>{condata}</h2>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">User</h6>
                    </div>
                    <div class="card-body">
                     <h2>{userdata}</h2>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Pagedeshboard
