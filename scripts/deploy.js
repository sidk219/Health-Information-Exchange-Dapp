const hre = require("hardhat");

async function main() {
  const record = await hre.ethers.getContractFactory("Record");
  const contract = await record.deploy();

  await contract.deployed();
  console.log("Address of contract: ", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x383E8910Cd35E98F24040E108ab4572C0414a41c
