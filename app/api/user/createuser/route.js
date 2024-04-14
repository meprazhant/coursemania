import { getServerSession } from "next-auth";
import User from "@/app/lib/models/userModel";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  const res = await request.json();
  const session = await getServerSession(authOptions);
  const { userdata } = res;
  if (!session) {
    return Response.json({
      status: "error",
      message: "You need to be signed in to do that 2",
    });
  }

  const { name, email, image } = session.user;
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return Response.json({
      status: "exist",
      message: "User already exists",
    });
  }

  let username = userdata?.username;
  if (!username) {
    username = name.split(" ")[0] + Math.floor(Math.random() * 1000);
  }

  //check if username already exists
  const user2 = await User.findOne({
    username: username,
  });
  if (user2) {
    return Response.json({
      status: "exist",
      message: "Username already exists",
    });
  }

  const newUser = new User({
    name: name,
    email: email,
    username: username,
    image: image,
    role: userdata?.role,
    bio: userdata?.bio,
    password: userdata?.password,
    facebook: userdata?.facebook,
    twitter: userdata?.twitter,
    linkedin: userdata?.linkedin,
  });

  await newUser.save();
  return Response.json({
    status: "success",
    message: "User created successfully",
  });
}
