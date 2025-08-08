import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className=" w-full min-h-[100dvh] border-2 flex items-start justify-between flex-col gap-5 relative bg-background ">
      <Header />
      <section className=" px-[80px] w-full ">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default AppLayout;
