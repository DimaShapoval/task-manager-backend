export interface IUserAuth {
    email: string;
    password: string;   
}

export interface IJwtPayload {
    email: string;
    isEmailConfirmed: boolean;

}