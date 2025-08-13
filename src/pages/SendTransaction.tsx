import { Loader } from "lucide-react";
import { useState } from "react";
import ToolsContainer from "../constants/ToolsContainer";
import TextContainer from "../constants/ui/TextContainer";
import Button from "../constants/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../states/redux/store";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { fetchUserBalance } from "../states/redux/thunk/userBalanceTHunks";
import { toast } from "sonner";
import { addError, checkErrorExists, removeError, removeErrorByPrefix } from "../states/redux/slices/userDataSlice";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

interface TransactionData {
  publicKey: string;
  amount: string | undefined;
}

const SendTransaction = () => {
  const { userBalance, userBalanceError, userBalanceLoading, errors } = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch<AppDispatch>();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<TransactionData>({
    publicKey: "",
    amount: "",
  });

  const errorExists = useSelector((state: RootState) => checkErrorExists(state)("transaction"));

  function isValidPublicKey(key: string): boolean {
    try {
      const pubkey = new PublicKey(key);
      return PublicKey.isOnCurve(pubkey);
    } catch (e) {
      return false;
    }
  }

  async function fetchUserAccountBalance() {
    try {
      if (publicKey && connection) {
        dispatch(fetchUserBalance({ publicKey, connection }));
      } else toast.error("Wallet not connected!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }

  function updateTransactionData(value: string, mode: string) {
    if (errorExists) dispatch(removeErrorByPrefix("transaction"));

    if (!value) {
      setTransactionData((prev) => ({ ...prev, [mode]: "" }));
      return;
    }

    if (mode === "publicKey") {
      if (!isValidPublicKey(value)) dispatch(addError({ key: "transaction_to", message: "Invalid public key" }));

      setTransactionData((prev) => ({ ...prev, [mode]: value }));
    } else {
      const numValue = Number(value);
      if (numValue < 1 || numValue > userBalance) {
        dispatch(
          addError({
            key: "transaction_amount",
            message: `Please keep range in 0 | ${userBalance}`,
          })
        );
        return;
      }
      setTransactionData((prev) => ({ ...prev, [mode]: value }));
    }
  }

  async function initateSendTransaction() {
    try {
      if (errorExists) return;
      setIsLoading(true);

      if (publicKey && connection) {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(transactionData.publicKey),
            lamports: Number(transactionData.amount) * 1e9,
          })
        );

        await sendTransaction(transaction, connection);

        toast.success("Transaction initiated");
        setTransactionData({publicKey:"", amount:""})
      } else {
        toast.error("Wallet not connected!");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-center  flex-col gap-[30px] ">
      <section className=" w-full  flex items-center justify-center gap-[10px] font-mont text-[20px] md:text-[25px] font-semibold">
        <h5 className=" text-primary   ">Current Balance : </h5>
        <span className=" text-tertiary ">{userBalanceLoading ? "loading..." : userBalanceError ? "error" : userBalance?.toFixed(2) + " SOL"}</span>
        <button onClick={fetchUserAccountBalance} className=" bg-border rounded-full p-[5px] cursor-pointer flex items-center justify-center min-w-[35px] min-h-[35px] ">
          <Loader className={` text-primary w-[20px] ${userBalanceLoading ? "animate-spin" : ""}`} />
        </button>
      </section>

      <ToolsContainer className="gap-[40px]">
        <section className=" w-full flex flex-col items-center justify-center gap-[20px]">
          <TextContainer
            id="transaction_to"
            label="Public Key"
            value={transactionData.publicKey}
            placeholder={"Enter recievers public key"}
            onFocus={() => dispatch(removeError("transaction_to"))}
            onChange={(e) => updateTransactionData(e.target.value, "publicKey")}
            errorMessage={errors["transaction_to"] && errors["transaction_to"]?.message}
          />
          <TextContainer
            id="transaction_amount"
            label="Amount"
            value={transactionData.amount}
            placeholder={"Enter amount"}
            onFocus={() => dispatch(removeError("transaction_amount"))}
            type="number"
            min={0}
            max={100}
            onChange={(e) => updateTransactionData(e.target.value, "amount")}
            errorMessage={errors["transaction_amount"] && errors["transaction_amount"]?.message}
          />
        </section>
        <Button disabled={!transactionData.publicKey || !transactionData.amount || Boolean(errorExists) || isLoading} size={"full"} onClick={initateSendTransaction}>
          {isLoading ? "processing..." : "Send SOL"}
        </Button>
      </ToolsContainer>
    </div>
  );
};

export default SendTransaction;
