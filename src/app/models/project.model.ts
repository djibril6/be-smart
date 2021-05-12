export interface IProject {
    success?: boolean;
    message?: string;
    result?: ProjectData;
    token?: string;
}

export interface IAllProject {
    success?: boolean;
    message?: string;
    result?: ProjectData[];
}

export interface ProjectData {
    _id?: string;
    name?: string;
    type?: string;
    users?: {
        id: string,
        firstname: string,
        lastname: string,
        email: string,
        role: string,
        state: boolean
    }[];
    state?: string;
    color?: string;
    link?: string;
    cards?: {
        _id: string,
        name: string
    }[];
    tasks?: {
        _id: string,
        description: string,
        users: {
            id: string,
            name: string,
            email: string,
            role: string
        }[],
        endDate: Date,
        comment: string,
        cards: string,
        state: string
    }[];
}

export class Project implements IProject {
    constructor(
        public success?: boolean,
        public message?: string,
        public result?: ProjectData,
        public token?: string
    ) {}
}

export class AllProject implements IAllProject {
    constructor(
        public success?: boolean,
        public message?: string,
        public result?: ProjectData[],
    ) {}
}