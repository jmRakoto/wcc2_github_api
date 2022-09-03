export interface ICountry {
    name: string;
    flags: {
        svg: string;
        png: string;
    }
}

export const defaultCountry: ICountry  = {
    name: "",
    flags: {
        svg: "",
        png: ""
    }
}