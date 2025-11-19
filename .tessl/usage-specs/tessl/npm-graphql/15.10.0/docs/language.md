# Language Processing

The GraphQL.js language module provides comprehensive tools for parsing GraphQL documents into Abstract Syntax Trees (AST), visiting and transforming AST nodes, and printing AST back to GraphQL strings. It includes lexical analysis, parsing, source location tracking, and visitor pattern support.

## Capabilities

### Source and Location

Classes for representing GraphQL source documents and tracking location information.

```javascript { .api }
/**
 * GraphQL Source Document
 */
class Source {
  constructor(body: string, name?: string, locationOffset?: Location);
  
  body: string;
  name: string;
  locationOffset: Location;
}

/**
 * Location in Source
 */
class Location {
  constructor(startToken: Token, endToken: Token, source: Source);
  
  start: number;
  end: number;
  startToken: Token;
  endToken: Token;
  source: Source;
}

/**
 * Lexical Token
 */
class Token {
  constructor(
    kind: TokenKindEnum,
    start: number,
    end: number,
    line: number,
    column: number,
    prev?: Token,
    value?: string
  );
  
  kind: TokenKindEnum;
  start: number;
  end: number;
  line: number;
  column: number;
  value: string | undefined;
  prev: Token | undefined;
  next: Token | undefined;
}

/**
 * Get location from source position
 */
function getLocation(source: Source, position: number): SourceLocation;

interface SourceLocation {
  line: number;
  column: number;
}

/**
 * Print location information with context
 */
function printLocation(location: Location): string;
function printSourceLocation(
  source: Source,
  location: SourceLocation
): string;
```

### Lexical Analysis

Lexer for tokenizing GraphQL source code.

```javascript { .api }
/**
 * GraphQL Lexer
 */
class Lexer {
  constructor(source: Source);
  
  source: Source;
  lastToken: Token;
  token: Token;
  line: number;
  lineStart: number;
  
  advance(): Token;
  lookahead(): Token;
}

/**
 * Token Kind Enumeration
 */
const TokenKind: {
  SOF: "<SOF>";
  EOF: "<EOF>";
  BANG: "!";
  DOLLAR: "$";
  AMP: "&";
  PAREN_L: "(";
  PAREN_R: ")";
  SPREAD: "...";
  COLON: ":";
  EQUALS: "=";
  AT: "@";
  BRACKET_L: "[";
  BRACKET_R: "]";
  BRACE_L: "{";
  BRACE_R: "}";
  PIPE: "|";
  NAME: "Name";
  INT: "Int";
  FLOAT: "Float";
  STRING: "String";
  BLOCK_STRING: "BlockString";
  COMMENT: "Comment";
};

type TokenKindEnum = typeof TokenKind[keyof typeof TokenKind];
```

### Parsing

Functions for parsing GraphQL documents and values into AST nodes.

```javascript { .api }
/**
 * Parse GraphQL Document
 */
function parse(
  source: string | Source,
  options?: ParseOptions
): DocumentNode;

interface ParseOptions {
  noLocation?: boolean;
  allowLegacySDLEmptyFields?: boolean;
  allowLegacySDLImplementsInterfaces?: boolean;
  experimentalFragmentVariables?: boolean;
}

/**
 * Parse GraphQL Value
 */
function parseValue(
  source: string | Source,
  options?: ParseOptions
): ValueNode;

/**
 * Parse GraphQL Type
 */
function parseType(
  source: string | Source,
  options?: ParseOptions
): TypeNode;
```

**Usage Examples:**

```javascript
import { parse, parseValue, parseType, Source } from "graphql";

// Parse a complete document
const document = parse(`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`);

// Parse a value
const value = parseValue('"hello world"');

// Parse a type
const type = parseType('[String!]');

// Parse with source object for better error reporting
const source = new Source(`
  query InvalidQuery {
    user {
      unknownField
    }
  }
`, "MySchema.graphql");
const doc = parse(source);
```

### Printing

Functions for printing AST nodes back to GraphQL strings.

```javascript { .api }
/**
 * Print AST to GraphQL String
 */
function print(ast: ASTNode): string;
```

**Usage Example:**

```javascript
import { parse, print } from "graphql";

const document = parse(`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`);

const printed = print(document);
console.log(printed);
// Output:
// query GetUser($id: ID!) {
//   user(id: $id) {
//     name
//     email
//   }
// }
```

### AST Visiting

Visitor pattern implementation for traversing and transforming AST nodes.

