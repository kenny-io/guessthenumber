const hre = require("hardhat");

async function main() {
  const GuessTheNumber = await hre.ethers.getContractFactory("GuessTheNumber");
  console.log("Deploying GuessTheNumber...");
  const guessTheNumber = await GuessTheNumber.deploy(42);

  console.log("GuessTheNumber deployed to:", await guessTheNumber.getAddress());
  
  console.log("Waiting for deployment to be mined...");
  await guessTheNumber.waitForDeployment();
  
  console.log("Deployment completed. Contract address:", await guessTheNumber.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });