// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Proxy {

    address __delegate;
    address public __owner = msg.sender;

    function __upgradeDelegate(address newDelegateAddress) public {
        require(msg.sender == __owner);
        __delegate = newDelegateAddress;
    }

    function __setOwner(address newOwner) public {
        require(msg.sender == __owner);
        __owner = newOwner;
    }

    fallback() external payable {
        address _impl = __delegate;
        require(_impl != address(0));

        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)
            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}