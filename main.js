require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('colors');

// Clear console and display bot info on startup
(async () => {
  process.stdout.write('\x1Bc');
  console.log('========================================='.cyan);
  console.log('=       	    Berachain Bot             ='.cyan);
  console.log('=          Created by 0xShalen         ='.cyan);
  console.log('=         https://t.me/xShalen          ='.cyan);
  console.log('========================================='.cyan);
  console.log();
})();

// Configure provider and signer
const provider = new ethers.JsonRpcProvider('https://bartio.rpc.berachain.com');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load ABIs and contract addresses
const abis = {
  BerachainRewardsVault: require(path.join(__dirname, 'abis', 'BerachainRewardsVault.json')),
  BeraChef: require(path.join(__dirname, 'abis', 'BeraChef.json')),
  BGT: require(path.join(__dirname, 'abis', 'BGT.json')),
  HONEY: require(path.join(__dirname, 'abis', 'HONEY.json')),
  WBERA: require(path.join(__dirname, 'abis', 'WBERA.json'))
};

const addresses = {
  BerachainRewardsVault: "0x2B6e40f65D82A0cB98795bC7587a71bfa49fBB2B",
  BeraChef: "0xfb81E39E3970076ab2693fA5C45A07Cc724C93c2",
  BGT: "0xbDa130737BDd9618301681329bF2e46A016ff9Ad",
  HONEY: "0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03",
  WBERA: "0x7507c1dc16935B82698e4C63f2746A2fCf994dF8"
};

// Example transaction function
async function sendTransaction() {
  const contract = new ethers.Contract(addresses.WBERA, abis.WBERA, wallet);

  try {
    console.log('Sending transaction...');
    const tx = await contract.transfer('0xRecipientAddress', ethers.parseUnits('1.0', 18));
    console.log('Transaction sent! Waiting for confirmation...');

    const receipt = await tx.wait();
    console.log(`Transaction confirmed! Hash: ${receipt.transactionHash}`.green);
  } catch (error) {
    console.error(`Transaction failed: ${error.message}`.red);
  }
}

// Start the bot
(async () => {
  await sendTransaction();
})();
