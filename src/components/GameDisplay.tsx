import { h } from 'preact';
import { TurnDirection } from '../modules/MotionSource';
import CurrentRateIndicator, { countries } from './CurrentRateIndicator';
import Arrow from './Arrow';
import Score from './Score';

type TProps = {
  currentTurnRate: number | null;
  referenceRate: number | null;
  turnDirection: TurnDirection;
  currentFillPercentage: number;
  onSimulatedTurn: () => void;
};
const referenceCountry = countries[2];
export default (props: TProps) => {
  return (
    <div className="game-page">
      {props.currentTurnRate !== null && props.referenceRate
        ? <CurrentRateIndicator
          ratePerSecond={props.currentTurnRate}
          referenceRate={props.referenceRate}
          referenceCountry={referenceCountry}
        />
        : null}
      <Score currentScore={props.currentTurnRate || 0} maximumScore={10}/>
      <div className="text-area"/>
      <Arrow
        direction={props.turnDirection}
        fillPercentage={props.currentFillPercentage}
      />
      <div className="simulated-turn">
        <button className="btn btn-outline-primary btn-block" onClick={props.onSimulatedTurn}>Work!</button>
      </div>
    </div>
  );
};