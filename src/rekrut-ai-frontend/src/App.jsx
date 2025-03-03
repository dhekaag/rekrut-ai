import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryProvider } from "./providers/QueryProvider";
import { ReduxProvider } from "./providers/ReduxProvider";
import { useDispatch } from "react-redux";
import { resetInterview } from "./features/slices/interviewSlice";
import Cookies from "js-cookie";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const hasSessionStorage = sessionStorage.getItem("app_initialized");

    if (!hasSessionStorage) {
      sessionStorage.setItem("app_initialized", "true");
    } else {
      Cookies.remove("interview_session");
      Cookies.remove("interview_answers");
      Cookies.remove("selected_job_topics");
      dispatch(resetInterview());

      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/services"
      ) {
        window.location.href = "/";
      }
    }

    const handleBeforeUnload = () => {
      Cookies.remove("interview_session");
      Cookies.remove("interview_answers");
      Cookies.remove("selected_job_topics");
      dispatch(resetInterview());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <QueryProvider>
      <ReduxProvider>
        <AppContent />
      </ReduxProvider>
    </QueryProvider>
  );
}

export default App;
