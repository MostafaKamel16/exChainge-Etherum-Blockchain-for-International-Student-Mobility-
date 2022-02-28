// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


interface IAccountStore {
    struct ParticipantInfo {
        string name;
        string serverAddress;
    }

    function register(ParticipantInfo memory info) external;

    function deregister() external;

    function accountExists(address account) external view returns (bool);
}