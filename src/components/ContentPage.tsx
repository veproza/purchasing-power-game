import { h } from 'preact';
import { PageStates } from './main';

type TProps = {
  page: PageStates;
  onNextClicked: () => void;
};
export default ({page, onNextClicked}: TProps) => {
  const content = page === PageStates.WelcomePage
    ? renderWelcome()
    : page === PageStates.DescriptionPage
      ? renderDescription()
      : renderPostGame();
  return (
    <div className="page">
      {content}
      <button onClick={onNextClicked}>Next</button>
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