# JSX Runtime

The JSX runtime provides low-level functions used by transpilers to convert JSX syntax into JavaScript function calls. These functions are typically not used directly but are important for understanding how JSX works under the hood.

## Capabilities

### jsx (Production Runtime)

Creates React elements from JSX in production mode.

```javascript { .api }
/**
 * Creates React element from JSX (production)
 * @param type - Element type (component, HTML tag, etc.)
 * @param props - Element props including children
 * @param key - Optional element key
 * @returns React element
 */
function jsx(type: any, props: any, key?: any): ReactElement;
```

**Usage Examples:**

```javascript
// Note: These functions are typically called by transpilers, not directly

// JSX syntax
const element = <div className="container">Hello World</div>;

// Transpiles to jsx() call
const element = jsx('div', { 
  className: 'container', 
  children: 'Hello World' 
});

// Component JSX
const MyComponent = ({ name }) => <h1>Hello {name}</h1>;
const componentElement = <MyComponent name="John" />;

// Transpiles to
const componentElement = jsx(MyComponent, { name: 'John' });

// JSX with key
const listItem = <li key="item-1">First item</li>;

// Transpiles to
const listItem = jsx('li', { children: 'First item' }, 'item-1');

// Self-closing JSX
const input = <input type="text" placeholder="Enter name" />;

// Transpiles to
const input = jsx('input', { 
  type: 'text', 
  placeholder: 'Enter name' 
});

// Nested JSX
const nested = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// Transpiles to
const nested = jsx('div', {
  children: [
    jsx('h1', { children: 'Title' }),
    jsx('p', { children: 'Content' })
  ]
});
```

### jsxs (Production Runtime with Static Children)

Creates React elements with static children (optimization for multiple children known at compile time).

```javascript { .api }
/**
 * Creates React element with static children (production)
 * @param type - Element type (component, HTML tag, etc.)
 * @param props - Element props including children array
 * @param key - Optional element key
 * @returns React element
 */
function jsxs(type: any, props: any, key?: any): ReactElement;
```

**Usage Examples:**

```javascript
// JSX with multiple static children
const container = (
  <div>
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </div>
);

// Transpiles to jsxs() for static children optimization
const container = jsxs('div', {
  children: [
    jsx('h1', { children: 'Title' }),
    jsx('p', { children: 'Paragraph 1' }),
    jsx('p', { children: 'Paragraph 2' })
  ]
});

// List with static items
const list = (
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
);

// Transpiles to
const list = jsxs('ul', {
  children: [
    jsx('li', { children: 'Item 1' }),
    jsx('li', { children: 'Item 2' }),
    jsx('li', { children: 'Item 3' })
  ]
});

// Form with static structure
const form = (
  <form>
    <label htmlFor="name">Name:</label>
    <input id="name" type="text" />
    <button type="submit">Submit</button>
  </form>
);

// Transpiles to jsxs() for performance
const form = jsxs('form', {
  children: [
    jsx('label', { htmlFor: 'name', children: 'Name:' }),
    jsx('input', { id: 'name', type: 'text' }),
    jsx('button', { type: 'submit', children: 'Submit' })
  ]
});
```

### jsxDEV (Development Runtime)

Creates React elements with additional development-time information for debugging.

```javascript { .api }
/**
 * Creates React element with development info
 * @param type - Element type (component, HTML tag, etc.)
 * @param props - Element props including children
 * @param key - Optional element key
 * @param isStaticChildren - Whether children are static
 * @param source - Source location information
 * @param self - Component instance info
 * @returns React element with debug information
 */
function jsxDEV(
  type: any, 
  props: any, 
  key?: any, 
  isStaticChildren?: boolean, 
  source?: any, 
  self?: any
): ReactElement;
```

**Usage Examples:**

