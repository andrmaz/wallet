# Subscriptions

The GraphQL.js subscriptions module provides support for GraphQL subscriptions, enabling real-time data updates through event streams. It includes functions for creating subscription event streams, executing subscription operations, and managing subscription lifecycles.

## Capabilities

### Core Subscription Functions

Primary functions for executing GraphQL subscription operations.

```javascript { .api }
/**
 * Subscribe
 * 
 * Implements the "Subscribe" algorithm described in the GraphQL specification.
 * Returns either an AsyncIterator (if successful) or an ExecutionResult (if error).
 */
function subscribe(args: SubscriptionArgs): Promise<AsyncIterator<ExecutionResult> | ExecutionResult>;

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

/**
 * Create Source Event Stream
 * 
 * Creates the initial event stream for a subscription by executing the 
 * subscription's root field and returning the async iterable result.
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
```

**Basic Usage Example:**

```javascript
import { subscribe, parse } from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: { type: GraphQLString, resolve: () => "Hello World!" }
    }
  }),
  subscription: new GraphQLObjectType({
    name: "Subscription", 
    fields: {
      messageAdded: {
        type: GraphQLString,
        subscribe: () => messageEventStream,
        resolve: (payload) => payload.message
      }
    }
  })
});

const document = parse(`
  subscription {
    messageAdded
  }
`);

const subscriptionResult = await subscribe({
  schema,
  document,
  contextValue: { user: { id: 1 } }
});

if (Symbol.asyncIterator in subscriptionResult) {
  // Success - we have an async iterator
  for await (const result of subscriptionResult) {
    console.log(result); // { data: { messageAdded: "New message!" } }
  }
} else {
  // Error occurred during subscription setup
  console.error(subscriptionResult.errors);
}
```

### Event Stream Creation

Functions and patterns for creating subscription event streams.

```javascript { .api }
/**
 * Map Source to Response
 * 
 * Maps each event from the source stream to a complete GraphQL response
 * by executing the subscription's selection set against each event.
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

/**
 * Event Emitter Pattern
 * 
 * Common pattern for creating event streams using EventEmitter.
 */
interface SubscriptionEventEmitter {
  on(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

/**
 * Create Event Stream from EventEmitter
 * 
 * Utility function to create async iterable from EventEmitter.
 */
function createEventStream<T>(
  emitter: SubscriptionEventEmitter,
  eventName: string
): AsyncIterable<T>;
```

**Event Stream Examples:**

```javascript
import { EventEmitter } from "events";

// Event emitter for message events
const messageEmitter = new EventEmitter();

// Create async iterable from event emitter
async function* createMessageStream() {
  const messageQueue = [];
  let resolveNext;
  let nextPromise = new Promise(resolve => resolveNext = resolve);
  
  const messageHandler = (message) => {
    messageQueue.push(message);
    resolveNext();
    nextPromise = new Promise(resolve => resolveNext = resolve);
  };
  
  messageEmitter.on('message', messageHandler);
  
  try {
    while (true) {
      await nextPromise;
      while (messageQueue.length > 0) {
        yield messageQueue.shift();
      }
    }
  } finally {
    messageEmitter.off('message', messageHandler);
  }
}

// Usage in subscription resolver
const subscriptionResolvers = {
  Subscription: {
    messageAdded: {
      subscribe: () => createMessageStream(),
      resolve: (message) => message
    }
  }
};

// Trigger events
messageEmitter.emit('message', { id: 1, text: 'Hello!', userId: 123 });
```

### Subscription Field Resolvers

Specialized resolver functions for subscription fields.

```javascript { .api }
/**
 * Subscription Field Resolver
 * 
 * Resolvers for subscription fields have two phases:
 * 1. subscribe: Returns an AsyncIterable of events
 * 2. resolve: Transforms each event into the field's return value
 */
interface SubscriptionFieldConfig<TSource, TContext, TArgs = any> {
  type: GraphQLOutputType;
  args?: GraphQLFieldConfigArgumentMap;
  subscribe: GraphQLFieldResolver<TSource, TContext, TArgs>;
  resolve?: GraphQLFieldResolver<any, TContext, TArgs>;
  description?: string;
  deprecationReason?: string;
  extensions?: ReadonlyGraphQLFieldExtensions;
  astNode?: FieldDefinitionNode;
}

/**
 * Subscription Resolver Pattern
 * 
 * Common pattern for implementing subscription resolvers.
 */
type SubscriptionResolver<TPayload, TContext, TArgs = any> = {
  subscribe: (
    source: any,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ) => AsyncIterable<TPayload> | Promise<AsyncIterable<TPayload>>;
  
  resolve?: (
    payload: TPayload,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ) => any;
};
```

**Complex Subscription Example:**

```javascript
import { PubSub } from 'graphql-subscriptions'; // External library

const pubsub = new PubSub();

const commentSubscription = {
  type: CommentType,
  args: {
    postId: { type: GraphQLID }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('COMMENT_ADDED'),
    (payload, variables) => {
      return payload.comment.postId === variables.postId;
    }
  ),
  resolve: (payload) => payload.comment
};

// Usage in schema
const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    commentAdded: commentSubscription,
    
    userOnline: {
      type: UserType,
      subscribe: () => pubsub.asyncIterator('USER_ONLINE'),
      resolve: (payload) => payload.user
    },
    
    notificationReceived: {
      type: NotificationType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      subscribe: (parent, { userId }, context) => {
        // Ensure user can only subscribe to their own notifications
        if (context.user.id !== userId) {
          throw new Error('Unauthorized');
        }
        return pubsub.asyncIterator(`NOTIFICATION_${userId}`);
      },
      resolve: (payload) => payload.notification
    }
  }
});
```

### Subscription Lifecycle Management

Utilities and patterns for managing subscription lifecycles.

```javascript { .api }
/**
 * Subscription Manager Interface
 * 
 * Interface for managing subscription lifecycles.
 */
interface SubscriptionManager {
  subscribe(
    operationId: string,
    subscription: AsyncIterable<ExecutionResult>
  ): () => void;
  
  unsubscribe(operationId: string): void;
  unsubscribeAll(): void;
  getActiveSubscriptions(): string[];
}

/**
 * Connection Context
 * 
 * Context for managing WebSocket connections and subscriptions.
 */
interface ConnectionContext {
  connectionId: string;
  user?: any;
  subscriptions: Map<string, AsyncIterator<ExecutionResult>>;
  
  addSubscription(
    operationId: string, 
    subscription: AsyncIterator<ExecutionResult>
  ): void;
  
  removeSubscription(operationId: string): void;
  cleanup(): void;
}
```

### Error Handling in Subscriptions

Patterns for handling errors in subscription streams.

```javascript { .api }
/**
 * Subscription Error Wrapper
 * 
 * Wraps subscription streams with error handling.
 */
async function* withErrorHandling<T>(
  source: AsyncIterable<T>,
  errorHandler: (error: Error) => void = console.error
): AsyncGenerator<T, void, undefined> {
  try {
    for await (const value of source) {
      yield value;
    }
  } catch (error) {
    errorHandler(error);
    // Optionally re-throw or end stream
    throw error;
  }
}

/**
 * Resilient Subscription
 * 
 * Creates a subscription that can recover from errors.
 */
async function* createResilientStream<T>(
  createStream: () => AsyncIterable<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): AsyncGenerator<T, void, undefined> {
  let retries = 0;
  
  while (retries <= maxRetries) {
    try {
      const stream = createStream();
      for await (const value of stream) {
        yield value;
        retries = 0; // Reset retry count on successful yield
      }
      break; // Stream ended normally
    } catch (error) {
      retries++;
      if (retries > maxRetries) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}
```

### Subscription Filtering and Transformation

Utilities for filtering and transforming subscription events.

```javascript { .api }
/**
 * Filter Subscription Events
 * 
 * Filter events based on a predicate function.
 */
async function* filterEvents<T>(
  source: AsyncIterable<T>,
  predicate: (event: T) => boolean | Promise<boolean>
): AsyncGenerator<T, void, undefined> {
  for await (const event of source) {
    if (await predicate(event)) {
      yield event;
    }
  }
}

/**
 * Transform Subscription Events
 * 
 * Transform events using a mapping function.
 */
async function* mapEvents<T, U>(
  source: AsyncIterable<T>,
  mapper: (event: T) => U | Promise<U>
): AsyncGenerator<U, void, undefined> {
  for await (const event of source) {
    yield await mapper(event);
  }
}

/**
 * Debounce Subscription Events
 * 
 * Debounce rapid events to reduce noise.
 */
async function* debounceEvents<T>(
  source: AsyncIterable<T>,
  delay: number
): AsyncGenerator<T, void, undefined> {
  let timeout: NodeJS.Timeout | null = null;
  let lastEvent: T;
  let hasEvent = false;
  
  const eventPromises: Promise<T>[] = [];
  
  (async () => {
    for await (const event of source) {
      lastEvent = event;
      hasEvent = true;
      
      if (timeout) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(() => {
        if (hasEvent) {
          eventPromises.push(Promise.resolve(lastEvent));
          hasEvent = false;
        }
      }, delay);
    }
  })();
  
  for await (const event of eventPromises) {
    yield event;
  }
}
```

