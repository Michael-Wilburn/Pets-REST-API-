# The REST API Handbook – How to Build, Test, Consume, and Document REST APIs

### Hi everyone! In this tutorial we're going to take a deep dive into REST APIs

We'll cover basic setup and architecture with Node and Express, unit testing with Supertest, seeing how we can consume the API from a React front-end app and finally documenting the API using tools such as Swagger.

Keep in mind we won't go too deep into how each technology works. The goal here is to give you a general overview of how a REST API works, how its pieces interact, and what a full implementation might consist of.

Let's go!

## Table of Contents

- What is REST?
- How to Build a REST API with Node and Express
- How to Test a REST API with Supertest
- How to Consume a REST API on a Front-end React App
- How to Document a REST API with Swagger
- Wrapping up

# What is REST?

Representational State Transfer (REST) is a widely used architectural style for building web services and APIs.

RESTful APIs are designed to be simple, scalable, and flexible. They are often used in web and mobile applications, as well as in Internet of Things (IoT) and microservices architectures.

#### Main Characteristics:

1. **Stateless:** REST APIs are stateless, which means that each request contains all the necessary information to process it. This makes it easier to scale the API and improves performance by reducing the need to store and manage session data on the server.

2. **Resource-based:** REST APIs are resource-based, which means that each resource is identified by a unique URI (Uniform Resource Identifier) and can be accessed using standard HTTP methods such as GET, POST, PUT, and DELETE.

3. **Uniform Interface:** REST APIs have a uniform interface that allows clients to interact with resources using a standardized set of methods and response formats. This makes it easier for developers to build and maintain APIs, and for clients to consume them.

4. **Cacheable:** REST APIs are cacheable, which means that responses can be cached to improve performance and reduce network traffic.

5. **Layered System:** REST APIs are designed to be layered, which means that intermediaries such as proxies and gateways can be added between the client and server without affecting the overall system.

#### Pros of REST APIs:

- **Easy to learn and use:** REST APIs are relatively simple and easy to learn compared to other APIs.

- **Scalability:** The stateless nature of REST APIs makes them highly scalable and efficient.

- **Flexibility:** REST APIs are flexible and can be used to build a wide range of applications and systems.

- **Wide support:** REST APIs are widely supported by development tools and frameworks, making it easy to integrate them into existing systems.

#### Cons of REST APIs:

- **Lack of standards:** The lack of strict standards for REST APIs can lead to inconsistencies and interoperability issues.

- **Limited functionality:** REST APIs are designed to handle simple requests and responses and may not be suitable for more complex use cases.

- **Security concerns:** REST APIs can be vulnerable to security attacks such as cross-site scripting (XSS) and cross-site request forgery (CSRF) if not implemented properly.

#### REST APIs are best for:

- REST APIs are well-suited for building web and mobile applications, as well as microservices architectures and IoT systems.

- They are particularly useful in situations where scalability and flexibility are important, and where developers need to integrate with existing systems and technologies.

In summary, REST APIs are a popular and widely used architectural style for building web services and APIs. They are simple, scalable, and flexible, and can be used to build a wide range of applications and systems.

While there are some limitations and concerns with REST APIs, they remain a popular and effective option for building APIs in many different industries and sectors.

#How to Build a REST API with Node and Express

