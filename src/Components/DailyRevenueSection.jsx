import { useContext, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import DailyRevenueBox from "./DailyRevenueBox";
import ImagesUnStakingBox from "./ImagesUnStakingBox";
import ImagesStakingBox from "./ImagesStakingBox";
import TitleSlacking from "./TitleSlacking";

const DailyRevenueSection = (props) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [value, setValue] = useState(-1);
  const {
    unstakedNfts,
    stake,
    unstakedBalance,
    stakedBalance,
    stakedNfts,
    currentRate,
    unstake,
    rewardTokenBalance,
    setErrorDetails
  } = useContext(BlockchainContext);


  const stakeHandler = async () => {
    // Stake NFT
    if (selectedImages.length > 0) {
      stake(selectedImages);
    } else {
      setErrorDetails("No NFT selected!");
    }
  };

  const imageHandler = (tokenId) => {
    if (selectedImages.includes(tokenId)) {
      setSelectedImages(
        selectedImages.filter((token_id) => token_id !== tokenId)
      );
    } else {
      setSelectedImages((oldArray) => [...oldArray, tokenId]);
    }
  };

  const unstakeHandler = async () => {
    if (selectedImages.length > 0) {
      unstake(selectedImages);
    } else {
      setErrorDetails("No NFT selected!");
    }
  };

  return (
    <section className="section">
      <div className="container">
        {/* Unstaked */}
        {unstakedNfts && unstakedNfts.tokenIds.length > 0 ? (
          <ImagesUnStakingBox unstakedNfts={unstakedNfts} selectedImages={selectedImages} selectStack={imageHandler} />
        ) : (
          <div>
            <TitleSlacking
              title="Unstaked NFTs"
              parg="Oops! Your unstaked NFTs are 0"
            />
          </div>
        )}

        {/* Staked */}
        {stakedNfts && stakedNfts.tokenIds.length > 0 ? (
          <div className="grid-system">
            <ImagesStakingBox stakedNfts={stakedNfts} selectedImages={selectedImages} selectStack={imageHandler} />
            <DailyRevenueBox
              stakedBalance={stakedBalance}
              currentRate={currentRate}
              unstakedBalance={unstakedBalance}
              rewardTokenBalance={rewardTokenBalance}
              stakeHandler={stakeHandler}
              unstakeHandler={unstakeHandler}
            />
          </div>
        ) : (
          <div className="grid-system" >
            <div>
              <TitleSlacking
                title="staked NFTs"
                parg="Oops! Your staked NFTs are 0"
              />
            </div>
            <div>
              <DailyRevenueBox
                stakedBalance={stakedBalance}
                currentRate={currentRate}
                unstakedBalance={unstakedBalance}
                rewardTokenBalance={rewardTokenBalance}
                stakeHandler={stakeHandler}
                unstakeHandler={unstakeHandler}
              />
            </div>
          </div>

        )}

      </div>
    </section>
  )
};
export default DailyRevenueSection;
