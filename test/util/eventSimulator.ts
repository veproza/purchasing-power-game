// handy function to dispatch events and return a promise which is resolved after next tick
export default function simulate(node: Element | string, event: string | Event) {
  // pass a selector or a dom node
  if (typeof node === 'string') {
    const maybeNode = document.querySelector(node);
    if (maybeNode === null) {
      throw new Error(`Node not found: ${node}`);
    }
    node = maybeNode;
  }

  // pass an event object or an event name
  event = event instanceof Event ? event : new Event(event);
  node.dispatchEvent(event);
  // return a promise that resolves on next tick so the invoking code see the update
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}