import { Request, Response } from "express";
import { AccountDao, MasterDao } from "../../database/daos";
import { GetFunctions, GetFuse } from '../../api'
import * as jwt from "jsonwebtoken";

/*
 * Author: Laynester
 * © - 2021
 */
export class AuthController
{
    public static async Login(req: Request, res: Response): Promise<any>
    {
        let { username, password, token } = req.body;

        if (!username || !password) return res.json({ error: "no fields" });

        if (token)
        {
            try
            {
                var decoded = jwt.verify(token, 'imgay');

                if (!decoded.email) Promise.reject();

                let account = await AccountDao.findAccountByField("email", decoded.email);

                return res.json(await AccountDao.login(account, false));
            } catch (err)
            {
                return res.json({ error: "Unauthenticated" });
            }
        }

        if (username.includes("@"))
        {
            let account = await AccountDao.findAccountByField("email", username);

            if (!account) return res.json({ "error": "no_account" })

            if (!AccountDao.isPassword(password, account)) return res.json({ "error": "invalid_password" })

            return res.json(await AccountDao.login(account))

        } else
        {
            let user = await MasterDao.UserDao().findUserByUsername(username);

            if (!user) return res.json({ "error": "no_account" });

            let account = await AccountDao.findAccountByField("id", user.account.id, false)

            if (!account) return res.json({ "error": "no_account" });

            if (!AccountDao.isPassword(password, account)) return res.json({ "error": "invalid_password" })

            await MasterDao.UserDao().setActiveUser(user.id);

            return res.json(await AccountDao.login(account))
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

        if (!username || !password || !password_confirm || !birthdate || !look || !gender) return res.json({ error: "no fields" })

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