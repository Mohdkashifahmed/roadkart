# RoadKart - Mini E-Commerce Store for Roadside Sellers

Web Technologies subject project.

In India, many people order food from big restaurants but rarely buy from roadside sellers.
RoadKart is a small online storefront for these sellers: customers can browse, search and order
products from street stalls, and an admin manages the products and orders.

## Modules

| Module | What it does |
|---|---|
| Product Catalog | Shows all products on the Home page, with a Search page (by name, seller or category) |
| Cart | Add and remove items, see the total |
| Checkout | Enter the delivery address and phone number, then place the order |
| User Login | Register and login |
| Orders | A customer sees their own orders, and the admin sees all orders |
| Admin | Add products, delete products, and view all orders |

## Tech stack

- **Angular 22** - front end (pages, routing, forms, HttpClient)
- **Node.js and Express.js** - back end (GET and POST routes)
- **MongoDB with Mongoose** - database (products, users, orders)
- **Bootstrap 5.3** - grid and utility classes only
- **HTML and CSS** - custom design in `src/styles.css`

## Folder structure

```
backend/
  server.js                  Express server, MongoDB models and all routes
roadkart-frontend/
  frontend/                  Angular project
    src/styles.css           Design of the whole site
    src/app/                 One folder per page (home, search, cart, checkout,
                             login, register, orders, admin) and shop.service.ts
```

## Requirements

- Node.js 24 LTS (Angular 22 needs Node 22.22 or newer, or 24.13 or newer)
- MongoDB Community Server, running on the default port 27017

## How to run

**1. Start MongoDB** (if it is installed as a Windows service, it is usually already running).

**2. Start the back end** (first terminal):

```
cd backend
npm install
node server.js
```

You should see `Server running on http://localhost:3000` and `MongoDB connected`.

**3. Start the front end** (second terminal):

```
cd roadkart-frontend/frontend
npm install
npm start
```

**4. Open** http://localhost:4200

## Try it

- Admin login: `admin@roadkart.com` / `admin123`. Use the Admin page to add products first,
  because the database starts empty.
- Customer: click Login, then Create an account, register, and log in.
- Then add items to the cart, check out, and see the order on the Orders page.

## Express routes

| Method | Route | Use |
|---|---|---|
| GET | `/products` | List all products |
| POST | `/products` | Admin: add a product |
| POST | `/products/delete` | Admin: delete a product |
| POST | `/register` | Create a customer account |
| POST | `/login` | Login |
| POST | `/orders` | Place an order |
| GET | `/orders?email=` | Orders of one customer |
| GET | `/orders/all` | Admin: all orders |

## Limitations

This is a basic class project:

- Passwords are stored as plain text (a real site would hash them).
- The admin account is fixed in `server.js`, and the Admin page is hidden only in Angular.
- The login and the cart are kept in memory, so refreshing the page logs you out and empties the cart.
