import Course from "@/app/lib/models/courseModel";
import User from "@/app/lib/models/userModel";
import Notice from "@/app/lib/models/noticeModel";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const res = await request.json();
    const { notice } = res;
    const course = await Course.findById(id);
    if (!course) {
      return Response.json({
        status: "error",
        message: "Course not found",
      });
    }
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
    //check if user is the course creator
    if (course.createdBy.toString() !== user._id.toString()) {
      return Response.json({
        status: "error",
        message: "You can't add notice to this course",
      });
    }
    const newNotice = new Notice({
      notice,
      course: course._id,
    });
    await newNotice.save();

    return Response.json({
      status: "success",
      message: "Notice added successfully",
      data: newNotice,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const course = await Course.findById(id);
    if (!course) {
      return Response.json({
        status: "error",
        message: "Course not found",
      });
    }
    const notices = await Notice.find({ course: id }).sort({ createdAt: -1 });
    return Response.json({
      status: "success",
      message: "Notices found",
      data: notices,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
