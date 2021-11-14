import { UserObject } from "../../objects";

/*
 * Author: Laynester
 * © - 2021
 */
export class IUserDao
{
    public async getUsers(sort: string = "id", order: any = "DESC", limit: number = 50, offset: number = 0): Promise<UserObject[]> { return };

    public async createUser(owner_id: number, username: string, mail: string, look: string, gender: string, ip: any): Promise<UserObject> { return };

    public async findUserById(id: number): Promise<UserObject> { return };

    public async findUserByOwner(owner: number): Promise<UserObject> { return };

    public async findUserByEmail(email: string): Promise<UserObject> { return };

    public async findUserByUsername(username: string): Promise<UserObject> { return };

    public async findUsersByOwner(owner: number): Promise<UserObject[]> { return };

}