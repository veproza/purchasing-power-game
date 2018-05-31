// noinspection ES6UnusedImports
import {} from 'mocha';
import { h, render } from 'preact';
import { assert } from 'chai';
import { createShallowRenderer } from './shallowRendering';
import simulate from './eventSimulator';

const timeout = (time = 10) => new Promise<void>(resolve => {
  setTimeout(resolve, time);
});

export { h, render, assert, timeout, simulate, createShallowRenderer };