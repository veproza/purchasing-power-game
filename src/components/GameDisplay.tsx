import { h } from 'preact';
import { TurnDirection } from '../modules/MotionSource';
import CurrentRateIndicator, { countries } from './CurrentRateIndicator';
import Arrow from './Arrow';
import Score from './Score';

type TProps = {
  currentTurnRate: number | null;
  referenceRate: number | null;
  turnDirection: TurnDirection;
  currentFillPercentage: number
};
const referenceCountry = countries[1];
export default (props: TProps) => {
  return (
    <div>
      {props.currentTurnRate && props.referenceRate
        ? <CurrentRateIndicator
          ratePerSecond={props.currentTurnRate}
          referenceRate={props.referenceRate}
          referenceCountry={referenceCountry}
        />
        : null}
      <Score currentScore={0} maximumScore={10} />
      <Arrow
        direction={props.turnDirection}
        fillPercentage={props.currentFillPercentage}
      />

    </div>
  );
};