## The openapi-merge repository

This is a fork of https://github.com/robertmassaioli/openapi-merge

Welcome to the openapi-merge repository. This library is intended to be used for merging multiple OpenAPI 3.0 files together. The most common reason that developers want to do this is because they have multiple services that they wish to expose underneath a single API Gateway. Therefore, even though this merging logic is sufficiently generic to be used for most use cases, some of the feature decisions are tailored for that specific use case.

### Screenshots

![Imgur](https://i.imgur.com/GjnSXCS.png)
(An example of creating an openapi-merge.json configuration file for the CLI tool)

### About this repository

This is a multi-package repository that contains:

* **@launchdarkly/openapi-merge**: The core openapi-merge library
* **@launchdarkly/openapi-merge-cli**: The CLI tool for merging OpenAPI files

Both packages are available for installation via Git references (see installation instructions below).

### Installation from Git

To use these packages in your project, you can install them directly from this Git repository:

#### CLI Tool Only
```shell
# Install both packages (CLI depends on core library)
npm install --save-dev \
  "https://github.com/launchdarkly-labs/openapi-merge.git#workspace=@launchdarkly/openapi-merge" \
  "https://github.com/launchdarkly-labs/openapi-merge.git#workspace=@launchdarkly/openapi-merge-cli"
```

#### With Yarn and Resolutions
For Yarn users, add to your `package.json`:

```json
{
  "devDependencies": {
    "@launchdarkly/openapi-merge": "https://github.com/launchdarkly-labs/openapi-merge.git#workspace=@launchdarkly/openapi-merge",
    "@launchdarkly/openapi-merge-cli": "https://github.com/launchdarkly-labs/openapi-merge.git#workspace=@launchdarkly/openapi-merge-cli"
  },
  "resolutions": {
    "@launchdarkly/openapi-merge": "https://github.com/launchdarkly-labs/openapi-merge.git#workspace=@launchdarkly/openapi-merge"
  }
}
```

### Developing on openapi-merge

This project uses **Yarn Berry (v4)** with workspaces to manage the multi-package repository.

#### Prerequisites
- Node.js 18+ 
- Corepack enabled: `corepack enable`

#### Setup
After checking out this repository, install dependencies:

```shell
corepack yarn install
```

#### Development Commands

```shell
# Run the CLI tool
corepack yarn cli

# Build all packages
corepack yarn workspaces foreach --all run build

# Run all tests
corepack yarn test

# Lint all packages
corepack yarn lint

# Build and watch the core library during development
corepack yarn workspace @launchdarkly/openapi-merge run build --watch
```

#### Project Structure
- `/packages/openapi-merge/` - Core merging library
- `/packages/openapi-merge-cli/` - Command-line interface
- Modern tooling: TypeScript 5.9, ESLint 9.0, Jest 29.7

### Tooling

This project uses modern JavaScript tooling:
- **TypeScript 5.9.2** - Type-safe JavaScript
- **ESLint 9.33.0** - Code linting with flat config
- **Jest 29.7.0** - Testing framework with ts-jest
- **Yarn Berry 4.9.3** - Package management with workspaces