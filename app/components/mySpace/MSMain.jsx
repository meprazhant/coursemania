import React from "react";
import MStab from "./MStab";
import Enrolled from "./Enrolled";
import Profile from "./Profile";

function MSMain({ enrolled, user, enrollLoading, userLoading }) {
  const [activeTab, setActiveTab] = React.useState("notice");
  return (
    <div className="flex flex-col w-full">
      <MStab setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === "notice" && <h1>Notice</h1>}
      {activeTab === "enrolled" && (
        <Enrolled enrollLoading={enrollLoading} enrolled={enrolled} />
      )}
      {activeTab === "profile" && (
        <Profile userLoading={userLoading} user={user} />
      )}
    </div>
  );
}

export default MSMain;
