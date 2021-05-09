export interface IUser {
    success?: boolean;
    message?: string;
    result?: UserData;
    token?: string;
}

export interface IAllUser {
    success?: boolean;
    message?: string;
    result?: UserData[];
}

interface UserData {
    _id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    pass?: string;
    role?: string;
    state?: boolean;
    createBy?: {
        id: string,
        name: string
    };
}

export class User implements IUser {
    constructor(
        public success?: boolean,
        public message?: string,
        public result?: UserData,
        public token?: string
    ) {}
}

export class AllUser implements IAllUser {
    constructor(
        public success?: boolean,
        public message?: string,
        public result?: UserData[],
    ) {}
}