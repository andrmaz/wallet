# Type System

The GraphQL.js type system provides a comprehensive set of classes and functions for defining GraphQL schemas, types, and directives. This module includes all core GraphQL types, built-in scalars, directives, introspection support, and extensive type checking utilities.

## Capabilities

### GraphQL Schema

The main schema class that represents a complete GraphQL schema definition.

```javascript { .api }
/**
 * GraphQL Schema Definition
 */
class GraphQLSchema {
  constructor(config: GraphQLSchemaConfig);
  
  getQueryType(): GraphQLObjectType | undefined;
  getMutationType(): GraphQLObjectType | undefined;
  getSubscriptionType(): GraphQLObjectType | undefined;
  getTypeMap(): TypeMap;
  getDirectives(): ReadonlyArray<GraphQLDirective>;
  getType(name: string): GraphQLNamedType | undefined;
  getPossibleTypes(abstractType: GraphQLAbstractType): ReadonlyArray<GraphQLObjectType>;
  getImplementations(interfaceType: GraphQLInterfaceType): {
    objects: ReadonlyArray<GraphQLObjectType>;
    interfaces: ReadonlyArray<GraphQLInterfaceType>;
  };
  isSubType(abstractType: GraphQLAbstractType, possibleType: GraphQLObjectType): boolean;
  toConfig(): GraphQLSchemaConfig & {
    types: GraphQLNamedType[];
    directives: GraphQLDirective[];
    extensions: Readonly<GraphQLSchemaExtensions>;
    extensionASTNodes: ReadonlyArray<SchemaExtensionNode>;
    assumeValid: boolean;
  };
}

interface GraphQLSchemaConfig {
  query?: GraphQLObjectType;
  mutation?: GraphQLObjectType;
  subscription?: GraphQLObjectType;
  types?: ReadonlyArray<GraphQLNamedType>;
  directives?: ReadonlyArray<GraphQLDirective>;
  extensions?: ReadonlyGraphQLSchemaExtensions;
  astNode?: SchemaDefinitionNode;
  extensionASTNodes?: ReadonlyArray<SchemaExtensionNode>;
  assumeValid?: boolean;
}

type TypeMap = { [typeName: string]: GraphQLNamedType };

function isSchema(schema: any): schema is GraphQLSchema;
function assertSchema(schema: any): GraphQLSchema;
```

### Object Types

GraphQL object type definitions for creating custom types with fields.

```javascript { .api }
/**
 * GraphQL Object Type
 */
class GraphQLObjectType<TSource = any, TContext = any> {
  constructor(config: GraphQLObjectTypeConfig<TSource, TContext>);
  
  name: string;
  description: string | undefined;
  isTypeOf: GraphQLIsTypeOfFn<TSource, TContext> | undefined;
  extensions: Readonly<GraphQLObjectTypeExtensions>;
  astNode: ObjectTypeDefinitionNode | undefined;
  extensionASTNodes: ReadonlyArray<ObjectTypeExtensionNode>;
  
  getFields(): GraphQLFieldMap<TSource, TContext>;
  getInterfaces(): ReadonlyArray<GraphQLInterfaceType>;
  toConfig(): GraphQLObjectTypeConfig<TSource, TContext> & {
    interfaces: ReadonlyArray<GraphQLInterfaceType>;
    fields: GraphQLFieldConfigMap<TSource, TContext>;
    extensions: Readonly<GraphQLObjectTypeExtensions>;
    extensionASTNodes: ReadonlyArray<ObjectTypeExtensionNode>;
  };
}

interface GraphQLObjectTypeConfig<TSource, TContext> {
  name: string;
  description?: string;
  interfaces?: Thunk<ReadonlyArray<GraphQLInterfaceType>>;
  fields: Thunk<GraphQLFieldConfigMap<TSource, TContext>>;
  isTypeOf?: GraphQLIsTypeOfFn<TSource, TContext>;
  extensions?: ReadonlyGraphQLObjectTypeExtensions;
  astNode?: ObjectTypeDefinitionNode;
  extensionASTNodes?: ReadonlyArray<ObjectTypeExtensionNode>;
}

type GraphQLFieldMap<TSource, TContext> = {
  [key: string]: GraphQLField<TSource, TContext>;
};

type GraphQLFieldConfigMap<TSource, TContext> = {
  [key: string]: GraphQLFieldConfig<TSource, TContext>;
};

interface GraphQLField<TSource, TContext, TArgs = any> {
  name: string;
  description: string | undefined;
  type: GraphQLOutputType;
  args: ReadonlyArray<GraphQLArgument>;
  resolve: GraphQLFieldResolver<TSource, TContext, TArgs> | undefined;
  subscribe: GraphQLFieldResolver<TSource, TContext, TArgs> | undefined;
  deprecationReason: string | undefined;
  extensions: Readonly<GraphQLFieldExtensions>;
  astNode: FieldDefinitionNode | undefined;
}

interface GraphQLFieldConfig<TSource, TContext, TArgs = any> {
  description?: string;
  type: GraphQLOutputType;
  args?: GraphQLFieldConfigArgumentMap;
  resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>;
  subscribe?: GraphQLFieldResolver<TSource, TContext, TArgs>;
  deprecationReason?: string;
  extensions?: ReadonlyGraphQLFieldExtensions;
  astNode?: FieldDefinitionNode;
}

type GraphQLFieldResolver<TSource, TContext, TArgs = any> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any;
```

