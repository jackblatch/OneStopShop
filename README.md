## One Stop Shop

> **Warning**
> This app is a work in progress and shouldn't be considered production ready. It uses new technologies that are yet to be stable such as the Next 13 App Router with RSC's and Drizzle ORM.

## About

Online marketplace allowing users to purchase products as well as sign up and list their own products for sale. Users can create a seller profile, manage products and collect payment.

Key features:

- Intercepted routes (with parallel routing) on new product creation in admin
- Using React Server Components for data queries with Drizzle ORM
- Using UploadThing for typesafe file uploads (e.g., product images)
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
