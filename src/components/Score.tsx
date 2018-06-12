import { Component, h } from 'preact';
import bind from 'bind-decorator';

type ScoreState = {
    currentScore: number;
};

export default class Score extends Component<{ currentScore: number, maximumScore: number }, ScoreState> {

    constructor() {
        super();
        this.state = {currentScore: 0};
    }

    @bind
    addScore(scorePoints: number) {
        this.setState({currentScore: this.state.currentScore + scorePoints});
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

    render() {
        return (
            <div>
                <span>Your progress:</span>
                <div class="score-wrapper">
                    {this.addScoreBoxes()}
                </div>
                <button onClick={this.addScore.bind(this, 2)}>Add 2 Scorepoints (debug)</button>
            </div>);
    }
}