### Interface Types

GraphQL interface type definitions for creating abstract types.

```javascript { .api }
/**
 * GraphQL Interface Type
 */
class GraphQLInterfaceType {
  constructor(config: GraphQLInterfaceTypeConfig<any, any>);
  
  name: string;
  description: string | undefined;
  resolveType: GraphQLTypeResolver<any, any> | undefined;
  extensions: Readonly<GraphQLInterfaceTypeExtensions>;
  astNode: InterfaceTypeDefinitionNode | undefined;
  extensionASTNodes: ReadonlyArray<InterfaceTypeExtensionNode>;
  
  getFields(): GraphQLFieldMap<any, any>;
  getInterfaces(): ReadonlyArray<GraphQLInterfaceType>;
  toConfig(): GraphQLInterfaceTypeConfig<any, any> & {
    interfaces: ReadonlyArray<GraphQLInterfaceType>;
    fields: GraphQLFieldConfigMap<any, any>;
    extensions: Readonly<GraphQLInterfaceTypeExtensions>;
    extensionASTNodes: ReadonlyArray<InterfaceTypeExtensionNode>;
  };
}

interface GraphQLInterfaceTypeConfig<TSource, TContext> {
  name: string;
  description?: string;
  interfaces?: Thunk<ReadonlyArray<GraphQLInterfaceType>>;
  fields: Thunk<GraphQLFieldConfigMap<TSource, TContext>>;
  resolveType?: GraphQLTypeResolver<TSource, TContext>;
  extensions?: ReadonlyGraphQLInterfaceTypeExtensions;
  astNode?: InterfaceTypeDefinitionNode;
  extensionASTNodes?: ReadonlyArray<InterfaceTypeExtensionNode>;
}

type GraphQLTypeResolver<TSource, TContext> = (
  value: TSource,
  context: TContext,
  info: GraphQLResolveInfo,
  abstractType: GraphQLAbstractType
) => PromiseOrValue<GraphQLObjectType | string | undefined>;
```

### Union Types

GraphQL union type definitions for creating types that can be one of several object types.

