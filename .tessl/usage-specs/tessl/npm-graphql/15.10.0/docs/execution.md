# Execution Engine

The GraphQL.js execution module provides the core functionality for executing GraphQL operations against a schema. It includes field resolution, type resolution, execution context management, and utilities for working with execution results and directive values.

## Capabilities

### Core Execution Functions

Primary functions for executing GraphQL operations with comprehensive error handling and context management.

```javascript { .api }
/**
 * Execute GraphQL Operation
 */
function execute(args: ExecutionArgs): PromiseOrValue<ExecutionResult>;

function executeSync(args: ExecutionArgs): ExecutionResult;

interface ExecutionArgs {
  schema: GraphQLSchema;
  document: DocumentNode;
  rootValue?: any;
  contextValue?: any;
  variableValues?: Maybe<{ [variable: string]: any }>;
  operationName?: Maybe<string>;
  fieldResolver?: Maybe<GraphQLFieldResolver<any, any>>;
  typeResolver?: Maybe<GraphQLTypeResolver<any, any>>;
}

interface ExecutionResult {
  errors?: ReadonlyArray<GraphQLError>;
  data?: any;
  extensions?: { [key: string]: any };
}

interface FormattedExecutionResult {
  errors?: ReadonlyArray<GraphQLFormattedError>;
  data?: any;
  extensions?: { [key: string]: any };
}

type PromiseOrValue<T> = Promise<T> | T;
type Maybe<T> = T | null | undefined;
```

**Usage Example:**

```javascript
import { execute, parse } from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString }
        },
        resolve: (source, { name }) => `Hello ${name || "World"}!`
      }
    }
  })
});

const document = parse(`
  query GetGreeting($name: String) {
    hello(name: $name)
  }
`);

const result = await execute({
  schema,
  document,
  variableValues: { name: "Alice" },
  contextValue: { user: { id: 1 } }
});

console.log(result); // { data: { hello: "Hello Alice!" } }
```

### Field Resolution

Default field resolver and utilities for resolving field values.

```javascript { .api }
/**
 * Default Field Resolver
 * 
 * Default implementation used when no custom resolver is provided.
 * Looks up properties on the source object.
 */
function defaultFieldResolver(
  source: any,
  args: any,
  contextValue: any,
  info: GraphQLResolveInfo
): any;

/**
 * Default Type Resolver
 * 
 * Default implementation for resolving abstract types.
 * Uses the __typename field or isTypeOf functions.
 */
function defaultTypeResolver(
  value: any,
  contextValue: any,
  info: GraphQLResolveInfo,
  abstractType: GraphQLAbstractType
): PromiseOrValue<GraphQLObjectType | string | undefined>;

/**
 * GraphQL Resolve Info
 * 
 * Information about the current field being resolved.
 */
interface GraphQLResolveInfo {
  readonly fieldName: string;
  readonly fieldNodes: ReadonlyArray<FieldNode>;
  readonly returnType: GraphQLOutputType;
  readonly parentType: GraphQLObjectType;
  readonly path: Path;
  readonly schema: GraphQLSchema;
  readonly fragments: { [key: string]: FragmentDefinitionNode };
  readonly rootValue: any;
  readonly operation: OperationDefinitionNode;
  readonly variableValues: { [variable: string]: any };
}

/**
 * Response Path
 * 
 * Represents the path from the root to the current field.
 */
interface Path {
  readonly prev: Path | undefined;
  readonly key: string | number;
  readonly typename?: string;
}
```

**Custom Resolver Example:**

```javascript
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { 
      type: GraphQLString,
      resolve: async (user, args, context, info) => {
        // Custom resolution logic
        if (!context.user || context.user.id !== user.id) {
          throw new Error("Unauthorized");
        }
        return user.email;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user, args, context) => {
        return context.loaders.postsByUserId.load(user.id);
      }
    }
  }
});
```

### Execution Utilities

Helper functions for working with execution results and response paths.

