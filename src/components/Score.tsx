import { Component, h } from 'preact';

type ScoreState = {
    currentScore: number;
};
type ScoreProps = {
  currentScore: number,
  maximumScore: number
};
export default class Score extends Component<ScoreProps, ScoreState> {

    constructor() {
        super();
        this.state = {currentScore: 0};
    }

    addScoreBoxes() {
        let scoreBoxes = [];
        if (this.state.currentScore >= this.props.maximumScore) {
            scoreBoxes.push(<span className="score-winner">YOU WIN!</span>);
            return scoreBoxes;
        }
        for (let i = 0; i < this.props.maximumScore; i++) {
            if (i + 1 <= this.state.currentScore) {
                scoreBoxes.push(<span className="score-box scored"/>);
            } else {
                scoreBoxes.push(<span className="score-box"/>);
            }
        }
        return scoreBoxes;
    }

    componentWillReceiveProps(newProps: ScoreProps) {
        this.setState({currentScore: newProps.currentScore});
    }

    render() {
        return (
            <div>
                <span>Your progress:</span>
                <div class="score-wrapper">
                    {this.addScoreBoxes()}
                </div>
            </div>
        );
    }
}