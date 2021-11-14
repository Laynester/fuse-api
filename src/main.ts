import * as express from 'express';
import * as http from 'http';
import * as config from '../config.json';
import { Connection, createConnection, EntityManager } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { join } from 'path';
import routes from './app/routes'
import { Request, Response } from "express";
import { Setup } from './utils/setup';
import * as ejs from 'ejs'
import * as fs from 'fs'
import { ConfigDao, ConfigEntity } from './database';
import { MasterDao } from './database/daos'
import { FuseLogger } from './utils/Logger';
import { DatabaseManager } from './database/DatabaseManager';
import cors = require('cors');

/*
 * Author: Laynester
 * © - 2021
 */
export class FuseAPI
{
    private static _instance: FuseAPI;
    private logger: FuseLogger = new FuseLogger(this.constructor.name);

    private _api: express.Express;
    private _apiServer: http.Server;

    public config: typeof config = config;

    constructor()
    {
        FuseAPI._instance = this;
        console.clear();
        DatabaseManager.getInstance().connect();
    }

    public static getInstance(): FuseAPI
    {
        if (!FuseAPI._instance) FuseAPI._instance = new FuseAPI();

        return FuseAPI._instance;
    }

    public registerAPI(): void
    {
        this._api = express();

        this._apiServer = http.createServer(this._api);

        this._api.use(express.json())

        this._api.use((req: Request, res: Response) =>
        {
            res.header('Access-Control-Max-Age', '600');
            res.header('Access-Control-Allow-Origin', '*');
            req.next();
        });

        this._api.use(cors())

        this._api.get('/', async (req: Request, res: Response) =>
        {
            let file = fs.readFileSync(join(__dirname.substr(0, __dirname.length - 3) + "public/index.html"));
            let config = {};
            (await ConfigDao.loadSettings()).forEach((item: ConfigEntity) => config[item.key] = item.value);

            res.send(ejs.render(file.toString(), { config: JSON.stringify(config) }))
        })

        this._api.use('/api', routes);

        this._apiServer.listen(config.general.api_port, () =>
        {
            this.logger.log(`Listening on ${config.general.api_port}`)
        });
    }
}

FuseAPI.getInstance()