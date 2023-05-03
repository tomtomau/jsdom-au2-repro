import { BrowserPlatform } from '@aurelia/platform-browser';
import { setPlatform } from '@aurelia/testing';
import { noop } from 'aurelia';
// Need to import and globally register TextEncoder first before JSDOM
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`, {pretendToBeVisual: true});

function $queueMicrotask(cb: () => void): void {
  Promise.resolve().then(cb).catch(function (err) {
    throw err;
  });
}

const w = jsdom.window as unknown as Window & typeof globalThis;
const platform = new BrowserPlatform(w, {
  queueMicrotask: typeof w.queueMicrotask === 'function'
    ? w.queueMicrotask.bind(w)
    : $queueMicrotask,
  fetch: typeof w.fetch === 'function'
    ? w.fetch.bind(w)
    : noop as any,
});

setPlatform(platform);
BrowserPlatform.set(globalThis, platform);
