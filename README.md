## OneStopShop

> **Warning**
> This app is a work in progress and shouldn't be considered production ready. It uses new technologies that are yet to be stable such as Server Actions and Drizzle ORM.

## About

Online marketplace built using Next.js App Router, which allows users to purchase products, sign up and list their own products for sale. Users can create a seller profile, manage products and collect payment.

Key features:

- Next.js App Router with React Server Components
- Intercepted routes (with parallel routing) for product quick view and new product creation in admin
- Server Actions for mutations
- PlanetScale MySQL database with Drizzle ORM
- UploadThing for typesafe file uploads (e.g., product images)
- User authentication with Clerk
- Stripe Connect integration for marketplace payments (including platform fees and seller payouts)

## Demo

To demo the checkout experience, checkout with a test card number such as `4242 4242 4242 4242` and use any future date for the expiry and any 3 digits for the CVC. You will only be able to checkout with products from sellers that have a Stripe account connected to their store (such as [Tim's Toys](https://onestopshop.jackblatch.com/products?seller=tims-toys)). You can also create your own seller account and connect it to Stripe for the full experience.

Home page
![Home page](/.github/images/home.jpeg?raw=0)

Admin Product Page Editor
![Admin Product Page Editor](/.github/images/product-admin.jpeg?raw=0)

## Running the app

Follow the below steps to run the app locally:

1. Create a database in PlanetScale.
2. Create a local `.env` file with the variables as per the `.env.example` file.
3. Run `npm install`.
4. Generate a migration with `npx drizzle-kit generate:mysql`. This creates a new folder called `migrations-folder` in the root which contains the SQL queries to create the database tables.
5. Push the migration to PlanetScale with `npx drizzle-kit up:mysql` or `npx drizzle-kit push:mysql`. If this fails (or nothing happens) and your PlanetScale database isn't updated with all the tables, run the SQL queries that were generated in the `migrations-folder` from the previous step manually in the PlanetScale console.
6. Run `npm run dev` to open the app in development mode.

That's it. You should now be able to access the app at `http://localhost:3000`.

### Notes

- When generating the migration for the first time with Drizzle, ensure that the `migrations-folder` in the root is empty or doesn't exist.

### Storybook

Storybook has been added to this app, however, hasn't been actively worked on since the initial creation of the app. Regardless, it can be ran using the following commands:

1. Run the tailwind build script to create an output file for tailwind classes (after it's ran and completed, you may have to 'kill' the terminal (ie `ctrl + c`) to stop the process if it doesn't automatically stop).

   Command: `npm run tailwind`

2. Run Storybook (this will use the tailwind output file created in the previous step and run on `http://localhost:6006`).

   Command: `npm run storybook`

## Contributing

Feel free to make issues and PR's for new features/fixes
