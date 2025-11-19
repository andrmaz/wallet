# Context API

React Context provides a way to share data across the component tree without passing props through every level. It's ideal for global state like themes, authentication, or user preferences.

## Capabilities 

### createContext

Creates a new React context object with Provider and Consumer components.

```javascript { .api }
/**
 * Creates a React context for sharing data across component tree
 * @param defaultValue - Default value when no Provider is found
 * @returns Context object with Provider and Consumer
 */
function createContext<T>(defaultValue: T): Context<T>;

interface Context<T> {
  Provider: ExoticComponent<ProviderProps<T>>;
  Consumer: ExoticComponent<ConsumerProps<T>>;
  displayName?: string;
}

interface ProviderProps<T> {
  value: T;
  children?: ReactNode;
}

interface ConsumerProps<T> {
  children: (value: T) => ReactNode;
}
```

**Usage Examples:**

```javascript
import React, { createContext, useContext, useState } from 'react';

// Create theme context
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <MainContent />
      <ThemeToggle onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  
  return (
    <header className={`header-${theme}`}>
      <h1>My App</h1>
    </header>
  );
}

// Complex context with multiple values
const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false
});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    const userData = await authenticateUser(credentials);
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for using context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// Component using the context
function UserProfile() {
  const { user, logout, isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Consumer Pattern

Using Context.Consumer for consuming context values (alternative to useContext hook).

```javascript { .api }
/**
 * Context Consumer component for accessing context values
 * @param children - Render function that receives context value
 */
interface ConsumerProps<T> {
  children: (value: T) => ReactNode;
}
```

**Usage Examples:**

```javascript
import React, { createContext } from 'react';

const ConfigContext = createContext({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
});

// Using Consumer component
function ApiStatus() {
  return (
    <ConfigContext.Consumer>
      {(config) => (
        <div>
          <p>API URL: {config.apiUrl}</p>
          <p>Timeout: {config.timeout}ms</p>
          <p>Retries: {config.retries}</p>
        </div>
      )}
    </ConfigContext.Consumer>
  );
}

// Multiple contexts with Consumer
function UserDisplay() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => (
            <div className={`user-display theme-${theme}`}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

// Render prop pattern with Consumer
function withConfig(Component) {
  return function ConfiguredComponent(props) {
    return (
      <ConfigContext.Consumer>
        {(config) => <Component {...props} config={config} />}
      </ConfigContext.Consumer>
    );
  };
}

const ConfiguredApiClient = withConfig(ApiClient);
```

### Context with Reducers

Complex state management using context with useReducer.

```javascript { .api }
/**
 * Context pattern with reducer for complex state management
 */
// No specific API - this is a pattern using createContext with useReducer
```

**Usage Examples:**

```javascript
import React, { createContext, useContext, useReducer } from 'react';

// Shopping cart context with reducer
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      
    case 'CLEAR_CART':
      return { ...state, items: [] };
      
    default:
      return state;
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  });
  
  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Usage in components
function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function CartSummary() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  
  return (
    <div className="cart-summary">
      <h3>Cart ({getTotalItems()} items)</h3>
      <p>Total: ${getTotalPrice().toFixed(2)}</p>
      {items.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
  );
}
```

### createServerContext

Creates server-specific context for server-side rendering scenarios.

```javascript { .api }
/**
 * Creates server-specific context for SSR
 * @param globalName - Global identifier for the context
 * @param defaultValue - Default context value
 * @returns Server context object
 */
function createServerContext<T>(globalName: string, defaultValue: T): ServerContext<T>;

interface ServerContext<T> {
  Provider: ExoticComponent<ProviderProps<T>>;
  Consumer: ExoticComponent<ConsumerProps<T>>;
  displayName?: string;
}
```

**Usage Examples:**

```javascript
import React, { createServerContext, useContext } from 'react';

// Server-specific context for request data
const RequestContext = createServerContext('RequestContext', {
  url: '',
  method: 'GET',
  headers: {},
  userAgent: ''
});

// Server-side provider
function ServerApp({ request, children }) {
  const requestData = {
    url: request.url,
    method: request.method,
    headers: request.headers,
    userAgent: request.get('User-Agent') || ''
  };
  
  return (
    <RequestContext.Provider value={requestData}>
      {children}
    </RequestContext.Provider>
  );
}

// Component that uses server context
function RequestInfo() {
  const request = useContext(RequestContext);
  
  return (
    <div>
      <p>URL: {request.url}</p>
      <p>Method: {request.method}</p>
      <p>User Agent: {request.userAgent}</p>
    </div>
  );
}

// Server context for localization
const LocaleContext = createServerContext('LocaleContext', {
  locale: 'en',
  currency: 'USD',
  timezone: 'UTC'
});

function LocalizedApp({ locale, children }) {
  const localeData = {
    locale: locale || 'en',
    currency: getCurrencyForLocale(locale),
    timezone: getTimezoneForLocale(locale)
  };
  
  return (
    <LocaleContext.Provider value={localeData}>
      {children}
    </LocaleContext.Provider>
  );
}

function PriceDisplay({ amount }) {
  const { currency, locale } = useContext(LocaleContext);
  
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
  
  return <span>{formattedPrice}</span>;
}
```

### Context Best Practices

Common patterns and best practices for using React Context effectively.

**Usage Examples:**

```javascript
// 1. Separate contexts for different concerns
const AuthContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();

// 2. Custom hooks with error boundaries
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 3. Context composition for multiple providers
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SettingsProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// 4. Memoized context values to prevent unnecessary re-renders
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }),
    [theme]
  );
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Split context to avoid unnecessary re-renders
const StateContext = createContext();
const DispatchContext = createContext();

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useState must be used within StateProvider');
  }
  return context;
}

function useDispatch() {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('useDispatch must be used within StateProvider');
  }
  return context;
}
```

## Types

```javascript { .api }
// Context types
interface Context<T> {
  Provider: ExoticComponent<ProviderProps<T>>;
  Consumer: ExoticComponent<ConsumerProps<T>>;
  displayName?: string;
}

interface ServerContext<T> extends Context<T> {}

interface ProviderProps<T> {
  value: T;
  children?: ReactNode;
}

interface ConsumerProps<T> {
  children: (value: T) => ReactNode;
}

// Context hook type
function useContext<T>(context: Context<T>): T;
```