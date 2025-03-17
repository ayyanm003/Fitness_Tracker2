import React from 'react'
import { Link } from 'react-router-dom'

const Upsidebar = () => {
    return (
        <>
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    {/* <div class="sidebar-brand-icon rotate-n-15">
    <i class="fas fa-laugh-wink"></i>
  </div> */}
                    <div class="sidebar-brand-text mx-3">Fitness Tracker </div>
                </a>

                {/* <!-- Divider --> */}
                <hr class="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li class="nav-item active">
                    <Link class="nav-link" to="updeshboard">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>

                {/* <!-- Divider --> */}
                <hr class="sidebar-divider" />

                {/* <!-- Heading --> */}
                

                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fa-file"></i>
                        <span>Workout </span>
                    </a>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                        
                            <Link class="collapse-item" to="upaddworkout">Add</Link>
                            <Link class="collapse-item" to="upshowworkout">Show</Link>
                        </div>
                    </div>
                </li>




                {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fa-file"></i>
                        <span>Nutrition</span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                       
                            <Link class="collapse-item" to="Upnutrition">Add</Link>
                            <Link class="collapse-item" to="Upnutritionshow">Show</Link>
                        </div>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwoa"
                        aria-expanded="true" aria-controls="collapseTwoa">
                        <i class="fa-file"></i>
                        <span>Activity Notifications </span>
                    </a>
                    <div id="collapseTwoa" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Custom Components:</h6>
                            <a class="collapse-item" href="buttons.html">Add</a>
                            <a class="collapse-item" href="cards.html">Show</a>
                        </div>
                    </div>
                </li>

                {/* <!-- Divider --> */}
                <hr class="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div class="sidebar-heading">
                    Addons
                </div>

                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                {/* <li class="nav-item">
  <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
    aria-expanded="true" aria-controls="collapsePages">
    <i class="fas fa-fw fa-folder"></i>
    <span>Pages</span>
  </a>
  <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
    <div class="bg-white py-2 collapse-inner rounded">
      <h6 class="collapse-header">Login Screens:</h6>
      <a class="collapse-item" href="login.html">Login</a>
      <a class="collapse-item" href="register.html">Register</a>
      <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
      <div class="collapse-divider"></div>
      <h6 class="collapse-header">Other Pages:</h6>
      <a class="collapse-item" href="404.html">404 Page</a>
      <a class="collapse-item" href="blank.html">Blank Page</a>
    </div>
  </div>
</li> */}

                {/* <!-- Nav Item - Charts --> */}
                {/* <li class="nav-item">
                    <a class="nav-link" to="showcontect">
                        <i class="fas fa-fw fa-folder"></i>
                        <span>Show Contect</span></a>
                </li> */}

                {/* <!-- Nav Item - Tables --> */}
                {/* <li class="nav-item">
                    <a class="nav-link" to="showuser">
                        <i class="fas fa-fw fa-folder"></i>
                        <span>Show User</span></a>
                </li> */}

                {/* <!-- Divider --> */}
                <hr class="sidebar-divider d-none d-md-block" />

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                {/* <div class="text-center d-none d-md-inline">
  <button class="rounded-circle border-0" id="sidebarToggle"></button>
</div> */}

                {/* <!-- Sidebar Message --> */}
                {/* <div class="sidebar-card d-none d-lg-flex">
  <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
  <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
  <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
</div> */}

            </ul>
        </>
    )
}

export default Upsidebar
