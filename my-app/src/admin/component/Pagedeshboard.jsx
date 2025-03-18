import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers, FaDumbbell, FaUtensils, FaWalking, FaPhone } from "react-icons/fa";

const Pagedeshboard = () => {
  const [condata, setCondata] = useState(0);
  const [userdata, setUserdata] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [nutritionCount, setNutritionCount] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await axios.get(url);
        setter(response.data.length || response.data.totalSteps || response.data.totalWorkouts || 0);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData("http://localhost:3005/usercontect/contacts", setCondata);
    fetchData("http://localhost:3005/user/users", setUserdata);
    fetchData("http://localhost:3005/rworkout", setWorkoutCount);
    fetchData("http://localhost:3005/rnutrition/nutrition", setNutritionCount);
    fetchData("http://localhost:3005/step", setStepCount);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary fw-bold mb-4">Dashboard Overview</h2>
      
      <div className="row justify-content-center">
        <DashboardCard title="Total Contacts" value={condata} color="primary" icon={<FaPhone />} />
        <DashboardCard title="Total Users" value={userdata} color="success" icon={<FaUsers />} />
        <DashboardCard title="Total Workouts" value={workoutCount} color="info" icon={<FaDumbbell />} />
        <DashboardCard title="Total Nutrition" value={nutritionCount} color="warning" icon={<FaUtensils />} />
        <DashboardCard title="Total Steps" value={stepCount} color="danger" icon={<FaWalking />} />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, color, icon }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className={`card shadow border-left-${color} bg-light rounded-4`} style={{ transition: "0.3s", cursor: "pointer" }}>
        <div className={`card-header py-3 text-${color} d-flex align-items-center justify-content-center fw-bold`}>
          {icon} <span className="ms-2">{title}</span>
        </div>
        <div className="card-body text-center">
          <h2 className="fw-bold text-dark">{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default Pagedeshboard;
