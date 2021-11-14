import { AccountEntity } from "../../";
import bcrypt = require('bcryptjs');
import { MasterDao } from "./";
import * as jwt from "jsonwebtoken";
import { FuseAPI } from "../../../main";
import moment = require("moment");

/*
 * Author: Laynester
 * © - 2021
 */
export class AccountDao
{
    public static async createAccount(email: string, password: string, birthdate: string): Promise<AccountEntity>
    {
        let account = new AccountEntity();

        account.email = email;
        account.password = bcrypt.hashSync(password, 8);
        account.birthdate = birthdate;
        account.lastLogin = moment().unix();

        await account.save();

        let created = await AccountDao.findAccountByField("email", email);

        account['id'] = created.id;

        return account;
    }

    public static async getAccounts(sort: string = "id", order: any = "DESC", limit: number = 50, offset: number = 0): Promise<AccountEntity[]>
    {
        return await AccountEntity.createQueryBuilder("accounts")
            .orderBy(sort, order)
            .limit(limit)
            .offset(offset)
            .getMany();
    }

    public static async findAccountByField(field: string, value: any): Promise<AccountEntity>
    {
        let entity = AccountEntity.createQueryBuilder("account").where(`account.${field}=:value`, { value: value }).getOne();

        return entity;
    }

    public static async isPassword(password: string, account: AccountEntity): Promise<boolean>
    {
        return bcrypt.compareSync(password, account.password);
    }

    public static async login(account: AccountEntity, token: boolean = true)
    {
        let data = {};

        if (token) data['token'] = this.getToken(account);
        data['account'] = account;
        data['habbo'] = await MasterDao.UserDao().findUserByOwner(account.id)
        return data;
    }

    public static getToken(account: AccountEntity): string
    {
        if (!account) return;
        return jwt.sign(
            { id: account.id, email: account.email },
            FuseAPI.getInstance().config.general.auth_secret_key,
        );
    }
}