// db.ts
import { drizzle } from "drizzle-orm/mysql2";
//import { connect } from "@planetscale/database";
//import { createPool, PoolConnection } from "mysql2/promise";
import { createPool } from "mysql2/promise";
import { migrate } from "drizzle-orm/mysql2/migrator";



// create the connection
async function connectToMySQL() {
  const connection = await createPool({
    host: process.env["DATABASE_HOST"],
    user: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
    database: process.env["DATABASE_NAME"],
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return connection;
}

export async function initializeDB(){
 const connection = await connectToMySQL();
 const db = drizzle(connection);

// syncs the migrations folder to PlanetScale
process.env.NODE_ENV === "development" &&
  migrate(db as any, { migrationsFolder: "./migrations-folder" })
    .then((res) => res)
    .catch((err) => console.log("Migration error in db.ts:", err));
  
  return db;
}

(async () => {
  // Export the initialized db instance
  module.exports.db = await initializeDB();
})();
