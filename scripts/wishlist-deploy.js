const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const WishListContract = await hre.ethers.getContractFactory("WishList");
  const wishList = await WishListContract.deploy();
//   const [owner, addr1] = await hre.ethers.getSigners();

  await wishList.deployed();

  console.log("WishList deployed to:", wishList.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
