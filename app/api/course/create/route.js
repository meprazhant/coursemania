import { getServerSession } from "next-auth";
import User from "@/app/lib/models/userModel";
import { authOptions } from "../../auth/[...nextauth]/route";
import Course from "@/app/lib/models/courseModel";

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
  // check if user is an teacher
  if (user.role !== "teacher") {
    return Response.json({
      status: "error",
      message: "You need to be a teacher to do that.",
    });
  }
  const { courseData } = res;
  try {
    const newCourse = new Course({
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      createdBy: user._id,
      shortDescription: courseData.shortDescription,
      image: courseData.image,
      category: courseData.category,
      tags: courseData.tags,
      meetLink: courseData.meetLink,
      startDate: courseData.startDate,
      duration: courseData.duration,
      payment: courseData.payment,
    });
    await newCourse.save();
    return Response.json({
      status: "success",
      message: "Course created successfully",
      link: newCourse._id,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
      courseData,
    });
  }
}
