export interface resetPassword {
    password: string,
    confirmPassword: string,
    loading: boolean,
    passwordChanged: boolean,
    errorMessage: string,
    hasErrors: boolean,
}