```javascript { .api }
/**
 * GraphQL Union Type
 */
class GraphQLUnionType {
  constructor(config: GraphQLUnionTypeConfig<any, any>);
  
  name: string;
  description: string | undefined;
  resolveType: GraphQLTypeResolver<any, any> | undefined;
  extensions: Readonly<GraphQLUnionTypeExtensions>;
  astNode: UnionTypeDefinitionNode | undefined;
  extensionASTNodes: ReadonlyArray<UnionTypeExtensionNode>;
  
  getTypes(): ReadonlyArray<GraphQLObjectType>;
  toConfig(): GraphQLUnionTypeConfig<any, any> & {
    types: ReadonlyArray<GraphQLObjectType>;
    extensions: Readonly<GraphQLUnionTypeExtensions>;
    extensionASTNodes: ReadonlyArray<UnionTypeExtensionNode>;
  };
}

interface GraphQLUnionTypeConfig<TSource, TContext> {
  name: string;
  description?: string;
  types: Thunk<ReadonlyArray<GraphQLObjectType>>;
  resolveType?: GraphQLTypeResolver<TSource, TContext>;
  extensions?: ReadonlyGraphQLUnionTypeExtensions;
  astNode?: UnionTypeDefinitionNode;
  extensionASTNodes?: ReadonlyArray<UnionTypeExtensionNode>;
}
```

### Enum Types

GraphQL enum type definitions for creating types with a fixed set of values.

```javascript { .api }
/**
 * GraphQL Enum Type
 */
class GraphQLEnumType {
  constructor(config: GraphQLEnumTypeConfig);
  
  name: string;
  description: string | undefined;
  extensions: Readonly<GraphQLEnumTypeExtensions>;
  astNode: EnumTypeDefinitionNode | undefined;
  extensionASTNodes: ReadonlyArray<EnumTypeExtensionNode>;
  
  getValues(): ReadonlyArray<GraphQLEnumValue>;
  getValue(name: string): GraphQLEnumValue | undefined;
  serialize(outputValue: any): string | undefined;
  parseValue(inputValue: any): any;
  parseLiteral(valueNode: ValueNode, variables?: any): any;
  toConfig(): GraphQLEnumTypeConfig & {
    extensions: Readonly<GraphQLEnumTypeExtensions>;
    extensionASTNodes: ReadonlyArray<EnumTypeExtensionNode>;
  };
}

interface GraphQLEnumTypeConfig {
  name: string;
  description?: string;
  values: GraphQLEnumValueConfigMap;
  extensions?: ReadonlyGraphQLEnumTypeExtensions;
  astNode?: EnumTypeDefinitionNode;
  extensionASTNodes?: ReadonlyArray<EnumTypeExtensionNode>;
}

type GraphQLEnumValueConfigMap = {
  [key: string]: GraphQLEnumValueConfig;
};

interface GraphQLEnumValueConfig {
  description?: string;
  value?: any;
  deprecationReason?: string;
  extensions?: ReadonlyGraphQLEnumValueExtensions;
  astNode?: EnumValueDefinitionNode;
}

interface GraphQLEnumValue {
  name: string;
  description: string | undefined;
  value: any;
  deprecationReason: string | undefined;
  extensions: Readonly<GraphQLEnumValueExtensions>;
  astNode: EnumValueDefinitionNode | undefined;
}
```

### Scalar Types

GraphQL scalar type definitions for leaf values.

