import { Connection, createConnection, EntityManager } from "typeorm";
import { FuseLogger } from "../utils/Logger";
import * as config from '../../config.json';
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { MasterDao } from "./daos";
import { FuseAPI } from "../main";
import { Setup } from "../utils/setup";

/*
 * Author: Laynester
 * © - 2021
 */
export class DatabaseManager
{
    private static _instance: DatabaseManager;
    private logger: FuseLogger = new FuseLogger(this.constructor.name);
    private _database: EntityManager;

    constructor()
    {
        DatabaseManager._instance = this;
    }

    public static getInstance(): DatabaseManager
    {
        if (!DatabaseManager._instance) DatabaseManager._instance = new DatabaseManager();

        return DatabaseManager._instance;
    }

    public async connect(): Promise<void>
    {
        await createConnection({
            type: config.db.type,
            host: config.db.host,
            port: config.db.port,
            username: config.db.username,
            password: config.db.password,
            database: config.db.name,
            entities: [
                "src/database/entities/**/*Entity.ts"
            ]
        } as MysqlConnectionOptions).then((connection: Connection) =>
        {
            this._database = connection.manager;
        }).then(() =>
        {
            this.logger.log(`connected to ${config.db.name}@${config.db.port}`)
            MasterDao.SortDaos();
            FuseAPI.getInstance().registerAPI();
            new Setup();
        });
    }
}