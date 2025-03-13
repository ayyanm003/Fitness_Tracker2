import React, { useEffect, useState } from "react";
import axios from "axios";

const Upshowworkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // ✅ Backend Se Workouts Fetch Karna
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("http://localhost:3005/rworkout/workouts");
      console.log(response.data)
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // ✅ Workout Delete Karna
  // const deleteWorkout = async (workoutId, exerciseId) => {
  //   try {
  //     await axios.delete(`http://localhost:3005/rworkout/workouts/${workoutId}/exercise/${exerciseId}`);
  //     setWorkouts((prevWorkouts) =>
  //       prevWorkouts.map((workout) => {
  //         if (workout._id === workoutId) {
  //           return {
  //             ...workout,
  //             exercises: workout.exercises.filter((exercise) => exercise._id !== exerciseId),
  //           };
  //         }
  //         return workout;
  //       })
  //     );
  //   } catch (error) {
  //     console.error("Error deleting workout:", error);
  //   }
  // };

  // ✅ Sorting Function
  const sortTable = (column) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...workouts].map((workout) => ({
      ...workout,
      exercises: [...workout.exercises].sort((a, b) => {
        if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
        if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
        return 0;
      }),
    }));

    setSortColumn(column);
    setSortOrder(newOrder);
    setWorkouts(sortedData);
  };

  // ✅ Filtered Workouts
  const filteredWorkouts = workouts.map((workout) => ({
    ...workout,
    exercises: workout.exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="container mt-4">
      <h2 className="text-center">Workout Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search workouts..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => sortTable("name")}>Workout Name ⬍</th>
            <th onClick={() => sortTable("sets")}>Sets ⬍</th>
            <th onClick={() => sortTable("reps")}>Reps ⬍</th>
            <th onClick={() => sortTable("weight")}>Weight (kg) ⬍</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkouts.map((workout) =>
            workout.exercises.map((exercise, index) => (
              <tr key={exercise._id}>
                <td>{exercise.name}</td>
                <td>{exercise.sets}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteWorkout(workout._id, exercise._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Upshowworkout;