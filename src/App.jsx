import React, { useState } from 'react';
import './App.css';
import { LibrtyDevKit, NETWORK } from 'librty-dev-kit';

function App() {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState({ status: null, data: null }); // initialize balance state variable
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    try {
      const ldk = new LibrtyDevKit('LDKhack', NETWORK.POLYGON, false, {
        rpc: window.ethereum,
      });
      const connection = ldk.wallet.metamask;
      await connection.connect();
      console.log(await connection.getChainId());
      
      // get connected wallet address and set state
      const accounts = await ldk.wallet.address;
      setAddress(accounts);

      // get token balance and set state
      const tokenBalance = await ldk.indexer.token.getTokenBalance("0x0000000000000000000000000000000000001010", address);
      setBalance({ status: 'success', data: tokenBalance }); // set balance state variable
      console.log(tokenBalance)
      setConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  return (
    <div className="App">
      {connected ? (
        <div>
          <p>Wallet connected!</p>
          <p>ChainID: {JSON.stringify(balance.status)}</p>
          <p>Token Balance: {JSON.stringify(balance.data)}</p>
          <p>Address: {address}</p>
        </div>
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
