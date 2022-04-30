import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import ApeContractData from "../blockchain/ApeContract";
import StakingContractData from "../blockchain/StakingContract";
import PoolContractData from "../blockchain/PoolContract";
import TokenABI from "../blockchain/TokenABI";

export const BlockchainContext = createContext();

const { ethereum } = window;

const getProvider = () => {
  return new ethers.providers.Web3Provider(ethereum);
};

const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};

// returns promise
const getSignerAddress = () => {
  const provider = getProvider();
  return provider.getSigner().getAddress();
};

const getCurrentNetwork = () => {
  const provider = getProvider();
  return provider.getNetwork();
};

// returns Promise
const getNetworkChainId = async () => {
  const network = await getCurrentNetwork();
  return network.chainId;
};

export const BlockchainContextProvider = (props) => {
  const [currentSigner, setCurrentSigner] = useState("");
  const [currentSignerAddress, setCurrentSignerAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unstakedNfts, setUnstakedNfts] = useState();
  const [stakedNfts, setStakedNfts] = useState();
  //
  const [unstakedBalance, setUnstakeBalance] = useState();
  const [stakedBalance, setStakeBalance] = useState();
  const [rewardTokenBalance, setRewardTokenBalance] = useState(0.0);
  const [pools, setPools] = useState();
  const [loading, setLoading] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected();
    listenMMAccount(); // Event is registered in background
  }, []);

  async function listenMMAccount() {
    ethereum.on("accountsChanged", async function () {
      window.location.reload();
    });

    ethereum.on("chainChanged", (currentChainId) => {
      window.location.reload();
    });
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return setErrorDetails("Please install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      // Check Network
      const chainId = await getNetworkChainId();
      if (chainId !== 10000) {
        return setErrorDetails("Please Change Network to Smart BCH");
      }

      if (accounts.length) {
        setConnectedAccount(accounts[0])

        // Set Current Signer
        const signer = getSigner();
        setCurrentSigner(signer);

        // Set Current Signer Address
        const signerAddress = await getSignerAddress();
        setCurrentSignerAddress(signerAddress);


        await fetchPools();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return setErrorDetails("Please install Metamask");
      // Request Metamask for accounts
     const account = await ethereum.request({ method: "eth_requestAccounts" });
      setConnectedAccount(account[0])
      await ethereum.request({ method: "eth_requestAccounts" });

      // Check Network
      const chainId = await getNetworkChainId();
      if (chainId !== 10000) {
        setErrorDetails("Please Change Network to Smart BCH");
        return;
      }

      // Set Current Signer
      const signer = getSigner();
      setCurrentSigner(signer);

      // Set Current Signer Address
      const signerAddress = await getSignerAddress();
      setCurrentSignerAddress(signerAddress);

      await fetchPools();
    } catch (error) {
      setErrorDetails(error);
      throw new Error("No Ethereum Object");
    }
  };

  // Get APE Contract

  const getApeContract = async () => {
    if (!currentSigner) {
      setErrorDetails("Please Connect Wallet First!");
      // setIsLoading(false);
      return;
    }

    const provider = getProvider();
    const ApeContract = new ethers.Contract(
      ApeContractData.address,
      ApeContractData.abi,
      provider
    );
    return ApeContract;
  };

  // Get Staking Contract
  const getStakingContract = async () => {
    if (!currentSigner) {
      setErrorDetails("Please Connect Wallet First!");
      // setIsLoading(false);
      return;
    }

    const provider = getProvider();
    const StakingContract = new ethers.Contract(
      StakingContractData.address,
      StakingContractData.abi,
      provider
    );
    return StakingContract;
  };

  const getPoolContract = async (address) => {
    const provider = await getProvider();
    let contract = new ethers.Contract(
        address,
        PoolContractData.abi,
        provider
    );
    return contract;
  };

  const getPoolContractSigner = async (address) => {
    return new ethers.Contract(
        address,
        PoolContractData.abi,
        currentSigner
    );
  };

  /* 
  * -------------------------------------------
            Functions
  * -------------------------------------------
  */

  // Get User Owned NFTs (Unstaked)
  const fetchUnstakedInfo = async (signerAddress) => {
    let tokenIds = [];
    let metadatas = [];

    // Get Ape Contract
    const provider = getProvider();
    const apeContract = new ethers.Contract(
      ApeContractData.address,
      ApeContractData.abi,
      provider
    );

    const tokens = await apeContract.walletOfOwner(signerAddress);
    for (let a1 = 0; a1 < tokens.length; a1++) {
      const tokenId = tokens[a1];
      const image =
        "https://lads.mypinata.cloud/ipfs/QmeStiUNVMRe4db6qeoEeaXR8CDKxprLUqdW9CoUAxoV54/" +
        tokenId +
        ".png";

      tokenIds.push(tokenId.toString());
      metadatas.push(image);
    }

    return {
      tokenIds,
      metadatas,
    };
  };

  const fetchStakedInfo = async (signerAddress) => {
    let tokenIds = [];
    let metadatas = [];

    // Get Staking Contract
    const provider = getProvider();
    const stakingContract = new ethers.Contract(
      StakingContractData.address,
      StakingContractData.abi,
      provider
    );

    const tokenInfo = await stakingContract.depositsOf(signerAddress);

    const balance = tokenInfo.length;

    for (var a = 0; a < balance; a++) {
      const image =
        "https://lads.mypinata.cloud/ipfs/QmeStiUNVMRe4db6qeoEeaXR8CDKxprLUqdW9CoUAxoV54/" +
        tokenInfo[a] +
        ".png";
      tokenIds.push(tokenInfo[a].toString());
      metadatas.push(image);
    }

    return {
      tokenIds,
      metadatas,
    };
  };

  const stake = async (_tokenIds) => {
    // Get Ape Contract
    const apeContract = await getApeContract();

    // Get Staking Contract
    const stakingContract = await getStakingContract();
    try {
      // Set Approval for all tokens

      let txx = await apeContract
        .connect(currentSigner)
        .setApprovalForAll(stakingContract.address, true);

      await txx.wait();

      // Set Stake
      let tx = await stakingContract.connect(currentSigner).deposit(_tokenIds);
      await tx.wait();
      window.location.reload();
    } catch (error) {
      // console.log(error.toString()["data"]);
      setErrorDetails(error.data.message);
    }
  };

  const unstake = async (_tokenIds) => {
    // Get Staking Contract
    const stakingContract = await getStakingContract();
    try {
      // Set untake
      let tx = await stakingContract.connect(currentSigner).withdraw(_tokenIds);
      await tx.wait();
      window.location.reload();
    } catch (error) {
      setErrorDetails(error.data.message);
      console.log(error);
    }
  };

  const getUnstakedBalance = async (signerAddress) => {
    try {
      // Get Ape Contract
      const provider = getProvider();
      const apeContract = new ethers.Contract(
        ApeContractData.address,
        ApeContractData.abi,
        provider
      );
      const balance = await apeContract.balanceOf(signerAddress);
      setUnstakeBalance(balance.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const getStakedBalance = async (signerAddress) => {
    try {
      // Get Staking Contract
      const provider = getProvider();
      const stakingContract = new ethers.Contract(
        StakingContractData.address,
        StakingContractData.abi,
        provider
      );
      const tokenInfo = await stakingContract.depositsOf(signerAddress);
      const balance = tokenInfo.length;
      setStakeBalance(balance.toString());

      // Get Reward Balance
      let balanceRewards = await stakingContract.calculateRewards(
        signerAddress,
        tokenInfo
      );

      let sum = balanceRewards.reduce(
        (partialSum, a) => partialSum + parseInt(a),
        0
      );

      balanceRewards = ethers.utils.formatEther(sum.toString());

      setRewardTokenBalance(balanceRewards);
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawToERC20 = async () => {
    try {
      const stakingContract = await getStakingContract();

      // Get Staked Token Ids
      const tokenInfo = await stakingContract.depositsOf(currentSignerAddress);
      let tx = await stakingContract
        .connect(currentSigner)
        .claimRewards(tokenInfo);
      await tx.wait();
      window.location.reload();
    } catch (error) {
      if (
        error
          .toString()
          .includes("execution reverted: You have not staked any NFTs")
      ) {
        setErrorDetails("You have not staked any NFTs");
      } else {
        setErrorDetails(error.data.message);
        console.log(error);
      }
    }
  };

  const fetchPools = async () => {
    let _tmpPools = [];
    let poolAddresses = [
        '0xD58E8D30730A87d4eC907dfAeCa8B8708dD7e69D',
        '0x04978C2634926B6c133E6846B718AC117E10F157',
        '0x48551e0b62642c564054b1ebF4aEB1F8B0675278',
        '0xb9C26A60E85F510223B855492afC9336Ae5A98a2'
    ]

    for(var addr in poolAddresses) {
      let poolContract = await getPoolContract(poolAddresses[addr]);
      let pool = {};
      pool.key = poolAddresses[addr];
      pool.address = poolAddresses[addr];
      await poolContract.rate().then((rate) => {
        pool.rate = ethers.utils.formatEther(rate.toString());
      });
      await poolContract.stakingTokens().then(async function (token) {
        pool.stakingToken = token.toString();
        let signer = await getSigner();
        let signerAddress = await getSignerAddress();
        const tokenContract = new ethers.Contract(
            token,
            TokenABI.abi,
            signer
        );
        await tokenContract.symbol().then((symbol) => {
          pool.stakingSymbol = symbol;
        });
        return tokenContract.balanceOf(signerAddress).then((balance) => {
          pool.myBalance = ethers.utils.formatEther(balance.toString());
        });
      });
      await poolContract.rewardTokens().then(async function (token) {
        pool.rewardToken = token.toString();
        let signer = await getSigner();
        const tokenContract = new ethers.Contract(
            token,
            TokenABI.abi,
            signer
        );
        await tokenContract.symbol().then((symbol) => {
          pool.rewardSymbol = symbol;
        });
      });
      pool.rewards = 0;
      let signerAddress = await getSignerAddress();
      await poolContract.calculateRewards(signerAddress).then((rewards) => {
        pool.rewards = ethers.utils.formatEther(rewards.toString());
      });
      await poolContract.totalStaked().then((staked) => {
        pool.totalStaked = ethers.utils.formatEther(staked.toString());
      });
      await poolContract.rewardPool().then((poolsize) => {
        pool.rewardPool = ethers.utils.formatEther(poolsize.toString());
      });
      await poolContract.depositsOf(signerAddress).then((rewards) => {
        pool.deposited = ethers.utils.formatEther(rewards.toString());
      });
      await poolContract.owner().then((owner) => {
        pool.owner = owner.toLowerCase() === signerAddress.toLowerCase();
      });

      _tmpPools.push(pool);
    }
    setPools(_tmpPools);
  };

  const poolAddRewards = async (address, _amount) => {
    setLoading(true);

    let poolContract = await getPoolContractSigner(address);
    let rewardTokens = await poolContract.rewardTokens();
    const tokenContract = new ethers.Contract(
        rewardTokens,
        TokenABI.abi,
        currentSigner
    );
    let amountWei = ethers.utils.parseEther(_amount);
    var isApproved = await tokenContract.allowance(currentSignerAddress, address);
    if(isApproved <= amountWei) {
      var approved = await tokenContract.approve(address, amountWei);
      await approved.wait();

    }
    var tx = await poolContract.addRewards(amountWei);
    tx.wait().then(() => {
      window.location.reload();
    }).catch(() => {
      setLoading(false);
    });
  }
  const poolSetRate = async (address, _rate) => {
    setLoading(true);
    let poolContract = await getPoolContractSigner(address);
    var tx = await poolContract.setRate(ethers.utils.parseEther(_rate));
    tx.wait().then(() => {
      window.location.reload();
    }).catch(() => {
      setLoading(false);
    });
  }

  const poolClaimRewards = async (address) => {
    setLoading(true);
    let poolContract = await getPoolContractSigner(address);
    var tx = await poolContract.claimRewards();
    tx.wait().then(() => {
      window.location.reload();
    });
  }

  const poolDeposit = async (address, amount) => {
    setLoading(true);
    let poolContract = await getPoolContractSigner(address);
    let stakingToken = await poolContract.stakingTokens();
    const tokenContract = new ethers.Contract(
        stakingToken,
        TokenABI.abi,
        currentSigner
    );
    let amountWei = ethers.utils.parseEther(amount);
    var isApproved = await tokenContract.allowance(currentSignerAddress, address);
    if(isApproved < amountWei) {
      var approved = await tokenContract.approve(address, amountWei);
      await approved.wait();
    }
    var tx = await poolContract.deposit(amountWei);
    tx.wait().then(() => {
      window.location.reload();
    }).catch(() => {
      setLoading(false);
    });
  }

  const poolWithdraw = async (address, amount) => {
    setLoading(true);
    let poolContract = await getPoolContractSigner(address);
    var tx = await poolContract.withdraw(ethers.utils.parseEther(amount))
    tx.wait().then(() => {
      window.location.reload();
    }).catch(() => {
      setLoading(false);
    });
  }

  return (
    <BlockchainContext.Provider
      value={{
        currentSigner,
        currentSignerAddress,
        connectWallet,
        unstakedNfts,
        stakedNfts,
        stake,
        unstake,
        withdrawToERC20,
        unstakedBalance,
        stakedBalance,
        rewardTokenBalance,
        pools,
        poolClaimRewards,
        poolDeposit,
        poolWithdraw,
        poolAddRewards,
        poolSetRate,
        loading,
        connectedAccount,
        errorDetails,
        setErrorDetails
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};
