# Utilities

The GraphQL.js utilities module provides a comprehensive set of tools for schema building, introspection, type comparisons, AST operations, and various GraphQL utilities. This module includes functions for building schemas from SDL or introspection results, transforming and analyzing schemas, and working with AST documents.

## Capabilities

### Schema Building

Functions for creating GraphQL schemas from various sources.

```javascript { .api }
/**
 * Build Schema from SDL String
 * 
 * Creates a GraphQL schema from a Schema Definition Language string.
 */
function buildSchema(source: string | Source): GraphQLSchema;

/**
 * Build AST Schema
 * 
 * Creates a GraphQL schema from a parsed SDL document AST.
 */
function buildASTSchema(
  documentAST: DocumentNode,
  options?: BuildSchemaOptions
): GraphQLSchema;

interface BuildSchemaOptions {
  assumeValid?: boolean;
  assumeValidSDL?: boolean;
}

/**
 * Build Client Schema
 * 
 * Builds a GraphQL schema from an introspection result.
 */
function buildClientSchema(
  introspection: IntrospectionQuery,
  options?: GraphQLSchemaValidationOptions
): GraphQLSchema;

/**
 * Extend Schema
 * 
 * Extends an existing schema with additional type definitions.
 */
function extendSchema(
  schema: GraphQLSchema,
  documentAST: DocumentNode,
  options?: ExtendSchemaOptions
): GraphQLSchema;

interface ExtendSchemaOptions {
  assumeValid?: boolean;
  assumeValidSDL?: boolean;
}
```

**Usage Examples:**

```javascript
import { buildSchema, buildClientSchema, extendSchema, getIntrospectionQuery } from "graphql";

// Build schema from SDL string
const schema = buildSchema(`
  type Query {
    hello: String
    user(id: ID!): User
  }
  
  type User {
    id: ID!
    name: String
    email: String
  }
`);

// Build client schema from introspection
const introspectionResult = await graphql({ schema, source: getIntrospectionQuery() });
const clientSchema = buildClientSchema(introspectionResult.data);

// Extend existing schema
const extensionAST = parse(`
  extend type User {
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String
    content: String
  }
`);
const extendedSchema = extendSchema(schema, extensionAST);
```

### Schema Introspection

Functions for introspecting GraphQL schemas and generating introspection queries.

```javascript { .api }
/**
 * Get Introspection Query
 * 
 * Returns a GraphQL query string for introspecting a schema.
 */
function getIntrospectionQuery(options?: IntrospectionOptions): string;

interface IntrospectionOptions {
  descriptions?: boolean;
  specifiedByUrl?: boolean;
  directiveIsRepeatable?: boolean;
  schemaDescription?: boolean;
  inputValueDeprecation?: boolean;
  oneOf?: boolean;
}

/**
 * Introspection from Schema
 * 
 * Builds the introspection result for a schema.
 */
function introspectionFromSchema(
  schema: GraphQLSchema,
  options?: IntrospectionOptions
): IntrospectionQuery;

/**
 * Get Description (Deprecated)
 * 
 * Get description from AST node. Use node.description.value instead.
 */
function getDescription(
  node: { description?: StringValueNode },
  options?: any
): string | undefined;
```

**Usage Example:**

```javascript
import { getIntrospectionQuery, introspectionFromSchema } from "graphql";

// Get introspection query with all features
const query = getIntrospectionQuery({
  descriptions: true,
  specifiedByUrl: true,
  directiveIsRepeatable: true,
  schemaDescription: true
});

// Get introspection result directly
const introspection = introspectionFromSchema(schema, {
  descriptions: true
});
```

### Schema Transformation and Printing

Functions for transforming and printing GraphQL schemas.

```javascript { .api }
/**
 * Print Schema
 * 
 * Converts a GraphQL schema to its SDL representation.
 */
function printSchema(schema: GraphQLSchema): string;

/**
 * Print Type
 * 
 * Converts a GraphQL type to its SDL representation.
 */
function printType(type: GraphQLNamedType): string;

/**
 * Print Introspection Schema
 * 
 * Converts an introspection result to its SDL representation.
 */
function printIntrospectionSchema(introspection: IntrospectionQuery): string;

/**
 * Lexicographic Sort Schema
 * 
 * Sorts a schema's types and fields lexicographically.
 */
function lexicographicSortSchema(schema: GraphQLSchema): GraphQLSchema;
```

**Usage Example:**

