"use client";
import React from "react";
import { motion } from "framer-motion";
import { AiFillFileAdd } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function EnrollCourse({ session, courseData, showModel }) {
  const [paymentProof, setPaymentProof] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

  async function uploadtoIbb(file) {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=" + process.env.NEXT_PUBLIC_IMGBB,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.url;
  }

  async function handleUpload() {
    setUploading(true);
    if (!paymentProof) {
      setUploading(false);
      return alert("Please upload the payment proof");
    }
    const imageurl = await uploadtoIbb(paymentProof);
    if (!imageurl) {
      setUploading(false);
      return alert("Failed to upload image");
    }
    const res = await fetch("/api/course/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: courseData._id,
        paymentProof: imageurl,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      alert(data.message);
      showModel(false);
      router.refresh();
    } else {
      setUploading(false);
      alert(data.message);
    }
  }

  function signInandRedirect() {
    signIn("google", { callbackUrl: "/courses/" + courseData._id });
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 top-0 left-0 h-screen w-full flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: "-100px", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100px", opacity: 0 }}
        className="bg-white p-5 rounded-md shadow-lg max-h-[90vh] overflow-y-auto  sm:w-auto"
      >
        {!!session && (
          <div className="flex flex-col max-w-3xl p-2 space-y-4 sm:p-4 dark:bg-gray-50 dark:text-gray-800">
            <h2 className="text-xl font-semibold">Enroll this course</h2>
            <ul className="flex flex-col divide-y dark:divide-gray-300">
              <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src={courseData?.image}
                    alt="Course image"
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                          {courseData?.title}
                        </h3>
                        <p className="text-sm dark:text-gray-600">
                          {courseData?.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-sm divide-x">
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                      >
                        <img
                          src={courseData?.createdBy?.image}
                          className="w-8 h-8 fill-current rounded-full"
                        />
                        <span>{courseData?.createdBy?.name} </span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="space-y-1 text-right">
              <p>
                Total amount:
                <span className="font-semibold"> NPR. {courseData?.price}</span>
              </p>
            </div>
            <div className="flex h-[1px] bg-red-400 rounded-full w-full "></div>

            <div className="space-y-1">
              <p className="font-bold">Payment Option</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2 font-bold">
                QrCode{"  "}
                <span className="text-xs opacity-75 font-normal">
                  (scan the qr code and pay the amount to enroll the course )
                </span>
              </label>
              <img
                src={courseData?.payment[0]?.qrcode}
                alt="payment"
                className="
            object-contain h-52 w-full
            "
              />
            </div>
            <div className="space-y-1">
              <p className="font-bold">How would you like to pay with?</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  className="form-radio"
                  value="esewa"
                />
                <span>eSewa</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  className="form-radio"
                  value="khalti"
                />
                <span>Khalti</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  className="form-radio"
                  value="cash"
                />
                <span>Bank</span>
              </label>
            </div>
            <div className="flex space-x-2 h-52 w-full border border-dashed border-black rounded-2xl hover:bg-gray-200 duration-200">
              {(!paymentProof && (
                <div
                  className="flex items-center h-full  justify-center w-full"
                  onClick={() =>
                    document.getElementById("paymentProof").click()
                  }
                >
                  <AiFillFileAdd size={32} />
                  <p>Upload payment Screenshot</p>
                </div>
              )) || (
                <div
                  className="flex items-center h-full  justify-center w-full"
                  onClick={() => setPaymentProof(null)}
                >
                  <img
                    src={URL.createObjectURL(paymentProof)}
                    alt="payment proof"
                    className="object-contain h-full w-full"
                  />
                </div>
              )}
              <input
                onChange={(e) => setPaymentProof(e.target.files[0])}
                type="file"
                className="hidden"
                id="paymentProof"
                accept="image/,.jpg,.png,.jpeg"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => showModel(false)}
                type="button"
                className="px-6 py-2 border rounded-md dark:border-indigo-600"
              >
                Cancel
              </button>
              <button
                disabled={uploading}
                onClick={() => {
                  handleUpload();
                }}
                type="button"
                className="px-6 py-2 border rounded-md dark:bg-indigo-600 dark:text-gray-50 dark:border-indigo-600"
              >
                {!uploading && (
                  <p>
                    <span className="sr-only sm:not-sr-only">Continue to </span>
                    Checkout
                  </p>
                )}
                {uploading && (
                  <p>
                    <span className="sr-only sm:not-sr-only">Uploading </span>
                    Payment Proof
                  </p>
                )}
              </button>
            </div>
          </div>
        )}
        {!session && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl font-semibold">Enroll this course</h2>
            <ul className="flex flex-col divide-y dark:divide-gray-300">
              <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src={courseData?.image}
                    alt="Course image"
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                          {courseData?.title}
                        </h3>
                        <p className="text-sm dark:text-gray-600">
                          {courseData?.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-sm divide-x">
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                      >
                        <img
                          src={courseData?.createdBy?.image}
                          className="w-8 h-8 fill-current rounded-full"
                        />
                        <span>{courseData?.createdBy?.name} </span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="space-y-1 text-right">
              <p>
                Total amount:
                <span className="font-semibold"> NPR. {courseData?.price}</span>
              </p>
            </div>
            <div className="flex h-[1px] bg-red-400 rounded-full w-full "></div>
            <button
              onClick={() => {
                signInandRedirect();
              }}
              className="p-3 bg-blue-500 text-white rounded-md"
            >
              Login to enroll
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default EnrollCourse;
