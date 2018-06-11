import { h } from 'preact';

export default (props: { ratePerSecond: number }) => {
  return (
    <div className="rate-indicator">
      {props.ratePerSecond.toFixed(2)}
    </div>
  );
};