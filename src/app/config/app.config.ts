import { User } from "../models/user.model";

export class AppConfig {
    // public MAIN_URL = process.env.SERVER_URI_PROD;
    public MAIN_URL = 'http://localhost:5555/';

    public user: User;
    public connected = false;
    public token: string;
}