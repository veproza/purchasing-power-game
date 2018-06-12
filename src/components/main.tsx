import { Component, h } from 'preact';
import bind from 'bind-decorator';
import EventHub from '../modules/EventHub';
import { default as MotionSource, IMotionEvents, TurnDirection } from '../modules/MotionSource';
import GameDisplay from './GameDisplay';
import ContentPage from './ContentPage';
import { countries, Country } from './CurrentRateIndicator';

type TProps = {

};
type TState = {
  turnDirection: TurnDirection,
  turnProgress: number,
  currentTurnScore: number | null,
  referenceTurnScore: number | null,
  currentPageState: PageStates,
  referenceCountry: Country
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
  isListeningToTurns: boolean = false;
  turnsForReferenceScreen = 10;
  constructor() {
    super();
    const motionSource = new MotionSource();
    this.eventHub = motionSource.events;
    this.state = {
      turnDirection: TurnDirection.Right,
      turnProgress: 0,
      currentTurnScore: null,
      referenceTurnScore: null,
      currentPageState: PageStates.WelcomePage,
      referenceCountry: countries[0]
    };
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
      <div className="main">
        {this.isGamePage() ? this.renderGamePage() : this.renderContentPage()}
      </div>
    );
  }

  @bind
  setNextPage() {
    document.body.scrollTop = 0;
    if (!this.isGamePage()) {
      this.setState({
        currentTurnScore: 0,
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
    this.setState({turnProgress: progress});
  }

  @bind
  onTurnDirectionChange(turnDirection: TurnDirection, forceIncrement: boolean = false) {
    this.setState({turnDirection});
    const newTurnCount = turnDirection === TurnDirection.Left || forceIncrement
      ? (this.state.currentTurnScore || 0) + 1
      : (this.state.currentTurnScore || 0);
    const isRateGatheringPage = this.state.currentPageState === PageStates.RateGatheringPage;
    const gatheredEnoughData = newTurnCount >= this.turnsForReferenceScreen;
    if (isRateGatheringPage && gatheredEnoughData) {
      this.setState({referenceTurnScore: this.state.currentTurnScore, currentTurnScore: 0});
      this.setNextPage();
    } else {
      this.setState({currentTurnScore: newTurnCount});
    }
  }

  @bind
  onSimulatedTurn() {
    this.stopListeningToTurns();
    const newTurnDirection = this.state.turnDirection === TurnDirection.Left
      ? TurnDirection.Right
      : TurnDirection.Left;
    this.onTurnDirectionChange(newTurnDirection, true);
  }

  @bind
  onReferenceCountryChanged(country: Country) {
    this.setState({referenceCountry: country});
  }

  private renderGamePage() {
    return (
      <GameDisplay
        turnDirection={this.state.turnDirection}
        currentTurnRate={this.state.currentTurnScore}
        currentFillPercentage={this.state.turnProgress}
        referenceRate={this.state.referenceTurnScore}
        onSimulatedTurn={this.onSimulatedTurn}
        referenceCountry={this.state.referenceCountry}
        page={this.state.currentPageState}
        onNextRequested={this.setNextPage}
      />);
  }

  private renderContentPage() {
    return (
      <ContentPage
        page={this.state.currentPageState}
        onNextClicked={this.setNextPage}
        onCountrySelected={this.onReferenceCountryChanged}
        referenceCountry={this.state.referenceCountry}
      />
    );
  }

  private isGamePage() {
    return [PageStates.GamePage, PageStates.RateGatheringPage].includes(this.state.currentPageState);
  }
}