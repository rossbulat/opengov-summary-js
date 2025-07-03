# OpenGov Summary CLI

OpenGov Summary CLI is a CLI tool using Polkassembly and OpenAI APIs to fetch proposal descriptions and provide a summary to users.


## Installation & Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   # Create a .env file in the project root
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

   Or set it as an environment variable:
   ```bash
   export OPENAI_API_KEY=your_openai_api_key_here
   ```

### Required API Keys
The application requires an OpenAI API key for AI summary generation functionality:

1. **Get an OpenAI API Key**:
   - Visit [OpenAI's website](https://openai.com/)
   - Sign up or log in to your account
   - Navigate to the API section
   - Generate a new API key

## Usage

```bash
# Build the project
pnpm build

# Run the CLI
pnpm cli

# Or run specific commands
pnpm cli referendum --ref 123
pnpm cli version
```

## Development

### Available Scripts

- `pnpm build` - Build the TypeScript project using tsup
- `pnpm cli` - Build and run the CLI application
- `pnpm lint` - Run ESLint and Prettier to fix code style issues
- `pnpm test` - Run the test suite once
- `pnpm test:watch` - Run tests in watch mode (re-runs on file changes)
- `pnpm test:ui` - Run tests with Vitest's visual UI interface
- `pnpm test:coverage` - Run tests and generate coverage reports

### Testing

This project uses **Vitest** as the testing framework. Tests are located in the `tests/` directory and mirror the structure of the `src/` directory.

#### Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode (development)
pnpm test:watch

# Run tests with visual UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

#### Test Structure

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test CLI commands and their interactions
- **Mocking**: External APIs (OpenAI) are mocked to ensure reliable testing

#### Coverage Reports

Coverage reports are generated in the `coverage/` directory and include:
- HTML reports (`coverage/index.html`) - Open in browser for detailed view
- JSON data for CI/CD integration
- Text output in terminal

Current test coverage focuses on:
- CLI program initialization and configuration
- Command registration and basic functionality
- Graceful shutdown handling

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [axios](https://www.npmjs.com/package/axios) | ^1.9.0 | HTTP client for API requests to Polkassembly |
| [commander](https://www.npmjs.com/package/commander) | ^14.0.0 | CLI framework for building command-line interfaces |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.0.1 | Load environment variables from .env files |
| [inquirer](https://www.npmjs.com/package/inquirer) | ^12.6.3 | Interactive CLI prompts and user input |
| [openai](https://www.npmjs.com/package/openai) | ^5.8.2 | Official OpenAI API client for AI summaries |
| [zod](https://www.npmjs.com/package/zod) | ^3.25.67 | TypeScript-first schema validation |

### Development Dependencies

#### Build Tools
- **typescript** (^5.8.3) - TypeScript compiler
- **tsup** (^8.5.0) - Fast TypeScript bundler

#### Testing
- **vitest** (^3.2.4) - Fast testing framework with TypeScript support
- **@vitest/ui** (^3.2.4) - Visual testing interface
- **@vitest/coverage-v8** (3.2.4) - Code coverage reporting

#### Code Quality
- **eslint** (^9.27.0) - JavaScript/TypeScript linter
- **prettier** (^3.5.3) - Code formatter
- **typescript-eslint** (^8.32.1) - TypeScript ESLint integration

#### ESLint Plugins
- **@typescript-eslint/eslint-plugin** - TypeScript-specific linting rules
- **eslint-config-prettier** - Disable ESLint rules that conflict with Prettier
- **eslint-plugin-import** - Import/export syntax linting
- **eslint-plugin-prefer-arrow-functions** - Enforce arrow function usage
- **eslint-plugin-unused-imports** - Remove unused imports automatically

## APIs Used

- [Polkassembly](https://documenter.getpostman.com/view/764953/2s93JxqLoH#intro): For fetching referendum data from Polkadot OpenGov
- [OpenAI API](https://platform.openai.com/docs/api-reference): For generating AI-powered summaries of proposals

