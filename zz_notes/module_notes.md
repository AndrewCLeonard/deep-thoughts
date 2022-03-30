# Module 21: MERN

## Introduction to Module 21

-   back-end: Node.js & Express.js API with MongoDB
-   front-end: React
-   React Router:
    -   make app behave like a multi-page application
    -   allow users to bookmark URLs
    -   use browser's fwd & back buttons
-   GraphQL: open-source data query and manipulation language for APIs. Only fetch data you want from db when needed, nothing more
-   JSON Web Tokens (JWT):
    -   authentication in a single string,
    -   no need to save session IDs on back end,
    -   fewer server-side resources
    -   can be generated anywhere

### 21.0.1 Introduction to Module 21

### 21.0.4 Roadmap

#### Challenge

_integrate a GraphQL API into a fully functioning book search engine that was built using the MERN stack, replacing the RESTful API that's already in place._

### Skills

-   Create an Apollo Server and apply it to an Express.js server as middleware.
-   Modify the existing authentication middleware to work in the context of a GraphQL API.
-   Create an Apollo Provider so that requests can communicate with an Apollo server.
-   Build API endpoints with GraphQL in a MERN application.
-   Use GraphQL queries and mutations to fetch and modify server-side data.
-   Successfully configure and deploy a MERN application to Heroku.

### Learn

-   Explain the difference between GraphQL and RESTful APIs.
-   Configure a proxy server for local development of a MERN application.
-   Implement client-side routing using React Router.
-   Build API endpoints with GraphQL in a MERN application.
-   Successfully configure and deploy a MERN application to Heroku.
-   Implement authentication with JWT.

### 21.0.6 Getting Ready for Class

### 21.0.8 Up and Running

### Tools Used

| Tool                         | Description                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GraphQL                      | is a query language for APIs and a runtime for fulfilling queries with your existing data, giving clients the power to ask for exactly what they need and nothing more. For this module’s application, you’ll use the graphql package to parse GraphQL syntax in both your front-end and back-end codebase.                                                       |
| Apollo Server                | is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client, the client you’ll use in your MERN application. You’ll use the apollo-server-express package to integrate GraphQL into your Express.js server, and the @apollo/client package to make requests from your React front end to the GraphQL API. |
| React Router                 | is a collection of navigational components that compose declaratively with your application, allowing you to make your single-page React applications behave more like multi-page applications. You’ll use the react-router-dom npm package to work with React Router in your applications.                                                                       |
| The concurrently npm package | allows you to run multiple processes, or servers, from a single command-line interface. Rather than opening multiple terminals to start the multiple servers, you can run them both at the same time. It also allows you to keep track of different outputs in one place, and will stop all of your processes if even one of them fails.                          |
| JSON Web Tokens, or JWTs,    | are an alternative to using session cookies for authentication. You’ll use the jsonwebtoken package in your MERN applications.                                                                                                                                                                                                                                    |
| jwt-decode                   | is an npm package that helps decode JWTs from their Base64Url encoding. You’ll use it to extract non-sensitive data such as the token’s expiration date to see if it’s expired before making a request to the server.                                                                                                                                             |
| The faker npm package        | allows you to generate massive amounts of fake data in the development environment of your Node.js applications.                                                                                                                                                                                                                                                  |
| The nodemon package          | simplifies your development environment by automatically restarting your Node.js applications when file changes in the directory are detected.                                                                                                                                                                                                                    |

## Lesson 1: Set Up Apollo Server

### 21.1.1: Introduction

** GraphQL** = alternative to RESTful API design patterns

#### Lesson 1 Goals

-   Integrated the Apollo Server GraphQL library to handle data requests to our API.
-   Built both query type definitions and resolvers for retrieving data from our MongoDB database.
-   Used the GraphQL Playground interface to thoroughly test our GraphQL queries.

### 21.1.2: Preview

integrated a Node.js-specific GraphQL library called Apollo Server to query all of data from our database using a single API endpoint. This will allow us to query multiple resources of data with a single HTTP request and test our API using a built-in tool called GraphQL Playground, as this image shows:

#### the Plan

1. Set up the project.
1. Create the thought type definition and resolver.
1. Install Apollo Server.
1. Integrate into the front end.

