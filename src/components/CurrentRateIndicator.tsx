import { h } from 'preact';

class Country {
  name: string;
  flag: string;
  gdp: number;

  constructor(name: string, gdp: number, flag: string) {
    this.name = name;
    this.flag = flag;
    this.gdp = gdp;
  }
}

// noinspection TsLint
export const countries: Country[] = [
  new Country('Luxembourg', 109192, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/35px-Flag_of_Luxembourg.svg.png'),
  new Country('Germany', 50206, 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/35px-Flag_of_Germany.svg.png'),
  new Country('United States', 59495, 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/35px-Flag_of_the_United_States.svg.png'),
  new Country('Czech Republic', 35223, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/35px-Flag_of_the_Czech_Republic.svg.png'),
  new Country('France', 43550, 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/35px-Flag_of_France.svg.png'),
  new Country('Ukraine', 8656, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/35px-Flag_of_Ukraine.svg.png'),
  new Country('Romania', 23991, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/35px-Flag_of_Romania.svg.png'),
  new Country('China', 16624, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/35px-Flag_of_the_People%27s_Republic_of_China.svg.png'),
  new Country('Moldova', 5657, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/35px-Flag_of_Moldova.svg.png')
];
type TProps = {
  ratePerSecond: number;
  referenceRate: number;
  referenceCountry: Country;
};
export default (props: TProps) => {
  const sortedCountries = countries
    .map((country) => {
      const difference = Math.abs(country.gdp - props.referenceCountry.gdp);
      return {country, difference};
    })
    .sort((a, b) => a.difference - b.difference)
    .map((a) => a.country);
  const smallestDifference = Math.abs(sortedCountries[0].gdp - sortedCountries[2].gdp);
  const currentTurningRatio = props.referenceRate / props.ratePerSecond;
  const extrapolatedGdp = props.referenceCountry.gdp * currentTurningRatio;
  const countriesAndPositions = sortedCountries.map((country) => {
    const countryDifference = country.gdp - extrapolatedGdp;
    const fraction = countryDifference / smallestDifference;
    const position = 100 - (fraction + 0.5) * 100;
    return {country, position};
  });
  return (
    <div className="rate-indicator">
      {countriesAndPositions.map((countryAndPosition, i) => {
        return (
          <CountryPosition
            key={i}
            country={countryAndPosition.country}
            position={countryAndPosition.position}
          />
        );
      })}
    </div>
  );
};
const CountryPosition = (props: { country: Country, position: number, key: number }) => {
  const bandedPosition = Math.max(0, Math.min(100, props.position));
  const zindex = 999999 - Math.round(Math.abs(props.position));
  return (
    <div className="flag" style={`left: ${bandedPosition}%; z-index: ${zindex}`}>
      <img src={props.country.flag}/>
    </div>
  );
};