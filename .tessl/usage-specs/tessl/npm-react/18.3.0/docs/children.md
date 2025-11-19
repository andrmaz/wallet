# Children Utilities

React provides utilities for working with `props.children`, allowing you to manipulate, iterate over, and validate child elements. These utilities are essential for building flexible, reusable components.

## Capabilities

### Children.map

Transforms each child element using a function, similar to Array.map.

```javascript { .api }
/**
 * Maps over children elements with transformation function
 * @param children - Children to iterate over
 * @param fn - Function to transform each child
 * @returns Array of transformed children
 */
map<T, C>(
  children: C | ReadonlyArray<C>, 
  fn: (child: C, index: number) => T
): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
```

**Usage Examples:**

```javascript
import React, { Children } from 'react';

// Basic mapping over children
function ButtonGroup({ children, variant = 'primary' }) {
  return (
    <div className="button-group">
      {Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            key: index,
            className: `btn btn-${variant} ${child.props.className || ''}`,
            'data-index': index
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
  <button onClick={handleReset}>Reset</button>
</ButtonGroup>

// Adding wrapper elements
function CardList({ children }) {
  return (
    <div className="card-list">
      {Children.map(children, (child, index) => (
        <div key={index} className="card-wrapper">
          {child}
        </div>
      ))}
    </div>
  );
}

// Filtering and transforming
function ValidatedForm({ children }) {
  return (
    <form>
      {Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === 'input') {
          return React.cloneElement(child, {
            key: index,
            required: true,
            'aria-describedby': `${child.props.name}-error`,
            className: `form-input ${child.props.className || ''}`
          });
        }
        return child;
      })}
    </form>
  );
}

// Complex transformation with context
function TabContainer({ children, activeTab }) {
  return (
    <div className="tab-container">
      {Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type.displayName === 'Tab') {
          return React.cloneElement(child, {
            key: index,
            isActive: index === activeTab,
            tabIndex: index
          });
        }
        return child;
      })}
    </div>
  );
}
```

### Children.forEach

Iterates over children without returning a new array, useful for side effects.

```javascript { .api }
/**
 * Iterates over children for side effects
 * @param children - Children to iterate over
 * @param fn - Function to call for each child
 */
forEach<C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => void): void;
```

**Usage Examples:**

```javascript
import React, { Children, useEffect } from 'react';

// Validation during render
function FormValidator({ children, onValidationChange }) {
  useEffect(() => {
    const errors = [];
    
    Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        // Validate each form field
        if (child.props.required && !child.props.value) {
          errors.push(`Field ${index + 1} is required`);
        }
        
        if (child.props.type === 'email' && child.props.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(child.props.value)) {
            errors.push(`Field ${index + 1} must be a valid email`);
          }
        }
      }
    });
    
    onValidationChange(errors);
  }, [children, onValidationChange]);
  
  return <div>{children}</div>;
}

// Collecting component information
function ComponentAnalyzer({ children }) {
  useEffect(() => {
    const componentTypes = new Set();
    let totalComponents = 0;
    
    Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        componentTypes.add(child.type.name || child.type);
        totalComponents++;
      }
    });
    
    console.log('Component analysis:', {
      totalComponents,
      uniqueTypes: Array.from(componentTypes)
    });
  }, [children]);
  
  return <div>{children}</div>;
}

// Event handler registration
function EventTracker({ children, onChildInteraction }) {
  useEffect(() => {
    Children.forEach(children, (child, index) => {
      if (React.isValidElement(child) && child.props.onClick) {
        // Wrap existing onClick handlers
        const originalOnClick = child.props.onClick;
        
        console.log(`Tracking clicks for child ${index}`);
        
        // In real implementation, you'd clone the element with wrapped handler
        onChildInteraction?.({
          childIndex: index,
          childType: child.type,
          hasClickHandler: true
        });
      }
    });
  }, [children, onChildInteraction]);
  
  return <div>{children}</div>;
}
```

### Children.count

Returns the total number of child elements.

