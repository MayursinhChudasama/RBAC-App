import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
        {/* <div>WELCOME!</div> */}
        <Outlet />
      </div>
    </>
  );
}
