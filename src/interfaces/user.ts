export interface IItem {
    id: number;
    login: string;
    avatar_url: string;
    join_date: string;
    // location: string;
    // created_at: string;
}

export default interface IUser {
    total_count: number;
    items: IItem[];
}


export const defaultIUser: IUser = {total_count: 0, items: []};

export const defaultUser: IItem = {
    id: 0,
    login: "",
    avatar_url: "",
    join_date: "",
}