```javascript
import { printSchema, printType, lexicographicSortSchema } from "graphql";

// Print entire schema
const schemaSDL = printSchema(schema);
console.log(schemaSDL);

// Print specific type
const userType = schema.getType('User');
if (userType) {
  const userSDL = printType(userType);
  console.log(userSDL);
}

// Sort schema for consistent output
const sortedSchema = lexicographicSortSchema(schema);
const sortedSDL = printSchema(sortedSchema);
```

### AST Operations

Functions for working with GraphQL AST documents.

```javascript { .api }
/**
 * Get Operation AST
 * 
 * Gets a specific operation from a document AST.
 */
function getOperationAST(
  documentAST: DocumentNode,
  operationName?: string
): OperationDefinitionNode | undefined;

/**
 * Get Operation Root Type
 * 
 * Gets the root type for a given operation.
 */
function getOperationRootType(
  schema: GraphQLSchema,
  operation: OperationDefinitionNode
): GraphQLObjectType;

/**
 * Concat AST Documents
 * 
 * Concatenates multiple AST documents into one.
 */
function concatAST(documents: ReadonlyArray<DocumentNode>): DocumentNode;

/**
 * Separate Operations
 * 
 * Separates operations from a document into individual documents.
 */
function separateOperations(
  documentAST: DocumentNode
): { [operationName: string]: DocumentNode };

/**
 * Strip Ignored Characters
 * 
 * Strips ignored characters (comments, whitespace) from GraphQL SDL.
 */
function stripIgnoredCharacters(source: string | Source): string;
```

**Usage Examples:**

```javascript
import { 
  getOperationAST, 
  getOperationRootType, 
  separateOperations,
  stripIgnoredCharacters 
} from "graphql";

const document = parse(`
  query GetUser($id: ID!) {
    user(id: $id) { name }
  }
  
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) { id }
  }
`);

// Get specific operation
const getUserOp = getOperationAST(document, 'GetUser');
if (getUserOp) {
  const rootType = getOperationRootType(schema, getUserOp);
  console.log(`Root type: ${rootType.name}`);
}

// Separate operations
const separatedOps = separateOperations(document);
console.log(Object.keys(separatedOps)); // ['GetUser', 'CreateUser']

// Strip whitespace and comments
const compactSDL = stripIgnoredCharacters(`
  # This is a comment
  type Query {
    hello: String  # Another comment
  }
`);
```

### Type and Value Conversion

Functions for converting between AST nodes and runtime values.

```javascript { .api }
/**
 * Type from AST
 * 
 * Creates a GraphQL type from an AST type node.
 */
function typeFromAST(
  schema: GraphQLSchema,
  typeNode: TypeNode
): GraphQLType | undefined;

/**
 * Value from AST
 * 
 * Creates a runtime value from an AST value node with type coercion.
 */
function valueFromAST(
  valueNode: ValueNode | undefined,
  type: GraphQLInputType,
  variables?: Maybe<{ [variable: string]: any }>
): any;

/**
 * Value from AST Untyped
 * 
 * Creates a runtime value from an AST value node without type information.
 */
function valueFromASTUntyped(
  valueNode: ValueNode,
  variables?: Maybe<{ [variable: string]: any }>
): any;

/**
 * AST from Value
 * 
 * Creates an AST value node from a JavaScript value.
 */
function astFromValue(
  value: any,
  type: GraphQLInputType
): ValueNode | undefined;

/**
 * Coerce Input Value
 * 
 * Coerces a runtime value to match an input type with detailed error reporting.
 */
function coerceInputValue(
  inputValue: any,
  type: GraphQLInputType,
  onError?: (path: ReadonlyArray<string | number>, invalidValue: any, error: GraphQLError) => void
): any;
```

**Usage Examples:**

```javascript
import { 
  typeFromAST, 
  valueFromAST, 
  astFromValue, 
  coerceInputValue,
  parse,
  parseValue 
} from "graphql";

// Convert AST type to runtime type
const typeNode = parseType('[String!]');
const listType = typeFromAST(schema, typeNode);

// Convert AST value to runtime value
const valueNode = parseValue('["hello", "world"]');
const runtimeValue = valueFromAST(valueNode, listType);

// Convert runtime value to AST
const astValue = astFromValue(['hello', 'world'], listType);

// Coerce input with error handling
const coercedValue = coerceInputValue(
  { name: "Alice", age: "25" },
  UserInputType,
  (path, invalidValue, error) => {
    console.log(`Error at ${path.join('.')}: ${error.message}`);
  }
);
```

### Type Navigation and Information

Utilities for navigating type systems and gathering type information during AST traversal.

