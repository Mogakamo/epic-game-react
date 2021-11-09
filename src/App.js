import React, {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectCharacter from "./Components/SelectCharacter"

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  /**
   * state variable that we use to store our user's public wallet
   */
  const [currentAccount, setCurrentAccount] = useState(null)

  const [characterNFT, setCharacterNFT] = useState(null)
  // creating a new action that will run the component load
  // Actions
  const checkIfWalletIsConnected = async () => {
    
    // First, make sure we have access to the window.ethereum
    try {
    const {ethereum} = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask!')
      return;
    } else {
      console.log('We have the ethereum object', ethereum);

      /**
       * Check if we are authorised to access the user's wallet
       */
      const accounts =  await ethereum.request({ method: 'eth_accounts'})

      // User can have multiple authorised user accounts, we grab the first one

      if (accounts.length !== 0) {
        const account =  accounts[0]
        console.log('Found an authorised account: ', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorised account found')
      }
    }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const renderContent = () => {
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
        <img
          src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
          alt="Monty Python Gif"
        />
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWalletAction}
        >
          Connect Wallet To Get Started
        </button>
      </div>
      )
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
          {/*Re*/}
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
