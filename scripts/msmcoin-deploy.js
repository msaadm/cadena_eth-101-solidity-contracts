const { ethers, utils } = require("ethers");
const hre = require("hardhat");

async function main() {
  const MSMCoinFactory = await hre.ethers.getContractFactory("MSMCoin");
  const MSMCoin = await MSMCoinFactory.deploy();
  await MSMCoin.deployed();

  console.log("MSMCoin Contract deployed to:", MSMCoin.address);
}

main()
  .then(() => process.exit(0))

  .catch((error) => {
    console.error(error);

    process.exit(1);
  });
