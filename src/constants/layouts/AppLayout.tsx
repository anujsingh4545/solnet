import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className=" w-full min-h-[100dvh] flex items-start justify-between flex-col gap-5 relative bg-background ">
      <Header />
      <section className=" px-5 md:px-[80px] w-full ">
        <Outlet />
      </section>
      <section className=" mt-[40px] md:mt-[80px] w-full " >
        <Footer />
      </section> 
    </div>
  );
};

export default AppLayout;
