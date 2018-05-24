import { Component, h } from 'preact';

export default () => (
  <div>
    <Hello/>
  </div>
);

class Hello extends Component<{}, {}> {
  render() {
    return (
      <div>
        Hi!
      </div>
    );
  }
}
