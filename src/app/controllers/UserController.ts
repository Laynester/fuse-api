import { Request, Response } from "express";
import { GetFunctions } from "../../api";
import { UserObject } from "../../database";
import { MasterDao } from "../../database/daos";

/*
 * Author: Laynester
 * © - 2021
 */
export class UserController
{
    public static async Get(req: Request, res: Response): Promise<any>
    {
        let id: number = parseInt(GetFunctions().valExist(req.query.id)) || 0;
        let username: string = GetFunctions().valExist(req.query.username) || "";
        let owner: number = parseInt(GetFunctions().valExist(req.query.owner)) || 0;
        let sortBy: string = GetFunctions().valExist(req.query.sortBy) || "id";
        let order: string = GetFunctions().valExist(req.query.order) || "DESC";
        let limit: number = parseInt(GetFunctions().valExist(req.query.limit)) || 50;
        let offset: number = parseInt(GetFunctions().valExist(req.query.offset)) || 0;
        let count: boolean = GetFunctions().boolean(req.query.count) || false;

        let returned: any = await MasterDao.UserDao().getUsers(sortBy, order, limit, offset);

        if (id) returned = await MasterDao.UserDao().findUserById(id);

        if (username) returned = await MasterDao.UserDao().findUserByUsername(username);

        if (owner) returned = await MasterDao.UserDao().findUsersByOwner(owner);

        if (count && returned.length) return res.json({ count: returned.length })

        return res.json(returned || { error: "no_response" });
    }
}