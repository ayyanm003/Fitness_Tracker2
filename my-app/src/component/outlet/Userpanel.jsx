import React, { useEffect } from 'react'
import Upsidebar from '../userpanel/Upsidebar'
import Upnavbar from '../userpanel/Upnavbar'
import { Outlet, useNavigate } from 'react-router-dom'

const Userpanel = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Check if admin is logged in
        const userData = JSON.parse(localStorage.getItem("userdata"));
    
        // If admin is not logged in, redirect to signin
    if (!userData || userData.role !== "user" ) {
          navigate('/signin');
        }
        
      }, [navigate]);

    return (
        <>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">

                {/* <!-- Sidebar --> */}
                <Upsidebar />
                {/* <!-- End of Sidebar --> */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" class="d-flex flex-column">

                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        <Upnavbar />
                        {/* <!-- End of Topbar --> */}
                        {/* ---- outlet ------  */}


                        {/* <!-- Begin Page Content --> */}
                        <div class="container-fluid">
                            <Outlet />
                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    {/* <Footer /> */}
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}

            </div>
            {/* <!-- End of Page Wrapper --> */}

            {/* <!-- Scroll to Top Button--> */}
            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>

            {/* <!-- Logout Modal--> */}
            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a class="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Userpanel
