import { GetFuse } from ".";
import { ConfigDao } from "../database";

/*
 * Author: Laynester
 * © - 2021
 */
export function GetFunctions()
{
    function valExist(val)
    {
        if (val) return val.toString();

        return false;
    }

    function boolean(val)
    {
        return (val === "true")
    }

    async function meetsAge(val: number)
    {
        let ageLimit: any = await ConfigDao.findSetting("age_limit");

        ageLimit = ageLimit.value.split("-");

        if (val >= ageLimit[0] && val <= ageLimit[1]) return true;

        return false;
    }

    return { valExist, boolean, meetsAge }
}