```javascript
// In development mode, JSX includes additional debug info

// JSX in development
const element = <div className="container">Hello World</div>;

// Transpiles to jsxDEV() with source information
const element = jsxDEV('div', {
  className: 'container',
  children: 'Hello World'
}, undefined, false, {
  fileName: '/src/components/MyComponent.js',
  lineNumber: 15,
  columnNumber: 10
}, this);

// Component JSX in development
const MyComponent = ({ name }) => {
  return <h1>Hello {name}</h1>;
};

// Transpiles to jsxDEV() with debugging context
const componentJSX = jsxDEV('h1', {
  children: ['Hello ', name]
}, undefined, true, {
  fileName: '/src/components/MyComponent.js',
  lineNumber: 3,
  columnNumber: 10
}, this);

// Development warnings and errors use this info
function ProblematicComponent() {
  // This will show clear error location in dev tools
  return (
    <div>
      <UnknownComponent />  {/* Clear error with file/line info */}
    </div>
  );
}
```

### Fragment

JSX Fragment component available in JSX runtime for grouping elements.

```javascript { .api }
/**
 * Fragment component for JSX runtime
 */
const Fragment: ExoticComponent<{ children?: ReactNode }>;
```

**Usage Examples:**

```javascript
import { Fragment } from 'react/jsx-runtime';

// Fragment in JSX
const elements = (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);

// Transpiles to
const elements = jsx(Fragment, {
  children: [
    jsx('h1', { children: 'Title' }),
    jsx('p', { children: 'Content' })
  ]
});

// Fragment with key (useful in lists)
const listItems = items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
));

// Transpiles to
const listItems = items.map(item => 
  jsx(Fragment, {
    children: [
      jsx('dt', { children: item.term }),
      jsx('dd', { children: item.definition })
    ]
  }, item.id)
);

// Conditional Fragment
function ConditionalContent({ showDetails, data }) {
  return (
    <div>
      <h2>Summary</h2>
      {showDetails && (
        <>
          <p>Details: {data.details}</p>
          <p>Updated: {data.lastModified}</p>
        </>
      )}
    </div>
  );
}

// Function returning Fragment
function renderUserInfo(user) {
  return (
    <>
      <span className="user-name">{user.name}</span>
      <span className="user-email">({user.email})</span>
    </>
  );
}
```

## Transpiler Configuration

### Automatic JSX Runtime

Modern React transpiler configuration uses the automatic JSX runtime:

```javascript
// babel.config.js
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic" // Uses jsx/jsxs imports automatically
    }]
  ]
}

// webpack.config.js (for esbuild)
{
  loader: 'esbuild-loader',
  options: {
    jsx: 'automatic' // Uses React 17+ JSX transform
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx" // TypeScript automatic JSX
  }
}
```

### Classic JSX Runtime (Legacy)

Older configuration that requires React to be in scope:

```javascript
// babel.config.js (legacy)
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "classic" // Requires React import
    }]
  ]
}

// Requires this import in every file with JSX
import React from 'react';

// JSX transpiles to React.createElement calls
const element = <div>Hello</div>;
// Becomes: React.createElement('div', null, 'Hello');
```

## Runtime Import Patterns

```javascript
// Automatic imports (handled by transpiler)
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { jsxDEV, Fragment } from 'react/jsx-dev-runtime';

// Manual imports (rarely needed)
import { jsx } from 'react/jsx-runtime';

const manualElement = jsx('div', {
  className: 'manual',
  children: 'Manually created element'
});
```

## Types

```javascript { .api }
// JSX runtime function types
function jsx(type: any, props: any, key?: any): ReactElement;
function jsxs(type: any, props: any, key?: any): ReactElement;
function jsxDEV(
  type: any,
  props: any,
  key?: any,
  isStaticChildren?: boolean,
  source?: any,
  self?: any
): ReactElement;

// Fragment type
const Fragment: ExoticComponent<{ children?: ReactNode }>;

// Source information type (development)
interface ReactSource {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

// JSX element type
interface ReactElement<P = any> {
  type: any;
  props: P;
  key: string | number | null;
}
```