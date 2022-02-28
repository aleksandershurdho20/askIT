import React, { useState } from 'react'
import AuthResetPassword from '../../common/AuthResetPassword'
import { KeyIcon, MailIcon } from '@heroicons/react/solid'
import Loading from '../../common/Loading'
import { apiInstance } from '../../utils/apiInstance'

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [hasErrors, setHasErrors] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEmail(value)
        setErrorMessage("")
        setHasErrors(false)
    }

    const handleResetPasswordClick = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage("Email Cannot be empty!")
            setHasErrors(true)
            return;
        }
        else {
            setLoading(true)

            try {
                setLoading(false)
                await apiInstance.post('auth/request/password', { email })
                setIsEmailSent(true)
            } catch (error) {
                setHasErrors(true)
                setErrorMessage("Email not found!")
            }
            finally {
                setLoading(false)
            }
        }
    }
    const handleOpenEmail = () => window.open("https://mail.google.com/mail/u/0/#inbox", "blank")
    return (
        <div>
            {loading ? <Loading /> :
                isEmailSent ?
                    <AuthResetPassword
                        icon={<MailIcon className="w-8 h-8 mt-3 text-indigo-500" />}
                        title="Check your email"
                        description={`We sent a password reset link to ${email}`}
                        buttonTitle="Open Email App"
                        handleClick={handleOpenEmail}
                        hideInput={isEmailSent}
                    /> :
                    <AuthResetPassword
                        icon={<KeyIcon className="w-8 h-8 mt-3 text-indigo-500" />}
                        title="Forgot Password?"
                        description="No worries, we'll send you reset instructions."
                        buttonTitle="Reset Password"
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        handleClick={handleResetPasswordClick}
                        hasErrors={hasErrors}
                        errorMessage={errorMessage}
                    />
            }
        </div>
    )
}
