import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  const location = useLocation();
  const navbarPaths = ["/", "/about"];
  const showNavbar = navbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
