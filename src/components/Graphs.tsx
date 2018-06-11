import { Component, h } from 'preact';


export default () => (
  <div>
    <Graph dir="x" />
    <Graph dir="y" />
    <Graph dir="z" />
    <Graph dir="alpha" />
    <Graph dir="beta" />
    <Graph dir="gamma" />
  </div>
);

class Graph extends Component<{dir: 'x' | 'y' | 'z' | 'alpha' | 'beta' | 'gamma'}, {}> {
  canvas: HTMLCanvasElement | null;
  values: number[];
  acceletationProperties = ['x', 'y', 'z'];
  rotationValues = ['alpha', 'beta', 'gamma'];
  isAcceleration: boolean;
  absoluteMaximum: number;
  constructor() {
    super();
    this.values = [];
    this.canvas = null;
    this.absoluteMaximum = 0;
    this.isAcceleration = true;
  }

  componentDidMount() {
    this.isAcceleration = this.acceletationProperties.includes(this.props.dir);
    let counter = 0;
    let midValues: number[] = [];
    window.addEventListener('devicemotion', (event) => {
      if (event && event.acceleration && event.rotationRate) {
        const value = this.isAcceleration
          ? event.acceleration![this.props.dir]
          : event.rotationRate![this.props.dir];
        if (this.isAcceleration) {
          this.acceletationProperties.forEach((prop) => {
            const absVal = Math.abs(event.acceleration![prop]);
            if (absVal > this.absoluteMaximum) {
              this.absoluteMaximum = absVal;
            }
          });
        } else {
          this.rotationValues.forEach((prop) => {
            const absVal = Math.abs(event.rotationRate![prop]);
            if (absVal > this.absoluteMaximum) {
              this.absoluteMaximum = absVal;
            }
          });
        }
        if (value !== null) {
          counter++;
          midValues.push(value);
          if (counter % 10) {
            return;
          } else {
            const maxValue = Math.max(...midValues);
            midValues.length = 0;
            this.values.push(maxValue);
            this.drawFrame(event.interval ? event.interval.toString() : 'null');
          }
        }
      }
    });
  }

  drawFrame(str?: string) {
    if (!this.canvas) {
      return;
    }
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    const xStep = 10;
    const maxXValues = width / xStep;
    const startIndex = Math.max(this.values.length - maxXValues, 0);
    const values = this.values.slice(startIndex);
    this.values = values;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const context = this.canvas.getContext('2d')!;
    const toY = (value: number) => (height / 2) + ((value / this.absoluteMaximum) * height / 2);
    const toX = (index: number) => index * xStep;
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, toY(values[0]));
    values.slice(1).forEach((value, index) => {
      context.lineTo(toX(index + 1), toY(value));
    });
    context.strokeStyle = 'black';
    context.stroke();
    if (str) {
      context.fillText(str, 0, 10);
    } else {
      context.fillText(`${min} - ${max}`, 0, 10);
    }
  }

  render() {
    return (<canvas height="60" ref={(e) => this.canvas = e}/>);
  }
}