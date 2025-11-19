# Concurrent Features

React's concurrent features enable better user experience by allowing React to interrupt and prioritize updates. These features help maintain responsive UIs even during heavy computations.

## Capabilities

### startTransition

Marks state updates as non-urgent transitions that can be interrupted by more urgent updates.

```javascript { .api }
/**
 * Marks state updates as non-urgent transitions
 * @param scope - Function containing non-urgent state updates
 */
function startTransition(scope: () => void): void;
```

**Usage Examples:**

```javascript
import React, { startTransition, useState } from 'react';

// Search with urgent input updates and non-urgent results
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handlesearch = (newQuery) => {
    // Urgent update - keeps input responsive
    setQuery(newQuery);
    
    // Non-urgent update - can be interrupted
    startTransition(() => {
      setIsSearching(true);
      
      // Simulate expensive search operation
      const searchResults = performExpensiveSearch(newQuery);
      setResults(searchResults);
      setIsSearching(false);
    });
  };
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      
      {isSearching && <div>Searching...</div>}
      
      <SearchResults results={results} />
    </div>
  );
}

// Tab switching with smooth transitions
function TabContainer() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabContent, setTabContent] = useState(null);
  
  const switchTab = (tabIndex) => {
    // Urgent update - immediately switch active tab
    setActiveTab(tabIndex);
    
    // Non-urgent update - load and render content
    startTransition(() => {
      const content = loadTabContent(tabIndex);
      setTabContent(content);
    });
  };
  
  return (
    <div>
      <div className="tab-nav">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => switchTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {tabContent || <div>Loading tab content...</div>}
      </div>
    </div>
  );
}

// Data filtering with responsive UI
function DataTable({ data }) {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortOrder, setSortOrder] = useState('asc');
  
  const handleFilterChange = (newFilter) => {
    // Urgent update - keep filter input responsive
    setFilter(newFilter);
    
    // Non-urgent update - filter and sort data
    startTransition(() => {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(newFilter.toLowerCase())
      );
      
      const sorted = sortData(filtered, sortOrder);
      setFilteredData(sorted);
    });
  };
  
  const handleSort = (order) => {
    setSortOrder(order);
    
    startTransition(() => {
      const sorted = sortData(filteredData, order);
      setFilteredData(sorted);
    });
  };
  
  return (
    <div>
      <div className="controls">
        <input
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder="Filter data..."
        />
        
        <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>
      
      <table>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### useTransition (Hook Version)

Hook version of startTransition that also provides pending state.

```javascript { .api }
/**
 * Hook for managing transitions with pending state
 * @returns Tuple with isPending boolean and startTransition function
 */
function useTransition(): [boolean, (callback: () => void) => void];
```

**Usage Examples:**

```javascript
import React, { useTransition, useState } from 'react';

// Search with loading indicator
function SearchWithStatus() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    
    startTransition(() => {
      // This will set isPending to true until updates complete
      const searchResults = performExpensiveSearch(newQuery);
      setResults(searchResults);
    });
  };
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      
      {isPending && (
        <div className="search-pending">
          <Spinner /> Searching...
        </div>
      )}
      
      <SearchResults results={results} />
    </div>
  );
}