```javascript { .api }
/**
 * Counts the number of children
 * @param children - Children to count
 * @returns Number of children
 */
count(children: any): number;
```

**Usage Examples:**

```javascript
import React, { Children } from 'react';

// Conditional rendering based on child count
function FlexContainer({ children, minItems = 1 }) {
  const childCount = Children.count(children);
  
  if (childCount < minItems) {
    return (
      <div className="insufficient-items">
        <p>Need at least {minItems} items. Currently have {childCount}.</p>
        {children}
      </div>
    );
  }
  
  return (
    <div className={`flex-container items-${childCount}`}>
      {children}
    </div>
  );
}

// Dynamic grid layout
function ResponsiveGrid({ children }) {
  const count = Children.count(children);
  
  const getGridColumns = () => {
    if (count <= 2) return 'grid-cols-1';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
  };
  
  return (
    <div className={`grid ${getGridColumns()} gap-4`}>
      {children}
    </div>
  );
}

// Usage
<ResponsiveGrid>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</ResponsiveGrid>

// Navigation with breadcrumbs
function Breadcrumbs({ children, separator = '>' }) {
  const count = Children.count(children);
  
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {Children.map(children, (child, index) => (
          <li key={index}>
            {child}
            {index < count - 1 && (
              <span className="separator" aria-hidden="true">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Pagination based on child count
function PaginatedList({ children, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = Children.count(children);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const currentItems = Children.toArray(children).slice(startIndex, endIndex);
  
  return (
    <div>
      <div className="items">
        {currentItems}
      </div>
      
      <div className="pagination">
        <p>
          Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
        </p>
        
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Children.only

Ensures that children contains exactly one child element and returns it.

```javascript { .api }
/**
 * Validates that children contains exactly one child
 * @param children - Children to validate
 * @returns Single child element
 * @throws Error if children is not a single element
 */
only<C>(children: C): C extends any[] ? never : C;
```

**Usage Examples:**

```javascript
import React, { Children } from 'react';

// Modal wrapper that requires single child
function Modal({ children, isOpen, onClose }) {
  const child = Children.only(children); // Throws if not exactly one child
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        {child}
      </div>
    </div>
  );
}

// Usage - Valid
<Modal isOpen={isModalOpen} onClose={closeModal}>
  <UserProfile user={selectedUser} />
</Modal>

// Usage - Invalid (throws error)
<Modal isOpen={isModalOpen} onClose={closeModal}>
  <UserProfile user={selectedUser} />
  <UserActions user={selectedUser} />
</Modal>

// Tooltip wrapper
function Tooltip({ children, text, position = 'top' }) {
  const child = Children.only(children);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="tooltip-wrapper">
      {React.cloneElement(child, {
        onMouseEnter: () => setShowTooltip(true),
        onMouseLeave: () => setShowTooltip(false),
        'aria-describedby': showTooltip ? 'tooltip' : undefined
      })}
      
      {showTooltip && (
        <div id="tooltip" className={`tooltip tooltip-${position}`} role="tooltip">
          {text}
        </div>
      )}
    </div>
  );
}

// Usage
<Tooltip text="Click to save your changes" position="bottom">
  <button onClick={handleSave}>Save</button>
</Tooltip>

