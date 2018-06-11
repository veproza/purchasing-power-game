import { Component, h } from 'preact';
import EventHub from '../modules/EventHub';
import { default as MotionSource, IMotionEvents, TurnDirection } from '../modules/MotionSource';
import Arrow from './Arrow';

type TProps = {

};
type TState = {
  turnDirection: TurnDirection,
  turnProgress: number
};
export default class Main extends Component<TProps, TState> {
  eventHub: EventHub<IMotionEvents>;
  constructor() {
    super();
    const motionSource = new MotionSource();
    this.eventHub = motionSource.events;
    this.state = {
      turnDirection: TurnDirection.Right,
      turnProgress: 0
    };
  }

  componentDidMount() {
    this.eventHub.subscribe('turnProgress', (progress) => {
      this.setState({turnProgress: Math.round(progress * 100)});
    });
    this.eventHub.subscribe('turnDirectionChange', (turnDirection) => this.setState({turnDirection}));
  }

  render() {
    return (
      <span>
        {this.state.turnProgress.toString()}
        <Arrow direction={this.state.turnDirection}/>
      </span>
    );
  }
}