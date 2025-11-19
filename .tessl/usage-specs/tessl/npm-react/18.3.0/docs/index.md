# React

React is a JavaScript library for building user interfaces that emphasizes declarative programming, component-based architecture, and efficient rendering. It enables developers to create interactive UIs through composable components that manage their own state and efficiently update when data changes.

## Package Information

- **Package Name**: react
- **Package Type**: npm 
- **Language**: JavaScript/TypeScript
- **Installation**: `npm install react`

## Core Imports

```javascript
import React from 'react';
// Access: React.useState, React.Component, etc.
```

Named imports:

```javascript
import { useState, useEffect, Component, Fragment } from 'react';
```

For CommonJS:

```javascript
const React = require('react');
const { useState, useEffect, Component } = require('react');
```

JSX Runtime (automatic - handled by transpilers):

```javascript
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
```

## Basic Usage

```javascript
import React, { useState, useEffect } from 'react';

// Function component with hooks
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// Class component
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}
```

## Architecture

React is built around several key concepts:

- **Components**: Reusable UI building blocks that can be function or class-based
- **Virtual DOM**: Efficient reconciliation system that minimizes direct DOM manipulation
- **Unidirectional Data Flow**: Props flow down, events flow up for predictable state management
- **Hooks**: Functions that let you use state and lifecycle features in function components
- **Context**: Built-in state management system for sharing data across component trees
- **Concurrent Features**: Modern React includes features for handling async operations and non-urgent updates

## Capabilities

### React Hooks

Complete set of built-in hooks for state management, side effects, performance optimization, and more. Essential for modern React development with function components.

```javascript { .api }
// State hooks
function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prev: S) => S)) => void];
function useReducer<R extends Reducer<any, any>>(reducer: R, initialState: ReducerState<R>): [ReducerState<R>, Dispatch<ReducerAction<R>>];

// Effect hooks  
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
function useInsertionEffect(effect: EffectCallback, deps?: DependencyList): void;

// Performance hooks
function useMemo<T>(factory: () => T, deps: DependencyList): T;
function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
```

[React Hooks](./hooks.md)

### Component Classes

Base classes for creating class-based React components with lifecycle methods and state management.

```javascript { .api }
class Component<P = {}, S = {}, SS = any> {
  constructor(props: P);
  setState<K extends keyof S>(state: ((prevState: S, props: P) => Pick<S, K> | S | null) | Pick<S, K> | S | null, callback?: () => void): void;
  forceUpdate(callback?: () => void): void;
  render(): ReactNode;
}

class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {}
```

[Component Classes](./components.md)

### Element Creation & Manipulation

Core functions for creating and manipulating React elements, essential for JSX alternatives and dynamic element creation.

```javascript { .api }
function createElement<P extends {}>(type: ReactType, props?: Attributes & P | null, ...children: ReactNode[]): ReactElement<P>;
function cloneElement<P extends {}>(element: ReactElement<P>, props?: Partial<P> & Attributes | null, ...children: ReactNode[]): ReactElement<P>;
function isValidElement<P>(object: {} | null | undefined): object is ReactElement<P>;
```

[Element Creation](./elements.md)

### Built-in Components

Special React components for layout, performance profiling, and development features.

```javascript { .api }
const Fragment: ExoticComponent<{ children?: ReactNode }>;
const StrictMode: ExoticComponent<{ children?: ReactNode }>;
const Profiler: ExoticComponent<ProfilerProps>;
const Suspense: ExoticComponent<SuspenseProps>;
const SuspenseList: ExoticComponent<SuspenseListProps>;
```

[Built-in Components](./builtin-components.md)

### Context API

Create and consume context for sharing data across component trees without prop drilling.

```javascript { .api }
function createContext<T>(defaultValue: T): Context<T>;
function createServerContext<T>(globalName: string, defaultValue: T): ServerContext<T>;

interface Context<T> {
  Provider: ExoticComponent<ProviderProps<T>>;
  Consumer: ExoticComponent<ConsumerProps<T>>;
  displayName?: string;
}
```

[Context API](./context.md)

### Higher-Order Components

Utilities for enhancing components with additional functionality like memoization, ref forwarding, and lazy loading.

```javascript { .api }
function memo<P extends object>(Component: FunctionComponent<P>, propsAreEqual?: (prevProps: P, nextProps: P) => boolean): NamedExoticComponent<P>;
function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
function lazy<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>): LazyExoticComponent<T>;
```

[Higher-Order Components](./hoc.md)

### Children Utilities

Utilities for working with props.children, including mapping, filtering, and validating child elements.

```javascript { .api }
const Children: {
  map<T, C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => T): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
  forEach<C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => void): void;
  count(children: any): number;
  only<C>(children: C): C extends any[] ? never : C;
  toArray(children: ReactNode | ReactNode[]): Array<Exclude<ReactNode, boolean | null | undefined>>;
};
```

[Children Utilities](./children.md)

### Concurrent Features

Modern React features for handling async operations and optimizing performance with transitions and deferred values.

```javascript { .api }
function startTransition(scope: () => void): void;
function useTransition(): [boolean, (callback: () => void) => void];
function useDeferredValue<T>(value: T): T;
```

[Concurrent Features](./concurrent.md)

### References & Utilities

Reference management and utility functions for accessing DOM elements and creating stable references.

```javascript { .api }
function createRef<T = any>(): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
function useImperativeHandle<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList): void;
const version: string;
```

[References & Utilities](./refs.md)

### JSX Runtime

Low-level JSX transformation functions used by transpilers to convert JSX syntax into JavaScript function calls.

```javascript { .api }
// Production runtime
function jsx(type: any, props: any, key?: any): ReactElement;
function jsxs(type: any, props: any, key?: any): ReactElement;

// Development runtime  
function jsxDEV(type: any, props: any, key?: any, isStaticChildren?: boolean, source?: any, self?: any): ReactElement;
```

[JSX Runtime](./jsx-runtime.md)

### Experimental APIs

Experimental and unstable APIs that may change in future versions. Use with caution in production applications.

```javascript { .api }
// Experimental components
const unstable_Cache: ExoticComponent<{ children?: ReactNode }>;
const unstable_DebugTracingMode: ExoticComponent<{ children?: ReactNode }>;
const unstable_LegacyHidden: ExoticComponent<{ children?: ReactNode; mode: 'hidden' | 'unstable-defer-without-hiding' }>;
const unstable_Offscreen: ExoticComponent<{ children?: ReactNode; mode?: 'hidden' | 'visible' }>;
const unstable_Scope: ExoticComponent<{ children?: ReactNode }>;
const unstable_TracingMarker: ExoticComponent<{ children?: ReactNode; name: string }>;

// Experimental cache functions
function unstable_getCacheSignal(): AbortSignal;
function unstable_getCacheForType<T>(resourceType: () => T): T;
function unstable_useCacheRefresh(): () => void;
```

These experimental APIs are subject to change and should only be used for testing React's upcoming features.

## Types

```javascript { .api }
// Core types
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
type ReactChild = ReactElement | ReactText;
type ReactText = string | number;
type ReactFragment = {} | Iterable<ReactNode>;

// Component types
type FunctionComponent<P = {}> = (props: PropsWithChildren<P>, context?: any) => ReactElement<any, any> | null;
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

// Element types
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;
  props: P;
  key: Key | null;
}

// Ref types
type Ref<T> = RefCallback<T> | RefObject<T> | null;
interface RefObject<T> {
  readonly current: T | null;
}
interface MutableRefObject<T> {
  current: T;
}
```