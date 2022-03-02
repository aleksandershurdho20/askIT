
export interface forgotPassword {
    icon: React.ReactNode,
    title: string,
    description: string,
    buttonTitle: string,
    confirmEmailDescription?: string,
    label?: string,
    placeholder?: string,
    isSettingUpNewPassword?: boolean,
    type?: string,
    name?: string,
    value?: string,
    hasErrors?: boolean,
    errorMessage?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClick: (e: React.FormEvent) => void,
    hideInput?: boolean,
    confirmPassword?: string,
    changebackgroundColor?: boolean

}