_We’re tackling a completely new concept and library for this module, so we should get acclimated before incorporating too many moving parts._
_We actually need to install Apollo Server before we can test anything with the type definitions and resolvers._
_we still have more work to do on the server side before we should think about the front end._

### 21.1.3: Set Up the Project

#### GitHub Issues

| Issue            | Description                                                                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title:**       | Set up GraphQL queries                                                                                                                                                                                                    |
| **User Stories** | <ul><li> As a user, I can retrieve data about users, their thoughts, reactions, and friends from the server </li>                                                                                                         |
| **Title:**       | Set up mutations and JWT logic                                                                                                                                                                                            |
| **User Stories** | <ul><li> As a user, I can create my own account and login </li> <li>As a logged in user, I can create thoughts, react to thoughts, and add friends </li>                                                                  |
| **Title:**       | Implement client-side GraphQL query for homepage data                                                                                                                                                                     |
| **User Stories** | <ul><li> As a user, I can see every user's thoughts listed on the homepage of the application </li>                                                                                                                       |
| **Title:**       | Implement GraphQL queries and navigation for other pages                                                                                                                                                                  |
| **User Stories** | <ul><li> As a user, I can navigate directly to a user's profile page with their thoughts and friends list </li> <li>As a user, I can navigate directly to a single thought's page to view reactions to that thought </li> |
| **Title:**       | Client-side login/sign up                                                                                                                                                                                                 |
| **User Stories** | <ul><li> As a user, I can create an account and login to the application through the front end </li>                                                                                                                      |
| **Title:**       | Implement user-based mutations                                                                                                                                                                                            |
| **User Stories** | <ul><li> As a user, I can create a thought, create a reaction to a thought, and add a friend through the front end of the application </li>                                                                               |

#### Organize and Examine the Project Files

2 servers needed:

1. back-end to host db and API
2. separate server for React development. We need to use webpack to transpile our JSX and components into browser-ready code. Create React App sets this up for us.

-   Mongoose used for all of its MongoDB data handling

##### File Structure and Purpose

