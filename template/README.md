# <project name>

This project creates a bundle with the JavaScript and CSS components for the APEX application.

## Prerequisites

- Node.js >= 8 and npm >= 5
- APEX-Nitro >= 5.0.0 installed globally
- SQLcl

## Launch in development mode

```bash
npm run launch
```

In development mode the source code is checked with ESLint and the APEX application is opened with all current changes. Every change of a file in the source folder triggers a rebuild and the APEX application is reloaded once the build has completed with the new changes included.

## Publish with production mode

```bash
npm run publish
```

In production mode all changes in the project are permanently published to APEX. In addition to the development mode, the following build steps are executed in production mode:

- API documentation is generated in the folder "doc" at the root of the project
- All tests created in the folder "tests" are executed

## Static files

Static files such as images, videos or fonts can be placed in the folder "static". All files in this folder will be included during the build process as they are.
