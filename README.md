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

![alt text](https://github.com/Michael-Wilburn/Pets-REST-API-/blob/main/architecture.png?raw=true)
