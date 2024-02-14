import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import UserModel from "@/model/user.model";

const useGetUserByEmail = (email: string) => {
    return useQuery<UserModel>({
        queryKey: ['get-user-by-email', email],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users?email=${email}`);

            if (!response.data.length) {
                return null;
            }

            return response.data[0];
        },
        enabled: false
    });
}

export default useGetUserByEmail;