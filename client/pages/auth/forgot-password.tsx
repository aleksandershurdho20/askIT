import React, { useState } from 'react'
import AuthResetPassword from '../../common/AuthResetPassword'
import { KeyIcon, ArrowDownIcon } from '@heroicons/react/solid'
import Loading from '../../common/Loading'
import { apiInstance } from '../../utils/apiInstance'

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [hasErrors, setHasErrors] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEmail(value)
        setErrorMessage("")
        setHasErrors(false)
    }

    const handleResetPasswordClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        if (!email) {
            setErrorMessage("Email Cannot be empty!")
            setHasErrors(true)
            return;
        }
        else {

            try {
                setLoading(true)
                await apiInstance.post('auth/request/password', { email })

            } catch (error) {
                setHasErrors(true)
                setErrorMessage("Email not found!")
            }
            finally {
                setLoading(false)
            }
        }
    }
    return (
        <div>
            {loading ? <Loading /> :
                <AuthResetPassword
                    icon={<KeyIcon className="w-10 h-10 text-indigo-500" />}
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
                />}
        </div>
    )
}
