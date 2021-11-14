import { AccountEntity } from "..";

/*
 * Author: Laynester
 * © - 2021
 */
export class UserObject
{
    public id: number;
    public owner_id: number;
    public username: string;
    public real_name: string;
    public password: string;
    public mail: string;
    public mail_verified: number;
    public account_created: number;
    public account_day_of_birth: number;
    public last_login: number;
    public last_online: number;
    public motto: string;
    public look: string;
    public gender: string;
    public rank: number;
    public credits: number;
    public pixels: number;
    public points: number;
    public online: number;
    public auth_ticket: string;
    public ip_register: string;
    public ip_current: string;
    public machine_id: string;
    public home_room: number;
    public account: AccountEntity;

    constructor(obj: UserObject)
    {
        this.id = obj.id;
        this.owner_id = obj.owner_id;
        this.username = obj.username;
        this.real_name = obj.real_name;
        this.password = obj.password;
        this.mail = obj.mail;
        this.mail_verified = obj.mail_verified;
        this.account_created = obj.account_created;
        this.account_day_of_birth = obj.account_day_of_birth;
        this.last_login = obj.last_login;
        this.last_online = obj.last_online;
        this.motto = obj.motto;
        this.look = obj.look;
        this.gender = obj.gender;
        this.rank = obj.rank;
        this.credits = obj.credits;
        this.pixels = obj.pixels;
        this.points = obj.points;
        this.online = obj.online;
        this.auth_ticket = obj.auth_ticket;
        this.ip_register = obj.ip_register;
        this.ip_current = obj.ip_current;
        this.machine_id = obj.machine_id;
        this.home_room = obj.home_room;
        this.account = obj.account;
    }
}