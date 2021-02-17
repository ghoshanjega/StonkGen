## Setup

`yarn`

## Start

`yarn start`

## Database

My choices for the database and backend programming language/framework were limited due to personal laptop I'm currently using (the M1 macbook compatibility issues ☹️). But for the database I went with [lowdb](https://github.com/typicode/lowdb). It is a local file based simple database where it manipulates json collections using lodash. Its the underlying library used in the popular [json-server](https://github.com/typicode/json-server). In my opinion its an efficient db for frontend developers to build a mock server for development / testing. I'm using it in synchronous mode, and this could be enhanced using schemas for the tables. 

Tables => user, userSession, orders, stocks

## Backend

Express server with services based architecture.

### Authentication Controller/Service

1. signup = adds user, creates a session, and returns user with session
2. login = finds user, matches password (string match), returns user with session
3. listAllUsers = returns a list of user on the platoform for admin
4. getUserIdFromSession = helper service cart.getAllPreviousSessions
4. getAllSessionsOfUser = helper service used by cart.getAllPreviousSessions

### Cart Controller/Service

1. addToCart = add an item to cart with execution side info
2. getCart = returns the items in the cart for the current session
3. bookCartItem = Books one item at a time with given execution details. Returns errors for specific items.
4. removeItem = removes the visibility from the current cart session. (It will be visible in the history)
5. getAllPreviousSessions = gets history of cart bookings where status is either booked / rejected/ inProgress,

### Stock List Controller

1. getStocks = returns list of stocks based on query paramets
2. getStock = helper service used by cart.addToCart