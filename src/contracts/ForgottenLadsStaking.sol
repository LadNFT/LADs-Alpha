pragma solidity ^0.8.13;

// Mainnet deployed at: 0x53F9c4Ce442e04aF5666b404746f7500414AC1B9

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LadsPool is OwnableUpgradeable, ReentrancyGuardUpgradeable, PausableUpgradeable {
    using SafeMathUpgradeable for uint256;

    // Proxy variables;
    address __delegate;
    address public __owner;

    // Staker struct
    struct Staker {
        uint256 _earned;
        uint256 _lastBlock;
    }

    // Addresses
    address public stakingTokens; // Token Address
    address public rewardTokens; // ERC-20 token address

    // Rate governs how often you receive your token
    uint256 public rate;

    // Reward pool size
    uint256 public rewardPool;

    // Staked token amount
    uint256 public totalStaked;

    // mappings
    mapping(address => uint256) private deposits;
    mapping(address => Staker) private stakers;
    address[] registeredStakers;

    bool __initialized = false;

    uint256 public lockTime;
    mapping(address => uint256) public locked;

    uint256 public tokenGivenAway;
    uint256 public tokenDecimals;
    uint256 public lastRateChangedBlock;

    function initialize(address _stakingTokens, address _rewardTokens, uint256 _rate) public {
        require(__initialized == false, 'Already initialized');
        __initialized = true;
        __ReentrancyGuard_init_unchained();
        __Ownable_init_unchained();
        __Pausable_init_unchained();

        stakingTokens = _stakingTokens;
        rewardTokens = _rewardTokens;

        rate = _rate;
        tokenDecimals = 10 ** 18;
        lastRateChangedBlock = block.number;

        _pause();
    }

    // Pause & unpause contract
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Add reward tokens
    function addRewards(uint256 _rewards) public onlyOwner {
        IERC20(rewardTokens).transferFrom(msg.sender, address(this), _rewards);
        rewardPool = rewardPool.add(_rewards);
    }

    // Update earnings for a single staker
    function updateEarned(address staker) internal {
        uint256 rewards = calculateCurrentRewards(staker);
        tokenGivenAway = tokenGivenAway.add(rewards);
        stakers[staker]._earned = stakers[staker]._earned.add(rewards);
        stakers[staker]._lastBlock = block.number;
    }

    // Set a new rate. Store everyone's earnings first.
    function setRate(uint256 _rate) public onlyOwner() {
        for(uint256 i = 0;i < registeredStakers.length;i++) {
            updateEarned(registeredStakers[i]);
        }
        lastRateChangedBlock = block.number;
        rate = _rate;
    }

    // Get a list of deposits
    function depositsOf(address account) external view returns (uint256) {
        return deposits[account];
    }

    // Calculate claimable rewards for one staker
    function calculateRewards(address account) public view returns (uint256) {
        Staker memory staker = stakers[account];
        uint256 rewards = calculateCurrentRewards(account);
        rewards = rewards.add(staker._earned);
        return rewards;
    }

    // Claim rewards
    function claimRewards() public whenNotPaused nonReentrant {
        uint256 rewards = calculateRewards(msg.sender);

        stakers[msg.sender]._earned = 0;
        stakers[msg.sender]._lastBlock = block.number;

        rewardPool = rewardPool.sub(rewards);

        if (rewards > 0) {
            IERC20(rewardTokens).transfer(msg.sender, rewards);
        }
    }

    // Deposit function
    function deposit(uint256 _amount) external whenNotPaused nonReentrant {
        Staker memory staker = stakers[msg.sender];
        if(staker._lastBlock == 0) {
            stakers[msg.sender] = Staker(0, block.number);
            registeredStakers.push(msg.sender);
        } else {
            updateEarned(msg.sender);
        }

        totalStaked = totalStaked.add(_amount);
        IERC20(stakingTokens).transferFrom(msg.sender, address(this), _amount);
        deposits[msg.sender] = deposits[msg.sender].add(_amount);
        locked[msg.sender] = block.number;
    }

    // Withdrawal function
    function withdraw(uint256 _amount) external whenNotPaused nonReentrant {
        updateEarned(msg.sender);
        require(deposits[msg.sender] >= _amount, "Staking: Too much.");
        require(!isLocked(msg.sender), "Staking: Funds locked.");

        deposits[msg.sender] = deposits[msg.sender].sub(_amount);
        totalStaked = totalStaked.sub(_amount);

        IERC20(stakingTokens).transfer(msg.sender, _amount);
    }

    // Withdraw function for owner
    function withdrawTokens() external onlyOwner {
        IERC20(rewardTokens).transfer(msg.sender, rewardPool);
        rewardPool = 0;
    }

    function isLocked(address _staker) public view returns (bool) {
        return (locked[_staker].add(lockTime) > block.number);
    }

    function setLockTime(uint256 _blocks) public onlyOwner {
        lockTime = _blocks;
    }

    function setTokenDecimals(uint256 _dec) public onlyOwner {
        tokenDecimals = _dec;
    }

    function calculateCurrentRewards(address account) public view returns(uint256) {
        Staker memory staker = stakers[account];
        uint256 _tokenDecimals = tokenDecimals;
        if(_tokenDecimals == 0) {
            _tokenDecimals = 10 ** 18;
        }
        uint256 rewards = deposits[account]
        .mul(rate)
        .mul(block.number.sub(staker._lastBlock))
        .div(_tokenDecimals);
        return rewards;
    }

    function getTotalGivenAway() public view returns(uint256) {
        uint256 total = tokenGivenAway;
        if(lastRateChangedBlock > 0) {
            uint256 blocks = block.number.sub(lastRateChangedBlock);
            total = total.add(blocks.mul(totalStaked).mul(rate));
        }
        return total;
    }
}
