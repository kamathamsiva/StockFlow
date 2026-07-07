import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />

      <main className="container px-4 py-4">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
