import { Sparkles } from "lucide-react";
import React from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import PopularTools from "../components/PopularTools";
import { useNavigate } from "react-router-dom";

const InfoArea = React.memo(() => {

  const navigate = useNavigate();

  const scrollToPopularTools = ()=>{

    const element = document.getElementById("popularTools");
    if(element){
      element.scrollIntoView({behavior:"smooth"});
    }
  }

  return (
    <div className=" w-[100%] h-full flex flex-col items-start justify-center gap-5 ">
      <section className=" border px-3 py-[1px] rounded-full border-border bg-foreground/5 flex items-center gap-1.5 ">
        <Sparkles className="w-[10px] text-primary/70 " />
        <span className="  font-mont text-[10px] leading-[10px] text-primary/70 ">
          Create SOLANA Token 1.0.0
        </span>
      </section>

      <section className=" w-full flex flex-col gap-[15px] md:gap-[20px] ">
        <h1 className=" font-mont flex flex-col text-[28px] md:text-[50px] leading-[40px] md:leading-[65px] text-primary font-bold ">
          Now create Solana Token
          <span className=" text-tertiary ">
            without code<span className=" text-primary">.</span>
          </span>
        </h1>

        <p className=" text-primary/80 w-[90%] md:w-[75%] text-[14px] md:text-[16px]  ">
          Launch your Solana token with an all‑in‑one toolkit for creation, metadata, airdrops, and
          secure transfers.
        </p>

        <div className=" flex items-center gap-[20px]">
          <button onClick={()=> navigate("/create-token")} className="px-[20px] text-[14px] cursor-pointer hover:from-tertiary/80 hover:to-tertiary-foreground/80 transition ease-in-out py-[10px] border border-border rounded-lg text-white font-medium bg-gradient-to-r from-tertiary to-tertiary-foreground">
            Create Token
          </button>
          <button onClick={scrollToPopularTools}  className="px-[20px] text-[14px] cursor-pointer hover:bg-primary/10 py-[10px] border border-border rounded-lg text-primary font-medium bg-secondary ">
            Browse tools
          </button>
        </div>
      </section>
    </div>
  );
});

const BannerArea = React.memo(() => {
  return (
    <div className="hidden w-full h-full lg:flex items-center justify-end  ">
      <section className=" h-fit grid grid-cols-2 items-center gap-[20px] justify-items-end" >
        <img src={banner1} loading="lazy" className="hover-scale shadow-glow bannnerImgStyle " />
        <img src={banner2} loading="lazy" className="hover-scale shadow-glow bannnerImgStyle " />
        <img src={banner3} loading="lazy" className="hover-scale shadow-glow bannnerImgStyle !col-start-2"/>
      </section>
    </div>
  );
});

const Home = () => {
  return (
    <div className=" w-full flex items-center flex-col gap-[60px] md:gap-[100px] ">
      <section className="w-full flex items-start justify-between h-fit md:h-[calc(100dvh-100px)] gap-[30px] ">
        <InfoArea />
        <BannerArea />
      </section>
      <PopularTools/>
    </div>
  );
};

export default Home;
