import React from "react";
import MStab from "./MStab";
import Enrolled from "./Enrolled";
import Profile from "./Profile";
import MsMyCourse from "./MsMyCourse";

function MSMain({
  enrolled,
  user,
  enrollLoading,
  userLoading,
  myCourseLoading,
  myCourse,
}) {
  const [activeTab, setActiveTab] = React.useState("enrolled");
  return (
    <div className="flex flex-col w-full">
      <MStab
        role={user?.role}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {activeTab === "enrolled" && (
        <Enrolled enrollLoading={enrollLoading} enrolled={enrolled} />
      )}
      {activeTab === "mycourse" && (
        <MsMyCourse myCourseLoading={myCourseLoading} myCourse={myCourse} />
      )}
      {activeTab === "profile" && (
        <Profile userLoading={userLoading} user={user} />
      )}
    </div>
  );
}

export default MSMain;
