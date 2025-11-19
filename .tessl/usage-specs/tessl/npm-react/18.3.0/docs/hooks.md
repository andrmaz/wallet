# React Hooks

React Hooks provide a way to use state and lifecycle features in function components. They enable stateful logic reuse and eliminate the need for class components in most cases.

## Capabilities

### State Hooks

#### useState

Adds state to function components with getter and setter.

```javascript { .api }
/**
 * Returns stateful value and function to update it
 * @param initialState - Initial state value or function that returns initial state
 * @returns Tuple with current state and state setter function
 */
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

// State setter type
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
```

**Usage Examples:**

```javascript
import { useState } from 'react';

// Basic usage
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: 'John', age: 30 });

// Functional updates
setCount(prevCount => prevCount + 1);
setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));

// Lazy initial state
const [expensiveValue, setExpensiveValue] = useState(() => {
  return computeExpensiveValue();
});
```

#### useReducer

Manages complex state with reducer pattern, alternative to useState for complex state logic.

```javascript { .api }
/**
 * State management with reducer pattern
 * @param reducer - Function that determines state updates
 * @param initialArg - Initial state or value for lazy initialization
 * @param init - Optional lazy initialization function
 * @returns Tuple with current state and dispatch function
 */
function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialArg: ReducerState<R>,
  init?: ReducerStateWithoutAction<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

// Reducer types
type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
```

**Usage Examples:**

```javascript
import { useReducer } from 'react';

// Counter reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error();
  }
}

const [state, dispatch] = useReducer(counterReducer, { count: 0 });

// Dispatch actions
dispatch({ type: 'increment' });
dispatch({ type: 'set', payload: 42 });
```

### Effect Hooks

#### useEffect

Performs side effects in function components - equivalent to componentDidMount, componentDidUpdate, and componentWillUnmount combined.

```javascript { .api }
/**
 * Performs side effects after render
 * @param effect - Function containing side effect logic
 * @param deps - Optional dependency array to control when effect runs
 */
function useEffect(effect: EffectCallback, deps?: DependencyList): void;

type EffectCallback = () => (void | Destructor);
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type DependencyList = ReadonlyArray<any>;
```

**Usage Examples:**

```javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Effect with dependencies
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Effect with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Effect on every render (no deps array)
  useEffect(() => {
    console.log('Component rendered');
  });
}
```

#### useLayoutEffect

Synchronous version of useEffect that fires before browser paints, useful for DOM measurements.

```javascript { .api }
/**
 * Synchronous side effects that fire before browser paint
 * @param effect - Function containing side effect logic
 * @param deps - Optional dependency array to control when effect runs
 */
function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
```

**Usage Examples:**

```javascript
import { useLayoutEffect, useRef } from 'react';

function MeasuredComponent() {
  const ref = useRef();
  
  useLayoutEffect(() => {
    // Synchronously measure DOM before paint
    const rect = ref.current.getBoundingClientRect();
    console.log('Element height:', rect.height);
  });
  
  return <div ref={ref}>Content</div>;
}
```

#### useInsertionEffect

Special effect hook for CSS-in-JS libraries to insert styles before layout effects.

```javascript { .api }
/**
 * Effect hook for CSS-in-JS libraries to insert styles
 * @param effect - Function containing style insertion logic
 * @param deps - Optional dependency array to control when effect runs
 */
function useInsertionEffect(effect: EffectCallback, deps?: DependencyList): void;
```

### Performance Hooks

#### useMemo

Memoizes expensive computations to avoid recalculation on every render.

```javascript { .api }
/**
 * Memoizes expensive calculations
 * @param factory - Function that returns value to memoize
 * @param deps - Dependency array to determine when to recalculate
 * @returns Memoized value
 */
function useMemo<T>(factory: () => T, deps: DependencyList): T;
```

**Usage Examples:**

```javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, query }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);
  
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(items);
  }, [items]);
  
  return <div>{/* render filtered items */}</div>;
}
```

#### useCallback

Memoizes functions to prevent unnecessary re-renders of child components.

```javascript { .api }
/**
 * Memoizes callback functions
 * @param callback - Function to memoize
 * @param deps - Dependency array to determine when to recreate function
 * @returns Memoized callback function
 */
function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
```

**Usage Examples:**

```javascript
import { useCallback, useState } from 'react';

function ParentComponent({ onItemClick }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  const handleClick = useCallback((id) => {
    onItemClick(id);
    setCount(prev => prev + 1);
  }, [onItemClick]);
  
  const addItem = useCallback(() => {
    setItems(prev => [...prev, { id: Date.now() }]);
  }, []);
  
  return (
    <div>
      <ItemList items={items} onItemClick={handleClick} />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}
```

### Ref Hooks

#### useRef

Creates mutable ref object that persists across re-renders.

```javascript { .api }
/**
 * Creates mutable ref object
 * @param initialValue - Initial value for the ref
 * @returns Mutable ref object with current property
 */
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;

interface MutableRefObject<T> {
  current: T;
}
```

**Usage Examples:**

```javascript
import { useRef, useEffect } from 'react';

function InputComponent() {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  
  useEffect(() => {
    // Focus input on mount
    inputRef.current.focus();
  }, []);
  
  const handleClick = () => {
    // Mutable value that doesn't trigger re-render
    countRef.current += 1;
    console.log('Click count:', countRef.current);
  };
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

#### useImperativeHandle

Customizes the instance value exposed when using ref with forwardRef.

```javascript { .api }
/**
 * Customizes ref handle for forwardRef components
 * @param ref - Ref object to customize
 * @param createHandle - Function that returns the custom handle
 * @param deps - Optional dependency array
 */
