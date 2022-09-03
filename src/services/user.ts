import { Octokit } from 'octokit';
import config from '../config/config';
import { IUser } from "../interfaces";
import { ICountry } from '../interfaces/country';
import { defaultIUser } from '../interfaces/user';

export class UserService {
    
  static getAllUser = async (country: ICountry, page: number): Promise<any> => {
    
    const octokit = new Octokit({
      auth: config.gitHub.token
    });

    try {
      // TODO: sort by joined date
      const res = await octokit.request(`GET /search/users?q=${encodeURIComponent(`location:${country}`)}&page=${page}&per_page=50`, {});
      
      return res.data as IUser;
    } catch (err) {
      console.log("error UserService.getAllUser ==",err);
      return defaultIUser;
    }
  };
}