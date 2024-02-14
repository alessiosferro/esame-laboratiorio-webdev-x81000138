interface UserModel {
    nome: string;
    cognome: string;
    email: string;
    id: string;
}

export interface UserConnected {
    id: string;
    fullName: string;
    socketId: string;
}

export interface UserMessage {
    userId: string;
    fullName: string;
    message: string;
}

export interface UserMove {
    userId: string;
    fullName: string;
    move: string;
}

export default UserModel;