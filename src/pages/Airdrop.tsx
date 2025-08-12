import { useState } from "react";
import ToolsContainer from "../constants/ToolsContainer";
import Button from "../constants/ui/Button";
import TextContainer from "../constants/ui/TextContainer";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../states/redux/store";
import { addError, checkErrorExists, removeError } from "../states/redux/slices/userDataSlice";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { fetchUserBalance } from "../states/redux/thunk/userBalanceTHunks";

const Airdrop = () => {
  
  const [requiredBalance, setRequiredBalance] = useState<
    string | number | readonly string[] | undefined
  >("");

  const { userBalance, userBalanceError, userBalanceLoading, errors } = useSelector(
    (state: RootState) => state.userData
  );
  const dispatch = useDispatch<AppDispatch>();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorExists = useSelector((state: RootState) => checkErrorExists(state)("airdrop"));

  function changeRequiredBalance(value: string) {
    if (!value) {
      setRequiredBalance("");
      return;
    }
    const numValue = Number(value);
    if (numValue < 0 || numValue > 100) {
      dispatch(addError({ key: "airdrop_amount", message: "Please keep range in 0 | 100" }));
      return;
    }
    if (errors["airdrop_amount"]) dispatch(removeError("airdrop_amount"));
    setRequiredBalance(numValue);
  }

  async function requestAirdrop() {
    try {
      setIsLoading(true);
      if (publicKey && requiredBalance) {
        await connection.requestAirdrop(publicKey, Number(requiredBalance) * LAMPORTS_PER_SOL);
        setRequiredBalance("");
        toast.success("Airdrop request sucessfully initiated!");
      } else {
        toast.error("Account not connected!");
      }
    } catch (error) {
      console.error("Airdrop failed:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  function fetchUserAccountBalance(){

    if(publicKey && connection){
      dispatch(fetchUserBalance({publicKey, connection}));
    }
    else{
      toast.error("Account not connected!");
    }
  }

  return (
    <div className="w-full flex items-center justify-center  flex-col gap-[30px] ">
      <section className=" w-full  flex items-center justify-center gap-[10px] font-mont text-[20px] md:text-[25px] font-semibold">
        <h5 className=" text-primary   ">Current Balance : </h5>
        <span className=" text-tertiary ">
          {userBalanceLoading ? "loading..." : userBalanceError ? "error" : userBalance?.toFixed(2) + " SOL"}
        </span>
        <button  onClick={fetchUserAccountBalance} className=" bg-border rounded-full p-[5px] cursor-pointer flex items-center justify-center min-w-[35px] min-h-[35px] " >
          <LoaderCircle className={` text-primary w-[20px] ${userBalanceLoading ? "animate-spin" : "" }`} />
        </button>
      </section>

      <ToolsContainer className="gap-[40px]">
        <section className=" w-full flex flex-col items-center justify-center gap-[20px]">
          <TextContainer
            id="airdrop_amount"
            label="Amount"
            value={requiredBalance}
            placeholder={"Enter amount"}
            onFocus={() => dispatch(removeError("airdrop_amount"))}
            type="number"
            min={0}
            max={100}
            onChange={(e) => changeRequiredBalance(e.target.value)}
            errorMessage={errors["airdrop_amount"] && errors["airdrop_amount"]?.message}
          />
        </section>
        <Button
          disabled={!requiredBalance || Boolean(errorExists) || isLoading}
          size={"full"}
          onClick={requestAirdrop}
        >
          {isLoading ? "processing..." : "Airdrop SOL"}
        </Button>
      </ToolsContainer>
    </div>
  );
};

export default Airdrop;
