import { Sequelize } from "sequelize";
import path from "path";
const Umzug = require('umzug');
import config from "./config.json";
const dotenv = require('dotenv')

dotenv.config()

const dbConfig: any = config;
const env: any = process.env.NODE_ENV ?? "local";

const { username, password, database, host, dialect, port } = dbConfig[env];

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } =
    process.env;

/** This the Sequelize connection with FPH database. */
export const databaseInstance = new Sequelize(DB_NAME || database, DB_USER || username, DB_PASSWORD || password, {
    host: DB_HOST || host,
    dialect: DB_DIALECT || dialect,
    port: DB_PORT || port,
    timezone: '+05:30',
    logging: false,
    pool: {
        max: 20,
        min: 1,
        acquire: 100000,
        idle: 50000,
    },
});


async function initDB() {
    try {
        databaseInstance.authenticate().then(async () => {
            console.info("Connection to database has been established successfully");
            migrate
                .up()
                .then(async (onFullfill: any) => {
                    console.info("All migrations performed successfully ( DB )");
                    //         seed
                    //             .up()
                    //             .then((onSeed: any) => {
                    //                 console.info("Data seed successfull. ( DB )");
                    //                 return Promise.resolve();
                    //             })
                    //             .catch((err: any) => {
                    //                 console.error(err);
                    //                 console.error("Seeder failed ( DB )");
                    //                 return Promise.reject();
                    //             });
                    return Promise.resolve();
                })
                .catch((err: any) => {
                    console.error(err);
                    console.error("Migration failed ( DB )");
                    return Promise.reject();
                });
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

const migrate = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path.join(__dirname, '../migrations'),
        pattern: /\.js$/,
        // inject sequelize's QueryInterface in the migrations
        params: [databaseInstance.getQueryInterface(), Sequelize],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: 'sequelize',
    storageOptions: {
        sequelize: databaseInstance,
    },
})

const seed = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path.join(__dirname, '../seeders'),
        pattern: /\.js$/,
        // inject sequelize's QueryInterface in the migrations
        params: [databaseInstance.getQueryInterface(), Sequelize],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: 'sequelize',
    storageOptions: {
        sequelize: databaseInstance,
    },
})

/** */
export async function initMySQLConnection() {
    await initDB();
}
