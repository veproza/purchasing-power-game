import { h } from 'preact';
import { TurnDirection } from '../modules/MotionSource';
import CurrentRateIndicator, { countries, Country } from './CurrentRateIndicator';
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
  // noinspection HtmlUnknownTarget
  return (
    <div className="wrench-container">
      <img id="wrench" src="img/wrenching.gif"/>
    </div>
  );
}

const sortedCountries = countries.slice().sort((a, b) => {
  return b.gdp - a.gdp;
});
export default (props: TProps) => {
  const currentTurningRatio = (props.referenceRate || 0) / (props.currentTurnRate || 1);
  const extrapolatedGdp = props.referenceCountry.gdp * currentTurningRatio;
  const smallerThanCountries = sortedCountries.filter(c => c.gdp > extrapolatedGdp).pop();
  const higherThanCountries = sortedCountries.filter(c => c.gdp <= extrapolatedGdp).shift();

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
        {props.page === PageStates.GamePage
          ? getGameText(props.currentTurnRate, smallerThanCountries, higherThanCountries)
          : null}
      </div>
      <div className="wrench-arrow">
        {props.currentTurnRate === null || props.currentTurnRate <= 15 ? makeArrow(props) : null}
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
const getGameText = (score: number | null,
                     nearestLowerCountry: Country | undefined,
                     nearestUpperCountry: Country | undefined) => {

  return (
    <div className="text-area">
      You've turned <b>{score || 0} nuts</b>.
      <span>&nbsp;</span>
      {nearestLowerCountry
        ? <span>That's enough for a pretzel in <b>{nearestLowerCountry.name}</b></span>
        : <span>That's not enough to make a pretzel in even the most developed countries.</span>
      }
      <span>&nbsp;</span>
      {nearestUpperCountry
        ? <span>If you turn a few more, you'll make enough for a snack in <b>{nearestUpperCountry.name}</b></span>
        : <span>There's very few countries where that wouldn't buy you a snack!
              You must be really tired by now, try clicking the big red button to finish the game.</span>
      }
    </div>
  );
};