// app.js
const contractAddress = "0x27a0689189670477e7a8164692b7c2682351cace"; // NFTNAFAKA verified contract
const abi = [];

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("wallet-address").innerText = accounts[0];
    } catch (err) {
      console.error("User rejected connection", err);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function mintNFT() {
  const amount = parseInt(document.getElementById("mint-amount").value);
  if (!amount || amount < 1) return alert("Enter valid amount (1 or more)");

  const pricePerNFT = 0.05;
  const totalPrice = (pricePerNFT * amount).toString();

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);
  const accounts = await web3.eth.getAccounts();

  try {
    const tx = await contract.methods.mint(amount).send({
      from: accounts[0],
      value: web3.utils.toWei(totalPrice, "ether")
    });
    alert("NFTs minted successfully!" + "\nTX Hash: " + tx.transactionHash);
  } catch (err) {
    console.error(err);
    alert("Minting failed.");
  }
}

window.onload = () => {
  document.getElementById("connect-button").onclick = connectWallet;
  document.getElementById("mint-button").onclick = mintNFT;
};

// abi.js (actual content should be copied from the verified contract page or fetched)
// Example (in abi.json):
// [
//   {
//     "inputs": [{"internalType":"uint256","name":"amount","type":"uint256"}],
//     "name":"mint",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [{"internalType":"uint256","name":"tokenId","type":"uint256"}],
//     "name":"tokenURI",
//     "outputs": [{"internalType":"string","name":"","type":"string"}],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]
