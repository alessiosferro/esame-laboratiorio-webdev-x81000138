import {UserMessage, UserMove} from "@/model/user.model";

interface RoomModel {
    messages: UserMessage[];
    moves: UserMove[];
    usersConnected: number;
}

export type Rooms = Record<number, RoomModel>;

export default RoomModel;