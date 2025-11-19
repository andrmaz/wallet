# Error Handling

The GraphQL.js error module provides specialized error classes and utilities for creating, handling, and formatting GraphQL errors. It includes comprehensive error reporting with source location information, error formatting for client responses, and utilities for creating errors during parsing, validation, and execution.

## Capabilities

### GraphQL Error Class

Main error class for representing GraphQL errors with detailed location and context information.

```javascript { .api }
/**
 * GraphQL Error
 * 
 * A GraphQL Error describing an Error found during the parse, validate, or 
 * execute phases of performing a GraphQL operation. In addition to a message 
 * and stack trace, it also includes information about the locations in the 
 * GraphQL document and/or execution result that correspond to the Error.
 */
class GraphQLError extends Error {
  constructor(
    message: string,
    nodes?: ReadonlyArray<ASTNode> | ASTNode | undefined,
    source?: Maybe<Source>,
    positions?: Maybe<ReadonlyArray<number>>,
    path?: Maybe<ReadonlyArray<string | number>>,
    originalError?: Maybe<Error>,
    extensions?: Maybe<{ [key: string]: any }>
  );
  
  /**
   * The original error thrown from a field resolver during execution.
   */
  readonly originalError: Error | undefined;
  
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   */
  readonly locations: ReadonlyArray<SourceLocation> | undefined;
  
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   */
  readonly path: ReadonlyArray<string | number> | undefined;
  
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  readonly nodes: ReadonlyArray<ASTNode> | undefined;
  
  /**
   * The source GraphQL document for the first location of this error.
   */
  readonly source: Source | undefined;
  
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  readonly positions: ReadonlyArray<number> | undefined;
  
  /**
   * Extension fields to add to the formatted error.
   */
  readonly extensions: { [key: string]: any } | undefined;
  
  toString(): string;
  toJSON(): GraphQLFormattedError;
}

interface SourceLocation {
  line: number;
  column: number;
}

interface GraphQLFormattedError {
  readonly message: string;
  readonly locations?: ReadonlyArray<SourceLocation>;
  readonly path?: ReadonlyArray<string | number>;
  readonly extensions?: { [key: string]: any };
}
```

**Usage Example:**

```javascript
import { GraphQLError } from "graphql";

// Create error with source location
const error = new GraphQLError(
  "Cannot query field 'unknownField' on type 'User'.",
  fieldNode,  // AST node
  undefined,  // source (will be derived from node)
  undefined,  // positions (will be derived from node)
  ['user', 'unknownField'],  // execution path
  undefined,  // original error
  { code: 'FIELD_NOT_FOUND' }  // extensions
);

console.log(error.message);
console.log(error.locations);
console.log(error.path);
console.log(error.extensions);
```

### Error Creation Utilities

Specialized functions for creating errors in different contexts.

```javascript { .api }
/**
 * Syntax Error
 * 
 * Creates a GraphQL syntax error for parsing failures.
 */
function syntaxError(
  source: Source,
  position: number,
  description: string
): GraphQLError;

/**
 * Located Error
 * 
 * Given an arbitrary Error, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */
function locatedError(
  originalError: Error,
  nodes: ASTNode | ReadonlyArray<ASTNode>,
  path?: ReadonlyArray<string | number>
): GraphQLError;
```

**Usage Examples:**

```javascript
import { syntaxError, locatedError } from "graphql";

// Create syntax error during parsing
const parseError = syntaxError(
  source,
  10,  // character position
  "Expected Name, found }"
);

// Create located error during execution
try {
  // Some field resolver logic that throws
  const result = await fetchUserFromDatabase(id);
} catch (originalError) {
  // Wrap with GraphQL location information
  throw locatedError(
    originalError,
    fieldNode,
    ['user']
  );
}
```

### Error Formatting

Functions for formatting GraphQL errors for client responses.

```javascript { .api }
/**
 * Format Error
 * 
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
function formatError(error: GraphQLError): GraphQLFormattedError;

/**
 * Print Error
 * 
 * Prints a GraphQL error to the console with highlighted source location.
 */
function printError(error: GraphQLError): string;
```

**Usage Example:**

```javascript
import { formatError, printError } from "graphql";

// Format error for client response
const formattedError = formatError(error);
const response = {
  data: null,
  errors: [formattedError]
};

// Print error for debugging
console.log(printError(error));
// Output:
// GraphQL Error: Cannot query field 'unknownField' on type 'User'.
// 
//     2 |   user {
//     3 |     name
//   > 4 |     unknownField
//       |     ^^^^^^^^^^^^
//     5 |   }
//     6 | }
```

