import { Request, Response } from "express";
import { AccountDao, MasterDao } from "../../database/daos";
import { GetFunctions, GetFuse } from '../../api'

/*
 * Author: Laynester
 * © - 2021
 */
export class AuthController
{
    public static async Login(req: Request, res: Response): Promise<any>
    {
        let { field, password } = req.params;

        if (field.includes("@"))
        {
            let account = await AccountDao.findAccountByField("email", field);

            if (!account) return res.json({ "error": "auth_no_account" })

            if (!AccountDao.isPassword(password, account)) return res.json({ "error": "auth_invalid_password" })

            return res.json(await AccountDao.login(account))

        } else
        {
            let account = MasterDao.UserDao().findUserByUsername(field);
        }
    }

    public static async Register(req: Request, res: Response): Promise<any>
    {
        let { username,
            email,
            password,
            password_confirm,
            birthdate,
            look, gender } = req.body;

        if (await MasterDao.UserDao().findUserByUsername(username)) return res.json({ error: "username_taken" });

        if (await AccountDao.findAccountByField("email", email)) return res.json({ error: "email_taken" });

        if (password !== password_confirm) return res.json({ error: "passwords_no_match" });

        let birthYear = birthdate.split("-")[0];

        if (!await GetFunctions().meetsAge(birthYear)) return res.json({ error: "not_age" });

        let account = await AccountDao.createAccount(email, password, birthdate);

        await MasterDao.UserDao().createUser(account.id, username, email, look, gender, req.ip.split(":").pop());

        return res.json(await AccountDao.login(account));
    }
}