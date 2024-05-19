import mongoose, { Schema } from "mongoose";

const userLogSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  logDate: {
    type: Date,
    required: true,
  },
  ipAddress: {
    type: String,
  },
});

const UserLog =
  mongoose.models.UserLog || mongoose.model("UserLog", userLogSchema);

export default UserLog;
