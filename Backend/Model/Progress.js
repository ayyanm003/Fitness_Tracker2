const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weight: {
      type: Number, // In kilograms
      required: false,
    },
    bodyFatPercentage: {
      type: Number, // Percentage (e.g., 15.5)
      required: false,
    },
    muscleMass: {
      type: Number, // In kilograms
      required: false,
    },
    chest: {
      type: Number, // In cm
      required: false,
    },
    waist: {
      type: Number, // In cm
      required: false,
    },
    hips: {
      type: Number, // In cm
      required: false,
    },
    arms: {
      type: Number, // In cm
      required: false,
    },
    legs: {
      type: Number, // In cm
      required: false,
    },
    performanceMetrics: {
      runTime: {
        type: Number, // Time in minutes
        required: false,
      },
      maxLiftWeight: {
        type: Number, // Max weight lifted in kg
        required: false,
      },
      pushups: {
        type: Number, // Number of push-ups
        required: false,
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", ProgressSchema);
