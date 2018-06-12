import { h } from 'preact';
import { PageStates } from './main';

type TProps = {
  page: PageStates;
  onNextClicked: () => void;
};
export default ({page, onNextClicked}: TProps) => {
  let content: JSX.Element;
  let nextButtonText: string | null;
  switch (page) {
    case PageStates.WelcomePage:
      content = renderWelcome();
      nextButtonText = `Try some turnin‘!`;
      break;
    case PageStates.DescriptionPage:
      content = renderDescription();
      nextButtonText = `Let's see how hard it is...`;
      break;
    case PageStates.RateGatheringPage:
      content = renderPostGame();
      nextButtonText = null;
      break;
    default:
      throw new Error(`Unknown page: ${page}`);
  }
  return (
    <div className="page">
      <div className="content">
        {content}
      </div>
      {nextButtonText ? renderNextButton(onNextClicked, nextButtonText) : null}
    </div>
  );
};
let renderNextButton = function (onNextClicked: () => void, nextButtonText: string) {
  return (
    <div className="bottom">
      <button className="btn btn-primary btn-block" onClick={onNextClicked}>
        {nextButtonText}
      </button>
    </div>
  );
};

const renderWelcome = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        Bacon ipsum dolor amet corned beef meatball boudin frankfurter landjaeger.
        Leberkas chuck turkey swine prosciutto. Pork chop pancetta tri-tip, short loin filet mignon venison burgdoggen.
        Pork chop frankfurter swine sirloin jowl bacon. Bacon ribeye sirloin, chuck picanha biltong meatball pastrami
        corned beef ham short loin ham hock.</p>
    </div>
  );
};
const renderDescription = () => {
  return (
    <div>
      <h1>Description!</h1>
      <p>
        Bacon ipsum dolor amet corned beef meatball boudin frankfurter landjaeger.
        Leberkas chuck turkey swine prosciutto. Pork chop pancetta tri-tip, short loin filet mignon venison burgdoggen.
        Pork chop frankfurter swine sirloin jowl bacon. Bacon ribeye sirloin, chuck picanha biltong meatball pastrami
        corned beef ham short loin ham hock.</p>
    </div>
  );
};
const renderPostGame = () => {
  return (
    <div>
      <h1>PostGame!</h1>
      <p>
        Bacon ipsum dolor amet corned beef meatball boudin frankfurter landjaeger.
        Leberkas chuck turkey swine prosciutto. Pork chop pancetta tri-tip, short loin filet mignon venison burgdoggen.
        Pork chop frankfurter swine sirloin jowl bacon. Bacon ribeye sirloin, chuck picanha biltong meatball pastrami
        corned beef ham short loin ham hock.</p>
    </div>
  );
};