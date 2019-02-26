# Reservations (WaitOnMe App)

This module books table reservations by date and time.

## Related Projects

- https://github.com/table-for-five/header.git
- https://github.com/table-for-five/photos.git
- https://github.com/table-for-five/menu.git
- https://github.com/table-for-five/overview.git

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> This app places a React application in the global window object under the name 'reservations'.

To get started:

- Install dependencies (see below)
- (Optional) seed database with placeholder reservations:

```sh
npm run mysql-seed
```

- Follow instructions in database/config.example.js to create a new config.js file for the mysql database connection
- In a static index.html page, include the following:
  - Script tag which invokes ReactDOM.render on 'Reservations'
  - Script tag with source http://localhost:3003/bundle.js
  - Link to stylesheet with contents copied from stylesheet in this directory's public folder
  - These links:

```sh
<link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
  integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
  crossorigin="anonymous"
/>
<link
  href="https://fonts.googleapis.com/css?family=Mukta+Mahee"
  rel="stylesheet"
/>
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Nodemon
- Webpack

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install -g nodemon
npm install
```

### Dev Environment

Run server in nodemon to continuously watch for changes. Run webpack to continuously transpile to the server's entrypoint:

```sh
npm run server-dev
npm run build-dev
```

### Testing

This application uses the Jest framework with Enzyme library for testing:

```sh
npm run test
```
