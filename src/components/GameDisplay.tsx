import { h } from 'preact';
import { TurnDirection } from '../modules/MotionSource';
import CurrentRateIndicator from './CurrentRateIndicator';
import Arrow from './Arrow';
import Score from './Score';

type TProps = {
  currentTurnRate: number | null;
  turnDirection: TurnDirection
};
export default (props: TProps) => {
  return (
    <div>
      {props.currentTurnRate ? <CurrentRateIndicator ratePerSecond={props.currentTurnRate}/> : null}
        <Score currentScore={0} maximumScore={10} />
        <Arrow direction={props.turnDirection}/>
    </div>
  );
};