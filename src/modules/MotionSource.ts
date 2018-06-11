import EventHub from './EventHub';

export enum TurnDirection {
  Left = 1,
  Right = -1
}

export interface IMotionEvents {
  halfTurn: void;
  finishTurn: void;
  turnProgress: number;
  turnDirectionChange: TurnDirection;
}

export default class MotionSource {
  events: EventHub<IMotionEvents>;
  private _motionSubscription: (event: DeviceMotionEvent) => void;
  private _rotationTotalizer: number;
  private _lastMotionTime: number | null = null;
  private _thresholdDegrees = 45;
  private _currentDirection: TurnDirection = TurnDirection.Right;

  constructor() {
    this.events = new EventHub<IMotionEvents>();
    this._motionSubscription = this.onMotion.bind(this);
    window.addEventListener('devicemotion', this._motionSubscription);
    this._rotationTotalizer = 0;
  }

  onMotion(event: DeviceMotionEvent) {
    if (event.rotationRate && event.rotationRate.gamma) {
      const degreesPerSecond = event.rotationRate.gamma;
      const timeSinceLastMotion: number | null = this._lastMotionTime ? this._lastMotionTime - Date.now() : null;
      if (event.interval || timeSinceLastMotion) {
        const secondsPassed = event.interval ? event.interval : timeSinceLastMotion!;
        this._lastMotionTime = Date.now();
        const degrees = degreesPerSecond * secondsPassed;
        this._rotationTotalizer += degrees * this._currentDirection;
        if (this._rotationTotalizer < 0) {
          this._rotationTotalizer = 0;
        }
        this.events.send('turnProgress', this._rotationTotalizer / this._thresholdDegrees);
        if (this._rotationTotalizer > this._thresholdDegrees) {
          this._rotationTotalizer = 0;
          this._currentDirection = this._currentDirection === TurnDirection.Left
            ? TurnDirection.Right
            : TurnDirection.Left;
          this.events.send('turnDirectionChange', this._currentDirection);
          this.events.send('halfTurn', undefined);
          if (this._currentDirection === 1) {
            this.events.send('finishTurn', undefined);
          }
        }
      }
    }
  }
}