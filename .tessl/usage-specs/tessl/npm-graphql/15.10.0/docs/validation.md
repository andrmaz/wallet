# Validation

The GraphQL.js validation module provides comprehensive document validation functionality, ensuring that GraphQL documents conform to the GraphQL specification. It includes all specified validation rules, custom rule support, and detailed error reporting with source location information.

## Capabilities

### Core Validation Functions

Primary functions for validating GraphQL documents against a schema.

```javascript { .api }
/**
 * Validate GraphQL Document
 * 
 * Validates a GraphQL document against a schema using the specified rules.
 */
function validate(
  schema: GraphQLSchema,
  documentAST: DocumentNode,
  rules?: ReadonlyArray<ValidationRule>,
  options?: {
    maxErrors?: number;
  }
): ReadonlyArray<GraphQLError>;

/**
 * Validation Rule Function Type
 * 
 * A validation rule is a function that returns a visitor object.
 */
type ValidationRule = (context: ValidationContext) => ASTVisitor;

/**
 * Specified Rules
 * 
 * Complete set of validation rules specified by the GraphQL specification.
 */
const specifiedRules: ReadonlyArray<ValidationRule>;

/**
 * Recommended Rules
 * 
 * Subset of rules recommended for most use cases (excludes some expensive rules).
 */
const recommendedRules: ReadonlyArray<ValidationRule>;
```

**Usage Example:**

```javascript
import { validate, parse, buildSchema, specifiedRules } from "graphql";

const schema = buildSchema(`
  type Query {
    user(id: ID!): User
  }
  
  type User {
    id: ID!
    name: String
    email: String
  }
`);

const document = parse(`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      unknownField  # This will cause a validation error
    }
  }
`);

const errors = validate(schema, document, specifiedRules);
if (errors.length > 0) {
  console.log("Validation errors:", errors);
}
```

### Validation Context

Context object that maintains state during validation and provides utilities for rules.

```javascript { .api }
/**
 * Validation Context
 * 
 * Maintains validation state and provides utilities for validation rules.
 */
class ValidationContext {
  constructor(
    schema: GraphQLSchema,
    ast: DocumentNode,
    typeInfo: TypeInfo,
    onError: (error: GraphQLError) => void
  );
  
  reportError(error: GraphQLError): void;
  getErrors(): ReadonlyArray<GraphQLError>;
  getSchema(): GraphQLSchema;
  getDocument(): DocumentNode;
  getFragment(name: string): FragmentDefinitionNode | undefined;
  getFragmentSpreads(node: SelectionSetNode): ReadonlyArray<FragmentSpreadNode>;
  getRecursivelyReferencedFragments(
    operation: OperationDefinitionNode
  ): ReadonlyArray<FragmentDefinitionNode>;
  
  // Type information access
  getType(): GraphQLOutputType | undefined;
  getParentType(): GraphQLCompositeType | undefined;
  getInputType(): GraphQLInputType | undefined;
  getParentInputType(): GraphQLInputType | undefined;
  getFieldDef(): GraphQLField<any, any> | undefined;
  getDefaultValue(): any;
  getDirective(): GraphQLDirective | undefined;
  getArgument(): GraphQLArgument | undefined;
  getEnumValue(): GraphQLEnumValue | undefined;
}

/**
 * SDL Validation Context
 * 
 * Extended context for validating Schema Definition Language documents.
 */
class SDLValidationContext extends ASTValidationContext {
  constructor(
    ast: DocumentNode,
    schema?: GraphQLSchema,
    onError?: (error: GraphQLError) => void
  );
  
  getSchema(): GraphQLSchema | undefined;
}

/**
 * AST Validation Context
 * 
 * Base context for AST validation without schema information.
 */
class ASTValidationContext {
  constructor(ast: DocumentNode, onError?: (error: GraphQLError) => void);
  
  reportError(error: GraphQLError): void;
  getErrors(): ReadonlyArray<GraphQLError>;
  getDocument(): DocumentNode;
  getFragment(name: string): FragmentDefinitionNode | undefined;
}
```

### Executable Document Validation Rules

Validation rules for executable GraphQL documents (queries, mutations, subscriptions).