```javascript { .api }
/**
 * GraphQL Scalar Type
 */
class GraphQLScalarType {
  constructor(config: GraphQLScalarTypeConfig<any, any>);
  
  name: string;
  description: string | undefined;
  specifiedByURL: string | undefined;
  serialize: GraphQLScalarSerializer<any>;
  parseValue: GraphQLScalarValueParser<any>;
  parseLiteral: GraphQLScalarLiteralParser<any>;
  extensions: Readonly<GraphQLScalarTypeExtensions>;
  astNode: ScalarTypeDefinitionNode | undefined;
  extensionASTNodes: ReadonlyArray<ScalarTypeExtensionNode>;
  
  toConfig(): GraphQLScalarTypeConfig<any, any> & {
    serialize: GraphQLScalarSerializer<any>;
    parseValue: GraphQLScalarValueParser<any>;
    parseLiteral: GraphQLScalarLiteralParser<any>;
    extensions: Readonly<GraphQLScalarTypeExtensions>;
    extensionASTNodes: ReadonlyArray<ScalarTypeExtensionNode>;
  };
}

interface GraphQLScalarTypeConfig<TInternal, TExternal> {
  name: string;
  description?: string;
  specifiedByURL?: string;
  serialize?: GraphQLScalarSerializer<TExternal>;
  parseValue?: GraphQLScalarValueParser<TInternal>;
  parseLiteral?: GraphQLScalarLiteralParser<TInternal>;
  extensions?: ReadonlyGraphQLScalarTypeExtensions;
  astNode?: ScalarTypeDefinitionNode;
  extensionASTNodes?: ReadonlyArray<ScalarTypeExtensionNode>;
}

type GraphQLScalarSerializer<TExternal> = (outputValue: any) => TExternal;
type GraphQLScalarValueParser<TInternal> = (inputValue: any) => TInternal;
type GraphQLScalarLiteralParser<TInternal> = (
  valueNode: ValueNode,
  variables: any
) => TInternal;
```

### Input Object Types

GraphQL input object type definitions for complex input values.

```javascript { .api }
/**
 * GraphQL Input Object Type
 */
class GraphQLInputObjectType {
  constructor(config: GraphQLInputObjectTypeConfig);
  
  name: string;
  description: string | undefined;
  extensions: Readonly<GraphQLInputObjectTypeExtensions>;
  astNode: InputObjectTypeDefinitionNode | undefined;
  extensionASTNodes: ReadonlyArray<InputObjectTypeExtensionNode>;
  
  getFields(): GraphQLInputFieldMap;
  toConfig(): GraphQLInputObjectTypeConfig & {
    fields: GraphQLInputFieldConfigMap;
    extensions: Readonly<GraphQLInputObjectTypeExtensions>;
    extensionASTNodes: ReadonlyArray<InputObjectTypeExtensionNode>;
  };
}

interface GraphQLInputObjectTypeConfig {
  name: string;
  description?: string;
  fields: Thunk<GraphQLInputFieldConfigMap>;
  extensions?: ReadonlyGraphQLInputObjectTypeExtensions;
  astNode?: InputObjectTypeDefinitionNode;
  extensionASTNodes?: ReadonlyArray<InputObjectTypeExtensionNode>;
}

type GraphQLInputFieldMap = {
  [key: string]: GraphQLInputField;
};

type GraphQLInputFieldConfigMap = {
  [key: string]: GraphQLInputFieldConfig;
};

interface GraphQLInputField {
  name: string;
  description: string | undefined;
  type: GraphQLInputType;
  defaultValue: any;
  deprecationReason: string | undefined;
  extensions: Readonly<GraphQLInputFieldExtensions>;
  astNode: InputValueDefinitionNode | undefined;
}

interface GraphQLInputFieldConfig {
  description?: string;
  type: GraphQLInputType;
  defaultValue?: any;
  deprecationReason?: string;
  extensions?: ReadonlyGraphQLInputFieldExtensions;
  astNode?: InputValueDefinitionNode;
}
```

### Wrapper Types

List and Non-Null type wrappers for creating compound types.

```javascript { .api }
/**
 * GraphQL List Type
 */
class GraphQLList<T extends GraphQLType> {
  constructor(ofType: T);
  
  readonly ofType: T;
  toString(): string;
  toJSON(): string;
  inspect(): string;
}

/**
 * GraphQL Non-Null Type
 */
class GraphQLNonNull<T extends GraphQLNullableType> {
  constructor(ofType: T);
  
  readonly ofType: T;
  toString(): string;
  toJSON(): string;
  inspect(): string;
}

// Helper functions for wrapper types
function GraphQLList<T extends GraphQLType>(type: T): GraphQLList<T>;
function GraphQLNonNull<T extends GraphQLNullableType>(type: T): GraphQLNonNull<T>;
```

### Built-in Scalars

Standard GraphQL scalar types provided by the specification.