##Our tools
[Node.js](https://nodejs.org/en) is an open-source, cross-platform, back-end JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser. It was created by Ryan Dahl in 2009 and has since become a popular choice for building web applications, APIs, and servers.

Node.js provides an event-driven, non-blocking I/O model that makes it lightweight and efficient, allowing it to handle large amounts of data with high performance. It also has a large and active community, with many libraries and modules available to help developers build their applications more quickly and easily.

[Express.js](https://expressjs.com/)is a popular web application framework for Node.js, which is used to build web applications and APIs. It provides a set of features and tools for building web servers, handling HTTP requests and responses, routing requests to specific handlers, handling middleware, and much more.

Express is known for its simplicity, flexibility, and scalability, making it a popular choice for developers building web applications with Node.js.

Some of the key features and benefits of Express.js include:

- **Minimalistic and flexible:** Express.js provides a minimalistic and flexible structure that allows developers to build applications the way they want to.

- **Routing:** Express.js makes it easy to define routes for handling HTTP requests and mapping them to specific functions or handlers.

- **Middleware:** Express.js allows developers to define middleware functions that can be used to handle common tasks such as authentication, logging, error handling, and more.

- **Robust API:** Express.js provides a robust API for handling HTTP requests and responses, allowing developers to build high-performance web applications.

## Our architecture

For this project we'll follow a layers architecture in our codebase. Layers architecture is about dividing concerns and responsibilities into different folders and files, and allowing direct communication only between certain folders and files.

The matter of how many layers should your project have, what names should each layer have, and what actions should it handle is all a matter of discussion. So let's see what I think is a good approach for our example.

Our application will have five different layers, which will be ordered in this way:

<p align="center">
  <img width="600" height="520" src="https://github.com/Michael-Wilburn/Pets-REST-API-/blob/main/architecture.png">
  Application layers
</p>

- The application layer will have the basic setup of our server and the connection to our routes (the next layer).

- The routes layer will have the definition of all of our routes and the connection to the controllers (the next layer).

- The controllers layer will have the actual logic we want to perform in each of our endpoints and the connection to the model layer (the next layer, you get the idea...)

- The model layer will hold the logic for interacting with our mock database.

- Finally, the persistence layer is where our database will be.

An important thing to keep in mind is that in these kinds of architectures, **there's a defined communication** flow between the layers that has to be followed for it to make sense.

This means that a request first has to go through the first layer, then the second, then the third and so on. No request should skip layers because that would mess with the logic of the architecture and the benefits of organization and modularity it gives us.

# The code

Before jumping to the code, let's mention what we'll actually build. We'll be building an API for a pet shelter business. This pet shelter needs to register the pets that are staying in the shelter, and for that we'll perform basic CRUD operations (create, read, update and delete).

Now yeah, let's get this thing going. Create a new directory, hop on to it and start a new Node project by running `npm init -y`.

We should install the dotenv library: `npm install dotenv` to set the local enviroment variables that we will use in this project.

Environment variables are helpful in software development. Many programs and applications set or get environment variables. Let me quickly explain why you might need environment variables.

### Why do we need environment variables?

- **Security:** Some things like API keys should not be put in plain text in the code and thereby directly visible.

- **Flexibility:** you can reduce conditional statements “If production server then do X else if test server then do Y else if localhost then do Z …”.

- **Adoption:** Popular services like GitLab or Heroku support the usage of environment variables.

Aside from default environment variables, you can also set your own. If you want to work with custom environment variables, you need to create a .env file.

Then install Express by running `npm i express` and install nodemon as a dev dependency by running `npm i -D nodemon` ([Nodemon](https://nodemon.io/) is a tool we'll use to get our server running and test it). Lastly, also run `npm i cors`, which we'll use to be able to test our server locally.

After `package.json` file is updated inside and below the line `"main": app.js` write `"type":"module"` because we want to be able to import some modules into the `app.js` file.

## config.env

Created a folder name config and inside set a config.env file and write the code below.

```
PORT=3000
```

## App.js

Cool, now create an `app.js` file and drop this code in it:

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import petRoutes from './pets/routes/pets.routes.js';

/* Config the path so the app can use the enviroment variables */
dotenv.config({ path: './pets/config/config.env' });

const app = express();
const port = process.env.PORT;

/* Global middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use('/pets', petRoutes);

/* Server setup */
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  );
}

export default app;
```

This would be the **application layer** of our project.

Here we're basically setting up our server and declaring that any request that hits the `/pets` direction should use the routes (endpoints) we have declared in the `./pets/routes/pets.routes.js` directory.

Next, go ahead and create this folder structure in your project:
