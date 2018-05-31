// kudos https://gist.github.com/philmander/29eb95e7992eb360ed7f537ea29db17b
import { h, options as preactOptions, render } from 'preact';

let shouldRenderShallow;
let previousVNodeHook;

type opts = {
  prefix?: string,
  context?: object
};

export function createShallowRenderer({prefix = 'h-', context = {}}: opts = {}) {
  shouldRenderShallow = 2;
  preactOptions.vnode = node => {
    if (previousVNodeHook) {
      previousVNodeHook(node);
    }
    if (typeof node.nodeName === 'string') {
      return;
    }
    if (shouldRenderShallow <= 0) {
      node.nodeName = prefix + node.nodeName.name;
      if (node.attributes) {
        Object.keys(node.attributes).forEach((key) => {
          node.attributes[key] = JSON.stringify(node.attributes[key]);
        });
      }
    }
    shouldRenderShallow--;
  };
  return {
    render: (vnode, parent: Element | Document, merge?: Element) => {
      // noinspection TsLint
      const vnodeWithContext = h((ContextWrapper as any), {context}, vnode);
      render(vnodeWithContext, parent, merge);
    },
    cleanup: () => {
      preactOptions.vnode = previousVNodeHook;
    }
  };
}


// wraps the node under test so a test context can be injected
type contextWrapperParam = {
  context: object,
  children: object
};
type TContext = { context: object };

function ContextWrapper(this: TContext, {context, children}: contextWrapperParam) {
  this.context = Object.assign(this.context, context);
  return <div> {children} </div>;
}
