# References & Utilities

React provides utilities for creating and managing references to DOM elements and component instances, along with other helpful utility functions.

## Capabilities

### createRef

Creates a ref object for class components to access DOM elements or component instances.

```javascript { .api }
/**
 * Creates a ref object for class components
 * @returns Ref object with current property
 */
function createRef<T = any>(): RefObject<T>;

interface RefObject<T> {
  readonly current: T | null;
}
```

**Usage Examples:**

```javascript
import React, { createRef, Component } from 'react';

// Basic DOM element access in class component
class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }
  
  componentDidMount() {
    // Focus input when component mounts
    this.inputRef.current.focus();
  }
  
  getValue = () => {
    return this.inputRef.current.value;
  };
  
  clear = () => {
    this.inputRef.current.value = '';
    this.inputRef.current.focus();
  };
  
  render() {
    return (
      <div>
        <input
          ref={this.inputRef}
          type="text"
          placeholder="Enter text"
        />
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}

// Multiple refs in class component
class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.nameRef = createRef();
    this.emailRef = createRef();
    this.submitButtonRef = createRef();
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: this.nameRef.current.value,
      email: this.emailRef.current.value
    };
    
    if (!formData.name) {
      this.nameRef.current.focus();
      return;
    }
    
    if (!formData.email) {
      this.emailRef.current.focus();
      return;
    }
    
    this.props.onSubmit(formData);
  };
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={this.nameRef}
          type="text"
          placeholder="Name"
          required
        />
        
        <input
          ref={this.emailRef}
          type="email"
          placeholder="Email"
          required
        />
        
        <button ref={this.submitButtonRef} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

// Ref for custom component instance
class CustomButton extends Component {
  focus = () => {
    this.buttonRef.current.focus();
  };
  
  click = () => {
    this.buttonRef.current.click();
  };
  
  constructor(props) {
    super(props);
    this.buttonRef = createRef();
  }
  
  render() {
    return (
      <button
        ref={this.buttonRef}
        className="custom-button"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.customButtonRef = createRef();
  }
  
  handleFocusButton = () => {
    this.customButtonRef.current.focus();
  };
  
  render() {
    return (
      <div>
        <CustomButton ref={this.customButtonRef} onClick={this.handleClick}>
          Click Me
        </CustomButton>
        
        <button onClick={this.handleFocusButton}>
          Focus Custom Button
        </button>
      </div>
    );
  }
}
```

### Ref Callbacks

Alternative to ref objects using callback functions for more control over ref assignment.

```javascript { .api }
/**
 * Callback ref function type
 * @param instance - DOM element or component instance
 */
type RefCallback<T> = (instance: T | null) => void;
```

**Usage Examples:**

```javascript
import React, { Component } from 'react';

// Callback ref with storage
class CallbackRefExample extends Component {
  constructor(props) {
    super(props);
    this.inputElement = null;
  }
  
  setInputRef = (element) => {
    this.inputElement = element;
    
    if (element) {
      console.log('Input ref attached:', element);
      // Perform setup when ref is attached
      element.addEventListener('keydown', this.handleKeyDown);
    } else {
      console.log('Input ref detached');
      // Cleanup when ref is detached
      if (this.inputElement) {
        this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      }
    }
  };
  
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };
  
  handleSubmit = () => {
    if (this.inputElement) {
      console.log('Input value:', this.inputElement.value);
    }
  };
  
  render() {
    return (
      <div>
        <input
          ref={this.setInputRef}
          type="text"
          placeholder="Press Enter to submit"
        />
      </div>
    );
  }
}

// Conditional ref assignment
class ConditionalRefExample extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldFocusOnMount: true };
  }
  
  setInputRef = (element) => {
    if (element && this.state.shouldFocusOnMount) {
      element.focus();
      this.setState({ shouldFocusOnMount: false });
    }
  };
  
  render() {
    return (
      <input
        ref={this.setInputRef}
        type="text"
        placeholder="Auto-focused on mount"
      />
    );
  }
}

// Dynamic ref management
class DynamicRefsExample extends Component {
  constructor(props) {
    super(props);
    this.itemRefs = new Map();
  }
  
  setItemRef = (id) => (element) => {
    if (element) {
      this.itemRefs.set(id, element);
    } else {
      this.itemRefs.delete(id);
    }
  };
  
  scrollToItem = (id) => {
    const element = this.itemRefs.get(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  render() {
    const { items } = this.props;
    
    return (
      <div>
        <div className="item-list">
          {items.map(item => (
            <div
              key={item.id}
              ref={this.setItemRef(item.id)}
              className="item"
            >
              {item.content}
            </div>
          ))}
        </div>
        
        <div className="controls">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => this.scrollToItem(item.id)}
            >
              Go to {item.id}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
```

### useId

Generates stable unique IDs that are consistent between server and client rendering.

```javascript { .api }
/**
 * Generates stable unique IDs for accessibility
 * @returns Unique ID string
 */
function useId(): string;
```

**Usage Examples:**

