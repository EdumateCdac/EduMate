import express from "express";
import {
  sendMessage,
  getMessagesForUser,
  getMessagesByCourse,
  getEnrolledStudentsForInstructor,
<<<<<<< HEAD
=======
  getEnrolledInstructorsForStudent,
>>>>>>> dcd67e4 (Updated stylings)
} from "../controllers/messageController.js";

const router = express.Router();

// 🔸 Send a message
router.post("/", sendMessage);

// 🔸 Get messages for a user (by email)
router.get("/user/:email", getMessagesForUser);

// 🔸 Get messages for a course
router.get("/course/:courseId", getMessagesByCourse);

// 🔸 Get enrolled students for an instructor
router.get("/enrolled-students/:instructorId", getEnrolledStudentsForInstructor);

<<<<<<< HEAD
=======
// 🔸 Get enrolled instructors for a student
router.get("/enrolled-instructors/:studentId", getEnrolledInstructorsForStudent);

>>>>>>> dcd67e4 (Updated stylings)
export default router;
