import { ConfigEntity } from "../../entities";

/*
 * Author: Laynester
 * © - 2021
 */
export class ConfigDao
{
    public static async findSetting(key: string): Promise<ConfigEntity>
    {
        const config: ConfigEntity = await ConfigEntity
            .createQueryBuilder("setting")
            .where("setting.key = :key", { key: key })
            .getOne();

        return config;
    }
    public static async loadSettings(): Promise<ConfigEntity[]>
    {
        const list: ConfigEntity[] = await ConfigEntity.createQueryBuilder("config").getMany();

        return list;
    }
}