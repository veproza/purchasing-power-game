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
      nextButtonText = `Start turnin‘!`;
      break;
    case PageStates.DescriptionPage:
      content = renderDescription(referenceCountry);
      nextButtonText = `Let's see how hard it is...`;
      break;
    case PageStates.PostGamePage:
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
      <h1>No pain, no&nbsp;gain?</h1>
      <p>
        The harder you work, the more money you make, right? Let’s give it a try.
      </p>
      <p>
        Imagine the phone you are holding is a wrench and you are medium skilled construction worker.
      </p>
      <p>
        <img id="phone" src="img/phonewrench.png"/>
      </p>
      <p>
        Now, try to tighten some bolts by turning your phone like a wrench!
      </p>
      <b>
        Which country would you like to compare to?
      </b>
      <div className="country-selector">
        <div className="flags">
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
        <span className="selected-name">
          {currentCountry.name}
          </span>
      </div>
    </div>
  );
};
const renderDescription = (referenceCountry: Country) => {
  return (
    <div>
      <div className="pretzel-overlay"/>
      <h1>Good job!</h1>
      <p>
        By turning the key 10 times, you just made <strong>1€</strong>.
        You can buy a pretzel in {referenceCountry.name}!
      </p>
      <p>
        To make the same amount of money in less developed parts of the world, you’d have to do more work.
        Similarly, in more developed countries, you'd need to tighten fewer bolts.
        Give it a try and see for yourself, how many more or less bolts does it take to get the same compensation.
      </p>
    </div>
  );
};
const renderPostGame = () => {
  // noinspection TsLint
  return (
    <div>
      <h1>Take a rest. You've earned it!</h1>
      <p>
        This game uses real wage <a href="https://wageindicator.org/salary/wages-in-context">data from University of
        Amsterdam</a>.
      </p>
      <p>
        Economists and labour unions are worried about <strong>The Productivity Gap</strong>, or the dettachment of work
        productivity from the financial compensation for workers.
      </p>
      <p>
        Read about how severe it is in <a
        href="https://ec.europa.eu/info/sites/info/files/economy-finance/dp079_en.pdf">Europe</a>, <a
        href="https://feb.kuleuven.be/public/N07057/CV/vb11wd.pdf">Africa</a>, the <a
        href="https://www.bls.gov/opub/btn/volume-6/pdf/understanding-the-labor-productivity-and-compensation-gap.pdf">United
        States</a> and <a
        href="http://www.ilo.org/wcmsp5/groups/public/@dgreports/@dcomm/@publ/documents/publication/wcms_537846.pdf"> all
        over the world</a>.
      </p>
    </div>
  );
};