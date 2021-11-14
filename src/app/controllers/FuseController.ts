import { Request, Response } from "express";
import { ConfigDao } from "../../database/daos";
import { ConfigEntity } from "../../database/entities/fuse/ConfigEntity";

/*
 * Author: Laynester
 * © - 2021
 */
export class FuseController
{
    public static async Config(req: Request, res: Response): Promise<void>
    {
        let config = {};
        let items = await ConfigDao.loadSettings();

        items.forEach((item: ConfigEntity) =>
        {
            config[item.key] = item.value;
        });

        res.json(config)
    }
}