```javascript { .api }
/**
 * Type Info
 * 
 * Tracks type information during AST traversal.
 */
class TypeInfo {
  constructor(
    schema: GraphQLSchema,
    initialType?: GraphQLType,
    getFieldDefFn?: GetFieldDefFn
  );
  
  getType(): GraphQLOutputType | undefined;
  getParentType(): GraphQLCompositeType | undefined;
  getInputType(): GraphQLInputType | undefined;
  getParentInputType(): GraphQLInputType | undefined;
  getFieldDef(): GraphQLField<any, any> | undefined;
  getDefaultValue(): any;
  getDirective(): GraphQLDirective | undefined;
  getArgument(): GraphQLArgument | undefined;
  getEnumValue(): GraphQLEnumValue | undefined;
  
  enter(node: ASTNode): void;
  leave(node: ASTNode): void;
}

/**
 * Visit with Type Info
 * 
 * Visits AST nodes while maintaining type information.
 */
function visitWithTypeInfo(
  typeInfo: TypeInfo,
  visitor: ASTVisitor
): ASTVisitor;

type GetFieldDefFn = (
  schema: GraphQLSchema,
  parentType: GraphQLType,
  fieldNode: FieldNode
) => Maybe<GraphQLField<any, any>>;
```

**Usage Example:**

```javascript
import { TypeInfo, visitWithTypeInfo, visit } from "graphql";

const typeInfo = new TypeInfo(schema);

const visitor = visitWithTypeInfo(typeInfo, {
  Field: {
    enter(node) {
      const type = typeInfo.getType();
      const parentType = typeInfo.getParentType();
      console.log(`Field ${node.name.value} of type ${type} on ${parentType?.name}`);
    }
  }
});

visit(documentAST, visitor);
```

### Type Comparisons

Functions for comparing and analyzing relationships between GraphQL types.

```javascript { .api }
/**
 * Is Equal Type
 * 
 * Determines if two GraphQL types are equal.
 */
function isEqualType(typeA: GraphQLType, typeB: GraphQLType): boolean;

/**
 * Is Type Sub Type Of
 * 
 * Determines if a type is a subtype of another type.
 */
function isTypeSubTypeOf(
  schema: GraphQLSchema,
  maybeSubType: GraphQLType,
  superType: GraphQLType
): boolean;

/**
 * Do Types Overlap
 * 
 * Determines if two composite types overlap (share possible concrete types).
 */
function doTypesOverlap(
  schema: GraphQLSchema,
  typeA: GraphQLCompositeType,
  typeB: GraphQLCompositeType
): boolean;
```

**Usage Example:**

```javascript
import { isEqualType, isTypeSubTypeOf, doTypesOverlap } from "graphql";

const stringType = GraphQLString;
const nonNullString = new GraphQLNonNull(GraphQLString);

// Check type equality
console.log(isEqualType(stringType, stringType)); // true
console.log(isEqualType(stringType, nonNullString)); // false

// Check subtype relationship
console.log(isTypeSubTypeOf(schema, nonNullString, stringType)); // true
console.log(isTypeSubTypeOf(schema, stringType, nonNullString)); // false

// Check if types overlap
const userType = schema.getType('User');
const adminType = schema.getType('Admin');
if (userType && adminType) {
  console.log(doTypesOverlap(schema, userType, adminType));
}
```

### Name Validation

Functions for validating GraphQL names and identifiers.

```javascript { .api }
/**
 * Assert Valid Name
 * 
 * Validates a GraphQL name and throws an error if invalid.
 */
function assertValidName(name: string): string;

/**
 * Is Valid Name Error
 * 
 * Checks if a name is invalid and returns an error if so.
 */
function isValidNameError(name: string): GraphQLError | undefined;
```

### Schema Comparison and Breaking Changes

Functions for analyzing differences between schema versions.

