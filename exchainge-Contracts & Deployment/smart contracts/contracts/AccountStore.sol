// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import './interfaces/IAccountStore.sol';

contract AccountStore is IAccountStore {
    mapping (address => ParticipantInfo) accounts;

    function register(ParticipantInfo memory info) external override {
        require(!accountExists(msg.sender), "Account already registered");
        accounts[msg.sender] = info;
    }

    function deregister() external override {
        require(accountExists(msg.sender), "Account not registered");
        delete accounts[msg.sender];
    }

    function accountExists(address account) public override view returns (bool) {
        return bytes(accounts[account].name).length != 0;
    }
}