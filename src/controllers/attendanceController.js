import Attendance from '../models/Attendance.js';

export async function checkIn(req, res, next) {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split('T')[0];

    const existingRecord = await Attendance.findOne({ userId, date: today });
    if (existingRecord) {
      return res.status(400).json({ message: 'Aap aaj pehle hi check-in kar chuke hain' });
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkInTime: new Date(),
      status: 'Present',
    });

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
}

export async function checkOut(req, res, next) {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({ userId, date: today });
    if (!attendance) {
      return res.status(404).json({ message: 'Aaj ka koi check-in record nahi mila' });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: 'Aap aaj pehle hi check-out kar chuke hain' });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
}

export async function getMyAttendance(req, res, next) {
  try {
    const logs = await Attendance.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
}