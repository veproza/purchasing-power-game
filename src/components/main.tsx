import { Component, h } from 'preact';
import EventHub from '../modules/EventHub';
import { default as MotionSource, IMotionEvents, TurnDirection } from '../modules/MotionSource';
import Arrow from './Arrow';

const motionSource = new MotionSource();

export default () => (
  <div>
    <TurnDebugger eventHub={motionSource.events}/>
  </div>
);
type TProps = {
  eventHub: EventHub<IMotionEvents>;
};
type TState = {
  turnDirection: TurnDirection,
  turnProgress: number
};

class TurnDebugger extends Component<TProps, TState> {
  constructor() {
    super();
    this.state = {
      turnDirection: TurnDirection.Right,
      turnProgress: 0
    };
  }

  componentDidMount() {
    this.props.eventHub.subscribe('turnProgress', (progress) => {
      this.setState({turnProgress: Math.round(progress * 100)});
    });
    this.props.eventHub.subscribe('turnDirectionChange', (turnDirection) => this.setState({turnDirection}));
  }

  render() {
    return (
      <span>
        {this.state.turnDirection}
        <br/>
        {this.state.turnProgress.toString()}
        <Arrow direction={this.state.turnDirection}/>
      </span>
    );
  }
}