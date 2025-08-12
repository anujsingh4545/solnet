import React from "react";
import ToolsContainer from "../constants/ToolsContainer";
import Button from "../constants/ui/Button";
import TextContainer from "../constants/ui/TextContainer";
import TextAreaContainer from "../constants/ui/TextAreaContainer";

const CreateToken = () => {
  return (
    <ToolsContainer>
      <section className=" w-full flex flex-col items-center justify-center gap-[20px] ">
        <TextContainer label={"Name"} placeholder={"Token name"} />
        <TextContainer label={"Symbol"} placeholder={"Token symbol"} />
        <TextContainer label={"Decimals"} placeholder={"Token decimals"} />
        <TextContainer label={"Amount"} placeholder={"Token amount"} type="number" />
        <TextContainer label={"Image url"} placeholder={"Token image url"} />
        <TextAreaContainer label={"Description"} placeholder={"Token name"} rows={3} />
      </section>
      <Button size={"full"} variant={"primary"}>
        Create Token 
      </Button>
    </ToolsContainer>
  );
};

export default CreateToken;
