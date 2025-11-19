# Component Classes

React component classes provide the foundation for creating stateful class-based components with lifecycle methods. While function components with hooks are now preferred, class components remain important for certain use cases and legacy codebases.

## Capabilities

### Component

Base class for React class components providing state management and lifecycle methods.

```javascript { .api }
/**
 * Base class for React class components
 */
class Component<P = {}, S = {}, SS = any> {
  /**
   * Component constructor
   * @param props - Component props
   */
  constructor(props: P);
  
  /**
   * Component props (read-only)
   */
  readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
  
  /**
   * Component state
   */
  state: Readonly<S>;
  
  /**
   * Context value (legacy context API)
   */
  context: any;
  
  /**
   * Update component state
   * @param partialState - Partial state update or updater function
   * @param callback - Optional callback after state update
   */
  setState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null) | Pick<S, K> | S | null,
    callback?: () => void
  ): void;
  
  /**
   * Force component re-render
   * @param callback - Optional callback after update
   */
  forceUpdate(callback?: () => void): void;
  
  /**
   * Render method that returns JSX
   * @returns React element or null
   */
  render(): ReactNode;
  
  // Lifecycle methods
  componentDidMount?(): void;
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
  componentWillUnmount?(): void;
  shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
  getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
  
  // Error handling
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
  static getDerivedStateFromError?(error: Error): any;
  static getDerivedStateFromProps?<P, S>(props: P, state: S): Partial<S> | null;
}
```

**Usage Examples:**

```javascript
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: props.initialCount || 0,
      lastUpdated: Date.now()
    };
  }
  
  componentDidMount() {
    console.log('Counter component mounted');
    // Set up timers, fetch data, etc.
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log(`Count changed from ${prevState.count} to ${this.state.count}`);
    }
  }
  
  componentWillUnmount() {
    console.log('Counter component will unmount');
    // Clean up timers, subscriptions, etc.
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // Only update if count actually changed
    return nextState.count !== this.state.count;
  }
  
  handleIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
      lastUpdated: Date.now()
    }));
  };
  
  handleDecrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
      lastUpdated: Date.now()
    }), () => {
      console.log('State updated!');
    });
  };
  
  render() {
    const { count, lastUpdated } = this.state;
    const { title } = this.props;
    
    return (
      <div>
        <h2>{title}</h2>
        <p>Count: {count}</p>
        <p>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}

// Usage
<Counter title="My Counter" initialCount={5} />
```

### PureComponent

Optimized component class that implements shouldComponentUpdate with shallow prop and state comparison.

```javascript { .api }
/**
 * Component class with built-in shallow comparison optimization
 */
class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {
  /**
   * Automatically implements shouldComponentUpdate with shallow comparison
   * Only re-renders if props or state have shallowly changed
   */
}
```

**Usage Examples:**

```javascript
import React, { PureComponent } from 'react';

class UserCard extends PureComponent {
  render() {
    const { user, onEdit } = this.props;
    
    console.log('UserCard rendering'); // Only logs when props change
    
    return (
      <div className="user-card">
        <img src={user.avatar} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={() => onEdit(user.id)}>Edit</button>
      </div>
    );
  }
}

class UserList extends PureComponent {
  state = {
    users: [
      { id: 1, name: 'John', email: 'john@example.com', avatar: 'john.jpg' },
      { id: 2, name: 'Jane', email: 'jane@example.com', avatar: 'jane.jpg' }
    ],
    selectedId: null
  };
  
  handleEdit = (userId) => {
    this.setState({ selectedId: userId });
  };
  
  render() {
    const { users, selectedId } = this.state;
    
    return (
      <div>
        <h2>Users</h2>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={this.handleEdit}
            isSelected={user.id === selectedId}
          />
        ))}
      </div>
    );
  }
}
```

### Error Boundaries

Components that catch JavaScript errors in their child component tree and display fallback UI.

```javascript { .api }
/**
 * Error boundary lifecycle methods
 */
interface ErrorBoundaryMethods {
  /**
   * Catch errors during rendering, lifecycle methods, and constructors
   * @param error - The error that was thrown
   * @param errorInfo - Information about the error
   */
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
  
  /**
   * Update state in response to an error
   * @param error - The error that was thrown
   * @returns New state or null
   */
  static getDerivedStateFromError?(error: Error): any;
}

interface ErrorInfo {
  componentStack: string;
}
```

**Usage Examples:**

```javascript
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }
  
  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to error reporting service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Problem component that might throw
class ProblematicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  
  handleClick = () => {
    this.setState(({ counter }) => {
      if (counter === 5) {
        throw new Error('Counter reached 5!');
      }
      return { counter: counter + 1 };
    });
  };
  
  render() {
    return (
      <div>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

// Usage with error boundary
function App() {
  return (
    <div>
      <h1>My App</h1>
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    </div>
  );
}
```

### Lifecycle Methods

Complete reference for React class component lifecycle methods.

```javascript { .api }
/**
 * Component lifecycle methods
 */
interface ComponentLifecycle<P, S, SS = any> {
  // Mounting
  constructor?(props: P);
  componentDidMount?(): void;
  
  // Updating
  shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
  getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
  
  // Unmounting
  componentWillUnmount?(): void;
  
  // Error handling
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
  
  // Static methods
  static getDerivedStateFromProps?<P, S>(props: P, state: S): Partial<S> | null;
  static getDerivedStateFromError?(error: Error): any;
}
```

**Usage Examples:**

```javascript
import React, { Component } from 'react';

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null
    };
  }
  
  // Static method to update state based on props
  static getDerivedStateFromProps(nextProps, prevState) {
    // Reset data when URL changes
    if (nextProps.url !== prevState.previousUrl) {
      return {
        data: null,
        loading: false,
        error: null,
        previousUrl: nextProps.url
      };
    }
    return null;
  }
  
  // Called once after component mounts
  componentDidMount() {
    this.fetchData();
  }
  
  // Called when props or state change
  componentDidUpdate(prevProps, prevState) {
    // Fetch new data if URL changed
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }
  
  // Called before component unmounts
  componentWillUnmount() {
    // Cancel any pending requests
    if (this.abortController) {
      this.abortController.abort();
    }
  }
  
  // Optimize re-renders
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.url !== this.props.url ||
      nextState.data !== this.state.data ||
      nextState.loading !== this.state.loading ||
      nextState.error !== this.state.error
    );
  }
  
  // Capture values before update
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Preserve scroll position if data was loading
    if (prevState.loading && !this.state.loading) {
      return window.scrollY;
    }
    return null;
  }
  
  fetchData = async () => {
    this.setState({ loading: true, error: null });
    
    try {
      this.abortController = new AbortController();
      const response = await fetch(this.props.url, {
        signal: this.abortController.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.setState({ error: error.message, loading: false });
      }
    }
  };
  
  render() {
    const { data, loading, error } = this.state;
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data</div>;
    
    return (
      <div>
        <h2>Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

// Usage
<DataFetcher url="https://api.example.com/users" />
```

## Types

```javascript { .api }
// Component class types
interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
  new (props: P, context?: any): Component<P, S>;
  contextType?: Context<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

// Props with children
type PropsWithChildren<P> = P & { children?: ReactNode };

// Error info for error boundaries
interface ErrorInfo {
  componentStack: string;
}

// State type
type ComponentState = any;
```