import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaDumbbell, FaUtensils, FaBell, FaTachometerAlt } from "react-icons/fa";

const Upsidebar = () => {
  let location = useLocation();
  let role = location.state?.role;

  return (
    <nav className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      
      {/* Sidebar Brand */}
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-text mx-3">🏋️ Fitness Tracker</div>
      </Link>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Dashboard Link */}
      <li className={`nav-item ${location.pathname === "/updeshboard" ? "active" : ""}`}>
        <Link className="nav-link" to="updeshboard">
          <FaTachometerAlt className="me-2" />
          <span> Dashboard</span>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Workout Section */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseWorkout">
          <FaDumbbell className="me-2" />
          <span> Workout</span>
        </a>
        <div id="collapseWorkout" className="collapse" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="upaddworkout">➕ Add Workout</Link>
            <Link className="collapse-item" to="upshowworkout">📋 View Workouts</Link>
          </div>
        </div>
      </li>

      {/* Nutrition Section */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseNutrition">
          <FaUtensils className="me-2" />
          <span> Nutrition</span>
        </a>
        <div id="collapseNutrition" className="collapse" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="Upnutrition">🍎 Add Nutrition</Link>
            <Link className="collapse-item" to="Upnutritionshow">📋 View Nutrition</Link>
          </div>
        </div>
      </li>

      {/* Activity Notifications */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseNotifications">
          <FaBell className="me-2" />
          <span> Steps </span>
        </a>
        <div id="collapseNotifications" className="collapse" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="stepadd">➕ Add Steps</Link>
            <Link className="collapse-item" to="setpshow">📢 View Record</Link>
          </div>
        </div>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />

    </nav>
  );
};

export default Upsidebar;
