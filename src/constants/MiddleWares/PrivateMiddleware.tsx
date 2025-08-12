import { useWallet } from '@solana/wallet-adapter-react';
import React, { type ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateMiddlewareProps {
    children: ReactNode;
}

const PrivateMiddleware: React.FC<PrivateMiddlewareProps> = ({ children }) => {
    const { connected, connecting, wallet } = useWallet();
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // If wallet adapter is still initializing, wait
        if (connecting || (!connected && wallet && wallet.readyState === 'Installed')) {
            setChecking(true);
            return;
        }
        
        // Once it's decided, stop checking
        setChecking(false);

        // if (!connected) {
        //     navigate('/');
        // }
    }, [connected, connecting, wallet, navigate]);

    if (checking) return <></>;
    return <>{children}</>;
};

export default PrivateMiddleware;
