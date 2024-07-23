export interface AuthLogin {
    email: string,
    password: string
}

export interface RegisterUser {
    user_name: string,
    email: string,
    password: string,
    confirmPassword?: string,
}