import { Component, h } from 'preact';
import EventHub from '../modules/EventHub';
import { default as MotionSource, IMotionEvents, TurnDirection } from '../modules/MotionSource';
import Arrow from './Arrow';
import CurrentRateIndicator from './CurrentRateIndicator';

type TProps = {

};
type TState = {
  turnDirection: TurnDirection,
  turnProgress: number,
  currentTurnRate: number | null
};
export default class Main extends Component<TProps, TState> {
  eventHub: EventHub<IMotionEvents>;
  turnEvents: number[];
  rollingAverageHalfTurnCount = 4;
  constructor() {
    super();
    const motionSource = new MotionSource();
    this.eventHub = motionSource.events;
    this.state = {
      turnDirection: TurnDirection.Right,
      turnProgress: 0,
      currentTurnRate: null
    };
    this.turnEvents = [];
  }

  componentDidMount() {
    this.eventHub.subscribe('turnProgress', (progress) => {
      this.setState({turnProgress: Math.round(progress * 100)});
    });
    this.eventHub.subscribe('turnDirectionChange', (turnDirection) => this.setState({turnDirection}));
    this.eventHub.subscribe('turnDirectionChange', () => {
      this.turnEvents.push(Date.now());
      if (this.turnEvents.length > this.rollingAverageHalfTurnCount) {
        const relevantTimestamp = this.turnEvents[this.turnEvents.length - this.rollingAverageHalfTurnCount];
        const timeTaken = (Date.now() - relevantTimestamp) / 1000;
        const averageTime = this.rollingAverageHalfTurnCount / timeTaken;
        this.setState({currentTurnRate: averageTime});
      }
    });
  }

  render() {
    return (
      <span>
        {this.state.currentTurnRate ? <CurrentRateIndicator ratePerSecond={this.state.currentTurnRate}/> : null}
        <Arrow direction={this.state.turnDirection}/>
      </span>
    );
  }
}