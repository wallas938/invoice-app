export interface UserCreateDto {
    firstName: string;
    lastName: string;
    profileImage?: any;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
    password: string;
}