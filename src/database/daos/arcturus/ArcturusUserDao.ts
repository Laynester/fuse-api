import { IUserDao } from "../interfaces";
import { UserEntity } from "../../entities/arcturus";
import { UserObject } from "../../objects";
import moment = require("moment");
import { AccountDao } from "..";

/*
 * Author: Laynester
 * © - 2021
 */
export class ArcturusUserDao extends IUserDao
{
    public async createUser(owner_id: number, username: string, mail: string, look: string, gender: string, ip: any): Promise<UserObject>
    {
        let user = new UserEntity();

        user.owner_id = owner_id;
        user.username = username;
        user.mail = mail;
        if (look) user.look = look;
        user.gender = gender;
        user.ip_register = ip;
        user.ip_current = ip;
        user.account_created = moment().unix()
        user.last_login = moment().unix()
        user.last_online = moment().unix();

        await user.save();

        user.account = await AccountDao.findAccountByField("id", owner_id);

        return new UserObject(user);
    }

    public async findUserById(id: number): Promise<UserObject>
    {
        let entity = await UserEntity.createQueryBuilder("user")
            .where({ "id": id })
            .leftJoinAndSelect("user.account", "account")
            .getOne();

        if (!entity) return null;

        return new UserObject(entity);
    }

    public async findUserByOwner(owner: number): Promise<UserObject>
    {
        let entity = await UserEntity.createQueryBuilder("user")
            .where({ "owner_id": owner })
            .orderBy("user.last_login", "DESC")
            .leftJoinAndSelect("user.account", "account")
            .getOne();

        if (!entity) return null;

        return new UserObject(entity);
    }

    public async findUserByEmail(email: string): Promise<UserObject>
    {
        let entity = await UserEntity.createQueryBuilder("user")
            .where({ "mail": email })
            .orderBy("user.last_login", "DESC")
            .leftJoinAndSelect("user.account", "account")
            .getOne();

        if (!entity) return null;

        return new UserObject(entity);
    }

    public async findUserByUsername(username: string): Promise<UserObject>
    {
        let entity = await UserEntity.createQueryBuilder("user")
            .where({ "username": username })
            .orderBy("user.last_login", "DESC")
            .leftJoinAndSelect("user.account", "account")
            .getOne();

        if (!entity) return null;

        return new UserObject(entity);
    }

    public async findUsersByOwner(owner: number): Promise<UserObject[]>
    {
        let entity = await UserEntity.createQueryBuilder("user")
            .where({ "owner_id": owner })
            .leftJoinAndSelect("user.account", "account")
            .getMany();

        if (!entity.length) return null;

        let entities = [];

        entity.forEach(val => entities.push(new UserObject(val)))

        return entities;
    }

    public async getUsers(sort: string = "id", order: any = "DESC", limit: number = 50, offset: number = 50): Promise<UserObject[]>
    {
        let users = await UserEntity.createQueryBuilder("user")
            .leftJoinAndSelect("user.account", "account")
            .orderBy("user." + sort, order)
            .limit(limit)
            .offset(offset)
            .getMany();

        let objects = [];

        users.forEach(entity => objects.push(entity));

        return objects;
    }
}