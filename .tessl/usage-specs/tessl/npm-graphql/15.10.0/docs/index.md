# GraphQL.js

GraphQL.js is the JavaScript reference implementation of GraphQL, a query language for APIs and a runtime for executing those queries. It provides a comprehensive toolkit for building GraphQL schemas, parsing and validating GraphQL documents, executing queries, and introspecting schemas. As the reference implementation, it serves as the foundation for the GraphQL ecosystem and includes complete type definitions, validation rules, and execution engine.

## Package Information

- **Package Name**: graphql
- **Package Type**: npm
- **Language**: JavaScript/TypeScript
- **Installation**: `npm install graphql`

## Core Imports

```javascript
import { 
  graphql, 
  graphqlSync, 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString 
} from "graphql";
```

For CommonJS:

```javascript
const { 
  graphql, 
  graphqlSync, 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString 
} = require("graphql");
```

## Basic Usage

```javascript
import { 
  graphql, 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString 
} from "graphql";

// Define a schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "Hello, World!"
      }
    }
  })
});

// Execute a query
const query = "{ hello }";
graphql({ schema, source: query }).then(result => {
  console.log(result); // { data: { hello: "Hello, World!" } }
});
```

## Architecture

GraphQL.js is organized into several key modules that work together to provide a complete GraphQL implementation:

- **Core Execution Engine**: The `graphql` and `graphqlSync` functions that parse, validate, and execute queries
- **Type System**: Classes and functions for defining GraphQL schemas, types, and directives
- **Language Processing**: Parser, AST nodes, and visitor patterns for working with GraphQL documents
- **Validation System**: Comprehensive validation rules ensuring GraphQL documents conform to the specification
- **Utilities**: Schema building, introspection, and transformation tools
- **Error Handling**: Specialized error classes with location information and formatting

## Capabilities

### Core Execution

Main entry points for executing GraphQL operations with full schema validation and field resolution.

```javascript { .api }
function graphql(args: {
  schema: GraphQLSchema;
  source: string | Source;
  rootValue?: any;
  contextValue?: any;
  variableValues?: { [variable: string]: any };
  operationName?: string;
  fieldResolver?: GraphQLFieldResolver<any, any>;
  typeResolver?: GraphQLTypeResolver<any, any>;
}): Promise<ExecutionResult>;

function graphqlSync(args: {
  schema: GraphQLSchema;
  source: string | Source;
  rootValue?: any;
  contextValue?: any;
  variableValues?: { [variable: string]: any };
  operationName?: string;
  fieldResolver?: GraphQLFieldResolver<any, any>;
  typeResolver?: GraphQLTypeResolver<any, any>;
}): ExecutionResult;

interface ExecutionResult {
  errors?: ReadonlyArray<GraphQLError>;
  data?: any;
  extensions?: { [key: string]: any };
}
```

### Type System

Comprehensive type system for defining GraphQL schemas, including all GraphQL types, built-in scalars, directives, and introspection support.

```javascript { .api }
class GraphQLSchema {
  constructor(config: GraphQLSchemaConfig);
  getQueryType(): GraphQLObjectType | undefined;
  getMutationType(): GraphQLObjectType | undefined;
  getSubscriptionType(): GraphQLObjectType | undefined;
  getTypeMap(): TypeMap;
  getDirectives(): ReadonlyArray<GraphQLDirective>;
}

class GraphQLObjectType {
  constructor(config: GraphQLObjectTypeConfig<any, any>);
  getFields(): GraphQLFieldMap<any, any>;
  getInterfaces(): ReadonlyArray<GraphQLInterfaceType>;
}

const GraphQLString: GraphQLScalarType;
const GraphQLInt: GraphQLScalarType;
const GraphQLFloat: GraphQLScalarType;
const GraphQLBoolean: GraphQLScalarType;
const GraphQLID: GraphQLScalarType;
```

[Type System](./type-system.md)

