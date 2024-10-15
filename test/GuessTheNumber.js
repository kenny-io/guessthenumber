const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GuessTheNumber", function () {
  let guessTheNumber;
  let owner;
  let player;

  beforeEach(async function () {
    [owner, player] = await ethers.getSigners();
    const GuessTheNumber = await ethers.getContractFactory("GuessTheNumber");
    guessTheNumber = await GuessTheNumber.deploy(42);
    await guessTheNumber.waitForDeployment();

    // Fund the contract with some initial balance
    await owner.sendTransaction({
      to: await guessTheNumber.getAddress(),
      value: ethers.parseEther("1.0")
    });
  });

  it("Should start a new game", async function () {
    const betAmount = ethers.parseEther("0.1");
    await guessTheNumber.connect(owner).startGame(42, { value: betAmount });
    expect(await guessTheNumber.gameActive()).to.equal(true);
    expect(await guessTheNumber.betAmount()).to.equal(betAmount);
  });

  it("Should allow a correct guess and pay out", async function () {
    const betAmount = ethers.parseEther("0.1");
    await guessTheNumber.connect(owner).startGame(42, { value: betAmount });
    
    const initialBalance = await ethers.provider.getBalance(player.address);
    
    await expect(guessTheNumber.connect(player).guess(42, { value: betAmount }))
      .to.emit(guessTheNumber, "GameWon")
      .withArgs(player.address, betAmount * BigInt(2));
    
    const finalBalance = await ethers.provider.getBalance(player.address);
    expect(finalBalance).to.be.gt(initialBalance);
    
    expect(await guessTheNumber.gameActive()).to.equal(false);
  });
});
