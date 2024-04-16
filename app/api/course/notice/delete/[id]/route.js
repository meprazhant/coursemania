import Notice from "@/app/lib/models/noticeModel";
import { authOptions } from "../../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/app/lib/models/userModel";
import Course from "@/app/lib/models/courseModel";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const notice = await Notice.findById(id);
    if (!notice) {
      return Response.json({
        status: "error",
        message: "Notice not found",
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
    const course = await Course.findById(notice.course);
    if (!course) {
      return Response.json({
        status: "error",
        message: "Course not found",
      });
    }

    //check if user is the course creator
    if (course.createdBy.toString() !== user._id.toString()) {
      return Response.json({
        status: "error",
        message: "You can't delete this notice",
      });
    }
    const deleteNotice = await Notice.findByIdAndDelete(id);
    if (!deleteNotice) {
      return Response.json({
        status: "error",
        message: "Notice not found",
      });
    }

    return Response.json({
      status: "success",
      message: "Notice deleted successfully",
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}

export async function GET(request, { params }) {
  return Response.json({
    status: "error",
    message: "Method not allowed",
  });
}
