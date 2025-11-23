# AGENTS.md - AI Agent Development Guidelines

**Table of Contents**
- [Project Overview](#project-overview)
- [Code Style and Formatting](#code-style-and-formatting)
- [Architecture and Design Patterns](#architecture-and-design-patterns)
- [Code Quality Standards](#code-quality-standards)
- [Git and Version Control](#git-and-version-control)
- [API and Interface Guidelines](#api-and-interface-guidelines)
- [Database and Data Management](#database-and-data-management)
- [Performance and Optimization](#performance-and-optimization)
- [AI Agent-Specific Instructions](#ai-agent-specific-instructions)
- [Common Pitfalls and Anti-patterns](#common-pitfalls-and-anti-patterns)
- [Auto-Detected Configuration Summary](#auto-detected-configuration-summary)

---

## Project Overview

### Description
Wallet is a personal finance management application built with a modern full-stack architecture. The application enables users to track expenses, manage budgets, set financial goals, and monitor income across multiple accounts.

### Technology Stack

**Frontend (Client)**
- **Framework**: React 18.2.0 with TypeScript 5.2.2
- **Build Tool**: Vite 5.4.21
- **UI Library**: Radix UI (@radix-ui/themes 2.0.3)
- **State Management**: TanStack Query 5.15.0 (React Query)
- **GraphQL**: gql.tada 1.8.10 with graphql-request 5.2.0
- **Routing**: React Router DOM 6.11.2
- **Internationalization**: i18next 23.8.0 with react-i18next 14.0.1

**Backend (API)**
- **Runtime**: Node.js 18
- **Framework**: Express 4.20.0
- **GraphQL**: Type-GraphQL 1.1.1 with graphql-http 1.22.0
- **Database**: SQLite (via Prisma)
- **ORM**: Prisma 5.7.1 with typegraphql-prisma 0.27.1
- **Authentication**: express-session 1.18.0 with bcrypt 5.1.1
- **Security**: helmet 7.1.0, cors 2.8.5
- **Logging**: Winston 3.11.0

**Monorepo Management**
- **Build System**: Nx 17.1.3
- **Package Manager**: pnpm 8
- **Shared Libraries**: 
  - `@wallet/common` - Shared utilities, GraphQL client, i18n
  - `@wallet/ui` - Reusable UI components
  - `@wallet/shared-gql` - Shared GraphQL types

### Development Environment Requirements

**Prerequisites**
- Node.js 18.14.2 or higher
- pnpm 8.x
- SQLite (for local development)

**Environment Variables**
- `DATABASE_URL` - SQLite database connection string (default: file:./dev.db)
- `HOST` - API server host (default: localhost)
- `PORT` - API server port (default: 4000)
- `NODE_ENV` - Environment mode (development/production)

**Setup Commands**
```bash
# Install dependencies
pnpm install

# Generate Prisma client and TypeGraphQL types
pnpm run db:generate

# Run database migrations
pnpm run db:migrate

# Start development servers (client + API)
pnpm run dev

# Or start individually
nx serve client  # Frontend on http://localhost:4200
nx serve api     # Backend on http://localhost:4000
```

---

## Code Style and Formatting

### Prettier Configuration
The project uses Prettier 2.6.2 for code formatting with the following rules:

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "bracketSpacing": false,
  "arrowParens": "avoid",
  "printWidth": 80
}
```

### EditorConfig Settings
```ini
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

### Naming Conventions

**Files and Directories**
- React components: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Utilities/helpers: camelCase (e.g., `logger.ts`, `client.ts`)
- Test files: `*.spec.tsx` or `*.spec.ts`
- Type definitions: `*.d.ts`
- Configuration files: kebab-case or standard names

**Code Naming**
- **Variables**: camelCase
  ```typescript
  const userName = 'John'
  const isAuthenticated = true
  ```

- **Functions**: camelCase
  ```typescript
  const getUserById = (id: number) => {...}
  async function registerUser() {...}
  ```

- **Classes**: PascalCase
  ```typescript
  class UserService {...}
  class CustomCreateOneUserResolver {...}
  ```

- **Interfaces/Types**: PascalCase with 'T' prefix for types
  ```typescript
  interface UserData {...}
  type TSignupFormData = {...}
  ```

- **Constants**: UPPER_SNAKE_CASE or camelCase
  ```typescript
  const API_URL = 'http://localhost:4000'
  const levels = { error: 0, warn: 1 }
  ```

- **GraphQL Resolvers**: PascalCase ending with 'Resolver'
  ```typescript
  class CustomCreateOneUserResolver {...}
  ```

- **React Hooks**: camelCase starting with 'use'
  ```typescript
  const useUserQuery = () => {...}
  const useRegisterUserMutation = () => {...}
  ```

### TypeScript Guidelines

**Do's ✅**
```typescript
// Use explicit types for function parameters
async function registerUser(data: UserRegisterInput): Promise<User> {...}

// Use type imports when importing only types
import type {ButtonProps} from '@radix-ui/themes'

// Use path aliases defined in tsconfig
import {graphql} from '@wallet/common'

// Use decorators for Type-GraphQL
@Resolver()
class CustomResolver {...}
```

**Don'ts ❌**
```typescript
// Don't use 'any' - use proper typing
const data: any = {...} // ❌

// Don't use default exports for named entities (prefer named exports)
// Exception: React components can use default exports
```

### Import Organization
```typescript
// 1. External dependencies
import express from 'express'
import {createHandler} from 'graphql-http/lib/use/express'

// 2. Internal workspace packages
import {graphql, client} from '@wallet/common'

// 3. Relative imports
import Logger from './libs/logger'
import {sessionRequestHandler} from './middlewares/session'

// 4. Type imports (if separate)
import type {Context} from './context'
```

---

## Architecture and Design Patterns

### Project Structure

```
wallet/
├── apps/
│   ├── api/              # Backend GraphQL API
│   │   ├── src/
│   │   │   ├── graphql/  # GraphQL schema, resolvers, context
│   │   │   ├── middlewares/  # Express middlewares
│   │   │   ├── libs/     # Utility libraries (logger, error)
│   │   │   ├── data/     # Configuration and constants
│   │   │   ├── db.ts     # Prisma client singleton
│   │   │   └── main.ts   # Application entry point
│   │   └── project.json
│   └── client/           # Frontend React app
│       ├── src/
│       │   ├── app/      # Main app component
│       │   ├── components/  # Page-specific components
│       │   ├── graphql/  # GraphQL queries/mutations
│       │   ├── routes/   # Route configurations
│       │   ├── types/    # TypeScript types
│       │   └── main.tsx  # Application entry point
│       └── project.json
├── libs/
│   ├── common/           # Shared utilities
│   │   ├── config/       # Environment config
│   │   ├── hooks/        # React hooks
│   │   ├── libs/         # GraphQL client, i18n
│   │   └── styles/       # Global CSS
│   └── ui/               # Shared UI components
│       └── components/   # Reusable React components
├── prisma/
│   ├── migrations/       # Database migrations
│   └── schema.prisma     # Database schema
└── schema.gql            # Generated GraphQL schema
```

### Design Patterns

**Backend Patterns**

1. **Singleton Pattern** (Prisma Client)
```typescript
// db.ts - Single instance of Prisma client
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export {prisma}
```

2. **Middleware Pattern** (Express)
```typescript
// Chainable middleware for cross-cutting concerns
app.use(cors({...}))
app.use(helmet())
app.use(sessionRequestHandler)
app.use(loggerRequestHandler)
```

3. **Resolver Pattern** (Type-GraphQL)
```typescript
@Resolver()
class CustomCreateOneUserResolver {
  @Mutation(() => User)
  async registerUserSession(@Arg("data") data: UserRegisterInput) {...}
}
```

4. **Dependency Injection** (GraphQL Context)
```typescript
// Context provides dependencies to all resolvers
createHandler({
  schema,
  context: req => ({
    session: req.raw.session,
    prisma
  })
})
```

**Frontend Patterns**

1. **Custom Hooks Pattern** (Data Fetching)
```typescript
const useUserQuery = (variables: {id: number}) => {
  const UserQuery = graphql(`query GetUser($where: UserWhereUniqueInput!) {...}`)
  return useQuery({
    queryKey: ['user', UserQuery, variables],
    queryFn: async () => await client(UserQuery, [variables])
  })
}
```

2. **Component Composition** (Radix UI Wrapper)
```typescript
// Wrap and extend third-party components
export default (props: ButtonProps) => {
  return <Button style={{textTransform: 'uppercase'}} {...props} />
}
```

3. **Provider Pattern** (Context Providers)
```typescript
// main.tsx - Nest providers for global state
<QueryClientProvider client={client}>
  <Theme>
    <App />
  </Theme>
</QueryClientProvider>
```

### Module Boundaries

**Dependency Rules** (enforced by Nx)
- Apps can depend on libs
- Libs can depend on other libs
- Circular dependencies are forbidden
- Shared code goes in libs, app-specific code stays in apps

**Library Purposes**
- `@wallet/common` - Cross-cutting concerns (GraphQL client, i18n, env config)
- `@wallet/ui` - Presentational components (no business logic)
- `@wallet/shared-gql` - GraphQL type definitions shared between client and server

---

## Code Quality Standards

### Testing Framework

**Frontend Testing**
- **Framework**: Vitest 0.34.6
- **Testing Library**: @testing-library/react 14.0.0
- **Coverage**: @vitest/coverage-v8 0.34.6

**Test Structure**
```typescript
import {render} from '@testing-library/react'
import {Accordion} from '.'

describe('Accordion', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<Accordion />)
    expect(baseElement).toBeTruthy()
  })
})
```

**Backend Testing**
- **Framework**: Jest 29.4.1
- **Environment**: jest-environment-node 29.4.1

### Test Requirements

**When to Write Tests**
- All new UI components in `libs/ui`
- Custom hooks for data fetching
- Utility functions with complex logic
- Critical business logic resolvers

**Test Naming Convention**
```typescript
describe('ComponentName or FunctionName', () => {
  it('should describe expected behavior', () => {...})
})
```

### Code Coverage

**CI Configuration** (from nx.json)
```json
{
  "configurations": {
    "ci": {
      "ci": true,
      "codeCoverage": true
    }
  }
}
```

Run tests with coverage:
```bash
nx affected -t test --configuration=ci
```

### Linting

**ESLint Configuration**
- **Version**: 8.46.0
- **Plugins**: 
  - @nx/eslint-plugin
  - @typescript-eslint/eslint-plugin 6.9.1
  - @tanstack/eslint-plugin-query 5.14.6
  - eslint-plugin-react 7.32.2
  - eslint-plugin-react-hooks 4.6.0
  - eslint-plugin-jsx-a11y 6.7.1
  - eslint-config-prettier 9.0.0

**Running Linters**
```bash
# Lint all projects
pnpm run lint

# Lint only affected projects
pnpm run lint:pr
nx affected -t lint
```

**Nx Module Boundary Enforcement**
```json
{
  "rules": {
    "@nx/enforce-module-boundaries": ["error", {
      "enforceBuildableLibDependency": true
    }]
  }
}
```

### Error Handling

**Backend Error Patterns**
```typescript
// Use Winston logger for errors
Logger.error("Error message")

// Throw appropriate GraphQL errors
throw new UnauthorizedError()

// Centralized error handler
process.on("uncaughtException", (error: Error) => {
  errorHandler.handleError(error)
})
```

**Frontend Error Patterns**
```typescript
// Handle errors in mutations/queries
const {mutate, error} = useMutation({...})

if (error) {
  // Display user-friendly error message
}
```

### Logging Standards

**Backend Logging Levels**
```typescript
Logger.error()  // Critical errors requiring immediate attention
Logger.warn()   // Warning conditions
Logger.info()   // Informational messages
Logger.http()   // HTTP request logging
Logger.debug()  // Detailed debug information
```

**Environment-Based Logging**
- Development: Show all levels (debug and above)
- Production: Show warnings and errors only

**Log Output**
- Console: All log levels (colored)
- `logs/error.log`: Error level only
- `logs/all.log`: All levels

---

## Git and Version Control

### Branch Naming

**Primary Branches**
- `main` - Production-ready code
- `development` - Integration branch for features

**Feature Branches**
- Format: `feature/description` or `copilot/description`
- Example: `feature/add-expense-tracking`

### Commit Message Format

**Convention**: Conventional Commits (@commitlint/config-conventional)

**Format**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD configuration changes

**Examples**
```bash
feat(auth): add user registration endpoint

fix(budget): correct calculation for monthly budget

docs(readme): update installation instructions

ci: add permissions for GitHub Actions workflow
```

### Pull Request Requirements

**CI Checks** (from .github/workflows/ci.yml)
1. Install dependencies with pnpm
2. Generate Prisma client (`pnpm run db:generate`)
3. Format code (`nx format:write`)
4. Run affected linting (`nx affected -t lint`)
5. Run affected tests (`nx affected -t test`)
6. Run affected builds (`nx affected -t build`)

**PR Process**
- Target branch: `main` or `development`
- Ensure all CI checks pass
- Code must be formatted with Prettier
- All affected tests must pass
- No linting errors

### Pre-commit Hooks

**Husky Configuration**
- Location: `.husky/`
- Commit message validation with commitlint
- Automatic code formatting (prepare script)

---

## API and Interface Guidelines

### GraphQL API Conventions

**Schema Location**
- Defined using Type-GraphQL decorators in resolvers
- Generated schema: `schema.gql` (auto-generated, don't edit manually)

**Resolver Structure**
```typescript
@Resolver()
class CustomResolverName {
  @Query(() => ReturnType, {nullable: false})
  async queryName(
    @Arg("argName") argName: ArgType,
    @Ctx() {prisma, session}: Context
  ): Promise<ReturnType> {
    // Implementation
  }

  @Mutation(() => ReturnType, {nullable: false})
  async mutationName(
    @Arg("data") data: InputType,
    @Ctx() {prisma, session}: Context
  ): Promise<ReturnType> {
    // Implementation
  }
}
```

**Input Types**
```typescript
@InputType({
  description: "Description of input model"
})
class UserRegisterInput {
  @Field(() => String, {
    nullable: false,
    description: "Field description"
  })
  email!: string
}
```

**Authentication Pattern**
```typescript
// Use custom auth checker with Type-GraphQL
const customAuthChecker: AuthChecker<Context> = async ({context}) => {
  return context.session.user != null
}

// Apply to protected resolvers
@Authorized()
@Query(() => User)
async me(@Ctx() {session, prisma}: Context) {...}
```

### Frontend GraphQL Usage

**Type-Safe Queries with gql.tada**
```typescript
const UserQuery = graphql(`
  query GetUser($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      name
      accounts {
        id
        name
      }
    }
  }
`)
```

**React Query Integration**
```typescript
const useUserQuery = (variables: {id: number}) => {
  return useQuery({
    queryKey: ['user', UserQuery, variables],
    queryFn: async () => await client(UserQuery, [variables])
  })
}
```

### API Endpoint Structure

**Base URL**
- Development: `http://localhost:4000/graphql`
- Production: TBD

**CORS Configuration**
```typescript
cors({
  origin: 'http://localhost:4200',
  credentials: true
})
```

---

## Database and Data Management

### Prisma ORM

**Schema Location**: `prisma/schema.prisma`

**Generators**
```prisma
generator client {
  provider = "prisma-client-js"
}

generator typegraphql {
  provider = "typegraphql-prisma"
  simpleResolvers = true
}
```

**Database Provider**: SQLite (development)

### Schema Conventions

**Model Naming**
- Singular, PascalCase (e.g., `User`, `Account`, `Expense`)

**Field Naming**
- camelCase (e.g., `createdAt`, `userId`, `creditDate`)

**Standard Fields**
```prisma
model Example {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
}
```

**Relationships**
```prisma
model User {
  id       Int       @id @default(autoincrement())
  accounts Account[]  // One-to-many
  password Password?  // One-to-one (optional)
}

model Account {
  id     Int  @id @default(autoincrement())
  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

### Migration Strategies

**Create Migration**
```bash
pnpm run db:migrate
# This runs: prisma migrate dev
```

**Reset Database** (development only)
```bash
pnpm run db:reset
# This runs: prisma db push --force-reset
```

**Generate Client**
```bash
pnpm run db:generate
# This runs: prisma generate
```

**Migration Best Practices**
- Always create named migrations with descriptive names
- Test migrations locally before committing
- Never modify existing migrations
- Use `prisma db push` for prototyping, `prisma migrate` for production

### Data Validation

**Prisma-Level Validation**
```prisma
model User {
  email String @unique  // Enforces uniqueness
  name  String          // Required by default
}
```

**Application-Level Validation**
- Use `class-validator` decorators in GraphQL input types
- Use `zod` for runtime validation where needed

### Querying Patterns

**Using Prisma Client**
```typescript
// Simple query
const user = await prisma.user.findUnique({where: {id}})

// With relations
const user = await prisma.user.findUnique({
  where: {id},
  include: {accounts: true, password: true}
})

// Create with nested relations
const user = await prisma.user.create({
  data: {
    name,
    email,
    password: {create: {hash}}
  }
})
```

---

## Performance and Optimization

### Caching Strategy

**Nx Build Cache**
- Enabled for build, lint, test, and e2e targets
- Configuration in `nx.json` under `targetDefaults`

**Frontend Query Caching**
- TanStack Query handles automatic caching
- Query keys: `['entityName', query, variables]`

**Build Optimization**
```json
{
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    }
  }
}
```

### Query Optimization

**N+1 Query Prevention**
- Use Prisma's `include` or `select` for eager loading
- Use `graphql-fields` to request only needed fields

```typescript
// Good - Single query with relations
const users = await prisma.user.findMany({
  include: {accounts: true}
})

// Avoid - N+1 queries
const users = await prisma.user.findMany()
for (const user of users) {
  const accounts = await prisma.account.findMany({where: {userId: user.id}})
}
```

### Resource Limits

**Nx Parallel Execution**
```bash
nx affected -t lint,test,build --parallel=3
```

**Development Server Ports**
- Client: 4200
- API: 4000

### Monitoring and Profiling

**Logging Infrastructure**
- Winston logger with file output
- HTTP request logging with Morgan
- Session debugging in development

**Error Tracking**
- Centralized error handler in API
- Uncaught exception and unhandled rejection handlers

---

## AI Agent-Specific Instructions

### Approaching Ambiguous Requirements

**When Requirements Are Unclear**
1. Review existing similar implementations in the codebase
2. Check `docs/domains.md` for domain-specific context
3. Look at Prisma schema for data model relationships
4. Examine existing GraphQL resolvers for patterns
5. If still unclear, ask for clarification rather than guessing

**Making Reasonable Assumptions**
- Follow established patterns in similar features
- Maintain consistency with existing code style
- Prefer TypeScript-first solutions
- Use existing libraries before adding new dependencies

### Legacy Code vs New Implementations

**When Encountering Legacy Code**
- Don't refactor unless directly related to your task
- Maintain backward compatibility
- Add type safety incrementally
- Document any workarounds with comments

**For New Implementations**
- Use latest TypeScript features (5.2.2)
- Prefer functional components over class components
- Use Type-GraphQL decorators for schema
- Implement proper error handling from the start

### Refactoring vs New Features

**Prioritization**
1. New features take priority unless refactoring blocks implementation
2. Small refactorings that improve immediate code are acceptable
3. Large refactorings require separate tasks
4. Always maintain test coverage during refactoring

**Safe Refactoring Practices**
- Run tests before and after refactoring
- Use TypeScript's type system to catch breaking changes
- Leverage Nx affected commands to test impact
- Keep refactoring commits separate from feature commits

### Testing Requirements Before Completion

**Checklist Before Marking Work Complete**
- [ ] Code follows project style guide (Prettier + ESLint)
- [ ] TypeScript types are properly defined (no `any`)
- [ ] Tests are written for new functionality
- [ ] All tests pass (`nx affected -t test`)
- [ ] Linting passes (`nx affected -t lint`)
- [ ] Build succeeds (`nx affected -t build`)
- [ ] Prisma schema is generated if models changed
- [ ] GraphQL schema is valid (server starts)
- [ ] Manual testing performed for UI changes
- [ ] No console errors in browser/server
- [ ] Changes are committed with proper commit message format

---

## Common Pitfalls and Anti-patterns

### Database Pitfalls

**❌ Don't: Forget to generate Prisma client after schema changes**
```bash
# After editing prisma/schema.prisma, always run:
pnpm run db:generate
```

**❌ Don't: Use raw SQL queries**
```typescript
// Avoid
await prisma.$executeRaw`SELECT * FROM User`

// Prefer
await prisma.user.findMany()
```

**❌ Don't: Expose password hashes in GraphQL**
```prisma
// Use separate Password model, not on User
model User {
  id       Int       @id
  password Password?  // Relation, not direct hash
}
```

### GraphQL Pitfalls

**❌ Don't: Return sensitive data in queries**
```typescript
// Bad
@Query(() => User)
async user(@Arg("id") id: number) {
  return prisma.user.findUnique({
    where: {id},
    include: {password: true}  // ❌ Exposes password hash
  })
}

// Good
@Query(() => User)
async user(@Arg("id") id: number) {
  return prisma.user.findUnique({where: {id}})  // ✅ No password
}
```

**❌ Don't: Skip input validation**
```typescript
// Add validation to input types
@InputType()
class UserRegisterInput {
  @Field(() => String)
  @IsEmail()  // Use class-validator decorators
  email!: string
}
```

### Frontend Pitfalls

**❌ Don't: Make direct fetch calls**
```typescript
// Bad
const response = await fetch('/graphql', {...})

// Good - Use the GraphQL client
const data = await client(UserQuery, variables)
```

**❌ Don't: Forget to handle loading and error states**
```typescript
// Complete pattern
const {data, isLoading, error} = useUserQuery({id})

if (isLoading) return <div>Loading...</div>
if (error) return <div>Error: {error.message}</div>
return <div>{data.user.name}</div>
```

### Session Management

**❌ Don't: Forget to save session after modification**
```typescript
// Always save session after changes
session.user = user.id
session.save((err) => {
  if (err) throw new UnauthorizedError()
})
```

### TypeScript Pitfalls

**❌ Don't: Use implicit any**
```typescript
// Bad - Parameters need types
function process(data) {...}  // ❌

// Good
function process(data: UserData) {...}  // ✅
```

**❌ Don't: Ignore TypeScript errors**
```typescript
// Bad
// @ts-ignore
const result = riskyOperation()  // ❌

// Good - Fix the root cause or use proper type assertion
const result = riskyOperation() as ExpectedType  // ✅
```

### Build and Dependency Issues

**❌ Don't: Install dependencies with npm or yarn**
```bash
# Wrong
npm install package-name  # ❌
yarn add package-name     # ❌

# Correct
pnpm add package-name     # ✅
```

**❌ Don't: Import from dist or node_modules directly**
```typescript
// Bad
import {Button} from '../../dist/libs/ui'  // ❌

// Good - Use path aliases
import {Button} from '@wallet/ui'  // ✅
```

### Known Technical Debt Areas

1. **Session Storage** - Currently using in-memory sessions (not production-ready)
2. **Database** - SQLite is for development; production needs PostgreSQL/MySQL
3. **Error Messages** - Some error messages are too technical for end users
4. **Type Safety** - Some generated GraphQL types need manual refinement
5. **Test Coverage** - Frontend tests are minimal, need expansion

---

## Auto-Detected Configuration Summary

| Category | Details |
|----------|---------|
| **Languages** | TypeScript 5.2.2, JavaScript (ES2022) |
| **Frontend Framework** | React 18.2.0 |
| **Backend Framework** | Express 4.20.0, Type-GraphQL 1.1.1 |
| **Build System** | Nx 17.1.3 |
| **Build Tools** | Vite 5.4.21 (frontend), esbuild 0.19.12 (backend) |
| **Package Manager** | pnpm 8.x |
| **Testing Frameworks** | Vitest 0.34.6 (frontend), Jest 29.4.1 (backend) |
| **E2E Testing** | Playwright 1.36.0, Cypress 13.0.0 |
| **Linting** | ESLint 8.46.0 with TypeScript, React, TanStack Query plugins |
| **Formatting** | Prettier 2.6.2 |
| **Database** | SQLite (via Prisma 5.7.1) |
| **ORM** | Prisma Client + TypeGraphQL-Prisma |
| **GraphQL Client** | gql.tada 1.8.10, graphql-request 5.2.0 |
| **State Management** | TanStack Query 5.15.0 |
| **UI Library** | Radix UI 2.0.3 |
| **Logging** | Winston 3.11.0 |
| **Security** | Helmet 7.1.0, bcrypt 5.1.1, CORS 2.8.5 |
| **Session Management** | express-session 1.18.0 |
| **Internationalization** | i18next 23.8.0, react-i18next 14.0.1 |
| **CI/CD** | GitHub Actions (Node 18, pnpm cache) |
| **Git Hooks** | Husky 8.0.0 |
| **Commit Linting** | @commitlint/config-conventional 18.4.3 |
| **Node Version** | 18.14.2+ |

---

## Quick Reference Commands

```bash
# Development
pnpm run dev                    # Start all apps
nx serve client                 # Start frontend only
nx serve api                    # Start backend only

# Building
pnpm run build                  # Build all apps
nx build client                 # Build frontend
nx build api                    # Build backend

# Testing
pnpm run test                   # Test all
pnpm run test:pr                # Test affected only
nx test client                  # Test client

# Linting
pnpm run lint                   # Lint all
pnpm run lint:pr                # Lint affected only
nx lint api                     # Lint API

# Database
pnpm run db:generate            # Generate Prisma client
pnpm run db:migrate             # Run migrations
pnpm run db:reset               # Reset database (dev only)
pnpm run db:studio              # Open Prisma Studio

# Nx Utilities
nx graph                        # View project graph
nx affected:graph               # View affected projects
nx list                         # List available plugins
nx format:write                 # Format all files
```

---

## Additional Resources

- **Nx Documentation**: https://nx.dev
- **Prisma Documentation**: https://www.prisma.io/docs
- **Type-GraphQL Documentation**: https://typegraphql.com
- **TanStack Query Documentation**: https://tanstack.com/query
- **Radix UI Documentation**: https://www.radix-ui.com/themes/docs
- **React Router Documentation**: https://reactrouter.com

---

**Last Updated**: Auto-generated from project analysis
**Project Version**: 0.0.0
**Nx Version**: 17.1.3
