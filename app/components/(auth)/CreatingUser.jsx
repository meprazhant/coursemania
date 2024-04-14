"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CreatingUser({ session }) {
  const [userdata, setUserData] = useState({});
  const [creating, setCreating] = useState(false);

  function handleInput(e) {
    setUserData({
      ...userdata,
      [e.target.id]: e.target.value,
    });
  }

  function generateUsername() {
    const username =
      session.user.name.split(" ")[0] + Math.floor(Math.random() * 1000);
    setUserData({
      ...userdata,
      username,
    });
  }

  useEffect(() => {
    generateUsername();
  }, []);

  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    setCreating(true);
    fetch("/api/user/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userdata,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("User created successfully");
          router.push("/my-space");
          setCreating(false);
        } else {
          alert("User creation failed");
          setCreating(false);
        }
      });
  }

  return (
    <section className="p-6">
      <form
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Inormation</p>
            <p className="text-xs">Some of the fields are read-only.</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="firstname" className="text-sm">
                First name
              </label>
              <input
                value={session.user.name.split(" ")[0]}
                id="firstname"
                type="text"
                readOnly
                placeholder="First name"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                Last name
              </label>
              <input
                value={session.user.name.split(" ")[1]}
                id="lastname"
                type="text"
                readOnly
                placeholder="Last name"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                value={session.user.email}
                id="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Profile</p>
            <p className="text-xs">
              Fill in the fields below to complete your profile.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <input
                onChange={(e) => handleInput(e)}
                defaultValue={userdata.username}
                id="username"
                type="text"
                placeholder="Username"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="facebook" className="text-sm">
                Facebook
              </label>
              <input
                onChange={(e) => handleInput(e)}
                id="facebook"
                type="text"
                placeholder="https://"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="twitter" className="text-sm">
                Twitter
              </label>
              <input
                onChange={(e) => handleInput(e)}
                id="twitter"
                type="text"
                placeholder="https://"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="linkedin" className="text-sm">
                Linkedin
              </label>
              <input
                onChange={(e) => handleInput(e)}
                id="linkedin"
                type="text"
                placeholder="https://"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">
                Bio
              </label>
              <textarea
                onChange={(e) => handleInput(e)}
                id="bio"
                placeholder=""
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              ></textarea>
            </div>
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Using</p>
            <p className="text-xs">How are you using Academix?</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full ">
              <label htmlFor="role" className="text-sm">
                Role
              </label>
              <select
                onChange={(e) => handleInput(e)}
                id="role"
                className="w-full mt-5 rounded-md focus:ring focus:ring-opacity-75 p-2 bg-gray-200 outline-0 border-0 focus:dark:ring-indigo-600 "
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>
        </fieldset>

        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className={`w-full p-3 bg-[#3F6745] text-white rounded-md ${
            creating ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {creating ? "Creating..." : "Create Account"}
        </button>
      </form>
    </section>
  );
}

export default CreatingUser;
