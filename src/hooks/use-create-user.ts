import {useMutation} from "@tanstack/react-query";
import RegisterUserModel from "@/model/register-user.model";
import axios from "axios";

const useCreateUser = () => {
    return useMutation<unknown, unknown, RegisterUserModel>({
        mutationKey: ['create-user'],
        mutationFn: async (data) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, data);
            return response.data;
        }
    })
}

export default useCreateUser;