```javascript { .api }
/**
 * Convert Response Path to Array
 */
function responsePathAsArray(path: Path): ReadonlyArray<string | number>;

/**
 * Add Path to Response Path
 */
function addPath(
  prev: Path | undefined,
  key: string | number,
  typename?: string
): Path;

/**
 * Get Directive Values from AST
 * 
 * Extract directive values from a field or fragment.
 */
function getDirectiveValues(
  directiveDef: GraphQLDirective,
  node: {
    readonly directives?: ReadonlyArray<DirectiveNode>;
  },
  variableValues?: Maybe<{ [variable: string]: any }>
): undefined | { [argument: string]: any };

/**
 * Get Argument Values
 * 
 * Extract argument values from a field or directive.
 */
function getArgumentValues(
  def: GraphQLField<any, any> | GraphQLDirective,
  node: FieldNode | DirectiveNode,
  variableValues?: Maybe<{ [variable: string]: any }>
): { [argument: string]: any };

/**
 * Get Variable Values
 * 
 * Extract and validate variable values from a request.
 */
function getVariableValues(
  schema: GraphQLSchema,
  varDefNodes: ReadonlyArray<VariableDefinitionNode>,
  inputs: { [variable: string]: any },
  options?: {
    maxErrors?: number;
  }
): CoercedVariableValues;

interface CoercedVariableValues {
  errors?: ReadonlyArray<GraphQLError>;
  coerced?: { [variable: string]: any };
}
```

### Execution Context

Internal execution context management for tracking execution state.

```javascript { .api }
/**
 * Execution Context
 * 
 * Internal class that maintains execution state during operation execution.
 */
interface ExecutionContext {
  schema: GraphQLSchema;
  fragments: { [key: string]: FragmentDefinitionNode };
  rootValue: any;
  contextValue: any;
  operation: OperationDefinitionNode;
  variableValues: { [variable: string]: any };
  fieldResolver: GraphQLFieldResolver<any, any>;
  typeResolver: GraphQLTypeResolver<any, any>;
  errors: GraphQLError[];
}

/**
 * Build Execution Context
 * 
 * Create execution context from execution arguments.
 */
function buildExecutionContext(
  args: ExecutionArgs
): ReadonlyArray<GraphQLError> | ExecutionContext;

/**
 * Collect Fields
 * 
 * Given a selection set, collect all fields and inline fragments.
 */
function collectFields(
  exeContext: ExecutionContext,
  runtimeType: GraphQLObjectType,
  selectionSet: SelectionSetNode,
  fields: Map<string, ReadonlyArray<FieldNode>>,
  visitedFragmentNames: Set<string>
): Map<string, ReadonlyArray<FieldNode>>;
```

### Field Execution

Detailed field execution and result building functions.

```javascript { .api }
/**
 * Execute Fields Serially
 * 
 * Execute fields in the order they appear in the query.
 */
function executeFieldsSerially(
  exeContext: ExecutionContext,
  parentType: GraphQLObjectType,
  sourceValue: any,
  path: Path | undefined,
  fields: Map<string, ReadonlyArray<FieldNode>>
): PromiseOrValue<{ [key: string]: any }>;

/**
 * Execute Fields
 * 
 * Execute multiple fields, potentially in parallel.
 */
function executeFields(
  exeContext: ExecutionContext,
  parentType: GraphQLObjectType,
  sourceValue: any,
  path: Path | undefined,
  fields: Map<string, ReadonlyArray<FieldNode>>
): PromiseOrValue<{ [key: string]: any }>;

/**
 * Execute Field
 * 
 * Execute a single field and return the result.
 */
function executeField(
  exeContext: ExecutionContext,
  parentType: GraphQLObjectType,
  source: any,
  fieldNodes: ReadonlyArray<FieldNode>,
  path: Path
): PromiseOrValue<any>;

/**
 * Resolve Field Value
 * 
 * Resolve the value for a field using the appropriate resolver.
 */
function resolveFieldValueOrError(
  exeContext: ExecutionContext,
  fieldDef: GraphQLField<any, any>,
  fieldNodes: ReadonlyArray<FieldNode>,
  resolveFn: GraphQLFieldResolver<any, any>,
  source: any,
  info: GraphQLResolveInfo
): PromiseOrValue<any>;

/**
 * Complete Value
 * 
 * Complete a value by coercing it according to its type.
 */
function completeValue(
  exeContext: ExecutionContext,
  returnType: GraphQLOutputType,
  fieldNodes: ReadonlyArray<FieldNode>,
  info: GraphQLResolveInfo,
  path: Path,
  result: any
): PromiseOrValue<any>;
```

### Type Resolution

Functions for resolving abstract types during execution.

