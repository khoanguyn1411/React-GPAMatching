# GPA Matching Frontend

## Installation
- Clone project to local repository.
- Run `yarn` to install required dependencies.

## Starting development
- Run `yarn start` to start development server on port 3000.
- Run `yarn build` to build application.

## Linting
- Run `yarn format` to format code with prettier configuration for HTML and CSS files.
- Run `yarn lint` to fix eslint errors.
- Run `yarn fix-all` to format code and fix eslint errors. 

## Using docker
### Prerequisite
Run `yarn docker:permission` to give docker.sh executed permission.
### Commands
- Run `yarn docker run` to start docker (if docker is not running).
- Run `yarn docker start` to pull image and start container.
- Run `yarn docker stop` to stop container.
- Run `yarn docker reset` to re-pull image and re-create container.

## Tech stacks
- Framework: ReactJS.
- Package management: yarn.
- Frontend tooling: Vite.
- State management: Jotai and React query.
- HTTP client library: axios.
- Structure: Three layers application.
- Style: MUI and CSS.

