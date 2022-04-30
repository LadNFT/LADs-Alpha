// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Deployed at:
// 0xD58E8D30730A87d4eC907dfAeCa8B8708dD7e69D       LAD
// 0x04978C2634926B6c133E6846B718AC117E10F157       Mistswap LP
// 0x48551e0b62642c564054b1ebF4aEB1F8B0675278       Benswap LP
// 0xb9C26A60E85F510223B855492afC9336Ae5A98a2       LawUSD LP

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