```javascript { .api }
/**
 * Visit AST Nodes with Visitor Pattern
 */
function visit(
  root: ASTNode,
  visitor: ASTVisitor,
  visitorKeys?: VisitorKeyMap
): any;

function visitInParallel(
  visitors: ReadonlyArray<ASTVisitor>
): ASTVisitor;

function getVisitFn(
  visitor: ASTVisitor,
  kind: string,
  isLeaving: boolean
): VisitFn | undefined;

const BREAK: any;

type ASTVisitor = {
  readonly [NodeT in ASTNode as NodeT["kind"]]?: 
    | VisitFn<NodeT>
    | {
        readonly enter?: VisitFn<NodeT>;
        readonly leave?: VisitFn<NodeT>;
      };
} & {
  readonly enter?: VisitFn<ASTNode>;
  readonly leave?: VisitFn<ASTNode>;
};

type VisitFn<TNode extends ASTNode> = (
  node: TNode,
  key: string | number | undefined,
  parent: ASTNode | ReadonlyArray<ASTNode> | undefined,
  path: ReadonlyArray<string | number>,
  ancestors: ReadonlyArray<ASTNode | ReadonlyArray<ASTNode>>
) => any;

type VisitorKeyMap = { [key: string]: ReadonlyArray<string> };
```

**Usage Example:**

```javascript
import { parse, visit } from "graphql";

const document = parse(`
  query GetUser {
    user {
      name
      email
    }
  }
`);

const visitor = {
  Field: {
    enter(node, key, parent, path, ancestors) {
      console.log(`Entering field: ${node.name.value}`);
    },
    leave(node, key, parent, path, ancestors) {
      console.log(`Leaving field: ${node.name.value}`);
    }
  }
};

visit(document, visitor);
```

### AST Node Kinds

Enumeration of all AST node kinds.

```javascript { .api }
/**
 * AST Node Kind Enumeration
 */
const Kind: {
  // Name
  NAME: "Name";

  // Document
  DOCUMENT: "Document";
  OPERATION_DEFINITION: "OperationDefinition";
  VARIABLE_DEFINITION: "VariableDefinition";
  SELECTION_SET: "SelectionSet";
  FIELD: "Field";
  ARGUMENT: "Argument";

  // Fragments
  FRAGMENT_SPREAD: "FragmentSpread";
  INLINE_FRAGMENT: "InlineFragment";
  FRAGMENT_DEFINITION: "FragmentDefinition";

  // Values
  VARIABLE: "Variable";
  INT: "IntValue";
  FLOAT: "FloatValue";
  STRING: "StringValue";
  BOOLEAN: "BooleanValue";
  NULL: "NullValue";
  ENUM: "EnumValue";
  LIST: "ListValue";
  OBJECT: "ObjectValue";
  OBJECT_FIELD: "ObjectField";

  // Directives
  DIRECTIVE: "Directive";

  // Types
  NAMED_TYPE: "NamedType";
  LIST_TYPE: "ListType";
  NON_NULL_TYPE: "NonNullType";

  // Type System Definitions
  SCHEMA_DEFINITION: "SchemaDefinition";
  OPERATION_TYPE_DEFINITION: "OperationTypeDefinition";

  // Type Definitions
  SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition";
  OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition";
  FIELD_DEFINITION: "FieldDefinition";
  INPUT_VALUE_DEFINITION: "InputValueDefinition";
  INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition";
  UNION_TYPE_DEFINITION: "UnionTypeDefinition";
  ENUM_TYPE_DEFINITION: "EnumTypeDefinition";
  ENUM_VALUE_DEFINITION: "EnumValueDefinition";
  INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition";

  // Directive Definitions
  DIRECTIVE_DEFINITION: "DirectiveDefinition";

  // Type System Extensions
  SCHEMA_EXTENSION: "SchemaExtension";
  SCALAR_TYPE_EXTENSION: "ScalarTypeExtension";
  OBJECT_TYPE_EXTENSION: "ObjectTypeExtension";
  INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension";
  UNION_TYPE_EXTENSION: "UnionTypeExtension";
  ENUM_TYPE_EXTENSION: "EnumTypeExtension";
  INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension";
};

type KindEnum = typeof Kind[keyof typeof Kind];
```

### Directive Locations

Enumeration of directive location values.

```javascript { .api }
/**
 * Directive Location Enumeration
 */
const DirectiveLocation: {
  // Request Definitions
  QUERY: "QUERY";
  MUTATION: "MUTATION";
  SUBSCRIPTION: "SUBSCRIPTION";
  FIELD: "FIELD";
  FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION";
  FRAGMENT_SPREAD: "FRAGMENT_SPREAD";
  INLINE_FRAGMENT: "INLINE_FRAGMENT";
  VARIABLE_DEFINITION: "VARIABLE_DEFINITION";

  // Schema Definitions
  SCHEMA: "SCHEMA";
  SCALAR: "SCALAR";
  OBJECT: "OBJECT";
  FIELD_DEFINITION: "FIELD_DEFINITION";
  ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION";
  INTERFACE: "INTERFACE";
  UNION: "UNION";
  ENUM: "ENUM";
  ENUM_VALUE: "ENUM_VALUE";
  INPUT_OBJECT: "INPUT_OBJECT";
  INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION";
};

type DirectiveLocationEnum = typeof DirectiveLocation[keyof typeof DirectiveLocation];
```

