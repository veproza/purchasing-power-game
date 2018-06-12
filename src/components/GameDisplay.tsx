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
  onNextRequested: () => void;
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
    <div className="wrench-container">
      <img id="wrench" src="/img/wrenching.gif"/>
    </div>
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
        {props.page === PageStates.RateGatheringPage
          ? getRateText(props.referenceCountry, props.currentTurnRate)
          : null}
        {props.page === PageStates.GamePage ? getGameText() : null}
      </div>
      <div className="wrench-arrow">
        {makeArrow(props)}
        {props.currentTurnRate === 0 ? makeImage() : null}
      </div>
      <div className="simulated-turn">
        {props.currentTurnRate && props.currentTurnRate > 15 ? renderEndButton(props.onNextRequested) : null}
        <button className="btn btn-outline-primary btn-block" onClick={props.onSimulatedTurn}>Work!</button>
      </div>
    </div>
  );
};
const renderEndButton = (onClick: () => void) => {
  return (
    <button className="btn btn-reverse btn-block" onClick={onClick}>I'm tired already!</button>
  );
};

const getRateText = (referenceCountry: Country, score: number | null) => {
  const targetScore = 10;
  if (score && score > 1) {
    return (
      <div className="text-area">
        You've turned <strong>{score}</strong> nuts. Turn {targetScore - score} more for your pretzel!
      </div>
    );
  } else {
    return (
      <div className="text-area">
        Let's say that to earn enough to buy a pretzel in {referenceCountry.name}, you have to turn the wrench 10 times.
        So start turning!
      </div>
    );
  }
};
const getGameText = () => {
  return (
    <div className="text-area"/>
  );
};