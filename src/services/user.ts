import axios, { Axios } from 'axios';
import { Octokit } from 'octokit';
import config from '../config/config';
import { IUser } from "../interfaces";
import { ICountry } from '../interfaces/country';
import { defaultIUser } from '../interfaces/user';

export class UserService {
    
  static getAllUser = async (country: String, page: number, perPage: number, username: string): Promise<any> => {
    
    const octokit = new Octokit({
      auth: config.gitHub.token
    });

    try {
      console.log(country);
      const usernameQuery = username != '' ? ` ${username} in:login` : '';
      
      // TODO: sort by joined date
      const res = await octokit.request(`GET /search/users?q=${encodeURIComponent(`location:${country}${usernameQuery}`)}&page=${page}&per_page=${perPage}&sort=joined`, {});
      
      return res.data as IUser;
    } catch (err) {
      console.log("error UserService.getAllUser ==",err);
      return defaultIUser;
    }
  };
}