```javascript
import React, { useId } from 'react';

// Form field with accessibility
function FormField({ label, type = 'text', required, error, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span className="required" aria-label="required">*</span>}
      </label>
      
      <input
        id={id}
        type={type}
        aria-describedby={error ? errorId : (props.help ? helpId : undefined)}
        aria-invalid={!!error}
        {...props}
      />
      
      {props.help && (
        <div id={helpId} className="help-text">
          {props.help}
        </div>
      )}
      
      {error && (
        <div id={errorId} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

// Usage
function LoginForm() {
  return (
    <form>
      <FormField
        label="Email"
        type="email"
        required
        help="We'll never share your email"
      />
      
      <FormField
        label="Password"
        type="password"
        required
        error="Password must be at least 8 characters"
      />
    </form>
  );
}

// Multiple IDs in one component
function TabPanel({ tabs, activeTab, onTabChange }) {
  const tablistId = useId();
  const panelIdPrefix = useId();
  
  return (
    <div>
      <div role="tablist" id={tablistId} aria-label="Content tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            id={`${tablistId}-tab-${index}`}
            aria-controls={`${panelIdPrefix}-panel-${index}`}
            aria-selected={index === activeTab}
            onClick={() => onTabChange(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`${panelIdPrefix}-panel-${index}`}
          aria-labelledby={`${tablistId}-tab-${index}`}
          hidden={index !== activeTab}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// Dialog with proper ARIA relationships
function Dialog({ isOpen, title, children, onClose }) {
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  
  if (!isOpen) return null;
  
  return (
    <div
      role="dialog"
      id={dialogId}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
    >
      <h2 id={titleId}>{title}</h2>
      
      <div id={descriptionId}>
        {children}
      </div>
      
      <button onClick={onClose} aria-label="Close dialog">
        ×
      </button>
    </div>
  );
}

// Nested component IDs
function NestedForm() {
  const formId = useId();
  
  return (
    <form id={formId}>
      <fieldset>
        <legend>Personal Information</legend>
        <FormField label="First Name" required />
        <FormField label="Last Name" required />
      </fieldset>
      
      <fieldset>
        <legend>Contact Information</legend>
        <FormField label="Email" type="email" required />
        <FormField label="Phone" type="tel" />
      </fieldset>
    </form>
  );
}
```

### act (Testing Utility)

Ensures that updates related to "units" of interaction with a user interface have been processed and applied to the DOM before making assertions.

```javascript { .api }
/**
 * Wraps test interactions to ensure proper effect flushing
 * @param callback - Function containing component interactions
 * @returns Promise that resolves when effects are flushed
 */
function act(callback: () => void | Promise<void>): Promise<void>;
```

**Usage Examples:**

```javascript
import React, { useState, useEffect } from 'react';
import { act, render, fireEvent } from '@testing-library/react';

// Component for testing
function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    setMessage(`Count is ${count}`);
  }, [count]);
  
  return (
    <div>
      <p data-testid="count">{count}</p>
      <p data-testid="message">{message}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Test with act
test('counter updates correctly', async () => {
  const { getByTestId, getByRole } = render(<Counter />);
  const button = getByRole('button', { name: 'Increment' });
  
  // Wrap interactions in act
  await act(async () => {
    fireEvent.click(button);
  });
  
  expect(getByTestId('count')).toHaveTextContent('1');
  expect(getByTestId('message')).toHaveTextContent('Count is 1');
});

// Component with async effects
function AsyncDataComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false;
    
    fetchUser(userId).then(userData => {
      if (!cancelled) {
        setUser(userData);
        setLoading(false);
      }
    });
    
    return () => {
      cancelled = true;
    };
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  return <div>User: {user.name}</div>;
}

// Test async effects with act
test('loads user data', async () => {
  const mockUser = { id: 1, name: 'John Doe' };
  jest.spyOn(global, 'fetchUser').mockResolvedValue(mockUser);
  
  const { getByText } = render(<AsyncDataComponent userId={1} />);
  
  expect(getByText('Loading...')).toBeInTheDocument();
  
  // Wait for async effects to complete
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
  
  expect(getByText('User: John Doe')).toBeInTheDocument();
});

// Testing state updates
test('handles multiple state updates', async () => {
  function MultiStateComponent() {
    const [count, setCount] = useState(0);
    const [doubled, setDoubled] = useState(0);
    
    const handleClick = () => {
      setCount(c => c + 1);
      setDoubled(c => (c + 1) * 2);
    };
    
    return (
      <div>
        <span data-testid="count">{count}</span>
        <span data-testid="doubled">{doubled}</span>
        <button onClick={handleClick}>Update</button>
      </div>
    );
  }
  
  const { getByTestId, getByRole } = render(<MultiStateComponent />);
  
  await act(async () => {
    fireEvent.click(getByRole('button'));
  });
  
  expect(getByTestId('count')).toHaveTextContent('1');
  expect(getByTestId('doubled')).toHaveTextContent('2');
});
```

### version

The React library version string.

```javascript { .api }
/**
 * React library version string
 */
const version: string;
```

**Usage Examples:**

```javascript
import React from 'react';

// Access version from React object
console.log(`React version: ${React.version}`);

// Or import directly
import { version } from 'react';
console.log(`React version: ${version}`);

// Feature detection based on version
function checkReactVersion() {
  const [major, minor] = version.split('.').map(Number);
  
  if (major >= 18) {
    console.log('React 18+ features available');
    return 'concurrent';
  } else if (major >= 17) {
    console.log('React 17+ features available');
    return 'modern';
  } else {
    console.log('Older React version');
    return 'legacy';
  }
}

// Runtime version logging
function logReactInfo() {
  console.log({
    reactVersion: version,
    buildMode: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}
```

## Types

```javascript { .api }
// Ref types
interface RefObject<T> {
  readonly current: T | null;
}

interface MutableRefObject<T> {
  current: T;
}

type Ref<T> = RefCallback<T> | RefObject<T> | null;
type RefCallback<T> = (instance: T | null) => void;
type LegacyRef<T> = string | Ref<T>;

// Create ref function
function createRef<T = any>(): RefObject<T>;

// Hook for IDs
function useId(): string;

// Testing utility
function act(callback: () => void | Promise<void>): Promise<void>;

// Version
const version: string;
```