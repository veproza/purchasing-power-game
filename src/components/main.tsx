import { Component, h } from 'preact';
import bind from 'bind-decorator';
import EventHub from '../modules/EventHub';
import { default as MotionSource, IMotionEvents, TurnDirection } from '../modules/MotionSource';
import GameDisplay from './GameDisplay';
import ContentPage from './ContentPage';

type TProps = {

};
type TState = {
  turnDirection: TurnDirection,
  turnProgress: number,
  currentTurnRate: number | null,
  currentPageState: PageStates;
};

export enum PageStates {
  // noinspection JSUnusedGlobalSymbols
  WelcomePage = 0,
  RateGatheringPage = 1,
  DescriptionPage = 2,
  GamePage = 3,
  PostGamePage = 4
}
export default class Main extends Component<TProps, TState> {
  eventHub: EventHub<IMotionEvents>;
  turnEvents: number[];
  rollingAverageHalfTurnCount = 4;
  isListeningToTurns: boolean = false;
  constructor() {
    super();
    const motionSource = new MotionSource();
    this.eventHub = motionSource.events;
    this.state = {
      turnDirection: TurnDirection.Right,
      turnProgress: 0,
      currentTurnRate: null,
      currentPageState: PageStates.WelcomePage
    };
    this.turnEvents = [];
  }

  componentDidMount() {
    this.startListeningToTurns();
  }

  startListeningToTurns() {
    if (this.isListeningToTurns) {
      return;
    }
    this.eventHub.subscribe('turnProgress', this.onTurnProgress);
    this.eventHub.subscribe('turnDirectionChange', this.onTurnDirectionChange);
    this.isListeningToTurns = true;
  }

  stopListeningToTurns() {
    if (!this.isListeningToTurns) {
      return;
    }
    this.eventHub.unsubscribe('turnProgress', this.onTurnProgress);
    this.eventHub.unsubscribe('turnDirectionChange', this.onTurnDirectionChange);
    this.isListeningToTurns = false;
  }

  render() {
    return (
      <span>
        {this.isGamePage() ? this.renderGamePage() : this.renderContentPage()}
      </span>
    );
  }

  @bind
  setNextPage() {
    if (!this.isGamePage()) {
      this.setState({
        currentTurnRate: null,
        turnProgress: 0
      });
      this.startListeningToTurns();
    } else {
      this.stopListeningToTurns();
    }
    const nextPageState = this.state.currentPageState + 1;
    this.setState({
      currentPageState: nextPageState
    });
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

  private renderGamePage() {
    return (
      <GameDisplay
        turnDirection={this.state.turnDirection}
        currentTurnRate={this.state.currentTurnRate}
      />);
  }

  private renderContentPage() {
    return (
      <ContentPage
        page={this.state.currentPageState}
        onNextClicked={this.setNextPage}
      />
    );
  }

  private isGamePage() {
    return [PageStates.GamePage, PageStates.RateGatheringPage].includes(this.state.currentPageState);
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