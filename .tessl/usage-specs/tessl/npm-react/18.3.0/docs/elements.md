# Element Creation & Manipulation

React elements are the building blocks of React applications. These functions provide ways to create, clone, and validate React elements programmatically, serving as alternatives to JSX syntax.

## Capabilities

### createElement

Creates React elements programmatically - the function that JSX compiles to.

```javascript { .api }
/**
 * Creates a React element
 * @param type - Component type, HTML tag name, or React component
 * @param props - Element props and attributes (null if no props)
 * @param children - Child elements (variadic arguments)
 * @returns React element
 */
function createElement<P extends {}>(
  type: string | ComponentType<P>,
  props?: (Attributes & P) | null,
  ...children: ReactNode[]
): ReactElement<P>;

// Overloads for different element types
function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
  type: keyof ReactHTML,
  props?: (ClassAttributes<T> & P) | null,
  ...children: ReactNode[]
): DetailedReactHTMLElement<P, T>;

function createElement<P extends SVGAttributes<T>, T extends SVGElement>(
  type: keyof ReactSVG,
  props?: (ClassAttributes<T> & P) | null,
  ...children: ReactNode[]
): ReactSVGElement;
```

**Usage Examples:**

```javascript
import React, { createElement } from 'react';

// Basic HTML elements
const heading = createElement('h1', { className: 'title' }, 'Hello World');
// Equivalent JSX: <h1 className="title">Hello World</h1>

const paragraph = createElement('p', null, 'This is a paragraph');
// Equivalent JSX: <p>This is a paragraph</p>

// With multiple children
const div = createElement('div', { id: 'container' },
  createElement('h2', null, 'Section Title'),
  createElement('p', null, 'Section content'),
  createElement('button', { onClick: handleClick }, 'Click me')
);
// Equivalent JSX:
// <div id="container">
//   <h2>Section Title</h2>
//   <p>Section content</p>
//   <button onClick={handleClick}>Click me</button>
// </div>

// With React components
function MyComponent({ name, age }) {
  return createElement('div', null,
    createElement('h3', null, `Name: ${name}`),
    createElement('p', null, `Age: ${age}`)
  );
}

const componentElement = createElement(MyComponent, { name: 'John', age: 30 });
// Equivalent JSX: <MyComponent name="John" age={30} />

// Dynamic element creation
function createList(items, itemType = 'li') {
  return createElement('ul', null,
    ...items.map((item, index) =>
      createElement(itemType, { key: index }, item)
    )
  );
}

const todoList = createList(['Buy milk', 'Walk dog', 'Code review']);
```

### cloneElement

Creates a copy of a React element with new props, preserving the original element's key and ref.

```javascript { .api }
/**
 * Clones a React element with new props
 * @param element - React element to clone
 * @param props - New props to merge (null to keep original props)
 * @param children - New children (replaces original children)
 * @returns Cloned React element with merged props
 */
function cloneElement<P extends {}>(
  element: ReactElement<P>,
  props?: (Partial<P> & Attributes) | null,
  ...children: ReactNode[]
): ReactElement<P>;
```

**Usage Examples:**

```javascript
import React, { cloneElement, Children } from 'react';

// Basic cloning with new props
function ButtonGroup({ children, variant = 'primary' }) {
  return (
    <div className="button-group">
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, {
            className: `btn btn-${variant}`,
            size: 'medium'
          });
        }
        return child;
      })}
    </div>
  );
}

// Usage
<ButtonGroup variant="secondary">
  <button onClick={handleSave}>Save</button>
  <button onClick={handleCancel}>Cancel</button>
</ButtonGroup>

// Enhanced form field wrapper
function FormField({ children, error, touched }) {
  const child = Children.only(children);
  
  return (
    <div className={`form-field ${error && touched ? 'error' : ''}`}>
      {cloneElement(child, {
        className: `${child.props.className || ''} form-input`,
        'aria-invalid': error && touched,
        'aria-describedby': error && touched ? `${child.props.id}-error` : undefined
      })}
      {error && touched && (
        <div id={`${child.props.id}-error`} className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

// Usage
<FormField error="Email is required" touched={true}>
  <input id="email" type="email" placeholder="Enter email" />
</FormField>

// Adding event handlers to existing elements
function WithClickTracking({ children, trackingId }) {
  return Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const originalOnClick = child.props.onClick;
      
      return cloneElement(child, {
        onClick: (event) => {
          // Track click event
          analytics.track('click', { trackingId, elementType: child.type });
          
          // Call original handler
          if (originalOnClick) {
            originalOnClick(event);
          }
        }
      });
    }
    return child;
  });
}

// Higher-order component using cloneElement
function withTooltip(WrappedComponent, tooltipText) {
  return function TooltipWrapper(props) {
    const [showTooltip, setShowTooltip] = useState(false);
    
    return (
      <div className="tooltip-container">
        {cloneElement(<WrappedComponent {...props} />, {
          onMouseEnter: () => setShowTooltip(true),
          onMouseLeave: () => setShowTooltip(false)
        })}
        {showTooltip && (
          <div className="tooltip">{tooltipText}</div>
        )}
      </div>
    );
  };
}
```

