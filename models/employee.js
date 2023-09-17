import { Schema, model, models } from "mongoose";

import Request from "./request";

const EmployeeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
  },
  joinedDate: {
    type: String,
    required: [true, "Joined Date is required"],
  },
  employeeId: {
    type: String,
    required: [true, "Employee ID  is required"],
  },
  idCardNumber: {
    type: String,
    required: [true, "ID Card Number is required"],
  },
  off: {
    type: Number,
    required: [true, "OFF Days is required"],
  },
  annual: {
    type: Number,
    required: [true, "Annual Leave is required"],
  },
  medical: {
    type: Number,
    required: [true, "Medical Leave is required"],
  },
  emergency: {
    type: Number,
    required: [true, "Emergency Leave is required"],
  },
  image: {
    type: String,
  },
});

const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;