```javascript { .api }
/**
 * Executable Definitions Rule
 * 
 * A GraphQL document is only valid for execution if all definitions are either 
 * operation or fragment definitions.
 */
function ExecutableDefinitionsRule(context: ValidationContext): ASTVisitor;

/**
 * Lone Anonymous Operation Rule
 * 
 * A GraphQL document is only valid if when it contains an anonymous operation 
 * (the query short-hand) that it contains only that one operation definition.
 */
function LoneAnonymousOperationRule(context: ValidationContext): ASTVisitor;

/**
 * Single Field Subscriptions Rule
 * 
 * A GraphQL subscription is valid only if it contains a single root field.
 */
function SingleFieldSubscriptionsRule(context: ValidationContext): ASTVisitor;

/**
 * Known Argument Names Rule
 * 
 * A GraphQL field or directive is only valid if all supplied arguments are 
 * defined by that field or directive.
 */
function KnownArgumentNamesRule(context: ValidationContext): ASTVisitor;

/**
 * Unique Argument Names Rule
 * 
 * A GraphQL field or directive is only valid if all supplied arguments have unique names.
 */
function UniqueArgumentNamesRule(context: ValidationContext): ASTVisitor;

/**
 * Values of Correct Type Rule
 * 
 * A GraphQL document is only valid if all value literals are of the type 
 * expected at their position.
 */
function ValuesOfCorrectTypeRule(context: ValidationContext): ASTVisitor;

/**
 * Provided Required Arguments Rule
 * 
 * A field or directive is only valid if all required (non-null without a 
 * default value) field arguments have been provided.
 */
function ProvidedRequiredArgumentsRule(context: ValidationContext): ASTVisitor;

/**
 * Variables Are Input Types Rule
 * 
 * A GraphQL operation is only valid if all the variables it defines are of 
 * input types (scalar, enum, or input object).
 */
function VariablesAreInputTypesRule(context: ValidationContext): ASTVisitor;

/**
 * Variables In Allowed Position Rule
 * 
 * Variables passed to field arguments conform to type.
 */
function VariablesInAllowedPositionRule(context: ValidationContext): ASTVisitor;

/**
 * Unique Variable Names Rule
 * 
 * A GraphQL operation is only valid if all its variables are uniquely named.
 */
function UniqueVariableNamesRule(context: ValidationContext): ASTVisitor;

/**
 * No Undefined Variables Rule
 * 
 * A GraphQL operation is only valid if all variables encountered in the 
 * operation are defined.
 */
function NoUndefinedVariablesRule(context: ValidationContext): ASTVisitor;

/**
 * No Unused Variables Rule
 * 
 * A GraphQL operation is only valid if all variables defined by an operation 
 * are used.
 */
function NoUnusedVariablesRule(context: ValidationContext): ASTVisitor;
```

### Field and Fragment Validation Rules

Rules for validating field selections and fragment usage.

```javascript { .api }
/**
 * Fields on Correct Type Rule
 * 
 * A GraphQL document is only valid if all fields selected are defined by the 
 * parent type, or are an allowed meta field such as __typename.
 */
function FieldsOnCorrectTypeRule(context: ValidationContext): ASTVisitor;

/**
 * Scalar Leafs Rule
 * 
 * A GraphQL document is valid only if all leaf fields (those without 
 * sub selections) are of scalar or enum types.
 */
function ScalarLeafsRule(context: ValidationContext): ASTVisitor;

/**
 * Known Fragment Names Rule
 * 
 * A GraphQL document is only valid if all `...Fragment` fragment spreads refer 
 * to fragments defined in the same document.
 */
function KnownFragmentNamesRule(context: ValidationContext): ASTVisitor;

/**
 * Unique Fragment Names Rule
 * 
 * A GraphQL document is only valid if all defined fragments have unique names.
 */
function UniqueFragmentNamesRule(context: ValidationContext): ASTVisitor;

/**
 * Fragments on Composite Types Rule
 * 
 * Fragments use a type condition to determine if they apply, since fragments 
 * can only be spread into a composite type (object, interface, or union).
 */
function FragmentsOnCompositeTypesRule(context: ValidationContext): ASTVisitor;

/**
 * Possible Fragment Spreads Rule
 * 
 * A fragment spread is only valid if the type condition could ever apply within 
 * the context of where it is used.
 */
function PossibleFragmentSpreadsRule(context: ValidationContext): ASTVisitor;

/**
 * No Fragment Cycles Rule
 * 
 * A GraphQL document is only valid if it contains no fragment cycles.
 */
function NoFragmentCyclesRule(context: ValidationContext): ASTVisitor;

/**
 * No Unused Fragments Rule
 * 
 * A GraphQL document is only valid if all fragment definitions are spread 
 * within operations, or spread within other fragments spread within operations.
 */
function NoUnusedFragmentsRule(context: ValidationContext): ASTVisitor;

/**
 * Overlapping Fields Can Be Merged Rule
 * 
 * A selection set is only valid if all fields (including spreading any 
 * fragments) either correspond to distinct response names or can be merged 
 * without conflict.
 */
function OverlappingFieldsCanBeMergedRule(context: ValidationContext): ASTVisitor;
```

