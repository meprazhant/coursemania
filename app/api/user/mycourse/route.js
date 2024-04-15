import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/lib/models/userModel";
import Course from "@/app/lib/models/courseModel";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({
      status: "error",
      message: "You need to be signed in to do that",
    });
  }
  const email = session.user.email;
  const user = await User.findOne({ email });

  if (!user) {
    return Response.json({
      status: "success",
      message: "User not found",
    });
  }

  if (user.role !== "teacher") {
    return Response.json({
      status: "error",
      message: "You need to be a teacher to do that",
    });
  }

  const courses = await Course.find({ createdBy: user._id });
  if (!courses) {
    return Response.json({
      status: "error",
      message: "Courses not found",
    });
  }
  return Response.json({
    status: "success",
    message: "Courses found",
    courses,
  });
}
