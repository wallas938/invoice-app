import { ProfileImage } from "../picture/pictureDto";

export interface UserGetDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    profileImage?: ProfileImage,
    postCode: string;
    country: string;
}