| file name              | purpose                                                                                                                                                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config/connection.js` | handling connection, exporting `mongoose.connection` object                                                                                                                                                                                                                       |
| `server.js`            | <ul> <li>imports `mongoose.connection` connection</li><li>when server runs, listens for that connection to be made with db.open</li></ul>                                                                                                                                         |
| `/models`              | 3 schemas, but only 2 models needed                                                                                                                                                                                                                                               |
| `/models/User.js`      | <ul><li>password hashing using `bcrypt`</li><li>Mongoose has **middleware** to capture data before getting to/coming from the db and manipulating it. We check to see if data is new or password has been modified</li><li>`match` option in `email` field uses regex. </li></ul> |
| `/seeders`             | <ul><li>Mongoose seeds differently.</li><li>Faker.js library generates dummy data</li></ul>                                                                                                                                                                                       |

#### Seed the Database

-   order of operations in `seed.js` important: need user data before thought, reaction, or friend data.

#### Questions

-   I don't remember how to use `async await`

### 21.1.4: Install Apollo Server

-   A user can sign up and log in to the application.
-   A user can post their thoughts and view other user's thoughts.
-   A user can react, or reply, to a thought.
-   A user can befriend other users.

#### GraphQL Explained

#### Install & Integrate Apollo Server

GraphQL not tied to a specific langugae. It's its own language specification that we can integrate into the language of our choosing. Therefore, many libraries available for this kind of integration.
**Apollo** a popular example.

`npm i apollo-server-express graphql`

##### GraphQL 101

REST APIs: use `GET`, `POST`, `PUT`, & `DELETE`

GraphQL:

-   **Queries** used for `GET` requests and ask for data from a GraphQL API
-   **Mutations** used for `POST`, `PUT`, & `DELETE` requests to create or manipulate data through a GraphQL API

GraphQL Setup:
Typedefs and Resolvers together form the **schema**

-   **Type Definitions** (TypeDefs): define every piece of data the client can expect to work with through a query or mutation
-   **Resolvers** functions connected to each query or mutation typedef that perform the CRUD actions that each query or mutation is expected to perform

**scalars** = GraphQL built-in data types

set up `/models/schemas` folder.

-   connect everything up,
-   add typeDefs and resolvers in appropriate places
-   update `server.js` to hook Apollo server into Express.js server

explanation of graphQL playground

### 21.1.5: Create the Thought Type Definition and Resolver

#### Write the Resolver to Get Thoughts

#### Look Up Thoughts by Username

```
type Query {
  thoughts(username: String): [Thought]
}
```

`thoughts` query _could_ receive a parameter if we want now.

update `resolvers.js` to accept this parameter:

```
thoughts: async (parent, { username }) => {
  const params = username ? { username } : {};
  return Thought.find(params).sort({ createdAt: -1 });
},
```

#### Create and Integrate the Reaction Type

`reactions` is a nested array of the `Reaction` type = need to be explicit about what data we want returned.

### 21.1.6: Build the Remaining Query Type Definitions and Resolvers

-   "!" means data _must_ exist, otherwise returns an error

```
type Query {
  users: [User]
  user(username: String!): User
  thoughts(username: String): [Thought]
  thought(_id: ID!): Thought
}
```

#### Create the Remaining Query Resolvers

#### Use Query Variables

### 21.1.7: Reflection

## Lesson 2: GraphQL Mutations

### 21.2.1: Introduction

skills:

-   Writing GraphQL type definitions and resolvers.
-   Creating and reading session-like data.

do the following:

-   Perform create and update operations with GraphQL mutations.
-   Implement JSON Web Tokens for authentication.

### 21.2.2: Preview

### 21.2.3: Create Add User and Login Mutations

```
type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
```

When using variables in a GraphQL query, use `$`.

```
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    _id
    username
    email
  }
}
```

### 21.2.4: Authorize Users with JWTs

**JSON Web Token** = **JWT** = a JSON object that's been encoded into a tokenized string

-   Contain all the data you need encoded into a single string.
-   Eliminate the need to save a session ID on the back end or in the database.
-   Decrease the amount of server-side resources needed to maintain authentication.
-   Can be generated anywhere and aren't tied to a single domain like cookies.

### 21.2.5: Implement Auth Middleware to Populate Me Query

You can include the token with a request in the following ways:

-   As part of the body
-   In the query string (e.g., ?token=abc)
-   As an HTTP header

An HTTP header is best practice.

### 21.2.6: Add Mutations for Thoughts, Friends, and Reactions

### 21.2.6: Add Mutations for Thoughts, Friends, and Reactions

### 21.2.7: Reflection

## Lesson 3: Integrate the Client

### 21.3.1: Introduction

### 21.3.2: Preview

### 21.3.3: Create React App and Integrate Premade Components

### 21.3.3: Create React App and Integrate Premade Components

### 21.3.4: Install and Set Up Apollo Client

### 21.3.5: Create ThoughtList Component

### 21.3.6: Set Up Full-Stack Structure with Client-Side React App

### 21.3.7: Reflection

## Lesson 4: Using React Router

### 21.4.1: Introduction

### 21.4.2: Preview

### 21.4.3: Set Up the Main URL Routes Using React Router

### 21.4.4: Implement the Navigation Links and URL Parameters

### 21.4.5: Build the "Single Thought" Page

### 21.4.6: Build the Profile Page

### 21.4.7: Reflection

## Lesson 5: Add Front-End User Authentication

### 21.5.1: Introduction

### 21.5.2: Preview

### 21.5.3: Create and Implement User-Based Mutations

### 21.5.4: Create and Implement Authentication Functionality

### 21.5.5: Update Header for User-Contextualized Data

### 21.5.6: Create and Implement User-Based Queries

### 21.5.7: Reflection

## Lesson 6: Add More Forms and Buttons

### 21.6.1: Introduction

### 21.6.2: Preview

### 21.6.3: Implement the Add Friend Button and Mutation

### 21.6.4: Create a Thought Form Component

### 21.6.5: Implement the Add Thought Mutation

### 21.6.6: Implement the Add Reaction Form and Mutation

### 21.6.7: Deploy to Heroku

### 21.6.8: Reflection

## Weekly Challenge 21. MERN Challenge: Book Search Engine

## Assignment 21. MERN Challenge: Book Search Engine

## Think Like a Developer 21. Reflection and Retrieval 21. Reflection and Retrieval 21. Career Connection 21. Career Connection 21. Dessert Menu 21. Dessert Menu