### Error Context and Path Utilities

Utilities for working with error paths and context information.

```javascript { .api }
/**
 * Add Path
 * 
 * Build a response path from the current path and key.
 */
function addPath(
  prev: ResponsePath | undefined,
  key: string | number,
  typename?: string
): ResponsePath;

/**
 * Response Path as Array
 * 
 * Convert a response path to an array representation.
 */
function responsePathAsArray(path: ResponsePath): ReadonlyArray<string | number>;

interface ResponsePath {
  readonly prev: ResponsePath | undefined;
  readonly key: string | number;
  readonly typename?: string;
}
```

### Custom Error Extensions

Pattern for creating errors with custom extensions and error codes.

```javascript { .api }
/**
 * Custom Error with Extensions
 * 
 * Example pattern for creating domain-specific errors.
 */
function createCustomError(
  message: string,
  code: string,
  nodes?: ASTNode | ReadonlyArray<ASTNode>,
  path?: ReadonlyArray<string | number>,
  additionalExtensions?: { [key: string]: any }
): GraphQLError {
  return new GraphQLError(
    message,
    nodes,
    undefined,
    undefined,
    path,
    undefined,
    {
      code,
      ...additionalExtensions
    }
  );
}

// Common error codes
const ErrorCodes = {
  UNAUTHENTICATED: "UNAUTHENTICATED",
  FORBIDDEN: "FORBIDDEN",
  BAD_USER_INPUT: "BAD_USER_INPUT",
  INTERNAL_ERROR: "INTERNAL_ERROR"
} as const;
```

**Custom Error Examples:**

```javascript
import { GraphQLError } from "graphql";

// Authentication error
function createAuthenticationError(message: string = "Authentication required") {
  return new GraphQLError(message, undefined, undefined, undefined, undefined, undefined, {
    code: "UNAUTHENTICATED"
  });
}

// Permission error  
function createPermissionError(
  message: string,
  requiredPermission: string,
  nodes?: ASTNode | ReadonlyArray<ASTNode>
) {
  return new GraphQLError(message, nodes, undefined, undefined, undefined, undefined, {
    code: "FORBIDDEN",
    requiredPermission
  });
}

// Input validation error
function createValidationError(
  message: string,
  field: string,
  value: any,
  nodes?: ASTNode | ReadonlyArray<ASTNode>
) {
  return new GraphQLError(message, nodes, undefined, undefined, undefined, undefined, {
    code: "BAD_USER_INPUT",
    field,
    invalidValue: value
  });
}

// Usage in resolvers
const userResolvers = {
  Query: {
    sensitiveData: (parent, args, context, info) => {
      if (!context.user) {
        throw createAuthenticationError();
      }
      
      if (!context.user.hasPermission('READ_SENSITIVE')) {
        throw createPermissionError(
          "Insufficient permissions to access sensitive data",
          "READ_SENSITIVE", 
          info.fieldNodes
        );
      }
      
      return fetchSensitiveData();
    }
  },
  
  Mutation: {
    createUser: (parent, { input }, context, info) => {
      if (!input.email || !isValidEmail(input.email)) {
        throw createValidationError(
          "Invalid email address provided",
          "email",
          input.email,
          info.fieldNodes
        );
      }
      
      return createUser(input);
    }
  }
};
```

### Error Handling Patterns

Common patterns for error handling in GraphQL applications.

