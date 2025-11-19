# Higher-Order Components

Higher-order components (HOCs) are functions that take a component and return a new component with enhanced functionality. React provides several built-in HOCs for common patterns like memoization, ref forwarding, and lazy loading.

## Capabilities

### memo

Memoizes a component to prevent unnecessary re-renders when props haven't changed.

```javascript { .api }
/**
 * Memoizes component with shallow prop comparison
 * @param Component - Function component to memoize
 * @param propsAreEqual - Optional custom comparison function
 * @returns Memoized component
 */
function memo<P extends object>(
  Component: FunctionComponent<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): NamedExoticComponent<P>;
```

**Usage Examples:**

```javascript
import React, { memo, useState } from 'react';

// Basic memoization
const ExpensiveComponent = memo(function ExpensiveComponent({ data, options }) {
  console.log('ExpensiveComponent rendering'); // Only logs when props change
  
  const processedData = useMemo(() => {
    return data.map(item => processExpensiveCalculation(item, options));
  }, [data, options]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.result}</div>
      ))}
    </div>
  );
});

// Custom comparison function
const UserCard = memo(function UserCard({ user, theme, onEdit }) {
  return (
    <div className={`user-card theme-${theme}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if user data or theme changed
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.email === nextProps.user.email &&
    prevProps.theme === nextProps.theme
    // Ignore onEdit function changes
  );
});

// Memoizing with complex props
const DataVisualization = memo(function DataVisualization({ 
  dataset, 
  config, 
  width, 
  height 
}) {
  const chartData = useMemo(() => {
    return transformDataForChart(dataset, config);
  }, [dataset, config]);
  
  return (
    <svg width={width} height={height}>
      {/* Complex visualization rendering */}
    </svg>
  );
}, (prevProps, nextProps) => {
  // Deep comparison for complex objects
  return (
    JSON.stringify(prevProps.dataset) === JSON.stringify(nextProps.dataset) &&
    JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config) &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height
  );
});

// Usage
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          theme={theme}
          onEdit={setSelectedUser} // This function reference changes, but memo ignores it
        />
      ))}
    </div>
  );
}
```

### forwardRef

Forwards refs through components to access DOM elements or component instances.

```javascript { .api }
/**
 * Forwards refs through component hierarchy
 * @param render - Function component that receives props and ref
 * @returns Component that can receive refs
 */
function forwardRef<T, P = {}>(
  render: ForwardRefRenderFunction<T, P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

type ForwardRefRenderFunction<T, P = {}> = (
  props: P,
  ref: ForwardedRef<T>
) => ReactElement | null;
```

**Usage Examples:**

```javascript
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

// Basic ref forwarding to DOM element
const CustomInput = forwardRef(function CustomInput(props, ref) {
  return (
    <div className="custom-input-wrapper">
      <input
        ref={ref}
        className="custom-input"
        {...props}
      />
    </div>
  );
});

// Usage
function LoginForm() {
  const emailInputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailInputRef.current.value) {
      emailInputRef.current.focus(); // Direct DOM access
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        ref={emailInputRef}
        type="email"
        placeholder="Enter email"
      />
      <button type="submit">Login</button>
    </form>
  );
}

// Custom imperative API with useImperativeHandle
const CustomModal = forwardRef(function CustomModal({ children, title }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
    focus: () => modalRef.current?.focus(),
    isOpen: isOpen
  }), [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div 
        ref={modalRef}
        className="modal-content" 
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        {children}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
});

// Usage with imperative API
function App() {
  const modalRef = useRef(null);
  
  const openModal = () => {
    modalRef.current?.open();
  };
  
  const checkModalState = () => {
    console.log('Modal is open:', modalRef.current?.isOpen);
  };
  
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={checkModalState}>Check Modal State</button>
      
      <CustomModal ref={modalRef} title="Important Notice">
        <p>This is modal content</p>
      </CustomModal>
    </div>
  );
}

// Higher-order component with ref forwarding
function withErrorBoundary(Component) {
  return forwardRef(function WithErrorBoundary(props, ref) {
    return (
      <ErrorBoundary>
        <Component {...props} ref={ref} />
      </ErrorBoundary>
    );
  });
}

const SafeCustomInput = withErrorBoundary(CustomInput);
```

### lazy

Enables code splitting by dynamically importing components.

```javascript { .api }
/**
 * Lazy load components with dynamic imports
 * @param factory - Function that returns dynamic import promise
 * @returns Lazy component that can be used with Suspense
 */
function lazy<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): LazyExoticComponent<T>;
```

**Usage Examples:**

```javascript
import React, { lazy, Suspense, useState } from 'react';

// Basic lazy loading
const LazyDashboard = lazy(() => import('./Dashboard'));
const LazySettings = lazy(() => import('./Settings'));
const LazyProfile = lazy(() => import('./Profile'));

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <LazyDashboard />;
      case 'settings':
        return <LazySettings />;
      case 'profile':
        return <LazyProfile />;
      default:
        return <div>Page not found</div>;
    }
  };
  
  return (
    <div>
      <nav>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentView('settings')}>Settings</button>
        <button onClick={() => setCurrentView('profile')}>Profile</button>
      </nav>
      
      <Suspense fallback={<div>Loading...</div>}>
        {renderView()}
      </Suspense>
    </div>
  );
}

// Conditional lazy loading
const HeavyChart = lazy(() => {
  // Only load if user has premium features
  if (user.isPremium) {
    return import('./HeavyChart');
  } else {
    return import('./BasicChart');
  }
});

// Lazy loading with error handling
const LazyComponent = lazy(async () => {
  try {
    const module = await import('./ExpensiveComponent');
    return module;
  } catch (error) {
    console.error('Failed to load component:', error);
    // Return fallback component
    return import('./FallbackComponent');
  }
});

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Preloading lazy components
const ProductCatalog = lazy(() => import('./ProductCatalog'));

function ProductButton() {
  const [showCatalog, setShowCatalog] = useState(false);
  
  // Preload on hover
  const handleMouseEnter = () => {
    import('./ProductCatalog'); // Preload without waiting
  };
  
  return (
    <div>
      <button 
        onMouseEnter={handleMouseEnter}
        onClick={() => setShowCatalog(true)}
      >
        View Products
      </button>
      
      {showCatalog && (
        <Suspense fallback={<div>Loading catalog...</div>}>
          <ProductCatalog />
        </Suspense>
      )}
    </div>
  );
}

// Lazy loading with props
const LazyModalContent = lazy(() => import('./ModalContent'));

function Modal({ isOpen, contentType, ...props }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal">
      <Suspense fallback={<div>Loading modal content...</div>}>
        <LazyModalContent type={contentType} {...props} />
      </Suspense>
    </div>
  );
}
```

## Types

```javascript { .api }
// Higher-order component types
type NamedExoticComponent<P = {}> = ExoticComponent<P> & {
  displayName?: string;
};

type ForwardRefExoticComponent<P> = NamedExoticComponent<P> & {
  $$typeof: symbol;
};

type LazyExoticComponent<T extends ComponentType<any>> = ExoticComponent<ComponentProps<T>> & {
  $$typeof: symbol;
};

// Ref forwarding types
type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;

type ForwardRefRenderFunction<T, P = {}> = (
  props: P,
  ref: ForwardedRef<T>
) => ReactElement | null;

type PropsWithoutRef<P> = Pick<P, Exclude<keyof P, 'ref'>>;

// Component prop extraction
type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = 
  T extends JSXElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : {};
```