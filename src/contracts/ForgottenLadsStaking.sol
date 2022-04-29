pragma solidity ^0.8.13;

// Mainnet deployed at: 0xa59C2D7EF2f12922139fbc6d92e3177Ce28b6E10

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ForgottenLadsStaking is OwnableUpgradeable, ReentrancyGuardUpgradeable, PausableUpgradeable {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;
    using SafeMathUpgradeable for uint256;

    // Proxy variables;
    address __delegate;
    address public __owner = msg.sender;

    // Staker struct
    struct Staker {
        uint256 _earned;
        uint256 _lastBlock;
    }

    // Addresses
    address public ladsNFT; // NFT Address
    address public ladsToken; // ERC-20 token address

    // Rate governs how often you receive your token
    uint256 public rate;

    // mappings
    mapping(address => EnumerableSetUpgradeable.UintSet) private deposits;
    mapping(address => Staker) private stakers;
    address[] registeredStakers;

    bool __initialized = false;

    function initialize(address _ladsNFT, address _ladsToken, uint256 _rate) public {
        require(__initialized == false, 'Already initialized');
        __initialized = true;
        __ReentrancyGuard_init_unchained();
        __Ownable_init_unchained();
        __Pausable_init_unchained();

        ladsNFT = _ladsNFT;
        ladsToken = _ladsToken;

        rate = _rate;
        _pause();
    }

    // Pause & unpause contract
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Update earnings for a single staker
    function updateEarned(address staker) internal {
        stakers[staker]._earned = calculateRewards(staker);
        stakers[staker]._lastBlock = block.number;
    }

    // Set a new rate. Store everyone's earnings first.
    function setRate(uint256 _rate) public onlyOwner() {
        for(uint256 i = 0;i < registeredStakers.length;i++) {
            updateEarned(registeredStakers[i]);
        }
        rate = _rate;
    }

    // Get a list of deposits
    function depositsOf(address account) external view returns (uint256[] memory) {
        EnumerableSetUpgradeable.UintSet storage depositSet = deposits[account];
        uint256[] memory tokenIds = new uint256[] (depositSet.length());
        for (uint256 i; i < depositSet.length(); i++) {
            tokenIds[i] = depositSet.at(i);
        }
        return tokenIds;
    }

    // Calculate claimable rewards for one staker
    function calculateRewards(address account) public view returns (uint256) {
        Staker memory staker = stakers[account];
        EnumerableSetUpgradeable.UintSet storage depositSet = deposits[account];
        uint256 rewards = depositSet.length()
            .mul(rate)
            .mul(block.number.sub(staker._lastBlock));
        rewards = rewards.add(staker._earned);
        return rewards;
    }

    // Claim rewards
    function claimRewards() public whenNotPaused {
        uint256 rewards = calculateRewards(msg.sender);

        stakers[msg.sender]._earned = 0;
        stakers[msg.sender]._lastBlock = block.number;

        if (rewards > 0) {
            IERC20(ladsToken).transfer(msg.sender, rewards);
        }
    }

    // Deposit function
    function deposit(uint256[] calldata tokenIds) external whenNotPaused {
        Staker memory staker = stakers[msg.sender];
        if(staker._lastBlock == 0) {
            stakers[msg.sender] = Staker(0, block.number);
            registeredStakers.push(msg.sender);
        }

        updateEarned(msg.sender);
        for (uint256 i; i < tokenIds.length; i++) {
            IERC721(ladsNFT).transferFrom(msg.sender,address(this),tokenIds[i]);
            deposits[msg.sender].add(tokenIds[i]);
        }
    }

    // Withdrawal function
    function withdraw(uint256[] calldata tokenIds) external whenNotPaused nonReentrant() {
        updateEarned(msg.sender);
        for (uint256 i; i < tokenIds.length; i++) {
            require(deposits[msg.sender].contains(tokenIds[i]), "Staking: You are not token owner");
            deposits[msg.sender].remove(tokenIds[i]);
            IERC721(ladsNFT).transferFrom(address(this), msg.sender,tokenIds[i]);
        }
    }

    // Withdraw function for owner
    function withdrawTokens() external onlyOwner {
        uint256 tokenSupply = IERC20(ladsToken).balanceOf(address(this));
        IERC20(ladsToken).transfer(msg.sender, tokenSupply);
    }
}
