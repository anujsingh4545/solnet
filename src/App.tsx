import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./constants/layouts/AppLayout";
import Home from "./pages/Home";
import ThemeModeManager from "./states/ThemeModeManager";
import ToolsLayout from "./constants/layouts/ToolsLayout";
import  CreateToken from "./pages/CreateToken";
import TokenMetadata from "./pages/TokenMetadata";
import Airdrop from "./pages/Airdrop";
import SendTransaction from "./pages/SendTransaction";
import AtaAddress from "./pages/AtaAddress";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import PrivateMiddleware from "./constants/MiddleWares/PrivateMiddleware";


function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          element: <PrivateMiddleware><ToolsLayout /></PrivateMiddleware>,
          children: [
            {
              path: "/create-token",
              element: <CreateToken/>,
            },
            {
              path: "/token-metadata",
              element: <TokenMetadata/>,
            },
            {
              path: "/airdrop",
              element: <Airdrop/>,
            },
            {
              path: "/send-transaction",
              element: <SendTransaction/>,
            },
            {
              path: "/ata-address",
              element: <AtaAddress/>,
            },
          ],
        },
      ],
    },
  ]);
  
  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/q4TmjMWJ4b9xYVD_3P9MFBV9ZmpYulYr" >
      <WalletProvider autoConnect wallets={[]} >
        <WalletModalProvider>
          <ThemeModeManager>
            <RouterProvider router={router} />
          </ThemeModeManager>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
