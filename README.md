
📘 Understanding Middleware in Express.js
Middleware is often misunderstood because it sounds complex, but it's actually a very straightforward concept. The core idea behind middleware is to execute some logic between the time a server receives a request and the time it sends a response. Essentially, middleware functions operate in the middle of the request-response cycle—hence the name middleware.

This guide will walk you through middleware in Express.js using practical code examples.

📦 Setting Up an Express Server
To get started with an Express server:

Initialize a Node.js project:
npm init -y

Install Express:
npm install express
Create a server.js or index .js file with the following content:

const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Home Page")
})

app.get("/users", (req, res) => {
  res.send("Users Page")
})

app.listen(3000, () => console.log("Server Started"))
Run your server with:


node server.js
Visit http://localhost:3000 to see Home Page, and http://localhost:3000/users to see Users Page.

🧠 What Is Middleware?
Middleware functions in Express have access to the req (request), res (response), and next objects. Middleware can:

Modify the request/response

End the request-response cycle

Pass control to the next middleware using next()

Failing to call next() will halt the request lifecycle, preventing subsequent middleware or route handlers from running.

🛠 Creating a Logging Middleware
Here's how to define and apply a simple middleware that logs each request:


function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}

app.use(loggingMiddleware)
Place this before your routes to log all incoming requests.

🔐 Creating Authorization Middleware
You can also apply middleware to specific routes. Here's an example of a middleware that authorizes users based on a query parameter:


function authorizeUsersAccess(req, res, next) {
  if (req.query.admin === "true") {
    req.admin = true
    next()
  } else {
    res.send("ERROR: You must be an admin")
  }
}
Apply it to a specific route:


app.get("/users", authorizeUsersAccess, (req, res) => {
  console.log(req.admin)
  res.send("Users Page")
})
Try visiting:

http://localhost:3000/users → Will show error

http://localhost:3000/users?admin=true → Will access the page

⚠ Important Middleware Concepts
1. Controller Actions Are Middleware
Route handlers like app.get(...) are middleware themselves. They just happen to be the last in the chain, which is why they don't use next().

2. Always Use return next() When Needed
Avoid calling next() without returning, as it may lead to unexpected behavior:

❌ Incorrect:


function middleware(req, res, next) {
  if (req.valid) {
    next()
  }
  res.send("Invalid Request")
}
✅ Correct:

function middleware(req, res, next) {
  if (req.valid) {
    return next()
  }
  res.send("Invalid Request")
}
3. Middleware Executes in Order
The order you declare middleware matters. Consider this:


app.use(middlewareThree)
app.use(middlewareOne)

app.get("/", middlewareTwo, middlewareFour, (req, res) => {
  res.send("Home Page")
})
Execution order:

middlewareThree

middlewareOne

middlewareTwo

middlewareFour

✅ Final Thoughts
Middleware is one of the most powerful features in Express. It allows you to:

Log requests

Handle authentication/authorization

Validate data

Share data across handlers

Catch errors

Understanding how middleware works and how to use it effectively will significantly improve your ability to build scalable and maintainable Express applications.