```javascript { .api }
/**
 * Built-in Scalar Types
 */
const GraphQLInt: GraphQLScalarType;
const GraphQLFloat: GraphQLScalarType;
const GraphQLString: GraphQLScalarType;
const GraphQLBoolean: GraphQLScalarType;
const GraphQLID: GraphQLScalarType;

const specifiedScalarTypes: ReadonlyArray<GraphQLScalarType>;

function isSpecifiedScalarType(type: any): boolean;
```

**Usage Example:**

```javascript
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    friends: { type: new GraphQLList(GraphQLString) }
  }
});
```

### Directives

GraphQL directive definitions and built-in directives.

```javascript { .api }
/**
 * GraphQL Directive
 */
class GraphQLDirective {
  constructor(config: GraphQLDirectiveConfig);
  
  name: string;
  description: string | undefined;
  locations: ReadonlyArray<DirectiveLocationEnum>;
  isRepeatable: boolean;
  args: ReadonlyArray<GraphQLArgument>;
  extensions: Readonly<GraphQLDirectiveExtensions>;
  astNode: DirectiveDefinitionNode | undefined;
  
  toConfig(): GraphQLDirectiveConfig & {
    args: GraphQLFieldConfigArgumentMap;
    isRepeatable: boolean;
    extensions: Readonly<GraphQLDirectiveExtensions>;
  };
}

interface GraphQLDirectiveConfig {
  name: string;
  description?: string;
  locations: ReadonlyArray<DirectiveLocationEnum>;
  args?: GraphQLFieldConfigArgumentMap;
  isRepeatable?: boolean;
  extensions?: ReadonlyGraphQLDirectiveExtensions;
  astNode?: DirectiveDefinitionNode;
}

// Built-in directives
const GraphQLIncludeDirective: GraphQLDirective;
const GraphQLSkipDirective: GraphQLDirective;
const GraphQLDeprecatedDirective: GraphQLDirective;
const GraphQLSpecifiedByDirective: GraphQLDirective;

const specifiedDirectives: ReadonlyArray<GraphQLDirective>;
const DEFAULT_DEPRECATION_REASON: "No longer supported";

function isDirective(directive: any): directive is GraphQLDirective;
function assertDirective(directive: any): GraphQLDirective;
function isSpecifiedDirective(directive: GraphQLDirective): boolean;
```

### Introspection Types

Built-in introspection types for schema exploration.

```javascript { .api }
/**
 * Introspection Types
 */
const __Schema: GraphQLObjectType;
const __Type: GraphQLObjectType;
const __Field: GraphQLObjectType;
const __InputValue: GraphQLObjectType;
const __EnumValue: GraphQLObjectType;
const __Directive: GraphQLObjectType;
const __DirectiveLocation: GraphQLEnumType;
const __TypeKind: GraphQLEnumType;

const TypeKind: {
  SCALAR: "SCALAR";
  OBJECT: "OBJECT";
  INTERFACE: "INTERFACE";
  UNION: "UNION";
  ENUM: "ENUM";
  INPUT_OBJECT: "INPUT_OBJECT";
  LIST: "LIST";
  NON_NULL: "NON_NULL";
};

const introspectionTypes: ReadonlyArray<GraphQLNamedType>;

// Meta fields
const SchemaMetaFieldDef: GraphQLField<any, any>;
const TypeMetaFieldDef: GraphQLField<any, any>;
const TypeNameMetaFieldDef: GraphQLField<any, any>;

function isIntrospectionType(type: GraphQLNamedType): boolean;
```

### Type Predicates

Functions for checking GraphQL type categories.