// Form field wrapper
function FormField({ children, label, error, required }) {
  const child = Children.only(children);
  const id = child.props.id || `field-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`form-field ${error ? 'error' : ''}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      {React.cloneElement(child, {
        id,
        'aria-invalid': !!error,
        'aria-describedby': error ? `${id}-error` : undefined,
        className: `form-input ${child.props.className || ''}`
      })}
      
      {error && (
        <div id={`${id}-error`} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

// Usage
<FormField label="Email" error={emailError} required>
  <input type="email" placeholder="Enter your email" />
</FormField>

// Error boundary for single child
function SafeWrapper({ children, fallback }) {
  const child = Children.only(children);
  
  return (
    <ErrorBoundary fallback={fallback}>
      {child}
    </ErrorBoundary>
  );
}
```

### Children.toArray

Converts children to a flat array, useful for advanced manipulation.

```javascript { .api }
/**
 * Converts children to flat array
 * @param children - Children to convert
 * @returns Flat array of children
 */
toArray(children: ReactNode | ReactNode[]): Array<Exclude<ReactNode, boolean | null | undefined>>;
```

**Usage Examples:**

```javascript
import React, { Children } from 'react';

// Reordering children
function ReorderableList({ children, order }) {
  const childArray = Children.toArray(children);
  
  if (order && order.length === childArray.length) {
    const reorderedChildren = order.map(index => childArray[index]);
    return <div className="reorderable-list">{reorderedChildren}</div>;
  }
  
  return <div className="reorderable-list">{children}</div>;
}

// Usage
<ReorderableList order={[2, 0, 1]}>
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</ReorderableList>

// Filtering children by type
function TypeFilter({ children, allowedTypes = [] }) {
  const childArray = Children.toArray(children);
  
  const filteredChildren = childArray.filter(child => {
    if (React.isValidElement(child)) {
      return allowedTypes.includes(child.type);
    }
    return allowedTypes.includes('text');
  });
  
  return <div>{filteredChildren}</div>;
}

// Usage - only allow buttons and inputs
<TypeFilter allowedTypes={['button', 'input']}>
  <button>Valid button</button>
  <div>This will be filtered out</div>
  <input type="text" />
  <span>This will be filtered out</span>
</TypeFilter>

// Grouping children
function GroupedLayout({ children, groupSize = 3 }) {
  const childArray = Children.toArray(children);
  const groups = [];
  
  for (let i = 0; i < childArray.length; i += groupSize) {
    groups.push(childArray.slice(i, i + groupSize));
  }
  
  return (
    <div className="grouped-layout">
      {groups.map((group, index) => (
        <div key={index} className="group">
          {group}
        </div>
      ))}
    </div>
  );
}

// Usage
<GroupedLayout groupSize={2}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
  <Card>Item 5</Card>
</GroupedLayout>

// Advanced manipulation - inserting separators
function SeparatedList({ children, separator = <hr /> }) {
  const childArray = Children.toArray(children);
  const result = [];
  
  childArray.forEach((child, index) => {
    result.push(child);
    
    // Add separator between items (not after last item)
    if (index < childArray.length - 1) {
      result.push(React.cloneElement(separator, { key: `sep-${index}` }));
    }
  });
  
  return <div className="separated-list">{result}</div>;
}

// Conditional children rendering
function ConditionalChildren({ children, condition, fallback }) {
  const childArray = Children.toArray(children);
  
  if (!condition) {
    return fallback || null;
  }
  
  // Filter out null/undefined children
  const validChildren = childArray.filter(child => 
    child !== null && child !== undefined && child !== false
  );
  
  return <div>{validChildren}</div>;
}

// Recursive flattening for nested structures
function FlattenChildren({ children }) {
  const flattenRecursive = (children) => {
    return Children.toArray(children).reduce((acc, child) => {
      if (React.isValidElement(child) && child.props.children) {
        return [...acc, child, ...flattenRecursive(child.props.children)];
      }
      return [...acc, child];
    }, []);
  };
  
  const flattenedChildren = flattenRecursive(children);
  
  return (
    <div className="flattened">
      {flattenedChildren.map((child, index) => (
        <div key={index} className="flattened-item">
          {child}
        </div>
      ))}
    </div>
  );
}
```

## Types

```javascript { .api }
// Children utility types
interface ReactChildren {
  map<T, C>(
    children: C | ReadonlyArray<C>,
    fn: (child: C, index: number) => T
  ): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
  
  forEach<C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => void): void;
  
  count(children: any): number;
  
  only<C>(children: C): C extends any[] ? never : C;
  
  toArray(children: ReactNode | ReactNode[]): Array<Exclude<ReactNode, boolean | null | undefined>>;
}

// React node types
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
type ReactChild = ReactElement | ReactText;
type ReactText = string | number;
type ReactFragment = {} | Iterable<ReactNode>;
```