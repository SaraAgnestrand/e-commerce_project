# LightGallery

### Examination project- E-commerce store specializing in lighting products.

### Requirements that I have fulfilled:

- The minimum text system is accessed via an API. JSON, XML, or some other format that is readable and/or writable. An embed is not sufficient.
- A custom-designed database with at least two tables. It should be normalized to an appropriate level, and appropriate constraints such as foreign keys etc. should be used.
- Integration with paymentsolution.
- Routing and clean URLs. All requests go through a dispatcher (index.php) and controllers handle the URL structure. Or similar, no calls to specific .php files.
- The service/product can be interacted with (read and/or write) via a REST, SOAP, or another standardized API technology. Best practices for the chosen technology must be followed.
- The service/product includes user management.
- The front end is responsive and should have "lazy loading"/pagination when images and information are fetched from APIs, databases, etc.

### Run project by typing:

#### In the terminal

```
$ cd server
$ npm install
$ nodemon src/server.js
```

#### In a new terminal

```
$ cd client
$ npm install
$ npm run dev
```

#### To be able to test drive Stripe CLI webhook events, the Stripe CLI should be installed. Link: https://stripe.com/docs/stripe-cli#next-steps

#### After installing open a terminal

```
$ cd <your Stripe CLI path>
$ stripe login
```

##### To forward events to your local endpoint, run the following command with the the CLI to set up a local listener.

```
$ stripe listen --forward-to localhost:3000/webhook
```

##### Additional information about the project:

- I have chosen to leave some console.logs as I view the project as ongoing and will likely add more to the site.
- I did not include that I have met the requirement for order management and inventory management, as I don't believe I fully meet that requirement yet. Currently, I create a very simple order and update inStock. There is potential to improve these parts.
- I have tried to make the site responsive, but there is room for improvement in that area. For example, I discovered towards the end that the site does not look good on my laptop, as I have worked on viewing different screen sizes in the inspector on a larger screen and not tested directly on the laptop.
