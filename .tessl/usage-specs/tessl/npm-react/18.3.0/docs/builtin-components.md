# Built-in Components

React provides several built-in components for layout, performance optimization, and development features. These special components enable advanced React patterns and help with debugging and performance.

## Capabilities

### Fragment

Groups multiple elements without adding an extra DOM node.

```javascript { .api }
/**
 * Groups children without creating DOM wrapper
 */
const Fragment: ExoticComponent<{ children?: ReactNode }>;
```

**Usage Examples:**

```javascript
import React, { Fragment } from 'react';

// Using Fragment component
function UserInfo({ user }) {
  return (
    <Fragment>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </Fragment>
  );
}

// Using short syntax
function UserInfo({ user }) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </>
  );
}

// With key prop (useful in lists)
function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <Fragment key={item.id}>
          <li>{item.name}</li>
          <li className="description">{item.description}</li>
        </Fragment>
      ))}
    </ul>
  );
}

// Conditional fragments
function ConditionalContent({ showDetails, user }) {
  return (
    <div>
      <h1>Welcome</h1>
      {showDetails && (
        <Fragment>
          <p>User: {user.name}</p>
          <p>Last login: {user.lastLogin}</p>
          <p>Status: {user.status}</p>
        </Fragment>
      )}
    </div>
  );
}
```

### StrictMode

Enables additional checks and warnings for development.

```javascript { .api }
/**
 * Enables additional development checks and warnings
 */
const StrictMode: ExoticComponent<{ children?: ReactNode }>;
```

**Usage Examples:**

```javascript
import React, { StrictMode } from 'react';

// Wrap entire app in StrictMode
function App() {
  return (
    <StrictMode>
      <Header />
      <MainContent />
      <Footer />
    </StrictMode>
  );
}

// Wrap specific components for stricter checks
function DevelopmentApp() {
  return (
    <div>
      <Header />
      <StrictMode>
        {/* This section will have additional checks */}
        <ExperimentalFeature />
        <NewComponent />
      </StrictMode>
      <Footer />
    </div>
  );
}

// StrictMode helps identify:
// - Components with unsafe lifecycles
// - Legacy string ref API usage
// - Deprecated findDOMNode usage
// - Unexpected side effects
// - Legacy context API
function ProblematicComponent() {
  // StrictMode will warn about this deprecated lifecycle
  UNSAFE_componentWillReceiveProps(nextProps) {
    // This will trigger warnings in StrictMode
  }
  
  // StrictMode will help detect side effects by double-invoking
  useEffect(() => {
    // This effect should be idempotent
    console.log('Effect running'); // Will log twice in StrictMode
  }, []);
  
  return <div>Component content</div>;
}
```

### Profiler

Measures performance of React component trees.

```javascript { .api }
/**
 * Measures rendering performance of component tree
 */
const Profiler: ExoticComponent<ProfilerProps>;

interface ProfilerProps {
  children?: ReactNode;
  id: string;
  onRender: ProfilerOnRenderCallback;
}

type ProfilerOnRenderCallback = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<Interaction>
) => void;
```

**Usage Examples:**

```javascript
import React, { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  console.log('Profiler:', {
    id,                 // "App" - the id prop of the Profiler tree that has just committed
    phase,              // "mount" (first render) or "update" (re-render)
    actualDuration,     // time spent rendering the committed update
    baseDuration,       // estimated time to render the entire subtree without memoization
    startTime,          // when React began rendering this update
    commitTime          // when React committed this update
  });
  
  // Send to analytics service
  analytics.track('react_render', {
    component: id,
    phase,
    duration: actualDuration,
    timestamp: commitTime
  });
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Profiler id="MainContent" onRender={onRenderCallback}>
        <UserList />
        <ProductGrid />
      </Profiler>
      <Footer />
    </Profiler>
  );
}

// Performance monitoring wrapper
function PerformanceWrapper({ id, children, threshold = 100 }) {
  const handleRender = (id, phase, actualDuration) => {
    if (actualDuration > threshold) {
      console.warn(`Slow render detected in ${id}: ${actualDuration}ms`);
      
      // Report slow renders
      if (typeof reportWebVitals === 'function') {
        reportWebVitals({
          name: 'slow-render',
          value: actualDuration,
          id: id
        });
      }
    }
  };
  
  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
}

// Usage
<PerformanceWrapper id="ExpensiveComponent" threshold={50}>
  <ExpensiveDataVisualization />
</PerformanceWrapper>
```

