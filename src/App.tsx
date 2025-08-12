import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./constants/layouts/AppLayout";
import Home from "./pages/Home";
import ToolsLayout from "./constants/layouts/ToolsLayout";
import CreateToken from "./pages/CreateToken";
import TokenMetadata from "./pages/TokenMetadata";
import Airdrop from "./pages/Airdrop";
import SendTransaction from "./pages/SendTransaction";
import AtaAddress from "./pages/AtaAddress";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import PrivateMiddleware from "./constants/MiddleWares/PrivateMiddleware";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./states/redux/store";
import { useEffect } from "react";
import { fetchUserBalance } from "./states/redux/thunk/userBalanceTHunks";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          element: (
            <PrivateMiddleware>
              <ToolsLayout />
            </PrivateMiddleware>
          ),
          children: [
            {
              path: "/create-token",
              element: <CreateToken />,
            },
            {
              path: "/token-metadata",
              element: <TokenMetadata />,
            },
            {
              path: "/airdrop",
              element: <Airdrop />,
            },
            {
              path: "/send-transaction",
              element: <SendTransaction />,
            },
            {
              path: "/ata-address",
              element: <AtaAddress />,
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    if (publicKey && connection) {
      dispatch(fetchUserBalance({ publicKey, connection }));

      console.log("sxdcfvgbvfds", publicKey, connection);
    }
  }, [publicKey, connection, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
