// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./interfaces/IAccountStore.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Subject {
    string name;
    uint256 grade;
}

struct Transcript {
    string studentName;
    Subject subject;
}

/**
 * @title HashStore
 * @dev Store & retrieve hash values
 */
contract HashStore is Ownable {
    IAccountStore accountStore;
    mapping(address => bytes32[]) hashes;

    event validity(address indexed from, bool isValid);
    event transcriptStored(Transcript transcript, uint256 index);

    constructor(address accountStoreAddress) Ownable() {
        setAccountStore(accountStoreAddress);
    }

    /// public
    function store(Transcript memory transcript, address recipient)
        external
        isParticipant(msg.sender)
        isParticipant(recipient)
        returns (uint256)
    {
        bytes32 hash = calculateHash(transcript);
        hashes[recipient].push(hash);
        uint256 index = hashes[recipient].length - 1;
        emit transcriptStored(transcript, index);
        return index;
    }

    function validate(Transcript memory transcript, uint256 index)
        external
        isParticipant(msg.sender)
        returns (bool)
    {
        require(index < hashes[msg.sender].length, "Index out of range");
        bytes32 hash = calculateHash(transcript);
        bool isValid = hashes[msg.sender][index] == hash;
        emit validity(msg.sender, isValid);
        return isValid;
    }

    function getHashesLength()
        public
        view
        isParticipant(msg.sender)
        returns (uint256)
    {
        return hashes[msg.sender].length;
    }

    /// internal
    function calculateHash(Transcript memory transcript)
        internal
        pure
        returns (bytes32)
    {
        bytes memory transcriptBytes = abi.encode(transcript);
        return keccak256(transcriptBytes);
    }

    modifier isParticipant(address account) {
        require(accountStore.accountExists(account), "Account is not registered");
        _;
    }

    /// management
    function setAccountStore(address accountStoreAddress) public onlyOwner {
        accountStore = IAccountStore(accountStoreAddress);
    }

    function resetStore() external onlyOwner {
        // TODO delete hashes object memory
    }

    function deleteHashes(address account) internal {
        // TODO after an account is deregistered, all hashes should be deleted automatically
    }
}
