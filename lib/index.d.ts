/// <reference types="react" />
import * as react from 'react';
import { EffectCallback, RefObject, DependencyList, MutableRefObject } from 'react';

declare type CleanupCallback = void | (() => void | undefined);
declare type KeyboardEventType = 'keydown' | 'keyup';
declare type MountCallback = EffectCallback | {
    (): Promise<void>;
};
declare type UpdateCallback = EffectCallback | {
    (): Promise<void>;
};
declare type UseKeyboardEventConfig = {
    eventType: KeyboardEventType;
    handler: (event: KeyboardEvent) => void;
};
declare type UseMutationObserverConfig = {
    callback: MutationCallback;
    config: MutationObserverInit;
    target: RefObject<Node>;
};
declare type UseOnOutsideClickConfig = {
    callback: () => void;
    element: RefObject<HTMLElement>;
};
declare type UseResizeObserverConfig = {
    callback: ResizeObserverCallback;
    target: RefObject<HTMLElement>;
};

declare const useClass: (classes: (string | boolean | undefined)[], dependencyList?: DependencyList) => string;

declare const useIsMounted: () => react.MutableRefObject<boolean>;

declare const useKeyboardEvent: ({ eventType, handler }: UseKeyboardEventConfig) => void;

declare const useLastDiffValue: <T>(value: T, comparator?: (({ prevValue, newValue }: {
    prevValue: T;
    newValue: T;
}) => boolean) | undefined) => T | undefined;

declare const useMount: (callback: MountCallback) => void;

declare const useMutationObserver: ({ callback, config, target }: UseMutationObserverConfig) => void;

declare const useOnOutsideClick: ({ callback, element }: UseOnOutsideClickConfig) => void;

declare const usePrevious: <T>(value: T) => T;

declare const useResizeObserver: ({ callback, target }: UseResizeObserverConfig) => void;

declare const useUnmount: (cleanupCallback: CleanupCallback) => void;

declare const useUpdate: (callback: UpdateCallback, dependencyList: DependencyList) => void;

declare const useUpdatedRef: <T>(value: T) => MutableRefObject<T>;

declare const useUpdateOnly: (callback: UpdateCallback, dependencyList: DependencyList) => void;

declare const useWindowResize: ({ callback }: {
    callback: ResizeObserverCallback;
}) => void;

declare type RAFIdInfo = {
    id: number | null;
};

declare class GlobalModel {
    static deepClone: (object: unknown) => any;
    static clearRAFTimeout: (rafIdInfo: RAFIdInfo) => void;
    static debounceRAF: (fn: (...params: any[]) => void, time: number) => (...params: any[]) => void;
    static setRAFTimeout: (callback: () => void, timeout: number) => RAFIdInfo;
}

export { CleanupCallback, GlobalModel, KeyboardEventType, MountCallback, RAFIdInfo, UpdateCallback, UseKeyboardEventConfig, UseMutationObserverConfig, UseOnOutsideClickConfig, UseResizeObserverConfig, useClass, useIsMounted, useKeyboardEvent, useLastDiffValue, useMount, useMutationObserver, useOnOutsideClick, usePrevious, useResizeObserver, useUnmount, useUpdate, useUpdateOnly, useUpdatedRef, useWindowResize };