function useImperativeHandle<T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList
): void;
```

**Usage Examples:**

```javascript
import { forwardRef, useImperativeHandle, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    blur: () => inputRef.current.blur(),
    getValue: () => inputRef.current.value,
  }), []);
  
  return <input ref={inputRef} {...props} />;
});

// Usage
function ParentComponent() {
  const customInputRef = useRef();
  
  const handleClick = () => {
    customInputRef.current.focus();
    console.log(customInputRef.current.getValue());
  };
  
  return (
    <div>
      <CustomInput ref={customInputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### Context Hooks

#### useContext

Consumes context values from React context providers.

```javascript { .api }
/**
 * Consumes context value from nearest provider
 * @param context - Context object created by createContext
 * @returns Current context value
 */
function useContext<T>(context: Context<T>): T;
```

**Usage Examples:**

```javascript
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');
const UserContext = createContext(null);

function ThemedButton() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <button className={`btn-${theme}`}>
      Hello, {user?.name || 'Guest'}
    </button>
  );
}

function App() {
  const user = { name: 'John', id: 1 };
  
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={user}>
        <ThemedButton />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
```

### Concurrent Features Hooks

#### useTransition

Marks state updates as non-urgent transitions to avoid blocking urgent updates.

```javascript { .api }
/**
 * Marks state updates as non-urgent transitions
 * @returns Tuple with isPending boolean and startTransition function
 */
function useTransition(): [boolean, (callback: () => void) => void];
```

**Usage Examples:**

```javascript
import { useTransition, useState } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (newQuery) => {
    setQuery(newQuery); // Urgent update
    
    startTransition(() => {
      // Non-urgent update that won't block typing
      setResults(performExpensiveSearch(newQuery));
    });
  };
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => handleSearch(e.target.value)} 
      />
      {isPending && <div>Searching...</div>}
      <ResultsList results={results} />
    </div>
  );
}
```

#### useDeferredValue

Defers updating a value to avoid blocking urgent updates.

```javascript { .api }
/**
 * Defers value updates for performance
 * @param value - Value to defer
 * @returns Deferred version of the value
 */
function useDeferredValue<T>(value: T): T;
```

**Usage Examples:**

```javascript
import { useDeferredValue, useState, useMemo } from 'react';

function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.includes(deferredFilter)
    );
  }, [products, deferredFilter]);
  
  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter products..."
      />
      <div>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### Utility Hooks

#### useId

Generates stable unique IDs for accessibility attributes.

```javascript { .api }
/**
 * Generates unique IDs for accessibility
 * @returns Stable unique ID string
 */
function useId(): string;
```

**Usage Examples:**

```javascript
import { useId } from 'react';

function FormField({ label, ...props }) {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}

function LoginForm() {
  const passwordHintId = useId();
  
  return (
    <form>
      <FormField label="Username" type="text" />
      <FormField 
        label="Password" 
        type="password"
        aria-describedby={passwordHintId}
      />
      <div id={passwordHintId}>
        Password must be at least 8 characters
      </div>
    </form>
  );
}
```

#### useDebugValue

Displays custom labels for custom hooks in React DevTools.

```javascript { .api }
/**
 * Displays debug labels in React DevTools
 * @param value - Value to display
 * @param format - Optional formatting function
 */
function useDebugValue<T>(value: T, format?: (value: T) => any): void;
```

**Usage Examples:**

```javascript
import { useDebugValue, useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Show in DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  // Custom format function
  useDebugValue({key, storedValue}, ({key, storedValue}) => 
    `${key}: ${JSON.stringify(storedValue)}`
  );
  
  return [storedValue, setStoredValue];
}
```

### External Store Hooks

#### useSyncExternalStore

Subscribes to external data stores and syncs with React's rendering.

```javascript { .api }
/**
 * Subscribes to external data stores
 * @param subscribe - Function to subscribe to store changes
 * @param getSnapshot - Function to get current store value
 * @param getServerSnapshot - Optional server-side snapshot getter
 * @returns Current store value
 */
function useSyncExternalStore<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot
): Snapshot;
```

**Usage Examples:**

```javascript
import { useSyncExternalStore } from 'react';

// External store example
const store = {
  state: { count: 0 },
  listeners: new Set(),
  
  getState() {
    return this.state;
  },
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener());
  },
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};

function useStore() {
  return useSyncExternalStore(
    store.subscribe.bind(store),
    store.getState.bind(store)
  );
}

function Counter() {
  const state = useStore();
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => store.setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}
```

#### useMutableSource

Legacy hook for subscribing to mutable external sources (deprecated in favor of useSyncExternalStore).

```javascript { .api }
/**
 * Subscribe to mutable external data sources (deprecated)
 * @param source - Mutable source created by createMutableSource
 * @param getSnapshot - Function to get current value from source
 * @param subscribe - Function to subscribe to source changes
 * @returns Current source value
 */
function useMutableSource<Source, Snapshot>(
  source: MutableSource<Source>,
  getSnapshot: MutableSourceGetSnapshotFn<Source, Snapshot>,
  subscribe: MutableSourceSubscribeFn<Source, Snapshot>
): Snapshot;
```