**Advanced Subscription Example:**

```javascript
// Real-time chat subscription with filtering and authentication
const chatSubscription = {
  type: MessageType,
  args: {
    roomId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: GraphQLID }
  },
  
  subscribe: async (parent, { roomId, userId }, context) => {
    // Check if user has access to room
    const hasAccess = await checkRoomAccess(context.user.id, roomId);
    if (!hasAccess) {
      throw new Error('Access denied to room');
    }
    
    // Create base event stream
    const messageStream = pubsub.asyncIterator(`ROOM_${roomId}`);
    
    // Apply filtering if userId specified
    if (userId) {
      return filterEvents(
        messageStream,
        (message) => message.userId === userId
      );
    }
    
    return messageStream;
  },
  
  resolve: (payload, args, context) => {
    // Additional authorization check per message
    if (payload.message.isPrivate && payload.message.userId !== context.user.id) {
      return null; // Hide private messages from other users
    }
    
    return payload.message;
  }
};
```

### WebSocket Integration

Common patterns for integrating subscriptions with WebSocket connections.

```javascript { .api }
/**
 * WebSocket Subscription Handler
 * 
 * Example handler for WebSocket-based subscriptions.
 */
interface WebSocketSubscriptionHandler {
  onConnect(connectionParams: any): Promise<any> | any;
  onDisconnect(context: any): void;
  onOperation(
    message: any,
    params: SubscriptionArgs,
    context: any
  ): Promise<AsyncIterator<ExecutionResult> | ExecutionResult>;
  onOperationComplete(context: any, operationId: string): void;
}

/**
 * Subscription Server Configuration
 * 
 * Configuration for subscription servers.
 */
interface SubscriptionServerConfig {
  schema: GraphQLSchema;
  execute?: typeof execute;
  subscribe?: typeof subscribe;
  onConnect?: (connectionParams: any) => any;
  onDisconnect?: (webSocket: any, context: any) => void;
  keepAlive?: number;
}
```

## Type Definitions

```javascript { .api }
// Core subscription types
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

// Subscription field configuration
interface SubscriptionFieldConfig<TSource, TContext, TArgs = any> {
  type: GraphQLOutputType;
  args?: GraphQLFieldConfigArgumentMap;
  subscribe: GraphQLFieldResolver<TSource, TContext, TArgs>;
  resolve?: GraphQLFieldResolver<any, TContext, TArgs>;
  description?: string;
  deprecationReason?: string;
  extensions?: ReadonlyGraphQLFieldExtensions;
  astNode?: FieldDefinitionNode;
}

// Event stream types
type EventStream<T = any> = AsyncIterable<T>;
type EventEmitter<T = any> = {
  subscribe(): EventStream<T>;
  emit(event: T): void;
  close(): void;
};

// Subscription lifecycle types
interface SubscriptionLifecycle {
  onSubscribe?: (args: SubscriptionArgs) => void;
  onNext?: (value: ExecutionResult) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

// Connection management types
interface ConnectionInfo {
  connectionId: string;
  context: any;
  subscriptions: Map<string, AsyncIterator<ExecutionResult>>;
  isAlive: boolean;
  lastPong?: number;
}

// Subscription message types for WebSocket protocol
interface SubscriptionMessage {
  id?: string;
  type: 'start' | 'stop' | 'complete' | 'error' | 'data' | 'ka';
  payload?: any;
}

// Filter and transform function types
type EventFilter<T> = (event: T) => boolean | Promise<boolean>;
type EventMapper<T, U> = (event: T) => U | Promise<U>;
type EventHandler<T> = (event: T) => void | Promise<void>;

// Subscription resolver types
type SubscriptionResolverObject<TPayload, TContext, TArgs = any> = {
  subscribe: (
    source: any,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ) => AsyncIterable<TPayload> | Promise<AsyncIterable<TPayload>>;
  
  resolve?: (
    payload: TPayload,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ) => any;
};

type SubscriptionResolver<TPayload, TContext, TArgs = any> = 
  | SubscriptionResolverObject<TPayload, TContext, TArgs>
  | ((
      source: any,
      args: TArgs,
      context: TContext,
      info: GraphQLResolveInfo
    ) => AsyncIterable<TPayload> | Promise<AsyncIterable<TPayload>>);

// Error handling types
interface SubscriptionError extends Error {
  connectionId?: string;
  operationId?: string;
  phase: 'subscribe' | 'resolve' | 'complete';
}

// Utility types
type Maybe<T> = T | null | undefined;
type AsyncIteratorResult<T> = Promise<IteratorResult<T>>;
```