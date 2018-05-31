// noinspection ES6UnusedImports
import {} from 'mocha';
import { h, render } from 'preact';
import { assert } from 'chai';

const timeout = () => new Promise(resolve => {
  setTimeout(resolve, 10);
});

export { h, render, assert, timeout };