import React from 'react';
import NeonButton from './NeonButton';

const Login: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl mb-8">Login to CasTLive</h1>
            <NeonButton color="cyan">Login with Cosmic ID</NeonButton>
        </div>
    );
}

export default Login;
