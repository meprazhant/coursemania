import Course from "@/app/lib/models/courseModel";

export async function GET(request, { params }) {
  const { query } = params;
  if (!query) {
    return Response.json({
      status: "error",
      message: "No query provided",
    });
  }
  try {
    const courses = await Course.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { shortDescription: { $regex: query, $options: "i" } },
      ],
    })
      .populate("createdBy")
      .populate("students", "email");
    if (!courses) {
      return Response.json({
        status: "error",
        message: "Course not found",
      });
    }
    return Response.json({
      status: "success",
      message: "Course found",
      courses,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
