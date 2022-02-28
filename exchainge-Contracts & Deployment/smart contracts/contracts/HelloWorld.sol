// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string private greeting;
    event GreetingEvent(string greeting);

    constructor() {
        greeting = "Hello World";
    }

    function getGreeting() public view returns(string memory){
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function getGreetingEvent() public {
        emit GreetingEvent(greeting);
    }
}