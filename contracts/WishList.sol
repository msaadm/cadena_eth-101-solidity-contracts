// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract WishList {
    struct Wish {
        string message;
        address creator_address;
        uint256 created_at;
    }
    Wish[] public wishes;

    event WishAdded(Wish wish);

    function addWish(string calldata message) external {
        Wish memory wish = Wish({
            message: message,
            creator_address: msg.sender,
            created_at: block.timestamp
        });

        wishes.push(wish);
        emit WishAdded(wish);
    }

    function getWishes() external view returns (Wish[] memory) {
        return wishes;
    }
}