### AST Node Predicates

Functions for checking AST node categories.

```javascript { .api }
/**
 * AST Node Predicates
 */
function isDefinitionNode(node: ASTNode): node is DefinitionNode;
function isExecutableDefinitionNode(node: ASTNode): node is ExecutableDefinitionNode;
function isSelectionNode(node: ASTNode): node is SelectionNode;
function isValueNode(node: ASTNode): node is ValueNode;
function isTypeNode(node: ASTNode): node is TypeNode;
function isTypeSystemDefinitionNode(node: ASTNode): node is TypeSystemDefinitionNode;
function isTypeDefinitionNode(node: ASTNode): node is TypeDefinitionNode;
function isTypeSystemExtensionNode(node: ASTNode): node is TypeSystemExtensionNode;
function isTypeExtensionNode(node: ASTNode): node is TypeExtensionNode;
```

## AST Node Types

```javascript { .api }
// Base AST node interface
interface ASTNode {
  readonly kind: string;
  readonly loc?: Location;
}

type ASTKindToNode = {
  readonly [NodeT in ASTNode as NodeT["kind"]]: NodeT;
};

// Name node
interface NameNode extends ASTNode {
  readonly kind: "Name";
  readonly value: string;
}

// Document and operation nodes
interface DocumentNode extends ASTNode {
  readonly kind: "Document";
  readonly definitions: ReadonlyArray<DefinitionNode>;
}

interface OperationDefinitionNode extends ASTNode {
  readonly kind: "OperationDefinition";
  readonly operation: OperationTypeNode;
  readonly name?: NameNode;
  readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly selectionSet: SelectionSetNode;
}

type OperationTypeNode = "query" | "mutation" | "subscription";

interface VariableDefinitionNode extends ASTNode {
  readonly kind: "VariableDefinition";
  readonly variable: VariableNode;
  readonly type: TypeNode;
  readonly defaultValue?: ValueNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
}

interface SelectionSetNode extends ASTNode {
  readonly kind: "SelectionSet";
  readonly selections: ReadonlyArray<SelectionNode>;
}

// Selection nodes
type SelectionNode = FieldNode | FragmentSpreadNode | InlineFragmentNode;

interface FieldNode extends ASTNode {
  readonly kind: "Field";
  readonly alias?: NameNode;
  readonly name: NameNode;
  readonly arguments?: ReadonlyArray<ArgumentNode>;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly selectionSet?: SelectionSetNode;
}

interface ArgumentNode extends ASTNode {
  readonly kind: "Argument";
  readonly name: NameNode;
  readonly value: ValueNode;
}

interface FragmentSpreadNode extends ASTNode {
  readonly kind: "FragmentSpread";
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
}

interface InlineFragmentNode extends ASTNode {
  readonly kind: "InlineFragment";
  readonly typeCondition?: NamedTypeNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly selectionSet: SelectionSetNode;
}

interface FragmentDefinitionNode extends ASTNode {
  readonly kind: "FragmentDefinition";
  readonly name: NameNode;
  readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
  readonly typeCondition: NamedTypeNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly selectionSet: SelectionSetNode;
}

// Value nodes
type ValueNode =
  | VariableNode
  | IntValueNode
  | FloatValueNode
  | StringValueNode
  | BooleanValueNode
  | NullValueNode
  | EnumValueNode
  | ListValueNode
  | ObjectValueNode;

interface VariableNode extends ASTNode {
  readonly kind: "Variable";
  readonly name: NameNode;
}

interface IntValueNode extends ASTNode {
  readonly kind: "IntValue";
  readonly value: string;
}

interface FloatValueNode extends ASTNode {
  readonly kind: "FloatValue";
  readonly value: string;
}

interface StringValueNode extends ASTNode {
  readonly kind: "StringValue";
  readonly value: string;
  readonly block?: boolean;
}

interface BooleanValueNode extends ASTNode {
  readonly kind: "BooleanValue";
  readonly value: boolean;
}

interface NullValueNode extends ASTNode {
  readonly kind: "NullValue";
}

interface EnumValueNode extends ASTNode {
  readonly kind: "EnumValue";
  readonly value: string;
}

interface ListValueNode extends ASTNode {
  readonly kind: "ListValue";
  readonly values: ReadonlyArray<ValueNode>;
}

interface ObjectValueNode extends ASTNode {
  readonly kind: "ObjectValue";
  readonly fields: ReadonlyArray<ObjectFieldNode>;
}

interface ObjectFieldNode extends ASTNode {
  readonly kind: "ObjectField";
  readonly name: NameNode;
  readonly value: ValueNode;
}

// Directive nodes
interface DirectiveNode extends ASTNode {
  readonly kind: "Directive";
  readonly name: NameNode;
  readonly arguments?: ReadonlyArray<ArgumentNode>;
}

// Type nodes
type TypeNode = NamedTypeNode | ListTypeNode | NonNullTypeNode;

interface NamedTypeNode extends ASTNode {
  readonly kind: "NamedType";
  readonly name: NameNode;
}

interface ListTypeNode extends ASTNode {
  readonly kind: "ListType";
  readonly type: TypeNode;
}

interface NonNullTypeNode extends ASTNode {
  readonly kind: "NonNullType";
  readonly type: NamedTypeNode | ListTypeNode;
}

// Definition nodes
type DefinitionNode = ExecutableDefinitionNode | TypeSystemDefinitionNode | TypeSystemExtensionNode;

type ExecutableDefinitionNode = OperationDefinitionNode | FragmentDefinitionNode;

type TypeSystemDefinitionNode =
  | SchemaDefinitionNode
  | TypeDefinitionNode
  | DirectiveDefinitionNode;

type TypeDefinitionNode =
  | ScalarTypeDefinitionNode
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | UnionTypeDefinitionNode
  | EnumTypeDefinitionNode
  | InputObjectTypeDefinitionNode;

type TypeSystemExtensionNode = SchemaExtensionNode | TypeExtensionNode;

type TypeExtensionNode =
  | ScalarTypeExtensionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode
  | UnionTypeExtensionNode
  | EnumTypeExtensionNode
  | InputObjectTypeExtensionNode;

// Schema definition nodes
interface SchemaDefinitionNode extends ASTNode {
  readonly kind: "SchemaDefinition";
  readonly description?: StringValueNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly operationTypes: ReadonlyArray<OperationTypeDefinitionNode>;
}

interface OperationTypeDefinitionNode extends ASTNode {
  readonly kind: "OperationTypeDefinition";
  readonly operation: OperationTypeNode;
  readonly type: NamedTypeNode;
}

// Type definition nodes
interface ScalarTypeDefinitionNode extends ASTNode {
  readonly kind: "ScalarTypeDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
}

interface ObjectTypeDefinitionNode extends ASTNode {
  readonly kind: "ObjectTypeDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}

interface FieldDefinitionNode extends ASTNode {
  readonly kind: "FieldDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
  readonly type: TypeNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
}

interface InputValueDefinitionNode extends ASTNode {
  readonly kind: "InputValueDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly type: TypeNode;
  readonly defaultValue?: ValueNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
}

interface InterfaceTypeDefinitionNode extends ASTNode {
  readonly kind: "InterfaceTypeDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}

interface UnionTypeDefinitionNode extends ASTNode {
  readonly kind: "UnionTypeDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly types?: ReadonlyArray<NamedTypeNode>;
}

interface EnumTypeDefinitionNode extends ASTNode {
  readonly kind: "EnumTypeDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
}

interface EnumValueDefinitionNode extends ASTNode {
  readonly kind: "EnumValueDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
}

interface InputObjectTypeDefinitionNode extends ASTNode {
  readonly kind: "InputObjectTypeDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
}

// Directive definition
interface DirectiveDefinitionNode extends ASTNode {
  readonly kind: "DirectiveDefinition";
  readonly description?: StringValueNode;
  readonly name: NameNode;
  readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
  readonly repeatable: boolean;
  readonly locations: ReadonlyArray<NameNode>;
}

// Extension nodes
interface SchemaExtensionNode extends ASTNode {
  readonly kind: "SchemaExtension";
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly operationTypes?: ReadonlyArray<OperationTypeDefinitionNode>;
}

interface ScalarTypeExtensionNode extends ASTNode {
  readonly kind: "ScalarTypeExtension";
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
}

interface ObjectTypeExtensionNode extends ASTNode {
  readonly kind: "ObjectTypeExtension";
  readonly name: NameNode;
  readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}

interface InterfaceTypeExtensionNode extends ASTNode {
  readonly kind: "InterfaceTypeExtension";
  readonly name: NameNode;
  readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly fields?: ReadonlyArray<FieldDefinitionNode>;
}

interface UnionTypeExtensionNode extends ASTNode {
  readonly kind: "UnionTypeExtension";
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly types?: ReadonlyArray<NamedTypeNode>;
}

interface EnumTypeExtensionNode extends ASTNode {
  readonly kind: "EnumTypeExtension";
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
}

interface InputObjectTypeExtensionNode extends ASTNode {
  readonly kind: "InputObjectTypeExtension";
  readonly name: NameNode;
  readonly directives?: ReadonlyArray<DirectiveNode>;
  readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
}
```