```javascript { .api }
/**
 * Type Predicates
 */
function isType(type: any): type is GraphQLType;
function isScalarType(type: any): type is GraphQLScalarType;
function isObjectType(type: any): type is GraphQLObjectType;
function isInterfaceType(type: any): type is GraphQLInterfaceType;
function isUnionType(type: any): type is GraphQLUnionType;
function isEnumType(type: any): type is GraphQLEnumType;
function isInputObjectType(type: any): type is GraphQLInputObjectType;
function isListType(type: any): type is GraphQLList<any>;
function isNonNullType(type: any): type is GraphQLNonNull<any>;
function isInputType(type: any): type is GraphQLInputType;
function isOutputType(type: any): type is GraphQLOutputType;
function isLeafType(type: any): type is GraphQLLeafType;
function isCompositeType(type: any): type is GraphQLCompositeType;
function isAbstractType(type: any): type is GraphQLAbstractType;
function isWrappingType(type: any): type is GraphQLWrappingType;
function isNullableType(type: any): type is GraphQLNullableType;
function isNamedType(type: any): type is GraphQLNamedType;
function isRequiredArgument(arg: GraphQLArgument): boolean;
function isRequiredInputField(field: GraphQLInputField): boolean;
```

### Type Assertions

Functions for asserting GraphQL type categories with error throwing.

```javascript { .api }
/**
 * Type Assertions
 */
function assertType(type: any): GraphQLType;
function assertScalarType(type: any): GraphQLScalarType;
function assertObjectType(type: any): GraphQLObjectType;
function assertInterfaceType(type: any): GraphQLInterfaceType;
function assertUnionType(type: any): GraphQLUnionType;
function assertEnumType(type: any): GraphQLEnumType;
function assertInputObjectType(type: any): GraphQLInputObjectType;
function assertListType(type: any): GraphQLList<any>;
function assertNonNullType(type: any): GraphQLNonNull<any>;
function assertInputType(type: any): GraphQLInputType;
function assertOutputType(type: any): GraphQLOutputType;
function assertLeafType(type: any): GraphQLLeafType;
function assertCompositeType(type: any): GraphQLCompositeType;
function assertAbstractType(type: any): GraphQLAbstractType;
function assertWrappingType(type: any): GraphQLWrappingType;
function assertNullableType(type: any): GraphQLNullableType;
function assertNamedType(type: any): GraphQLNamedType;
```

### Type Utilities

Utility functions for working with GraphQL types.

```javascript { .api }
/**
 * Type Utilities
 */
function getNullableType<T extends GraphQLType>(type: T): GraphQLNullableType;
function getNamedType(type: GraphQLType): GraphQLNamedType;
```

### Schema Validation

Functions for validating GraphQL schemas.

```javascript { .api }
/**
 * Schema Validation
 */
function validateSchema(schema: GraphQLSchema): ReadonlyArray<GraphQLError>;
function assertValidSchema(schema: GraphQLSchema): void;
```

## Type Definitions

