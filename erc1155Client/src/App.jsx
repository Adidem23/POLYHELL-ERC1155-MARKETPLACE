import ComposeAll from "./Components/ComposeAll"
import { Routes, Route } from 'react-router-dom'
import MintNFT from "./Components/MintNFT"
import { ThirdwebSDKProvider } from '@thirdweb-dev/react'
import { ethers } from "ethers"

function App() {

  const ActiveChain = 80001;

  return (
    <>
      <ThirdwebSDKProvider activeChain={ActiveChain} signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()} clientId="5fb26c268ed64fb73d9fb6010411dca9">
        <Routes>
          <Route path="/" Component={ComposeAll} />
          <Route path="/MintNft" Component={MintNFT} />
        </Routes>
      </ThirdwebSDKProvider>
    </>
  )
}

export default App
