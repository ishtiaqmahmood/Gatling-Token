// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./DappToken.sol";

/**
 * @title DappTokenSale
 * @dev Contract to handle the crowdsale of DappToken.
 */
contract DappTokenSale {
    address payable public admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    /**
     * @dev Constructor for DappTokenSale.
     * @param _tokenContract Address of the DappToken contract.
     * @param _tokenPrice Price of each token in wei.
     */
    constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    /**
     * @dev Internal function for safe multiplication.
     */
    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "Multiplication overflow");
    }

    /**
     * @dev Facilitates token buying.
     * @param _numberOfTokens Number of tokens to buy.
     */
    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice), "Incorrect value sent");
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens, "Insufficient tokens in contract");
        require(tokenContract.transfer(msg.sender, _numberOfTokens), "Token transfer failed");

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    /**
     * @dev Ends the token sale, transfers remaining tokens and balance to admin.
     */
    function endSale() public {
        require(msg.sender == admin, "Only admin can end sale");

        // Transfer remaining tokens back to admin
        uint256 remainingTokens = tokenContract.balanceOf(address(this));
        if (remainingTokens > 0) {
            require(tokenContract.transfer(admin, remainingTokens), "Token return to admin failed");
        }

        // Transfer contract's ether balance to admin
        admin.transfer(address(this).balance);
    }
}
