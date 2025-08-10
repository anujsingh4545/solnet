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
          element: <ToolsLayout />,
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
    <ThemeModeManager>
      <RouterProvider router={router} />
    </ThemeModeManager>
  );
}

export default App;
