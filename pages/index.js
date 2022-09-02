import { ConnectWallet, useAddress, useTokenDrop, useTokenBalance, useTokenSupply, useClaimToken } from "@thirdweb-dev/react";
import { useState } from "react"

export default function Home() {

  const address = useAddress()
  const tokenDrop = useTokenDrop("0x26fdb8d2FCFE06435aCb732bC26DaE4fce733398")
  const {data: tokenSupply} = useTokenSupply(tokenDrop)
  const {data: tokenBalance} = useTokenBalance(tokenDrop, address)
  const {mutate: claimTokens, isLoading} = useClaimToken(tokenDrop)
  const [amount, setAmount] = useState("")

  return (
    <div>
      {address? (
        <>
          <p>Your Address: {address}</p>
          <p>Token Supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
          <p>Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
          <h1>Claim Tokens</h1>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          <button onClick={() => claimTokens({amount, to: address},{onSuccess:() => setAmount("")})} disabled={isLoading}>Claim {amount} {tokenBalance?.symbol}</button>
        </>
      ) : (
      <ConnectWallet accentColor="#f213a4" colorMode="light" />
      )}
    </div>
  );
}
