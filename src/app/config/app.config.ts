import { UserData } from "../models/user.model";

class ProjectRoles {
    constructor(
        public OWNER?: string,
        public DEV?: string,
        public VIEWER?: string,
    ) {}
}
class State {
    constructor(
        public OPENED?: string,
        public CLOSED?: string,
    ) {}
}
class Type {
    constructor(
        public PUBLIC?: string,
        public PRIVATE?: string,
    ) {}
}

export class AppConfig {
    public MAIN_URL = 'http://localhost:5555/';

    public user: UserData;
    public connected = false;
    public token: string;
    public roles = [
        {value: 'ADMIN', title: 'ADMIN'},
        {value: 'USER', title: 'USER'},
    ];
    public project_roles = new ProjectRoles('OWNER', 'DEV', 'VIEWER');
    public state = new State('Opened', 'Closed');
    public type = new Type('public', 'private');
}