### isValidElement

Checks if an object is a valid React element.

```javascript { .api }
/**
 * Validates if object is a React element
 * @param object - Object to validate
 * @returns True if object is a valid React element
 */
function isValidElement<P>(object: {} | null | undefined): object is ReactElement<P>;
```

**Usage Examples:**

```javascript
import React, { isValidElement } from 'react';

// Utility function to render different content types
function renderContent(content) {
  if (isValidElement(content)) {
    // It's a React element, render as-is
    return content;
  } else if (typeof content === 'string') {
    // It's a string, wrap in paragraph
    return <p>{content}</p>;
  } else if (typeof content === 'function') {
    // It's a function, call it
    return renderContent(content());
  } else {
    // Convert to string
    return <span>{String(content)}</span>;
  }
}

// Flexible card component
function Card({ title, content, footer }) {
  return (
    <div className="card">
      <div className="card-header">
        {isValidElement(title) ? title : <h3>{title}</h3>}
      </div>
      <div className="card-body">
        {renderContent(content)}
      </div>
      {footer && (
        <div className="card-footer">
          {isValidElement(footer) ? footer : <p>{footer}</p>}
        </div>
      )}
    </div>
  );
}

// Usage with different content types
<Card 
  title={<h2 className="custom-title">Special Title</h2>}
  content={<div>Custom JSX content</div>}
  footer="Simple string footer"
/>

<Card 
  title="String title"
  content="String content"
  footer={<button>Action Button</button>}
/>

// Conditional rendering helper
function ConditionalWrapper({ condition, wrapper, children }) {
  if (condition && isValidElement(wrapper)) {
    return React.cloneElement(wrapper, {}, children);
  }
  return children;
}

// Usage
<ConditionalWrapper 
  condition={isLoggedIn} 
  wrapper={<div className="authenticated-content" />}
>
  <UserDashboard />
</ConditionalWrapper>

// Type-safe children processing
function ProcessChildren({ children, processor }) {
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          return processor ? processor(child) : child;
        }
        // Handle non-element children (strings, numbers, etc.)
        return <span key={Math.random()}>{child}</span>;
      })}
    </div>
  );
}

// Filter and process valid React elements
function ElementFilter({ children, filter }) {
  const validElements = React.Children.toArray(children).filter(child => 
    isValidElement(child) && (!filter || filter(child))
  );
  
  return <>{validElements}</>;
}

// Usage - only render Button components
<ElementFilter filter={(child) => child.type === Button}>
  <Button>Valid</Button>
  <div>This will be filtered out</div>
  <Button>Also valid</Button>
  Some text will also be filtered out
</ElementFilter>
```

### createFactory

Creates a factory function for creating elements of a specific type (deprecated but still available).

```javascript { .api }
/**
 * Creates element factory function for specific type (deprecated)
 * @param type - Component type or HTML tag name
 * @returns Factory function that creates elements of the specified type
 */
function createFactory<P extends {}>(type: string | ComponentType<P>): 
  (props?: (Attributes & P) | null, ...children: ReactNode[]) => ReactElement<P>;
```

**Usage Examples:**

```javascript
import React, { createFactory } from 'react';

// Create factories for common elements
const div = createFactory('div');
const h1 = createFactory('h1');
const button = createFactory('button');

// Create factory for custom component
function MyComponent({ title, children }) {
  return <div><h2>{title}</h2>{children}</div>;
}
const myComponent = createFactory(MyComponent);

// Usage (equivalent to createElement calls)
const element1 = div({ className: 'container' }, 
  h1(null, 'Title'),
  button({ onClick: handleClick }, 'Click me')
);

const element2 = myComponent({ title: 'Section' }, 'Content here');

// Pre-bound factory with common props
function createButtonFactory(defaultProps) {
  const buttonFactory = createFactory('button');
  return (props, ...children) => buttonFactory({
    ...defaultProps,
    ...props
  }, ...children);
}

const primaryButton = createButtonFactory({ 
  className: 'btn btn-primary',
  type: 'button'
});

// Usage
const saveButton = primaryButton({ onClick: handleSave }, 'Save');
const cancelButton = primaryButton({ onClick: handleCancel }, 'Cancel');
```

## Types

```javascript { .api }
// React element interface
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;
  props: P;
  key: Key | null;
}

// Element creation types
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
type Key = string | number;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

// Props with standard attributes
interface Attributes {
  key?: Key | null;
}

interface RefAttributes<T> extends Attributes {
  ref?: Ref<T>;
}

interface ClassAttributes<T> extends Attributes {
  ref?: LegacyRef<T>;
}

// HTML and SVG element types
interface ReactHTML {
  a: DetailedHTMLFactory<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
  div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  button: DetailedHTMLFactory<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  // ... all other HTML elements
}

interface ReactSVG {
  svg: SVGFactory;
  circle: SVGFactory;
  path: SVGFactory;
  // ... all other SVG elements
}
```