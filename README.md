## One Stop Shop

> **Warning**
> This app is a work in progress and shouldn't be considered production ready. It uses new technologies that are yet to be stable such as the Server Actions and Drizzle ORM.

## About

Online marketplace built using Next.js App Router, which allows users to purchase products, sign up and list their own products for sale. Users can create a seller profile, manage products and collect payment.

Key features:

- Next.js App Router with React Server Components
- Intercepted routes (with parallel routing) for product quick view and new product creation in admin
- Server Actions for mutations
- Planetscale MySQL database with Drizzle ORM
- UploadThing for typesafe file uploads (e.g., product images)
- User authentication with Clerk

Home page
![Home page](/.github/images/home.jpeg?raw=0)

Admin Product Page Editor
![Admin Product Page Editor](/.github/images/product-admin.jpeg?raw=0)

## Running the app

Run the app in development mode:

    `npx run dev`

Storybook:

1. Run the tailwind build script to create an output file for tailwind classes

   `npm run tailwind`

2. Run Storybook

   `npm run storybook`

### Drizzle Kit

`npx drizzle-kit generate:mysql` - Generate new schema
`npx drizzle-kit up:mysql` - Push to PlanetScale

## Contributing

Feel free to make issues and PR's for new features/fixes
