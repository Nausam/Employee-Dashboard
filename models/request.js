import { Schema, model, models } from "mongoose";

import Employee from "./employee";

const RequestSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  approved: {
    type: Boolean,
    default: false,
  },
  isOnLeave: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
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
  leaveStartDate: {
    type: String,
    required: [true, "Leave start date Leave is required"],
  },
  leaveEndDate: {
    type: String,
    required: [true, "Leave end date is required"],
  },
});

const Request = models.Request || model("Request", RequestSchema);

export default Request;
