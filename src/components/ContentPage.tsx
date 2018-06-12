import { h } from 'preact';
import { PageStates } from './main';

type TProps = {
  page: PageStates;
  onNextClicked: (selectedLanguage: string, activityChooser: string, scopeDefiner: string) => void;
};

// bekommt page und onNextClicked vom Type TProps
export default ({page, onNextClicked}: TProps) => {
  const content = page === PageStates.WelcomePage
    ? renderWelcome(onNextClicked)
    : page === PageStates.DescriptionPage
      ? renderDescription()
      : renderPostGame();
  return (
    <div className="page">
      {content}
    </div>
  );
};

export const AvailableLanguages = [
    'german',
    'english',
    'czech',
    'finnish'
];
/*
export const ActivityChooser = [
  'doctor',
  'programmer',
  'Mcdonald worker',
  'test'
];
 */


const renderWelcome = (onLanguageClicked: (language: string, activityChooser: string, scopeDefiner: string ) => void) => {
  let Activity : HTMLSelectElement;
  let Scope: HTMLSelectElement;
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        Bacon ipsum dolor amet corned beef meatball boudin frankfurter landjaeger.
        Leberkas chuck turkey swine prosciutto. Pork chop pancetta tri-tip, short loin filet mignon venison burgdoggen.
        Pork chop frankfurter swine sirloin jowl bacon. Bacon ribeye sirloin, chuck picanha biltong meatball pastrami
        corned beef ham short loin ham hock.</p>
        <h4>Choose a Activity</h4>

        <select ref={(element) => Activity = element}>ActivityChooser
            <option value="doctor">Doctor</option>
            <option value="programmer">Programmer</option>
            <option value="Mcdonald worker">Mcdonald worker</option>
            <option value="test">Test</option>
        </select>

        <h4>What is your Scope</h4>

        <select  ref={(element) => Scope = element}>ScopeDefiner
            <option value="Car">Car</option>
            <option value="Big Mac">Big Mac</option>
            <option value="Test1">test1</option>
            <option value="test2">Test2</option>
        </select>

        <h4>Choose a language!</h4>
        {AvailableLanguages.map((language, index) => {
            return (
                <button key={index} onClick={() => onLanguageClicked(language, Activity.value, Scope.value)}>{language}
                </button>
            );

        })}

    </div>
  );
};

const renderDescription = () => {
  return (
    <div>
      <h1>Description!</h1>
      <p>
        test test test test3 test3</p>
    </div>
  );
};
const renderPostGame = () => {
  return (
    <div>
      <h1>PostGame!</h1>
      <p>
        test test test test test4.</p>
    </div>
  );
};