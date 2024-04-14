import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/lib/models/userModel";

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
  } else {
    return Response.json({
      status: "exist",
      message: "User found",
      user: user,
    });
  }
}