```javascript { .api }
/**
 * Breaking Change Type
 * 
 * Enumeration of breaking change types.
 */
const BreakingChangeType: {
  TYPE_REMOVED: "TYPE_REMOVED";
  TYPE_CHANGED_KIND: "TYPE_CHANGED_KIND";
  TYPE_REMOVED_FROM_UNION: "TYPE_REMOVED_FROM_UNION";
  VALUE_REMOVED_FROM_ENUM: "VALUE_REMOVED_FROM_ENUM";
  REQUIRED_INPUT_FIELD_ADDED: "REQUIRED_INPUT_FIELD_ADDED";
  IMPLEMENTED_INTERFACE_REMOVED: "IMPLEMENTED_INTERFACE_REMOVED";
  FIELD_REMOVED: "FIELD_REMOVED";
  FIELD_CHANGED_KIND: "FIELD_CHANGED_KIND";
  REQUIRED_ARG_ADDED: "REQUIRED_ARG_ADDED";
  ARG_REMOVED: "ARG_REMOVED";
  ARG_CHANGED_KIND: "ARG_CHANGED_KIND";
  DIRECTIVE_REMOVED: "DIRECTIVE_REMOVED";
  DIRECTIVE_ARG_REMOVED: "DIRECTIVE_ARG_REMOVED";
  REQUIRED_DIRECTIVE_ARG_ADDED: "REQUIRED_DIRECTIVE_ARG_ADDED";
  DIRECTIVE_REPEATABLE_REMOVED: "DIRECTIVE_REPEATABLE_REMOVED";
  DIRECTIVE_LOCATION_REMOVED: "DIRECTIVE_LOCATION_REMOVED";
};

/**
 * Dangerous Change Type
 * 
 * Enumeration of dangerous change types.
 */
const DangerousChangeType: {
  VALUE_ADDED_TO_ENUM: "VALUE_ADDED_TO_ENUM";
  TYPE_ADDED_TO_UNION: "TYPE_ADDED_TO_UNION";
  OPTIONAL_INPUT_FIELD_ADDED: "OPTIONAL_INPUT_FIELD_ADDED";
  OPTIONAL_ARG_ADDED: "OPTIONAL_ARG_ADDED";
  IMPLEMENTED_INTERFACE_ADDED: "IMPLEMENTED_INTERFACE_ADDED";
  ARG_DEFAULT_VALUE_CHANGE: "ARG_DEFAULT_VALUE_CHANGE";
};

/**
 * Find Breaking Changes
 * 
 * Finds breaking changes between two schema versions.
 */
function findBreakingChanges(
  oldSchema: GraphQLSchema,
  newSchema: GraphQLSchema
): ReadonlyArray<BreakingChange>;

/**
 * Find Dangerous Changes
 * 
 * Finds potentially dangerous changes between two schema versions.
 */
function findDangerousChanges(
  oldSchema: GraphQLSchema,
  newSchema: GraphQLSchema
): ReadonlyArray<DangerousChange>;

interface BreakingChange {
  type: keyof typeof BreakingChangeType;
  description: string;
}

interface DangerousChange {
  type: keyof typeof DangerousChangeType;
  description: string;
}
```

**Usage Example:**

```javascript
import { findBreakingChanges, findDangerousChanges } from "graphql";

const oldSchema = buildSchema(`
  type Query {
    user: User
  }
  
  type User {
    id: ID!
    name: String
  }
`);

const newSchema = buildSchema(`
  type Query {
    user: User
  }
  
  type User {
    id: ID!
    name: String!  # Made non-nullable (breaking change)
    email: String  # Added field (safe)
  }
`);

const breakingChanges = findBreakingChanges(oldSchema, newSchema);
const dangerousChanges = findDangerousChanges(oldSchema, newSchema);

console.log('Breaking changes:', breakingChanges);
console.log('Dangerous changes:', dangerousChanges);
```

### Deprecation Analysis

Functions for analyzing deprecated usage in GraphQL documents.

```javascript { .api }
/**
 * Find Deprecated Usages (Deprecated)
 * 
 * Finds usage of deprecated fields and enum values in a document.
 * This function is deprecated; use validation rules instead.
 */
function findDeprecatedUsages(
  schema: GraphQLSchema,
  ast: DocumentNode
): ReadonlyArray<GraphQLError>;
```

## Type Definitions

