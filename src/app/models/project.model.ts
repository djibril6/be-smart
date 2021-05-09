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
    cards?: {
        name: string
    }[];
    tasks?: {
        _id: string,
        description: string,
        user: {
            id: string,
            name: string,
            email: string,
        },
        endDate: Date,
        comment: string,
        cards: string
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