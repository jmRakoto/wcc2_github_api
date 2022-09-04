import axios, { Axios } from 'axios';
import { Octokit } from 'octokit';
import config from '../config/config';
import { IUser } from "../interfaces";
import { ICountry } from '../interfaces/country';
import { defaultIUser } from '../interfaces/user';

export class UserService {
    
  static getAllUser = async (country: String, page: number, perPage: number): Promise<any> => {
    
    const octokit = new Octokit({
      auth: config.gitHub.token
    });

    try {
      console.log(country);
      
      // TODO: sort by joined date
      const res = await octokit.request(`GET /search/users?q=${encodeURIComponent(`location:${country}`)}&page=${page}&per_page=${perPage}`, {});

      let items = res.data.items;

      for (let index in items) {
        const item = items[index];
        const userData = await axios.get(item.url);
        items[index] = {...items[index], join_date: userData.data.created_at}
      }

      items.sort((a: any, b: any) => {
        const aDate = new Date(a.join_date).getTime();
        const bDate = new Date(b.join_date).getTime();

        return aDate - bDate;
      })
      
      return {...res.data, items} as IUser;
    } catch (err) {
      console.log("error UserService.getAllUser ==",err);
      return defaultIUser;
    }
  };
}