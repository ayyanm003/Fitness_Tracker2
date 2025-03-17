import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

const BMICard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userdata"));
      if (!user || !user.id) {
        toast.error("User not logged in!");
        return;
      }

      const response = await axios.get(`http://localhost:3005/user/users/${user.id}`);
      const { height, weight } = response.data;

      if (!height || !weight) {
        toast.error("Height or weight missing!");
        return;
      }

      // Calculate BMI
      const heightMeters = height / 100;
      const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

      // Determine category
      let category = "";
      let color = "";
      if (bmi < 18.5) {
        category = "Underweight";
        color = "#1E90FF"; // Blue
      } else if (bmi < 24.9) {
        category = "Normal Weight";
        color = "#28a745"; // Green
      } else if (bmi < 29.9) {
        category = "Overweight";
        color = "#FFA500"; // Orange
      } else {
        category = "Obese";
        color = "#DC3545"; // Red
      }

      setUserData({ height, weight, bmi, category, color });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load BMI data!");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      {userData && (
        <Card
          style={{
            width: "22rem",
            border: `3px solid ${userData.color}`,
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            background: "linear-gradient(135deg, #f8f9fa, #ffffff)",
            padding: "10px",
          }}
        >
          <Card.Body>
            <Card.Title className="text-center font-weight-bold" style={{ fontSize: "1.5rem", color: "#343a40" }}>
              🏋️‍♂️ BMI Information
            </Card.Title>
            <hr style={{ border: `1px solid ${userData.color}` }} />

            <Card.Text className="text-center" style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#6c757d" }}>
              📏 Height: <span style={{ color: "#007BFF" }}>{userData.height} cm</span>
            </Card.Text>

            <Card.Text className="text-center" style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#6c757d" }}>
              ⚖️ Weight: <span style={{ color: "#17A2B8" }}>{userData.weight} kg</span>
            </Card.Text>

            <Card.Text className="text-center" style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#6c757d" }}>
              🧮 BMI: <span style={{ color: userData.color }}>{userData.bmi}</span>
            </Card.Text>

            <Card.Text
              className="text-center"
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: userData.color,
                backgroundColor: "#f8f9fa",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: `0px 2px 5px ${userData.color}`,
              }}
            >
              📊 Category: {userData.category}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default BMICard;
