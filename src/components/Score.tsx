import { Component, h } from 'preact';

type ScoreState = {
  currentScore: number;
};
type ScoreProps = {
  currentScore: number,
  maximumScore: number
};
export default class Score extends Component<ScoreProps, ScoreState> {
  addScoreBoxes() {
    let scoreBoxes = [];
    for (let i = 0; i < Math.max(this.props.maximumScore, this.props.currentScore); i++) {
      if (i + 1 <= this.props.currentScore) {
        scoreBoxes.push(<span className="score-box scored"/>);
      } else {
        scoreBoxes.push(<span className="score-box"/>);
      }
    }
    return scoreBoxes;
  }

  componentDidMount() {
    this.setState({currentScore: this.props.currentScore});
  }

  render() {
    const classes = ['score-wrapper'];
    if (this.props.currentScore > 80) {
      classes.push('score-4');
    } else if (this.props.currentScore > 20) {
      classes.push('score-2');
    }
    return (
      <div>
        <div className={classes.join(' ')}>
          {this.addScoreBoxes()}
        </div>
      </div>
    );
  }
}