### Directive Validation Rules

Rules for validating directive usage.

```javascript { .api }
/**
 * Known Directives Rule
 * 
 * A GraphQL document is only valid if all `@directive` are known by the 
 * schema and legally positioned.
 */
function KnownDirectivesRule(context: ValidationContext): ASTVisitor;

/**
 * Unique Directives Per Location Rule
 * 
 * A GraphQL document is only valid if all non-repeatable directives at 
 * a given location are uniquely named.
 */
function UniqueDirectivesPerLocationRule(context: ValidationContext): ASTVisitor;
```

### Type System Validation Rules

Rules for validating Schema Definition Language (SDL) documents.

```javascript { .api }
/**
 * Lone Schema Definition Rule
 * 
 * A GraphQL document is only valid if it contains at most one schema definition.
 */
function LoneSchemaDefinitionRule(context: SDLValidationContext): ASTVisitor;

/**
 * Unique Operation Types Rule
 * 
 * A GraphQL document is only valid if it has only one type per operation.
 */
function UniqueOperationTypesRule(context: SDLValidationContext): ASTVisitor;

/**
 * Unique Type Names Rule
 * 
 * A GraphQL document is only valid if all defined types have unique names.
 */
function UniqueTypeNamesRule(context: SDLValidationContext): ASTVisitor;

/**
 * Unique Enum Value Names Rule
 * 
 * A GraphQL enum type is only valid if all its values are uniquely named.
 */
function UniqueEnumValueNamesRule(context: SDLValidationContext): ASTVisitor;

/**
 * Unique Field Definition Names Rule
 * 
 * A GraphQL complex type is only valid if all its fields are uniquely named.
 */
function UniqueFieldDefinitionNamesRule(context: SDLValidationContext): ASTVisitor;

/**
 * Unique Directive Names Rule
 * 
 * A GraphQL document is only valid if all defined directives have unique names.
 */
function UniqueDirectiveNamesRule(context: SDLValidationContext): ASTVisitor;

/**
 * Known Type Names Rule
 * 
 * A GraphQL document is only valid if referenced types (such as in field 
 * arguments) are defined by the type schema.
 */
function KnownTypeNamesRule(context: ValidationContext | SDLValidationContext): ASTVisitor;

/**
 * Possible Type Extensions Rule
 * 
 * A GraphQL document is only valid if type extensions are possible.
 */
function PossibleTypeExtensionsRule(context: SDLValidationContext): ASTVisitor;

/**
 * Unique Input Field Names Rule
 * 
 * A GraphQL input object value is only valid if all supplied fields are 
 * uniquely named.
 */
function UniqueInputFieldNamesRule(context: ValidationContext): ASTVisitor;

/**
 * Unique Operation Names Rule
 * 
 * A GraphQL document is only valid if all defined operations have unique names.
 */
function UniqueOperationNamesRule(context: ValidationContext): ASTVisitor;
```

### Custom and Experimental Rules

Additional rules for specific use cases and experimental features.

```javascript { .api }
/**
 * No Deprecated Custom Rule
 * 
 * A validation rule which reports an error when deprecated fields and enum values are used.
 */
function NoDeprecatedCustomRule(context: ValidationContext): ASTVisitor;

/**
 * No Schema Introspection Custom Rule
 * 
 * A validation rule which disallows introspection queries.
 */
function NoSchemaIntrospectionCustomRule(context: ValidationContext): ASTVisitor;

/**
 * Max Introspection Depth Rule
 * 
 * Prevents introspection queries that are too deeply nested.
 */
function MaxIntrospectionDepthRule(maxDepth: number): ValidationRule;
```

**Usage Example:**

