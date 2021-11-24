import { ConfigDao } from "../database/daos";
import { ConfigEntity } from "../database/entities/fuse/ConfigEntity";

/*
 * Author: Laynester
 * © - 2021
 */
export class Setup
{
    constructor()
    {
        this.config();
    }

    private async config(): Promise<void>
    {
        await this.insertConfig("theme", "seven");
        await this.insertConfig("hotel", "Holo");
        await this.insertConfig("hotel_shortname", "user");
        await this.insertConfig("figuredata_json", "/nitro/gamedata/json/figuredata.json");
        await this.insertConfig("figuremap_json", "/nitro/gamedata/json/figuremap.json");
        await this.insertConfig("habbo_imager", "https://www.habbo.com/habbo-imaging/avatarimage?figure=");
        await this.insertConfig("age_limit", "1990-2009");
        await this.insertConfig("default_avatar", "lg-270-82.hd-180-1.ch-210-66.sh-290-81.hr-100-40");
    }

    private async insertConfig(key: string, value: string): Promise<void>
    {
        if (!await ConfigDao.findSetting(key))
        {
            ConfigEntity.insert({ key, value });
        }
    }
}