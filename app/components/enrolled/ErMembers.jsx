"use client";
import React, { useEffect } from "react";

function ErMembers({ courseId }) {
  const [members, setMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [approving, setApproving] = React.useState(false);
  async function fetchMembers() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/enrolled/members/${courseId}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data");
    }
    const data = await res.json();
    setMembers(data.members);
    console.log(data.members);

    setLoading(false);
  }

  function approveMember(id) {
    setApproving(true);
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/update/approve`, {
      method: "PUT",
      body: JSON.stringify({ id, courseId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          setApproving(false);
          throw new Error(data.message);
        }
        fetchMembers();
        setApproving(false);
      })
      .catch((error) => {
        console.error(error);
        setApproving(false);
      });
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Members</h2>
        {(members?.length !== 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="dark:bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Payment Image</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((mem) => {
                  let member = mem?.student;
                  return (
                    <tr
                      key={member._id}
                      className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                    >
                      <td className="p-3">
                        <p>{member.name}</p>
                      </td>
                      <td className="p-3">
                        <p>{member.email}</p>
                      </td>
                      <td className="p-3">
                        <img
                          onClick={() => {
                            window.open(mem.paymentProof, "_blank");
                          }}
                          src={mem.paymentProof}
                          alt="payment"
                          className="object-cover w-24 h-24 rounded-md"
                        />
                      </td>
                      <td className="p-3">
                        {(!mem.approved && (
                          <button
                            disabled={approving}
                            onClick={() => approveMember(mem._id)}
                            className="px-3 py-1 font-semibold rounded-md dark:bg-indigo-600 dark:text-gray-50"
                          >
                            {approving ? "Approving..." : "Approve"}
                          </button>
                        )) || (
                          <button className="px-3 py-1 font-semibold rounded-md dark:bg-green-600 dark:text-gray-50">
                            Approved
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )) || (
          <div className="flex justify-center items-center h-[50vh]">
            <p>No members have enrolled till now</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErMembers;
