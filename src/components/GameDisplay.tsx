import { h } from 'preact';
import { TurnDirection } from '../modules/MotionSource';
import CurrentRateIndicator from './CurrentRateIndicator';
import Arrow from './Arrow';

type TProps = {
  currentTurnRate: number | null;
  turnDirection: TurnDirection
};
export default (props: TProps) => {
  return (
    <div>
      {props.currentTurnRate ? <CurrentRateIndicator ratePerSecond={props.currentTurnRate}/> : null}
      <Arrow direction={props.turnDirection}/>
    </div>
  );
};