### Suspense

Handles loading states for asynchronous components and data fetching.

```javascript { .api }
/**
 * Handles loading states for async operations
 */
const Suspense: ExoticComponent<SuspenseProps>;

interface SuspenseProps {
  children?: ReactNode;
  fallback: NonNullable<ReactNode> | null;
}
```

**Usage Examples:**

```javascript
import React, { Suspense, lazy } from 'react';

// Lazy-loaded components
const LazyComponent = lazy(() => import('./LazyComponent'));
const UserProfile = lazy(() => import('./UserProfile'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// Nested suspense boundaries
function UserDashboard({ userId }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <Suspense fallback={<SkeletonHeader />}>
        <UserHeader userId={userId} />
        <Suspense fallback={<SkeletonContent />}>
          <UserContent userId={userId} />
        </Suspense>
      </Suspense>
    </div>
  );
}

// Data fetching with Suspense (requires data fetching library that supports Suspense)
function UserList() {
  // This would throw a promise that Suspense catches
  const users = useUsers(); // Suspense-compatible data fetching
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UserList />
    </Suspense>
  );
}

// Loading state component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

// Route-based code splitting
function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<LazyAbout />} />
          <Route path="/profile" element={<LazyProfile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### SuspenseList

Coordinates loading states of multiple Suspense components.

```javascript { .api }
/**
 * Orchestrates loading order of multiple Suspense boundaries
 */
const SuspenseList: ExoticComponent<SuspenseListProps>;

interface SuspenseListProps {
  children?: ReactNode;
  revealOrder?: 'forwards' | 'backwards' | 'together';
  tail?: 'collapsed' | 'hidden';
}
```

**Usage Examples:**

```javascript
import React, { Suspense, SuspenseList } from 'react';

// Control loading order
function ProfilePage() {
  return (
    <SuspenseList revealOrder="forwards">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileHeader />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <ProfileContent />
      </Suspense>
      <Suspense fallback={<SidebarSkeleton />}>
        <ProfileSidebar />
      </Suspense>
    </SuspenseList>
  );
}

// Load everything together
function Dashboard() {
  return (
    <SuspenseList revealOrder="together">
      <Suspense fallback={<ChartSkeleton />}>
        <SalesChart />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsWidget />
      </Suspense>
    </SuspenseList>
  );
}

// Control tail behavior
function PostList() {
  return (
    <SuspenseList revealOrder="forwards" tail="collapsed">
      {posts.map(post => (
        <Suspense key={post.id} fallback={<PostSkeleton />}>
          <PostCard post={post} />
        </Suspense>
      ))}
    </SuspenseList>
  );
}

// Nested SuspenseList
function AppLayout() {
  return (
    <div className="app-layout">
      <header>
        <Suspense fallback={<HeaderSkeleton />}>
          <AppHeader />
        </Suspense>
      </header>
      
      <main>
        <SuspenseList revealOrder="together">
          <Suspense fallback={<NavSkeleton />}>
            <Navigation />
          </Suspense>
          
          <div className="content">
            <SuspenseList revealOrder="forwards" tail="hidden">
              <Suspense fallback={<ContentSkeleton />}>
                <MainContent />
              </Suspense>
              <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar />
              </Suspense>
            </SuspenseList>
          </div>
        </SuspenseList>
      </main>
    </div>
  );
}
```

## Types

```javascript { .api }
// Built-in component types
type ExoticComponent<P = {}> = (props: P) => ReactElement | null;

// Profiler callback types
interface Interaction {
  id: number;
  name: string;
  timestamp: number;
}

// Suspense types  
type SuspenseProps = {
  children?: ReactNode;
  fallback: NonNullable<ReactNode> | null;
};

type SuspenseListProps = {
  children?: ReactNode;
  revealOrder?: 'forwards' | 'backwards' | 'together';
  tail?: 'collapsed' | 'hidden';
};
```