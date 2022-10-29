import { dequal } from 'dequal';
import { DependencyList } from 'react';

import { HasDiff, RAFIdInfo } from './types';

export class GlobalModel {
  static deepClone = (object: unknown) => JSON.parse(JSON.stringify(object));

  static clearRAFTimeout = (rafIdInfo: RAFIdInfo) => {
    if (rafIdInfo && rafIdInfo.id) {
      cancelAnimationFrame(rafIdInfo.id);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static debounceRAF = (fn: (...params: any[]) => void, time: number) => {
    const rafIdInfo: RAFIdInfo = {
      id: null
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...params: any[]) => {
      if (typeof fn !== 'function' || typeof time !== 'number') {
        return;
      }

      const startTime = performance.now();

      const wait: FrameRequestCallback = (timestamp) => {
        const elapsedTime = timestamp - startTime;

        if (elapsedTime < time) {
          GlobalModel.clearRAFTimeout(rafIdInfo);
          rafIdInfo.id = requestAnimationFrame(wait);
        } else {
          GlobalModel.clearRAFTimeout(rafIdInfo);
          fn(...params);
        }
      };

      GlobalModel.clearRAFTimeout(rafIdInfo);
      rafIdInfo.id = requestAnimationFrame(wait);
    };
  };

  static setRAFTimeout = (callback: () => void, timeout: number) => {
    const rafIdInfo: RAFIdInfo = {
      id: null
    };

    if (typeof callback !== 'function' || typeof timeout !== 'number') {
      return rafIdInfo;
    }

    const startTime = performance.now();

    const wait: FrameRequestCallback = (timestamp) => {
      const elapsedTime = timestamp - startTime;

      if (elapsedTime < timeout) {
        GlobalModel.clearRAFTimeout(rafIdInfo);
        rafIdInfo.id = requestAnimationFrame(wait);
      } else {
        GlobalModel.clearRAFTimeout(rafIdInfo);
        callback();
      }
    };

    rafIdInfo.id = requestAnimationFrame(wait);

    return rafIdInfo;
  };

  static hasDependencyListDiff = ({ comparator, newValue, prevValue }: HasDiff<DependencyList>) => {
    if (newValue.length !== prevValue.length) {
      throw new Error('Inconsistent length of dependency list array');
    }

    let hasChange: boolean;

    if (typeof comparator === 'function') {
      hasChange = comparator({
        newValue,
        prevValue
      });
    } else if (comparator) {
      hasChange = !dequal(newValue, prevValue);
    } else {
      hasChange = newValue.some((dep, depIndex) => dep !== prevValue[depIndex]);
    }

    return hasChange;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static hasValueDiff = ({ comparator, newValue, prevValue }: HasDiff<any>) => {
    let hasDiff: boolean;

    if (typeof comparator === 'function') {
      hasDiff = comparator({ newValue, prevValue });
    } else if (comparator) {
      hasDiff = !dequal(newValue, prevValue);
    } else {
      hasDiff = newValue !== prevValue;
    }

    return hasDiff;
  };
}