### Language Processing

Tools for parsing GraphQL documents into AST, visiting and transforming AST nodes, and printing AST back to GraphQL strings.

```javascript { .api }
function parse(
  source: string | Source,
  options?: ParseOptions
): DocumentNode;

function print(ast: ASTNode): string;

function visit(
  root: ASTNode,
  visitor: ASTVisitor,
  visitorKeys?: VisitorKeyMap
): any;

interface DocumentNode extends ASTNode {
  readonly kind: "Document";
  readonly definitions: ReadonlyArray<DefinitionNode>;
}
```

[Language Processing](./language.md)

### Execution Engine

Detailed query execution functionality including field resolution, type resolution, and execution context management.

```javascript { .api }
function execute(args: ExecutionArgs): PromiseOrValue<ExecutionResult>;

function executeSync(args: ExecutionArgs): ExecutionResult;

function defaultFieldResolver(
  source: any,
  args: any,
  contextValue: any,
  info: GraphQLResolveInfo
): any;

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
```

[Execution Engine](./execution.md)

### Validation

Comprehensive validation system with all GraphQL specification rules and support for custom validation rules.

```javascript { .api }
function validate(
  schema: GraphQLSchema,
  documentAST: DocumentNode,
  rules?: ReadonlyArray<ValidationRule>,
  options?: { maxErrors?: number }
): ReadonlyArray<GraphQLError>;

const specifiedRules: ReadonlyArray<ValidationRule>;

class ValidationContext {
  constructor(
    schema: GraphQLSchema,
    ast: DocumentNode,
    typeInfo: TypeInfo,
    onError: (error: GraphQLError) => void
  );
  reportError(error: GraphQLError): void;
  getErrors(): ReadonlyArray<GraphQLError>;
}
```

[Validation](./validation.md)

### Utilities

Schema building, introspection, type comparisons, and various GraphQL utilities for working with schemas and ASTs.

```javascript { .api }
function buildSchema(source: string | Source): GraphQLSchema;

function buildClientSchema(
  introspection: IntrospectionQuery,
  options?: BuildClientSchemaOptions
): GraphQLSchema;

function getIntrospectionQuery(options?: IntrospectionOptions): string;

function introspectionFromSchema(
  schema: GraphQLSchema,
  options?: IntrospectionOptions
): IntrospectionQuery;

function printSchema(schema: GraphQLSchema): string;
```

[Utilities](./utilities.md)

### Error Handling

Specialized error classes with source location information and formatting utilities for GraphQL errors.

```javascript { .api }
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
  
  readonly locations: ReadonlyArray<SourceLocation> | undefined;
  readonly path: ReadonlyArray<string | number> | undefined;
  readonly nodes: ReadonlyArray<ASTNode> | undefined;
  readonly source: Source | undefined;
  readonly positions: ReadonlyArray<number> | undefined;
  readonly originalError: Error | undefined;
  readonly extensions: { [key: string]: any } | undefined;
}

function formatError(error: GraphQLError): GraphQLFormattedError;
```

[Error Handling](./error-handling.md)

### Subscriptions

Support for GraphQL subscriptions including subscription execution and event stream creation.

```javascript { .api }
function subscribe(args: SubscriptionArgs): Promise<AsyncIterator<ExecutionResult> | ExecutionResult>;

function createSourceEventStream(
  schema: GraphQLSchema,
  document: DocumentNode,
  rootValue?: any,
  contextValue?: any,
  variableValues?: { [variable: string]: any },
  operationName?: string,
  fieldResolver?: GraphQLFieldResolver<any, any>
): Promise<AsyncIterable<any> | ExecutionResult>;

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

[Subscriptions](./subscriptions.md)

## Version Information

```javascript { .api }
const version: string; // "15.10.1"

const versionInfo: {
  major: number;
  minor: number;
  patch: number;
  preReleaseTag: string | null;
};
```