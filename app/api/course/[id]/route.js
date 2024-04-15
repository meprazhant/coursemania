import Course from "@/app/lib/models/courseModel";
import User from "@/app/lib/models/userModel";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const course = await Course.findById(id).populate("createdBy");
    if (!course) {
      return Response.json({
        status: "error",
        message: "Course not found",
      });
    }
    return Response.json({
      status: "success",
      message: "Course found",
      course,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
