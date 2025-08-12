import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./states/redux/store.ts";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import ThemeModeManager from "./states/ThemeModeManager.tsx";
import Toaster from "./constants/ui/Toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/q4TmjMWJ4b9xYVD_3P9MFBV9ZmpYulYr">
      <WalletProvider autoConnect wallets={[]}>
        <WalletModalProvider>
          <ThemeModeManager>
            <Toaster />
            <Provider store={store}>
              <App />
            </Provider>
          </ThemeModeManager>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </StrictMode>
);
