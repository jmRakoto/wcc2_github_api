import api from "../config/api";
import { ICountry } from "../interfaces/country";

export class CountryService {
    static getCountryList = async () => {
        try {
            const res = await api.get('all')
            return res.data as ICountry[];
        } catch (error) {
            console.log("error CountryService.getCountryList ==", error);
            return [];
        }
    }
}