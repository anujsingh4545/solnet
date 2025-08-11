import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

const ToolsLayout = () => {

 useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}, []);


  return (
    <div className=' w-full  h-fit flex items-start justify-between gap-[20px] relative min-h-[calc(100dvh-100px)] ' >
      <section className=' hidden h-[calc(100dvh-100px)]  max-h-[800px]  w-full sticky top-0  left-0  lg:flex items-center justify-center ' >
        <section className=" h-fit grid grid-cols-2 items-center gap-[20px] justify-items-end" >
        <img src={banner1} loading="lazy" className="hover-scale shadow-glow bannnerImgStyle " />
        <img src={banner2} loading="lazy" className="hover-scale shadow-glow bannnerImgStyle " />
        <img src={banner3} loading="lazy" className="hover-scale shadow-glow bannnerImgStyle "/>
      </section>
      </section>
      <section className=' w-full h-fit flex items-center justify-center ' >
        <Outlet/>
      </section>
    </div> 
  )
}

export default ToolsLayout