```javascript
import { 
  validate, 
  specifiedRules, 
  NoDeprecatedCustomRule,
  MaxIntrospectionDepthRule 
} from "graphql";

// Use standard rules plus custom rules
const customRules = [
  ...specifiedRules,
  NoDeprecatedCustomRule,
  MaxIntrospectionDepthRule(10)
];

const errors = validate(schema, document, customRules);
```

### Validation Utilities

Helper functions for working with validation results and rules.

```javascript { .api }
/**
 * Validate SDL
 * 
 * Utility to validate a GraphQL schema definition language document.
 */
function validateSDL(
  documentAST: DocumentNode,
  schema?: GraphQLSchema,
  rules?: ReadonlyArray<ValidationRule>
): ReadonlyArray<GraphQLError>;

/**
 * Assert Valid SDL
 * 
 * Utility to validate SDL and throw on first error.
 */
function assertValidSDL(documentAST: DocumentNode): void;

/**
 * Assert Valid SDL Extension
 * 
 * Utility to validate SDL extensions.
 */
function assertValidSDLExtension(
  documentAST: DocumentNode,
  schema: GraphQLSchema
): void;
```

## Advanced Validation Patterns

**Custom Validation Rule Example:**

```javascript
import { GraphQLError, ValidationContext } from "graphql";

// Custom rule to limit query depth
function MaxDepthRule(maxDepth) {
  return function(context) {
    return {
      Field(node, key, parent, path, ancestors) {
        const depth = ancestors.filter(
          ancestor => ancestor.kind === 'Field'
        ).length;
        
        if (depth > maxDepth) {
          context.reportError(
            new GraphQLError(
              `Query depth of ${depth} exceeds maximum depth of ${maxDepth}`,
              [node]
            )
          );
        }
      }
    };
  };
}

// Usage
const errors = validate(schema, document, [
  ...specifiedRules,
  MaxDepthRule(5)
]);
```

**Validation with Type Information:**

```javascript
import { validate, TypeInfo, visitWithTypeInfo } from "graphql";

function CustomRuleWithTypeInfo(context) {
  return visitWithTypeInfo(new TypeInfo(context.getSchema()), {
    Field(node) {
      const type = context.getType();
      const parentType = context.getParentType();
      
      if (parentType && parentType.name === 'User' && node.name.value === 'password') {
        context.reportError(
          new GraphQLError('Password field access not allowed', [node])
        );
      }
    }
  });
}
```

## Type Definitions

```javascript { .api }
// Validation rule type
type ValidationRule = (context: ValidationContext) => ASTVisitor;

// Validation options
interface ValidationOptions {
  maxErrors?: number;
}

// SDL validation options
interface SDLValidationOptions {
  assumeValidSDL?: boolean;
}

// Validation context types
interface ValidationContext {
  reportError(error: GraphQLError): void;
  getErrors(): ReadonlyArray<GraphQLError>;
  getSchema(): GraphQLSchema;
  getDocument(): DocumentNode;
  getFragment(name: string): FragmentDefinitionNode | undefined;
  getFragmentSpreads(node: SelectionSetNode): ReadonlyArray<FragmentSpreadNode>;
  getRecursivelyReferencedFragments(
    operation: OperationDefinitionNode
  ): ReadonlyArray<FragmentDefinitionNode>;
  
  getType(): GraphQLOutputType | undefined;
  getParentType(): GraphQLCompositeType | undefined;
  getInputType(): GraphQLInputType | undefined;
  getParentInputType(): GraphQLInputType | undefined;
  getFieldDef(): GraphQLField<any, any> | undefined;
  getDefaultValue(): any;
  getDirective(): GraphQLDirective | undefined;
  getArgument(): GraphQLArgument | undefined;
  getEnumValue(): GraphQLEnumValue | undefined;
}

// Custom validation rule helpers
type FieldValidationFn = (
  fieldDef: GraphQLField<any, any>,
  parentType: GraphQLObjectType | GraphQLInterfaceType,
  node: FieldNode,
  context: ValidationContext
) => void;

type ArgumentValidationFn = (
  argDef: GraphQLArgument,
  argNode: ArgumentNode,
  context: ValidationContext
) => void;

type DirectiveValidationFn = (
  directiveDef: GraphQLDirective,
  directiveNode: DirectiveNode,
  context: ValidationContext
) => void;
```