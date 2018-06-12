import { Component, h } from 'preact';
import bind from 'bind-decorator';
import EventHub from '../modules/EventHub';
import { default as MotionSource, IMotionEvents, TurnDirection } from '../modules/MotionSource';
import GameDisplay from './GameDisplay';

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
    this.startListeningToTurns();
  }

  startListeningToTurns() {
    this.eventHub.subscribe('turnProgress', this.onTurnProgress);
    this.eventHub.subscribe('turnDirectionChange', this.onTurnDirectionChange);
  }

  render() {
    return (
      <span>
        <GameDisplay
          turnDirection={this.state.turnDirection}
          currentTurnRate={this.state.currentTurnRate}
        />
      </span>
    );
  }

  @bind
  onTurnProgress(progress: number) {
    this.setState({turnProgress: Math.round(progress * 100)});
  }

  @bind
  onTurnDirectionChange(turnDirection: TurnDirection) {
    this.setState({turnDirection});
    this.computeAverageTurningRate();
  }

  private computeAverageTurningRate() {
    this.turnEvents.push(Date.now());
    if (this.turnEvents.length > this.rollingAverageHalfTurnCount) {
      const relevantTimestamp = this.turnEvents[this.turnEvents.length - this.rollingAverageHalfTurnCount];
      const timeTaken = (Date.now() - relevantTimestamp) / 1000;
      const averageTime = this.rollingAverageHalfTurnCount / timeTaken;
      this.setState({currentTurnRate: averageTime});
    }
  }
}