```javascript { .api }
/**
 * Resolve Abstract Type
 * 
 * Determine the concrete type for an abstract type value.
 */
function resolveAbstractType(
  exeContext: ExecutionContext,
  fieldNodes: ReadonlyArray<FieldNode>,
  info: GraphQLResolveInfo,
  abstractType: GraphQLAbstractType,
  result: any
): PromiseOrValue<GraphQLObjectType>;

/**
 * Ensure Valid Runtime Type
 * 
 * Validate that a resolved type is valid for the abstract type.
 */
function ensureValidRuntimeType(
  runtimeTypeName: any,
  exeContext: ExecutionContext,
  abstractType: GraphQLAbstractType,
  fieldNodes: ReadonlyArray<FieldNode>,
  info: GraphQLResolveInfo,
  result: any
): GraphQLObjectType;
```

### Error Handling

Functions for creating and handling execution errors.

```javascript { .api }
/**
 * Create Located Error
 * 
 * Create an error with field location information.
 */
function locatedError(
  originalError: Error,
  fieldNodes: ReadonlyArray<ASTNode>,
  path: ReadonlyArray<string | number>
): GraphQLError;

/**
 * Build Response
 * 
 * Build the final response object from execution results.
 */
function buildResponse(
  data: any,
  errors: ReadonlyArray<GraphQLError>
): ExecutionResult;
```

**Error Handling Example:**

```javascript
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    sensitiveData: {
      type: GraphQLString,
      resolve: (user, args, context) => {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        if (context.user.role !== "admin") {
          throw new Error("Insufficient permissions");
        }
        return user.sensitiveData;
      }
    }
  }
});

// Execution will capture and format these errors appropriately
const result = await execute({
  schema,
  document: parse(`{ user { sensitiveData } }`),
  contextValue: { user: null } // No authenticated user
});

console.log(result.errors); // Array of GraphQLError objects
```

### Subscription Execution

Special execution handling for GraphQL subscriptions.

```javascript { .api }
/**
 * Create Source Event Stream
 * 
 * Create the initial event stream for a subscription.
 */
function createSourceEventStream(
  schema: GraphQLSchema,
  document: DocumentNode,
  rootValue?: any,
  contextValue?: any,
  variableValues?: { [variable: string]: any },
  operationName?: string,
  fieldResolver?: GraphQLFieldResolver<any, any>
): Promise<AsyncIterable<any> | ExecutionResult>;

/**
 * Map Source to Response
 * 
 * Map each event from the source stream to a response.
 */
function mapSourceToResponse(
  sourceStream: AsyncIterable<any>,
  schema: GraphQLSchema,
  document: DocumentNode,
  rootValue?: any,
  contextValue?: any,
  variableValues?: { [variable: string]: any },
  operationName?: string,
  fieldResolver?: GraphQLFieldResolver<any, any>
): AsyncGenerator<ExecutionResult, void, undefined>;
```

## Type Definitions

```javascript { .api }
// Field resolver type
type GraphQLFieldResolver<TSource, TContext, TArgs = any> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any;

// Type resolver type
type GraphQLTypeResolver<TSource, TContext> = (
  value: TSource,
  context: TContext,
  info: GraphQLResolveInfo,
  abstractType: GraphQLAbstractType
) => PromiseOrValue<GraphQLObjectType | string | undefined>;

// Is type of function type
type GraphQLIsTypeOfFn<TSource, TContext> = (
  source: TSource,
  context: TContext,
  info: GraphQLResolveInfo
) => PromiseOrValue<boolean>;

// Response path utility type
interface ResponsePath {
  readonly prev: ResponsePath | undefined;
  readonly key: string | number;
  readonly typename?: string;
}

// Execution patch type for incremental delivery
interface ExecutionPatch {
  label?: string;
  path: ReadonlyArray<string | number>;
  data?: any;
  errors?: ReadonlyArray<GraphQLError>;
  hasNext: boolean;
}

// Subscription event payload
interface SubscriptionArgs {
  schema: GraphQLSchema;
  document: DocumentNode;
  rootValue?: any;
  contextValue?: any;
  variableValues?: { [variable: string]: any };
  operationName?: string;
  fieldResolver?: GraphQLFieldResolver<any, any>;
  subscribeFieldResolver?: GraphQLFieldResolver<any, any>;
}
```