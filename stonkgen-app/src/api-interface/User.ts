export interface IUser {
    userName: string;
    fullName: string;
    sessionId: string;
    admin:boolean;
}

export interface IUserListForAdmin {
    fullName: string;
    userName: string;
}