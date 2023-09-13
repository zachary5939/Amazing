# Amazing
<img width="1520" alt="Screenshot 2023-09-13 at 12 51 41 PM" src="https://github.com/zachary5939/Amazing/assets/16927689/db66653c-4de4-437a-b846-a49dbfc82e5b">
[**LIVE LINK**](https://amazoning.onrender.com/)

This is Amazing, a functional clone of Amazon. This product allows users to shop for products by adding them to a cart, then allowing the user to purchse the products to their account. After making a purchase, the user can leave reviews for the products they purchase. Users also have the choice of wishlisting products they would like to purchase in the future. Smilarily how to Amazon functions, users are allowed to make changes to their purchases (such as quantity, or just cancel the order all together) within a short timespan after ordering the product they have purchased. So in this application, users will have ten minutes to make changes to their order before it the order is processed and becomes permanent.

## CONTACT ME
#### [LinkedIn](https://www.linkedin.com/in/zachstallings/) or contact@zachstallings.dev

## MVP
* The ability to create a new user and user loging with authorization
* Users can add products to their cart, and can update their cart by changing the quantity or removing the item from their cart all together.
* Users can purchase products they have added to their cart.
* Users can update or delete their purchases they have made before the products ship.
* Users can review products. Users can ONLY review products after purchasing said product.
* Users can update or delete the reviews they have made.
* Users can add products to their wishlists to purchase later.

## ENDPOINTS
| REQUEST | PURPOSE |
| ------- | ------- |
| GET /api/cart/ | Gets all items from the cart for the user |
| POST /api/cart/ | Adds a product to a cart |
| PUT /api/cart/:cartItemId | Updates the product quantity in the cart |
| DELETE /api/cart/:cartItemId | Deletes a product from the cart |
| DELETE /api/cart/user/:userId' | Deletes the cart after a user makes a purchase |
| GET /api/products' | Gets all products |
| GET /api/products/search' | Searches the database for products by name |
| GET /api/products/:id' | Gets a single product by it's Id |
| GET /api/products/category/:id' | Gets all products associated by its category |
| GET /api/purchases' | Gets all purchases a user has made |
| GET /api/finalize' | Purchases the products the user put into their cart |
| DELETE /api/purchases/:Id' | Cancels an order a user made (can only be done within 5 minutes of ordering) |
| PUT /api/purchases' | Update quantity for a product by its ID (can only be done within 5 minutes or ordering) |
| GET /api/ratings' | Gets all ratings for every product |
| GET /api/ratings/product/:productId' | Gets all reviews for a single product |
| GET /api/ratings/user/:userId' | Gets all reviews a user has made |
| GET /api/ratings/:id' | Gets a single review for a product |
| POST /api/ratings/:id' | Posts a users review for a product |
| PUT /api/ratings/:id' | Edits a users review for a product |
| DELETE /api/ratings/:id' | Deletes a review a user made |
| GET /api/wishlist' | Gets a users wishlist |
| POST /api/wishlist' | Adds a product to a users wishlist |
| DELETE /api/wishlist' | Removes a product to a users wishlist |









