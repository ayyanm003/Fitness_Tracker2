import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaDumbbell, FaUtensils, FaWalking, FaPhone, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav className="sidebar bg-gradient-primary sidebar-dark">
      <div className="sidebar-brand text-center py-3">
        <h4 className="text-white fw-bold">🏋️ Fitness Tracker</h4>
      </div>

      <ul className="nav flex-column">
        <SidebarItem to="" icon={<FaTachometerAlt /> } text=" Dashboard" />
        <SidebarItem to="allworkout" icon={<FaDumbbell /> } text=" Workouts" />
        <SidebarItem to="allnutrition" icon={<FaUtensils /> } text=" Nutrition" />
        <SidebarItem to="showsteps" icon={<FaWalking /> } text=" Steps" />
        <SidebarItem to="showcontect" icon={<FaPhone /> } text=" Contacts" />
        <SidebarItem to="showuser" icon={<FaUsers /> } text=" Users" />
      </ul>
    </nav>
  );
};

const SidebarItem = ({ to, icon, text }) => (
  <li className="nav-item">
    <Link className="nav-link d-flex align-items-center" to={to}>
      <span className="me-2">{icon}</span>
      {text}
    </Link>
  </li>
);

export default Sidebar;
