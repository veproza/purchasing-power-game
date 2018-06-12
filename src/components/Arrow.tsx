import { h } from 'preact';
import { TurnDirection } from '../modules/MotionSource';

type TProps = {
  direction: TurnDirection;
  fillPercentage: number;
};
export default (props: TProps) => {
  const className = ['arrow-container'];
  if (props.direction === TurnDirection.Left) {
    className.push('flip');
  }
  const gradientLowPercentage = `${(props.fillPercentage - 0.025) * 100}%`;
  const gradientHighPercentage = `${(props.fillPercentage + 0.025) * 100}%`;
  return (
    <div className={className.join(' ')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 776.09175 693.66538"
        height="693.66541"
        width="776.0918"
        y="0px"
        x="0px"
        id="Layer_1"
        version="1.1"
      >
        <defs id="defs9">
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={gradientLowPercentage} style="stop-color:rgb(71,121,152);stop-opacity:1"/>
            <stop offset={gradientHighPercentage} style="stop-color:rgb(255,255,255);stop-opacity:1"/>
          </linearGradient>
        </defs>
        <g
          transform="matrix(2.7190747,0,0,3.1037754,-326.9763,-1172.9045)"
          id="g3"
        >
          <path
            style="clip-rule:evenodd;fill-rule:evenodd"
            fill="url(#grad1)"
            stroke="rgb(71,121,152)"
            id="path5"
            d="m 130.838,381.118 c 1.125,28.749 5.277,54.82 12.695,78.018 7.205,22.53 18.847,40.222 36.812,
            53.747 52.018,39.16 153.369,16.572 153.369,16.572 l -4.632,-32.843 72.918,42.778 -58.597,58.775 -3.85,
            -27.303 c 0,0 -100.347,18.529 -163.905,-34.881 -37.659,-31.646 -53.293,-84.021 -51.593,-153.962 0.266,
            -0.247 4.728,-0.908 6.783,-0.901 z"
          />
        </g>
      </svg>
    </div>
  );
};