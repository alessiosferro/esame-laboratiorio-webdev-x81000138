interface UserModel {
    nome: string;
    cognome: string;
    email: string;
    id: string;
}

export interface UserConnected {
    id: string;
    socketId: string;
}

export interface UserMessage {
    userId: string;
    message: string;
}

export default UserModel;