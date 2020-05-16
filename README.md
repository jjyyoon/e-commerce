# e-commerce
You can check how it looks like here: [e-commerce]  
You can execute this application by following the instructions below.

## Instructions
1. Download [npm]
2. Download [PostgreSQL]
3. Sign up for [Stripe] and obtain your [API keys]
4. Cloning the repository: [GitHub Help]

**Frontend:** 
1. From root folder
    ```sh
    $ cd client
    ```
2. Install packages with npm
    ```sh
    $ npm install
    ```
3. In the file 'App.js', change the key in line 16 to your Stripe publishable key.
    ```javascript
    const stripePromise = loadStripe("your Stripe publishable key");
    ```
4. Create a production build of the app.
    ```sh
    $ npm run build
    ```    

**Backend:** 
1. From root folder, install packages with npm
    ```sh
    $ npm install
    ```    
2. In the 'config' folder, create a file 'config.js' that contains configurations below.
    ```javascript
    // You should check all the values below and change them if necessary.
    DATABASE_URI = {
        username: "username",
        password: "password",
        host: "localhost",
        port: "1234",
        databaseName: "e-commerce"
    };

    SESSION_SECRET = "super-secret";
    STRIPE_SECRET_KEY = "your Stripe secret key";

    module.exports = { DATABASE_URI, SESSION_SECRET, STRIPE_SECRET_KEY };
    ```
    _About DATABASE_URI_
    - First, you should create your database named 'e-commerce'. To do it, you must be a superuser or have the CREATE privilege. If you would like to use a different name, change the database name of DATABASE_URI from 'e-commerce' to it.
    - Change username, password and port to yours. (e.g. Using pgAdmin, you can check your username and port like this: Right click 'PostgreSQL' on the left side > Click 'Properties' > Click 'Connection' tap.)
    - For more information, visit these websites: 
        - [pgAdmin: Database Dialog]
        - [PostgreSQL: Creating a Database]
        - [SQLAlchemy: Database Urls]
4. Create tables
    ```sh
    $ node models/create_models.js
    ```
5. Run the app!
    ```sh
    $ npm run server
    ```



   [e-commerce]: <https://jjyyoon.github.io/#/project/ecommerce>
   [npm]: <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>
   [PostgreSQL]: <https://www.postgresql.org/>
   [Stripe]: <https://stripe.com/gb>
   [API keys]: <https://stripe.com/docs/keys>
   [GitHub Help]: <https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository>
   [pgAdmin: Database Dialog]: <https://www.pgadmin.org/docs/pgadmin4/latest/database_dialog.html>
   [PostgreSQL: Creating a Database]: <https://www.postgresql.org/docs/current/manage-ag-createdb.html>
   [SQLAlchemy: Database Urls]: <https://docs.sqlalchemy.org/en/13/core/engines.html#database-urls>
