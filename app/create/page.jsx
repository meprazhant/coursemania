"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CaregoriesData from "../lib/Category";

function page() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [category, setCategory] = useState("UI Design");
  const [description, setDescription] = useState("");
  const [initialTags, setInitialTags] = useState([]);
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [userInput, setUserInput] = useState([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [qrImage, setQrImage] = useState(null);
  function saveTags() {
    const catego = CaregoriesData.find((cat) => cat.title === category);
    setInitialTags(catego?.tags);
  }

  useEffect(() => {
    saveTags();
  }, [category]);

  function getRole() {
    fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "exist") {
          setRole(data.user.role);
          setLoading(false);
        } else {
          router.push("/");
        }
        setLoading(false);
      });
  }

  function checkForm() {
    if (
      userInput.title === "" ||
      userInput.shortDescription === "" ||
      userInput.price === "" ||
      userInput.meetLink === "" ||
      userInput.startDate === "" ||
      userInput.duration === "" ||
      description === "" ||
      category === "" ||
      image === null ||
      qrImage === null
    ) {
      return false;
    }
    return true;
  }

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

  async function createCourse() {
    setUploading(true);
    if (!checkForm()) {
      alert("Please fill all the fields");
      setUploading(false);
      return;
    }
    const imageurl = await uploadtoIbb(image);
    const qr = await uploadtoIbb(qrImage);

    const payment = {
      method: userInput.payment ? userInput.payment : "esewa",
      qrcode: qr,
    };
    const courseData = {
      ...userInput,
      image: imageurl,
      payment,

      tags: initialTags,
      category,
      description,
    };
    fetch("/api/course/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          router.push("/courses/" + data.link);
          setUploading(false);
        } else {
          alert(data.message);
          setUploading(false);
        }
      });
  }

  useEffect(() => {
    getRole();
  }, []);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return router.push("/login");
  if (!loading && role === "student") return router.push("/");
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section
          className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Sell Your Skills
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              And make money while doing it. We are here to help you get
              started.
            </p>
          </div>
        </section>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Sell Your Skills
              </h1>
              <p className="mt-4 leading-relaxed text-gray-500">
                And make money while doing it. We are here to help you get
                started.
              </p>
            </div>
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setUserInput({ ...userInput, title: e.target.value })
                  }
                  required
                  name="title"
                  id="title"
                  placeholder="Title for your course"
                  autoComplete="title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setUserInput({
                      ...userInput,
                      shortDescription: e.target.value,
                    })
                  }
                  name="shortDescription"
                  id="shortDescription"
                  placeholder="Short Description for your course"
                  autoComplete="shortDescription"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  onChange={(e) =>
                    setUserInput({ ...userInput, price: e.target.value })
                  }
                  type="number"
                  required
                  name="price"
                  id="price"
                  placeholder="Price for your course"
                  autoComplete="price"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  required
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  autoComplete="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                >
                  {CaregoriesData.map((category) => (
                    <option key={category.id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <select
                  id="tags"
                  required
                  name="tags"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                >
                  {!!initialTags &&
                    initialTags?.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="meet"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meet Link
                </label>
                <input
                  type="text"
                  name="meet"
                  onChange={(e) =>
                    setUserInput({ ...userInput, meetLink: e.target.value })
                  }
                  id="meet"
                  placeholder="Meet link for your course"
                  autoComplete="meet"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  min={today}
                  required
                  onChange={(e) =>
                    setUserInput({ ...userInput, startDate: e.target.value })
                  }
                  type="date"
                  name="startDate"
                  id="startDate"
                  placeholder="When does your course start?"
                  autoComplete="startDate"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration (in weeks)
                </label>
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setUserInput({ ...userInput, duration: e.target.value })
                  }
                  name="duration"
                  id="duration"
                  placeholder="Duration of your course (in weeks)"
                  autoComplete="duration"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                />
              </div>
            </form>
            <div className="col-span-1 sm:col-span-3 pt-5 pb-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Long Description
              </label>
              <ReactQuill
                theme="snow"
                value={description}
                required
                onChange={setDescription}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              />
            </div>
            <div className="col-span-1 sm:col-span-3 pt-5 pb-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Image
              </label>
              {!image && (
                <div
                  onClick={() => {
                    document.getElementById("coverImage").click();
                  }}
                  className="flex justify-center mt-3 hover:bg-gray-200 duration-200 cursor-pointer items-center border border-dashed rounded-md h-52 w-full border-black"
                >
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-sm text-gray-400">Upload your image</p>
                    <input
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);
                      }}
                      type="file"
                      id="coverImage"
                      required
                      className="hidden"
                      accept="image/,.jpg,.png,.jpeg"
                    />
                  </div>
                </div>
              )}
              {image && (
                <div className="relative flex justify-center mt-3 items-center rounded-md h-52 w-full border-black">
                  <img
                    className="h-52 w-full object-cover"
                    src={URL.createObjectURL(image)}
                    alt="cover"
                  />
                  <div className="flex absolute bottom-2 left-2">
                    <button
                      onClick={() => setImage(null)}
                      className="bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1 sm:col-span-3 pt-5 pb-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Method
              </label>
              <div className="col-span-6 sm:col-span-3">
                <select
                  id="payment"
                  required
                  name="payment"
                  onChange={(e) =>
                    setUserInput({ ...userInput, payment: e.target.value })
                  }
                  autoComplete="payment"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                >
                  <option value="esewa">Esewa</option>
                  <option value="khalti">Khalti</option>
                  <option value="Bank Account">Bank Account</option>
                </select>
              </div>
              {!qrImage && (
                <div
                  onClick={() => {
                    document.getElementById("paymentQr").click();
                  }}
                  className="flex justify-center mt-3 hover:bg-gray-200 duration-200 cursor-pointer items-center border border-dashed rounded-md h-52 w-full border-black"
                >
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-sm text-gray-400">Upload your Qr Code</p>
                    <input
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setQrImage(file);
                      }}
                      type="file"
                      id="paymentQr"
                      required
                      className="hidden"
                      accept="image/,.jpg,.png,.jpeg"
                    />
                  </div>
                </div>
              )}
              {qrImage && (
                <div className="relative flex justify-center mt-3 items-center rounded-md h-52 w-full border-black">
                  <img
                    className="h-52 w-52 object-cover rounded-lg"
                    src={URL.createObjectURL(qrImage)}
                    alt="cover"
                  />
                  <div className="flex absolute bottom-2 left-2">
                    <button
                      onClick={() => setQrImage(null)}
                      className="bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                onClick={createCourse}
                disabled={uploading}
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                {uploading ? "Uploading..." : "Create Course"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default page;
