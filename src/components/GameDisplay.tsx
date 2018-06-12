import { h } from 'preact';
import { TurnDirection } from '../modules/MotionSource';
import CurrentRateIndicator, { Country } from './CurrentRateIndicator';
import Arrow from './Arrow';
import Score from './Score';
import { PageStates } from './main';

type TProps = {
  currentTurnRate: number | null;
  referenceRate: number | null;
  turnDirection: TurnDirection;
  currentFillPercentage: number;
  onSimulatedTurn: () => void;
  referenceCountry: Country;
  page: PageStates;
};

function makeArrow(props: TProps) {
    return (
        <Arrow
            direction={props.turnDirection}
            fillPercentage={props.currentFillPercentage}
        />
    );
}

function makeImage() {
    return (
        <p>
            <img id="wrench" src="/img/wrenching.gif" />
        </p>
    );
}

export default (props: TProps) => {
  return (
    <div className="game-page">
        {props.currentTurnRate !== null && props.referenceRate
            ? <CurrentRateIndicator
                ratePerSecond={props.currentTurnRate}
                referenceRate={props.referenceRate}
                referenceCountry={props.referenceCountry}
            />
            : null}
        <Score currentScore={props.currentTurnRate || 0} maximumScore={10}/>
        <div className="text-area">
            {props.page === PageStates.RateGatheringPage ? getRateText(props.referenceCountry) : null}
            {props.page === PageStates.GamePage ? getGameText() : null}
        </div>
        {props.currentTurnRate !== 0 ? makeArrow(props) : makeImage()}
        <div className="simulated-turn">
            <button className="btn btn-outline-primary btn-block" onClick={props.onSimulatedTurn}>Work!</button>
        </div>
    </div>
  );
};
const getRateText = (referenceCountry: Country) => {
  return (
    <div className="text-area">
      Let's say that to earn enough to buy a pretzel in {referenceCountry.name}, you have to turn the wrench 10 times.
      So start turning!
    </div>
  );
};
const getGameText = () => {
  return (
    <div className="text-area"/>
  );
};