```javascript { .api }
/**
 * Error Boundary Pattern
 * 
 * Wrap resolvers with error handling logic.
 */
function withErrorHandling<TArgs, TReturn>(
  resolver: GraphQLFieldResolver<any, any, TArgs>
): GraphQLFieldResolver<any, any, TArgs> {
  return async (source, args, context, info) => {
    try {
      return await resolver(source, args, context, info);
    } catch (error) {
      // Transform known errors
      if (error instanceof DatabaseConnectionError) {
        throw new GraphQLError(
          "Database temporarily unavailable",
          info.fieldNodes,
          undefined,
          undefined,
          undefined,
          error,
          { code: "INTERNAL_ERROR", retryable: true }
        );
      }
      
      // Re-throw GraphQL errors as-is
      if (error instanceof GraphQLError) {
        throw error;
      }
      
      // Wrap unknown errors
      throw locatedError(error, info.fieldNodes, info.path.key);
    }
  };
}

/**
 * Validation Error Collector
 * 
 * Collect multiple validation errors before throwing.
 */
class ValidationErrorCollector {
  private errors: GraphQLError[] = [];
  
  addError(
    message: string,
    field?: string,
    nodes?: ASTNode | ReadonlyArray<ASTNode>
  ): void {
    this.errors.push(
      new GraphQLError(message, nodes, undefined, undefined, undefined, undefined, {
        code: "BAD_USER_INPUT",
        field
      })
    );
  }
  
  hasErrors(): boolean {
    return this.errors.length > 0;
  }
  
  throwIfErrors(): void {
    if (this.hasErrors()) {
      // Throw the first error, but include all errors in extensions
      const firstError = this.errors[0];
      throw new GraphQLError(
        "Validation failed",
        firstError.nodes,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          code: "BAD_USER_INPUT",
          validationErrors: this.errors.map(err => ({
            message: err.message,
            field: err.extensions?.field
          }))
        }
      );
    }
  }
}
```

### Error Masking and Security

Functions for safely exposing errors to clients while protecting sensitive information.

```javascript { .api }
/**
 * Mask Error
 * 
 * Mask sensitive error information for production.
 */
function maskError(error: GraphQLError, isProduction: boolean = true): GraphQLError {
  if (!isProduction) {
    return error;
  }
  
  // Only expose safe error codes to clients
  const safeCodes = new Set([
    "UNAUTHENTICATED",
    "FORBIDDEN", 
    "BAD_USER_INPUT",
    "PERSISTED_QUERY_NOT_FOUND"
  ]);
  
  const code = error.extensions?.code;
  
  if (!code || !safeCodes.has(code)) {
    // Mask internal errors
    return new GraphQLError(
      "Internal server error",
      error.nodes,
      error.source,
      error.positions,
      error.path,
      undefined, // Don't expose original error
      { code: "INTERNAL_ERROR" }
    );
  }
  
  // Safe to expose
  return error;
}

/**
 * Format Error for Client
 * 
 * Format error with masking and additional client information.
 */
function formatErrorForClient(
  error: GraphQLError,
  options: {
    isProduction?: boolean;
    includeStackTrace?: boolean;
  } = {}
): GraphQLFormattedError {
  const { isProduction = true, includeStackTrace = false } = options;
  
  const maskedError = maskError(error, isProduction);
  const formatted = formatError(maskedError);
  
  if (includeStackTrace && !isProduction && error.originalError) {
    formatted.extensions = {
      ...formatted.extensions,
      stackTrace: error.originalError.stack
    };
  }
  
  return formatted;
}
```

## Type Definitions

```javascript { .api }
// Core error interfaces
interface GraphQLFormattedError {
  readonly message: string;
  readonly locations?: ReadonlyArray<SourceLocation>;
  readonly path?: ReadonlyArray<string | number>;
  readonly extensions?: { [key: string]: any };
}

interface SourceLocation {
  readonly line: number;
  readonly column: number;
}

// Error context types
interface ResponsePath {
  readonly prev: ResponsePath | undefined;
  readonly key: string | number;
  readonly typename?: string;
}

// Error extension types
interface ErrorExtensions {
  readonly code?: string;
  readonly [key: string]: any;
}

// Common error codes
type ErrorCode = 
  | "GRAPHQL_PARSE_FAILED"
  | "GRAPHQL_VALIDATION_FAILED"
  | "BAD_USER_INPUT"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "PERSISTED_QUERY_NOT_FOUND"
  | "PERSISTED_QUERY_NOT_SUPPORTED"
  | "INTERNAL_ERROR";

// Error formatter function type
type ErrorFormatter = (error: GraphQLError) => GraphQLFormattedError;

// Error handler function type for field resolvers
type ErrorHandler<TContext = any> = (
  error: Error,
  source: any,
  args: any,
  context: TContext,
  info: GraphQLResolveInfo
) => GraphQLError | Error | never;

// Validation error details
interface ValidationErrorDetail {
  message: string;
  field?: string;
  code?: string;
  value?: any;
}

// Error classification utilities
interface ErrorClassification {
  isClientError: boolean;
  isServerError: boolean;
  shouldRetry: boolean;
  statusCode: number;
}

// Maybe type for optional values
type Maybe<T> = T | null | undefined;
```