```javascript { .api }
// Core type definitions
type GraphQLType =
  | GraphQLScalarType
  | GraphQLObjectType
  | GraphQLInterfaceType
  | GraphQLUnionType
  | GraphQLEnumType
  | GraphQLInputObjectType
  | GraphQLList<any>
  | GraphQLNonNull<any>;

type GraphQLInputType =
  | GraphQLScalarType
  | GraphQLEnumType
  | GraphQLInputObjectType
  | GraphQLList<GraphQLInputType>
  | GraphQLNonNull<GraphQLInputType>;

type GraphQLOutputType =
  | GraphQLScalarType
  | GraphQLObjectType
  | GraphQLInterfaceType
  | GraphQLUnionType
  | GraphQLEnumType
  | GraphQLList<GraphQLOutputType>
  | GraphQLNonNull<GraphQLOutputType>;

type GraphQLLeafType = GraphQLScalarType | GraphQLEnumType;
type GraphQLCompositeType = GraphQLObjectType | GraphQLInterfaceType | GraphQLUnionType;
type GraphQLAbstractType = GraphQLInterfaceType | GraphQLUnionType;
type GraphQLWrappingType = GraphQLList<any> | GraphQLNonNull<any>;
type GraphQLNullableType = GraphQLType;
type GraphQLNamedType = GraphQLNamedInputType | GraphQLNamedOutputType;
type GraphQLNamedInputType = GraphQLScalarType | GraphQLEnumType | GraphQLInputObjectType;
type GraphQLNamedOutputType = GraphQLScalarType | GraphQLObjectType | GraphQLInterfaceType | GraphQLUnionType | GraphQLEnumType;

type Thunk<T> = (() => T) | T;

// Field and argument types
interface GraphQLArgument {
  name: string;
  description: string | undefined;
  type: GraphQLInputType;
  defaultValue: any;
  deprecationReason: string | undefined;
  extensions: Readonly<GraphQLArgumentExtensions>;
  astNode: InputValueDefinitionNode | undefined;
}

interface GraphQLArgumentConfig {
  description?: string;
  type: GraphQLInputType;
  defaultValue?: any;
  deprecationReason?: string;
  extensions?: ReadonlyGraphQLArgumentExtensions;
  astNode?: InputValueDefinitionNode;
}

type GraphQLFieldConfigArgumentMap = {
  [key: string]: GraphQLArgumentConfig;
};

// Resolve info
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

// Response path for tracking field resolution path
interface Path {
  readonly prev: Path | undefined;
  readonly key: string | number;
  readonly typename?: string;
}

// Response path type alias (exported from type module)
type ResponsePath = Path;

// Extension types
type ReadonlyGraphQLSchemaExtensions = Readonly<GraphQLSchemaExtensions>;
type ReadonlyGraphQLObjectTypeExtensions = Readonly<GraphQLObjectTypeExtensions>;
type ReadonlyGraphQLInterfaceTypeExtensions = Readonly<GraphQLInterfaceTypeExtensions>;
type ReadonlyGraphQLUnionTypeExtensions = Readonly<GraphQLUnionTypeExtensions>;
type ReadonlyGraphQLEnumTypeExtensions = Readonly<GraphQLEnumTypeExtensions>;
type ReadonlyGraphQLScalarTypeExtensions = Readonly<GraphQLScalarTypeExtensions>;
type ReadonlyGraphQLInputObjectTypeExtensions = Readonly<GraphQLInputObjectTypeExtensions>;
type ReadonlyGraphQLFieldExtensions = Readonly<GraphQLFieldExtensions>;
type ReadonlyGraphQLInputFieldExtensions = Readonly<GraphQLInputFieldExtensions>;
type ReadonlyGraphQLArgumentExtensions = Readonly<GraphQLArgumentExtensions>;
type ReadonlyGraphQLEnumValueExtensions = Readonly<GraphQLEnumValueExtensions>;
type ReadonlyGraphQLDirectiveExtensions = Readonly<GraphQLDirectiveExtensions>;

interface GraphQLSchemaExtensions {
  [attributeName: string]: any;
}

interface GraphQLObjectTypeExtensions {
  [attributeName: string]: any;
}

interface GraphQLInterfaceTypeExtensions {
  [attributeName: string]: any;
}

interface GraphQLUnionTypeExtensions {
  [attributeName: string]: any;
}

interface GraphQLEnumTypeExtensions {
  [attributeName: string]: any;
}

interface GraphQLScalarTypeExtensions {
  [attributeName: string]: any;
}

interface GraphQLInputObjectTypeExtensions {
  [attributeName: string]: any;
}

interface GraphQLFieldExtensions {
  [attributeName: string]: any;
}

interface GraphQLInputFieldExtensions {
  [attributeName: string]: any;
}

interface GraphQLArgumentExtensions {
  [attributeName: string]: any;
}

interface GraphQLEnumValueExtensions {
  [attributeName: string]: any;
}

interface GraphQLDirectiveExtensions {
  [attributeName: string]: any;
}

type GraphQLIsTypeOfFn<TSource, TContext> = (
  source: TSource,
  context: TContext,
  info: GraphQLResolveInfo
) => PromiseOrValue<boolean>;

type PromiseOrValue<T> = Promise<T> | T;
```