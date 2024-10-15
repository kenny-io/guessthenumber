// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GuessTheNumber {
    address public owner;
    uint256 public secretNumber;
    uint256 public betAmount;
    bool public gameActive;

    event GameStarted(uint256 betAmount);
    event GameWon(address winner, uint256 amount);
    event NumberGuessed(address player, uint256 guess, bool correct);

    constructor(uint256 _initialSecretNumber) {
        owner = msg.sender;
        secretNumber = _initialSecretNumber;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier gameIsActive() {
        require(gameActive, "The game is not active");
        _;
    }

    function guess(uint256 _guess) public payable gameIsActive {
        require(msg.value == betAmount, "Incorrect bet amount");
        bool correct = (_guess == secretNumber);
        emit NumberGuessed(msg.sender, _guess, correct);

        if (correct) {
            gameActive = false;
            uint256 prize = betAmount * 2;
            payable(msg.sender).transfer(prize);
            emit GameWon(msg.sender, prize);
        }
    }

    function endGame() public onlyOwner {
        gameActive = false;
    }

    function restartGame(uint256 _newSecretNumber) public onlyOwner {
        secretNumber = _newSecretNumber;
        gameActive = true;
    }

    function startGame(uint256 _secretNumber) public payable onlyOwner {
        require(!gameActive, "A game is already in progress");
        require(msg.value > 0, "Bet amount must be greater than 0");

        secretNumber = _secretNumber;
        betAmount = msg.value;
        gameActive = true;

        emit GameStarted(betAmount);
    }

    receive() external payable {}
}
