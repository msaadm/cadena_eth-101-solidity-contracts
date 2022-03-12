const { ethers, utils } = require("ethers");
const hre = require("hardhat");

async function main() {
  const [owner, addr1, addr2] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("MSMCoin");

  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log("MSMCoin Contract deployed to:", contract.address);

  console.log("MSMCoin Contract owner address:", owner.address);
  console.log("addr1 address:", addr1.address);
  console.log("addr2 address:", addr2.address);

  const txn = await contract.transfer(addr1.address, utils.parseEther("4.0"));
  console.log("Transfering tokens...");
  await txn.wait();
  console.log("Tokens Transfered", txn.hash);
  await checkingBalances(contract, owner, addr1, addr2);
  await checkingBonus(contract, owner, addr1, addr2);
  await checkingBalances(contract, owner, addr1, addr2);
  await checkingBonus(contract, owner, addr1, addr2);
}

async function checkingBalances(contract, owner, addr1, addr2) {
  console.log("checking balances...");
  console.log("Owner", owner.address, await contract.balanceOf(owner.address));
  console.log("Addr1", addr1.address, await contract.balanceOf(addr1.address));
  console.log("Addr2", addr2.address, await contract.balanceOf(addr2.address));
  console.log("=========================");
}

async function checkingBonus(contract, owner, addr1, addr2) {
  console.log("checking Bonus...");
  console.log(
    "Owner",
    owner.address,
    await contract.bonusTrackerOf(owner.address)
  );
  console.log(
    "Addr1",
    addr1.address,
    await contract.bonusTrackerOf(addr1.address)
  );
  console.log(
    "Addr2",
    addr2.address,
    await contract.bonusTrackerOf(addr2.address)
  );
  console.log("=========================");
}

main()
  .then(() => process.exit(0))

  .catch((error) => {
    console.error(error);

    process.exit(1);
  });
