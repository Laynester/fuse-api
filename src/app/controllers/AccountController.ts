import { Request, Response } from "express";
import { GetFunctions } from "../../api";
import { AccountDao, MasterDao } from "../../database/daos";

/*
 * Author: Laynester
 * © - 2021
 */
export class AccountController
{
    public static async Get(req: Request, res: Response): Promise<any>
    {
        let id: number = parseInt(GetFunctions().valExist(req.query.id)) || null;
        let email: string = GetFunctions().valExist(req.query.email) || null;
        let sortBy: string = GetFunctions().valExist(req.query.sortBy) || "id";
        let order: string = GetFunctions().valExist(req.query.order) || "DESC";
        let limit: number = parseInt(GetFunctions().valExist(req.query.limit)) || 50;
        let offset: number = parseInt(GetFunctions().valExist(req.query.offset)) || 0;
        let count: boolean = GetFunctions().boolean(req.query.count) || false;

        let returned: any = await AccountDao.getAccounts(sortBy, order, limit, offset)

        if (id) returned = await AccountDao.findAccountByField("id", id);

        if (email) returned = await AccountDao.findAccountByField("email", email);

        if (count && returned.length) return res.json({ count: returned.length })

        return res.json(returned || { error: "no_response" });
    }
}