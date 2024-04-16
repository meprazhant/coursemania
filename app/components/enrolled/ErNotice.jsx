"use client";
import React from "react";
import moment from "moment";

function ErNotice({ courseId, isTeacher, teacher, createdAt }) {
  const [notice, setNotice] = React.useState([]);
  const [posting, setPosting] = React.useState(false);
  const [noticeText, setNoticeText] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState(false);

  function fetchNotice() {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/notice/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          throw new Error(data.message);
        }
        setLoading(false);
        setNotice(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  React.useEffect(() => {
    fetchNotice();
  }, []);

  function createNotice() {
    if (!!noticeText) {
      setPosting(true);
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/notice/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notice: noticeText,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "error") {
            setPosting(false);
            throw new Error(data.message);
          }
          //add the notice to the top of the list
          setNotice([data.data, ...notice]);
          setPosting(false);
          setNoticeText("");
        })
        .catch((error) => {
          setPosting(false);
          console.error(error);
        });
    } else {
      alert("Notice can't be empty");
    }
  }

  function deleteNotice(noticeId) {
    setDeleting(true);
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/course/notice/delete/${noticeId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          setDeleting(false);
          throw new Error(data.message);
        }
        setNotice(notice.filter((n) => n._id !== noticeId));
        setDeleting(false);
      })
      .catch((error) => {
        console.error(error);
        setDeleting(false);
      });
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="flex flex-col gap-3 md:w-2/3 w-full p-5">
        <h1 className="text-2xl font-bold">Notice Board</h1>
        <div className="flex flex-col gap-3">
          {isTeacher && (
            <div className="flex bg-gray-200 p-3 rounded-md">
              <input
                type="text"
                onChange={(e) => setNoticeText(e.target.value)}
                defaultValue={noticeText}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createNotice();
                  }
                }}
                placeholder="Create a notice"
                className="w-[80%] bg-transparent outline-none"
              />
              <button
                onClick={createNotice}
                className="bg-blue-500 border duration-300 hover:bg-transparent hover:border-blue-500 hover:text-blue-500 text-white p-2 rounded-md "
              >
                {posting ? "Posting..." : "Post Notice"}
              </button>
            </div>
          )}
          {loading && <p>Loading...</p>}
          {!loading && notice?.length === 0 && <p>No notice available</p>}
          {notice?.map((notice) => (
            <div
              key={notice?._id}
              className="flex w-full gap-2 bg-gray-200 p-3 rounded-md"
            >
              <div className="flex">
                <img
                  src={teacher?.image}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <div className="flex gap-3 items-center">
                    <p className="text-md font-bold">
                      {teacher?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      ( {moment(notice.createdAt).fromNow()})
                    </p>
                  </div>
                  {isTeacher && (
                    <button
                      onClick={() => deleteNotice(notice._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="flex">
                  <p>{notice.notice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ErNotice;
