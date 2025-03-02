import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Root from "../pages/Root";
import NotFound from "../pages/NotFound";
import Service from "../pages/Service";
import InterviewPage from "@/pages/Interview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Service />,
      },
      {
        path: "/services/interview-process",
        element: <InterviewPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
