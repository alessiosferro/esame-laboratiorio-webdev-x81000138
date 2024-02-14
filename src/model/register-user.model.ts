import LoginUserModel from "@/model/login-user.model";

interface RegisterUserModel extends LoginUserModel {
    name: string;
    surname: string;
}

export default RegisterUserModel;