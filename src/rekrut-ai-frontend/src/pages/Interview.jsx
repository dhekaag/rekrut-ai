import React from "react";
import InterviewProcess from "../components/InterviewProcess";
import FooterServices from "@/components/FooterService";

const InterviewPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <InterviewProcess />
      </div>
      <FooterServices />
    </>
  );
};

export default InterviewPage;
