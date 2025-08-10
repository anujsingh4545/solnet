import { Database, Gift, Key, PlusCircle, Send } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Button from "../constants/ui/Button";

const TOOLS_INFO = [
  {
    title: "Create Token",
    desc: "Easily create your own Solana token without coding.",
    Icon: PlusCircle,
  },
  {
    title: "Token Metadata",
    desc: "Manage and update your token's metadata.",
    Icon: Database,
  },
  {
    title: "Airdrop",
    desc: "Distribute tokens to multiple users effortlessly.",
    Icon: Gift,
  },
  {
    title: "Send Transaction",
    desc: "Send transactions securely and quickly.",
    Icon: Send,
  },
  {
    title: "Get your ATA address",
    desc: "Find your ATA address with only few steps.",
    Icon: Key,
  },
];

interface toolsDisplayBoxProps {
  data: {
    title: string;
    desc: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  };
}

const ToolsDisplayBox: React.FC<toolsDisplayBoxProps> = ({ data }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      className=" w-full col-span-1 border border-border bg-secondary/70 rounded-lg hover:bg-secondary h-[165px] p-[20px] flex flex-col items-start justify-between "
    >
      <section className=" flex flex-col w-full gap-[5px] ">
        <div className=" flex gap-[10px] items-center justify-start ">
          <data.Icon className="text-tertiary w-[20px]" />
          <h3 className=" text-primary text-[20px] font-medium ">{data?.title}</h3>
        </div>
        <p className=" text-primary/80 text-[14px] ">{data?.desc}</p>
      </section>

      <section className=" flex items-center justify-end w-full ">
        <Button>
          Use this &nbsp; →
        </Button>
      </section>
    </motion.div>
  );
};

const PopularTools = () => {
  return (
    <div className=" w-full flex flex-col gap-[70px] ">
      <section className=" flex flex-col gap-[10px] w-full items-start ">
        <h2 className=" text-[40px] font-bold font-mont text-primary ">Solnet Powerful Tools</h2>
        <p className=" w-[60%] text-primary/80 text-[16px] ">
          Start working with Solana Token Creator. It allows you to create Solana tokens by
          creating, deploying, airdropping, transferring, and updating metadata.
        </p>
      </section>

      <section className=" w-full grid grid-cols-3 gap-[30px] ">
        {TOOLS_INFO.map((tool, index) => (
          <ToolsDisplayBox key={index} data={tool} />
        ))}
      </section>
    </div>
  );
};

export default PopularTools;
