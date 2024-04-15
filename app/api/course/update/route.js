import Course from "@/app/lib/models/courseModel";

export async function PUT(request) {
  try {
    const res = await request.json();
    const { id, meetLink, isLive } = res;
    const course = await Course.findById(id);
    if (!course) {
      return Response.json({
        status: "error",
        message: "Course not found",
      });
    }
    course.meetLink = meetLink;
    course.isLive = isLive;
    await course.save();
    return Response.json({
      status: "success",
      message: "Course updated successfully",
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
