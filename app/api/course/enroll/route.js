import { getServerSession } from "next-auth";
import User from "@/app/lib/models/userModel";
import { authOptions } from "../../auth/[...nextauth]/route";
import Course from "@/app/lib/models/courseModel";
import Enroll from "@/app/lib/models/enrollModel";

export async function POST(request) {
  const res = await request.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({
      status: "error",
      message: "You need to be signed in to do that.",
    });
  }
  const { email } = session.user;
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return Response.json({
      status: "error",
      message: "User not found",
    });
  }
  const { course, paymentProof } = res;
  // check if course exists
  const courseExists = await Course.findById(course);
  if (!courseExists) {
    return Response.json({
      status: "error",
      message: "Course not found",
    });
  }
  //check if user is already enrolled
  const alreadyEnrolled = await Enroll.findOne({
    course: course,
    student: user._id,
  });
  if (alreadyEnrolled) {
    return Response.json({
      status: "error",
      message: "You are already enrolled in this course",
    });
  }
  //check if user is the course creator
  if (courseExists.createdBy.toString() === user._id.toString()) {
    return Response.json({
      status: "error",
      message: "You can't enroll in your own course",
    });
  }
  //check if course deadline has passed
  if (courseExists.startDate < new Date()) {
    return Response.json({
      status: "error",
      message: "Course has already started",
    });
  }

  try {
    const newEnroll = new Enroll({
      course: course,
      student: user._id,
      paymentProof: paymentProof,
    });
    const updateCourse = await Course.findByIdAndUpdate(
      course,
      {
        $push: { students: user._id },
      },
      { new: true }
    );
    if (!updateCourse) {
      return Response.json({
        status: "error",
        message: "Failed to enroll",
      });
    }
    await newEnroll.save();
    return Response.json({
      status: "success",
      message: "Enrolled successfully",
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
