import { h } from 'preact';
import { PageStates } from './main';
import { countries, Country } from './CurrentRateIndicator';

type TProps = {
  page: PageStates;
  onNextClicked: () => void;
  onCountrySelected: (country: Country) => void;
  referenceCountry: Country;
};
export const availableCountries = countries.filter(c => c.selectable);
export default ({referenceCountry, page, onNextClicked, onCountrySelected}: TProps) => {
  let content: JSX.Element;
  let nextButtonText: string | null;
  switch (page) {
    case PageStates.WelcomePage:
      content = renderWelcome(referenceCountry, onCountrySelected);
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
const renderWelcome = (currentCountry: Country, onCountrySelected: (country: Country) => void) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        Bacon ipsum dolor amet corned beef meatball boudin frankfurter landjaeger.
        Leberkas chuck turkey swine prosciutto. Pork chop pancetta tri-tip, short loin filet mignon venison burgdoggen.
        Pork chop frankfurter swine sirloin jowl bacon. Bacon ribeye sirloin, chuck picanha biltong meatball pastrami
        corned beef ham short loin ham hock.
      </p>
      <b>
        Which country would you like to compare to?
      </b>
      <div className="country-selector">
        {availableCountries.map((country, index) => {
          const className = country === currentCountry ? 'active' : '';
          return (
            <button
              className={className}
              key={index}
              onClick={() => onCountrySelected(country)}
            >
              <img src={country.flag} alt={country.name}/>
              <span className="name">
                  {country.name}
                </span>
            </button>
          );
        })}
      </div>
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