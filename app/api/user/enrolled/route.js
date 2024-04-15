import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/lib/models/userModel";
import Enroll from "@/app/lib/models/enrollModel";
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
      status: "error",
      message: "User not found",
    });
  }

  const userEnrolled = await Enroll.find({
    student: user._id,
  }).populate("course", "title shortDescription image category tags");

  return Response.json({
    status: "success",
    message: " User enrolled courses found",
    enrolled: userEnrolled,
  });
}
