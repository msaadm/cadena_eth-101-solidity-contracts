// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MSMCoin is ERC20, Ownable, ERC20Burnable {
    mapping(address => uint256) private _bonusTracker;

    event tokensBurned(address indexed owner, uint256 amount, string message);

    event tokensMinted(address indexed owner, uint256 amount, string message);

    event additionalTokensMinted(
        address indexed owner,
        uint256 amount,
        string message
    );

    event bonusTokensMinted(address indexed owner, uint256 amount);

    constructor() ERC20("MSMCoin", "MSM") {
        _mint(msg.sender, 1000 ether);

        emit tokensMinted(
            msg.sender,
            1000 ether,
            "Initial supply of tokens minted."
        );
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);

        emit additionalTokensMinted(
            msg.sender,
            amount,
            "Additional tokens minted."
        );
    }

    function burn(uint256 amount) public override onlyOwner {
        _burn(msg.sender, amount);

        emit tokensBurned(msg.sender, amount, "Tokens burned.");
    }

    function bonusTrackerOf(address account) public view returns (uint256) {
        return _bonusTracker[account];
    }

    function transfer(address to, uint256 amount)
        public
        override
        returns (bool)
    {
        address owner = msg.sender;
        _transfer(owner, to, amount);
        _mintBonus(owner, amount);

        return true;
    }

    function _mintBonus(address account, uint256 amount) private {
        require(account != address(0), "MSMCoin: transfer to the zero address");
        // Add up Amount
        _bonusTracker[account] += amount;
        if (_bonusTracker[account] > 10 ether) {
            // Reset
            _bonusTracker[account] = 0;

            // Transfer Bonus 0.5 Coin
            _mint(account, 0.5 ether);

            emit bonusTokensMinted(msg.sender, amount);
        }
    }
}
