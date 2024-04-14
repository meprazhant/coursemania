"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

const providers = [
  {
    id: "google",
    name: "Google",
    icon: <FaGoogle />,
    availabe: true,
  },
  {
    id: "github",
    name: "GitHub",
    icon: <FaGithub />,
    availabe: false,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <FaFacebookF />,
    availabe: false,
  },
];

function page() {
  const url = process.env.NEXT_PUBLIC_URL + "/auth";
  const [loading, setLoading] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTip, setToolTip] = useState({ x: 0, y: 0, text: "" });

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (session) {
    return <div>Signed in as {session.user.email} </div>;
  }

  const handleSignIn = async (provider) => {
    setLoading(true);
    await signIn(provider, {
      callbackUrl: url,
    });
  };

  function onHoverfunction(e, availabe) {
    // get mouse cursor position
    const x = e.clientX;

    const y = e.clientY;
    console.log(x, y);
    // set tooltip position
    if (availabe === false) {
      setToolTip({ x, y, text: "This login method is not supported yet" });
      setShowToolTip(true);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      {showToolTip && (
        <div
          className={`fixed 
          slideTop
            bottom-[10px]
            left-[5px]
          z-50 rounded-md p-2 `}
        >
          <p>
            This login method is not supported yet. Please use another method.{" "}
          </p>
        </div>
      )}
      <div className="md:w-2/3 w-full max-w-md overflow-hidden p-4 relative rounded-md shadow sm:p-8  ">
        {loading && (
          <div className="absolute top-0 left-0 h-full w-full backdrop-blur-md flex justify-center items-center">
            <div class="w-12 h-12 border-2  border-black rounded-full loader"></div>
          </div>
        )}
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Start with your account
        </h2>
        <p className="text-sm text-center ">
          Login with your social media account, it's easy and fast.
        </p>
        <div className="my-6 space-y-4">
          {providers.map((provider) => (
            <button
              onMouseEnter={(e) => onHoverfunction(e, provider.availabe)}
              onMouseLeave={() => {
                setShowToolTip(false);
                setToolTip({ x: 0, y: 0, text: "" });
              }}
              onClick={() => handleSignIn(provider.id)}
              key={provider.id}
              aria-label={`Login with ${provider.name}`}
              type="button"
              className={`flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1
                ${
                  provider.availabe
                    ? "hover:bg-gray-100  bg-white  border-gray-300  focus:ring-indigo-400 dark:focus:ring-indigo-400"
                    : " focus:dark:ring-indigo-400 hover:bg-gray-100  bg-gray-100  border-gray-300   cursor-not-allowed"
                }
              `}
            >
              {provider.icon}

              <p>Login with {provider.name}</p>
            </button>
            //  focus:dark:ring-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