```javascript { .api }
// Schema building options
interface BuildSchemaOptions {
  assumeValid?: boolean;
  assumeValidSDL?: boolean;
}

interface GraphQLSchemaValidationOptions {
  /**
   * When building a schema from a GraphQL service's introspection result, it
   * might be safe to assume the schema is valid. Set to true to assume the
   * produced schema is valid.
   */
  assumeValid?: boolean;
}

interface ExtendSchemaOptions {
  assumeValid?: boolean;
  assumeValidSDL?: boolean;
}

// Introspection types
interface IntrospectionOptions {
  descriptions?: boolean;
  specifiedByUrl?: boolean;
  directiveIsRepeatable?: boolean;
  schemaDescription?: boolean;
  inputValueDeprecation?: boolean;
  oneOf?: boolean;
}

interface IntrospectionQuery {
  readonly __schema: IntrospectionSchema;
}

interface IntrospectionSchema {
  readonly description?: string;
  readonly queryType: IntrospectionNamedTypeRef;
  readonly mutationType?: IntrospectionNamedTypeRef;
  readonly subscriptionType?: IntrospectionNamedTypeRef;
  readonly types: ReadonlyArray<IntrospectionType>;
  readonly directives: ReadonlyArray<IntrospectionDirective>;
}

type IntrospectionType =
  | IntrospectionScalarType
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType
  | IntrospectionEnumType
  | IntrospectionInputObjectType;

interface IntrospectionNamedTypeRef {
  readonly kind?: never;
  readonly name: string;
  readonly description?: never;
  readonly ofType?: never;
}

interface IntrospectionListTypeRef {
  readonly kind: "LIST";
  readonly name?: never;
  readonly description?: never;
  readonly ofType: IntrospectionTypeRef;
}

interface IntrospectionNonNullTypeRef {
  readonly kind: "NON_NULL";
  readonly name?: never;
  readonly description?: never;
  readonly ofType: IntrospectionNullableTypeRef;
}

type IntrospectionTypeRef =
  | IntrospectionNamedTypeRef
  | IntrospectionListTypeRef
  | IntrospectionNonNullTypeRef;

type IntrospectionOutputTypeRef =
  | IntrospectionNamedTypeRef
  | IntrospectionListTypeRef
  | IntrospectionNonNullTypeRef;

type IntrospectionInputTypeRef =
  | IntrospectionNamedTypeRef
  | IntrospectionListTypeRef
  | IntrospectionNonNullTypeRef;

type IntrospectionNullableTypeRef =
  | IntrospectionNamedTypeRef
  | IntrospectionListTypeRef;

interface IntrospectionScalarType {
  readonly kind: "SCALAR";
  readonly name: string;
  readonly description?: string;
  readonly specifiedByURL?: string;
}

interface IntrospectionObjectType {
  readonly kind: "OBJECT";
  readonly name: string;
  readonly description?: string;
  readonly fields: ReadonlyArray<IntrospectionField>;
  readonly interfaces: ReadonlyArray<IntrospectionNamedTypeRef>;
}

interface IntrospectionInterfaceType {
  readonly kind: "INTERFACE";
  readonly name: string;
  readonly description?: string;
  readonly fields: ReadonlyArray<IntrospectionField>;
  readonly interfaces: ReadonlyArray<IntrospectionNamedTypeRef>;
  readonly possibleTypes: ReadonlyArray<IntrospectionNamedTypeRef>;
}

interface IntrospectionUnionType {
  readonly kind: "UNION";
  readonly name: string;
  readonly description?: string;
  readonly possibleTypes: ReadonlyArray<IntrospectionNamedTypeRef>;
}

interface IntrospectionEnumType {
  readonly kind: "ENUM";
  readonly name: string;
  readonly description?: string;
  readonly enumValues: ReadonlyArray<IntrospectionEnumValue>;
}

interface IntrospectionInputObjectType {
  readonly kind: "INPUT_OBJECT";
  readonly name: string;
  readonly description?: string;
  readonly inputFields: ReadonlyArray<IntrospectionInputValue>;
}

interface IntrospectionField {
  readonly name: string;
  readonly description?: string;
  readonly args: ReadonlyArray<IntrospectionInputValue>;
  readonly type: IntrospectionOutputTypeRef;
  readonly isDeprecated: boolean;
  readonly deprecationReason?: string;
}

interface IntrospectionInputValue {
  readonly name: string;
  readonly description?: string;
  readonly type: IntrospectionInputTypeRef;
  readonly defaultValue?: string;
  readonly isDeprecated?: boolean;
  readonly deprecationReason?: string;
}

interface IntrospectionEnumValue {
  readonly name: string;
  readonly description?: string;
  readonly isDeprecated: boolean;
  readonly deprecationReason?: string;
}

interface IntrospectionDirective {
  readonly name: string;
  readonly description?: string;
  readonly isRepeatable: boolean;
  readonly locations: ReadonlyArray<DirectiveLocationEnum>;
  readonly args: ReadonlyArray<IntrospectionInputValue>;
}

// Change detection types
interface BreakingChange {
  type: BreakingChangeTypeEnum;
  description: string;
}

interface DangerousChange {
  type: DangerousChangeTypeEnum;
  description: string;
}

type BreakingChangeTypeEnum = typeof BreakingChangeType[keyof typeof BreakingChangeType];
type DangerousChangeTypeEnum = typeof DangerousChangeType[keyof typeof DangerousChangeType];

// Type info utility types
type GetFieldDefFn = (
  schema: GraphQLSchema,
  parentType: GraphQLType,
  fieldNode: FieldNode
) => Maybe<GraphQLField<any, any>>;

// Utility function types
type CoercionErrorHandler = (
  path: ReadonlyArray<string | number>,
  invalidValue: any,
  error: GraphQLError
) => void;
```