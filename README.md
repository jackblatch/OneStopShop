## One Stop Shop

> **Warning**
> This app is a work in progress and shouldn't be considered production ready. It uses new technologies that are yet to be stable such as the Next 13 App Router with RSC's and Drizzle ORM.

### Running the app

Run the app in development mode:

    `npx run dev`

Storybook:

1. Run the tailwind build script to create an output file for tailwind classes

   `npm run tailwind`

2. Run Storybook

   `npm run storybook`

## Drizzle Kit

`npx drizzle-kit generate:mysql` - Generate new schema
`npx drizzle-kit up:mysql` - Push to PlanetScale
