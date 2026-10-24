import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
    status: { 
      type: String, 
      enum: ['Present', 'Absent', 'Late', 'Half-Day'], 
      default: 'Present' 
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;