// Form with async validation
function AsyncForm() {
  const [formData, setFormData] = useState({ email: '', username: '' });
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  
  const validateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    startTransition(() => {
      // Async validation (API call)
      validateFieldAsync(field, value).then(validationResult => {
        setErrors(prev => ({
          ...prev,
          [field]: validationResult.error
        }));
      });
    });
  };
  
  return (
    <form className={isPending ? 'validating' : ''}>
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => validateField('email', e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => validateField('username', e.target.value)}
          placeholder="Username"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      
      {isPending && <div className="validation-indicator">Validating...</div>}
      
      <button type="submit" disabled={isPending || Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
}

// Paginated data with smooth transitions
function PaginatedList({ data, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const changePage = (page) => {
    // Immediate update for active page indicator
    setCurrentPage(page);
    
    // Transition for data loading/processing
    startTransition(() => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageData = data.slice(startIndex, endIndex);
      
      // Simulate processing time for large datasets
      setDisplayData(processDataForDisplay(pageData));
    });
  };
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  return (
    <div>
      <div className={`data-container ${isPending ? 'loading' : ''}`}>
        {isPending && <div className="loading-overlay">Loading...</div>}
        <DataList items={displayData} />
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
        disabled={isPending}
      />
    </div>
  );
}
```

### useDeferredValue

Defers updating a value until more urgent updates have completed.

```javascript { .api }
/**
 * Defers value updates for performance optimization
 * @param value - Value to defer
 * @returns Deferred version of the value
 */
function useDeferredValue<T>(value: T): T;
```

**Usage Examples:**

```javascript
import React, { useDeferredValue, useState, useMemo } from 'react';

// Expensive list filtering
function ProductList({ products }) {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);
  
  // Expensive filtering operation uses deferred value
  const filteredProducts = useMemo(() => {
    if (!deferredFilter) return products;
    
    return products.filter(product =>
      product.name.toLowerCase().includes(deferredFilter.toLowerCase()) ||
      product.description.toLowerCase().includes(deferredFilter.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(deferredFilter.toLowerCase()))
    );
  }, [products, deferredFilter]);
  
  return (
    <div>
      <input
        value={filter} // Input stays responsive with immediate value
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter products..."
      />
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// Chart with deferred data updates
function DataVisualization({ dataset, chartType }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedRange, setSelectedRange] = useState(null);
  
  // Defer expensive data processing
  const deferredZoom = useDeferredValue(zoomLevel);
  const deferredRange = useDeferredValue(selectedRange);
  
  const processedData = useMemo(() => {
    // Expensive data processing for visualization
    return processDataForChart(dataset, {
      zoom: deferredZoom,
      range: deferredRange,
      type: chartType
    });
  }, [dataset, deferredZoom, deferredRange, chartType]);
  
  return (
    <div>
      <div className="chart-controls">
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
        />
        <span>Zoom: {zoomLevel}x</span>
      </div>
      
      <Chart data={processedData} onRangeSelect={setSelectedRange} />
    </div>
  );
}

// Search results with deferred query
function SmartSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const deferredQuery = useDeferredValue(query);
  
  const searchResults = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    
    // Expensive search across multiple data sources
    return performComprehensiveSearch(deferredQuery, category);
  }, [deferredQuery, category]);
  
  const isStale = query !== deferredQuery;
  
  return (
    <div>
      <div className="search-controls">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="products">Products</option>
          <option value="articles">Articles</option>
          <option value="users">Users</option>
        </select>
      </div>
      
      <div className={`search-results ${isStale ? 'stale' : ''}`}>
        {isStale && (
          <div className="search-updating">Updating results...</div>
        )}
        
        <SearchResults results={searchResults} />
      </div>
    </div>
  );
}

// Complex form with deferred validation
function ComplexForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: []
  });
  
  // Defer expensive validation
  const deferredFormData = useDeferredValue(formData);
  
  const validationResults = useMemo(() => {
    return validateComplexForm(deferredFormData);
  }, [deferredFormData]);
  
  const isValidating = formData !== deferredFormData;
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <form className={isValidating ? 'validating' : ''}>
      <input
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Full Name"
      />
      
      <input
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
        type="email"
      />
      
      <PreferenceSelector
        value={formData.preferences}
        onChange={(prefs) => updateField('preferences', prefs)}
      />
      
      {isValidating && <div className="validation-pending">Validating...</div>}
      
      <ValidationSummary results={validationResults} />
      
      <button
        type="submit"
        disabled={isValidating || !validationResults.isValid}
      >
        Submit
      </button>
    </form>
  );
}
```

## Types

```javascript { .api }
// Concurrent feature types
function startTransition(scope: () => void): void;

function useTransition(): [boolean, (callback: () => void) => void];

function useDeferredValue<T>(value: T): T;

// Transition callback type
type TransitionCallback = () => void;

// Hook return types
type UseTransitionReturn = [boolean, (callback: TransitionCallback) => void];
```