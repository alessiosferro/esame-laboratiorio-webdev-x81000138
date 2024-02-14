import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import UserModel from "@/model/user.model";

const useGetUsers = () => {
    return useQuery<UserModel[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const users = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

            return users.data;
        }
    });
}

export default useGetUsers;