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
    addScore() {
        let nextScore = this.state.currentScore + 1;
        this.setState({currentScore: nextScore});
    }

    render() {
        return (
            <div>Your progress is: {this.state.currentScore}/{this.props.maximumScore}
                <div>
                    <button onClick={this.addScore}>Add Score</button>
                </div>
            </div>);
    }
}