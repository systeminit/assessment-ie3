# Taskly backend

This is the backend for Taskly. It's a [node.js](http://nodejs.org)
application, using the [Koa](https://koajs.com/) web framework. It is written
in [Typescript](https://www.typescriptlang.org/). It uses [yup](https://github.com/jquense/yup) for data validation.

It exposes a REST API that allows for creating users and tracking the tasks
they create.

It stores all of its data *in memory*, which means when the server restarts,
any information it stores will be gone. 

## Changes to the backend

If you need to make changes to the backend, please make sure that:

  * Your code passes the `lint` checks.
  * Your code is formatted correctly.
  * Your code has tests.
  * The test suite passes.

## Setup

Before you can run the backend, you need to install it's node modules:

```
$ npm install
```

## Development

To run the API for development, we recommend you run it in `dev` mode. This
will restart the server automatically when you make changes to the 
source. (Remember that means all the data will be destroyed, so make sure you
log out of the frontend after you make changes, or risk being out of sync.)

```
$ npm run dev
```

To run the service without restarting it automatically, you can use:

```
$ npm run start
```

## Tests

We use [jest](https://jestjs.io/) for testing the backend. To run the test
suite:

```
$ npm run test
```

You can also run the tests in watch mode, if you are iterating on tests:

```
$ npm run test:watch
```

## Linting

We use [eslint](https://eslint.org/) to help us find problems with the code. 
You can run the linter by:

```
$ npm run lint
```

You can also automatically fix some lint errors with:

```
$ npm run lint:fix
```

## Type Checking

You can make sure that the code has valid types:

```
$ npm run type-check
```

## Formatting

You can make sure your code complies with our formatting standards
with:

```
$ npm run format
```

## API

### POST /api/users

Create a new user.

#### Sample Request

```
{
  name: "bobo"
}
```

#### Sample Response

```
{
  "id": "f62eab5e-b0f5-47de-b60b-b3cd13d883ed",
  "name": "bobo"
} 
```

### GET /api/users

Returns a list of users.

#### Sample Response

```
[
  {
      "id": "60311e62-c621-493a-a17b-de2c0bf12967",
      "name": "adam"
  },
  {
      "id": "f62eab5e-b0f5-47de-b60b-b3cd13d883ed",
      "name": "bobo"
  } 
]
```

### POST /api/tasks

Create a new task for a user.

#### Sample Request

```
{
  "userId":"f62eab5e-b0f5-47de-b60b-b3cd13d883ed",
  "task":"first task"
}
```

#### Sample Response

```
{
  "id":"2bcb8b88-e7b1-4381-ac2c-d4486b1502ff",
  "userId":"f62eab5e-b0f5-47de-b60b-b3cd13d883ed",
  "task":"first task"
}
```

### GET /api/tasks/:userId

Get the lists of tasks for a given user.

#### Sample Response

```
[
  {
    "id":"2bcb8b88-e7b1-4381-ac2c-d4486b1502ff",
    "userId":"f62eab5e-b0f5-47de-b60b-b3cd13d883ed",
    "task":"first task"
  },
  {
    "id":"4d911f5b-855c-490e-b2d5-ceecfc23ea09",
    "userId":"f62eab5e-b0f5-47de-b60b-b3cd13d883ed",
    "task":"super fun"
  },
  {
    "id":"bbc0d640-6f86-4b6b-8e71-5ec21d8d4de0",
    "userId":"f62eab5e-b0f5-47de-b60b-b3cd13d883ed",
    "task":"what a list"
  }
]
```
