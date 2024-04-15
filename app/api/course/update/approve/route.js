import Course from "@/app/lib/models/courseModel";
import Enroll from "@/app/lib/models/enrollModel";

export async function PUT(request) {
  try {
    const res = await request.json();
    const { id, courseId } = res;
    const course = await Course.findById(courseId);
    if (!course) {
      return Response.json({
        status: "error",
        message: "Course not found",
      });
    }
    const enroll = await Enroll.findById(id);
    if (!enroll) {
      return Response.json({
        status: "error",
        message: "Enroll not found",
      });
    }
    enroll.approved = true;
    await enroll.save();
    return Response.json({
      status: "success",
      message: "Enroll updated successfully",
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
