import { FuseAPI } from "../../../main";
import { ArcturusUserDao } from "../arcturus";
import { IUserDao } from "../interfaces";

/*
 * Author: Laynester
 * © - 2021
 */
export class MasterDao
{
    public static _userDao: IUserDao;

    public static UserDao(): IUserDao
    {
        return MasterDao._userDao;
    }

    public static SortDaos(): void
    {
        switch (FuseAPI.getInstance().config.general.db_schema)
        {
            case "arcturus":
            default:
                MasterDao._userDao = new ArcturusUserDao();
        }
    }
}

