// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import './interfaces/IAccountStore.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HashStorage
 * @dev Store & retrieve hash values
 */
contract HashStorageAll is Ownable, IAccountStore {
    mapping (address => bool) accounts;

    function register() external override {
        require(!accountExists(msg.sender), "Account already registered");
        accounts[msg.sender] = true;
    }

    function deregister() external override {
        require(accountExists(msg.sender), "Account not registered");
        accounts[msg.sender] = false;
        // TODO delete memory
    }

    function accountExists(address account) public override view returns (bool) {
        return accounts[account];
    }

    // Hash
    mapping (address => bytes32[]) hashes;

    constructor() Ownable() {
        
    }

    struct Subject {
        string name;
        uint grade;
    }

    struct Transcript {
        string studentName;
        Subject subject;
    }

    /// public
    function store(Transcript memory transcript, address recipient) external isParticipant(msg.sender) isParticipant(recipient) returns (uint) {
        bytes32 hash = calculateHash(transcript);
        hashes[recipient].push(hash);
        return hashes[recipient].length - 1;
    }
    
    function validate(Transcript memory transcript, uint index) external view isParticipant(msg.sender) returns (bool) {
        require(index < hashes[msg.sender].length, "Index out of range");
        bytes32 hash = calculateHash(transcript);
        bool valid = hashes[msg.sender][index] == hash;
        return valid;
    }

    function getHashesLength() public view isParticipant(msg.sender) returns (uint){
        return hashes[msg.sender].length;
    }

    /// internal
    function calculateHash(Transcript memory transcript) internal pure returns (bytes32) {
        bytes memory transcriptBytes = abi.encode(transcript);
        return keccak256(transcriptBytes);
    }

    modifier isParticipant(address account) {
        require(accountExists(account), "Account is not registered");
        _;
    }

    /// management
    function resetStore() external onlyOwner {
        // TODO delete hashes object memory
    }

    function deleteHashes(address account) internal {
        // TODO after an account is deregistered, all hashes should be deleted automatically
    }
}