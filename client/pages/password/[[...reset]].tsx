import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import AuthResetPassword from '../../common/AuthResetPassword'
import { CheckIcon, MailIcon } from '@heroicons/react/solid'
import { resetPassword as resetPasswordInterface } from '../../interfaces/resetPassword'
import { apiInstance } from '../../utils/apiInstance'
import Loading from '../../common/Loading'
import { useAuthDispatch, useAuthState } from "../../context/auth"

export default function Reset() {
  const [resetPassword, setResetPassword] = useState<resetPasswordInterface>({
    password: "",
    confirmPassword: "",
    loading: false,
    passwordChanged: false,
    errorMessage: '',
    hasErrors: false

  })
  const dispatch = useAuthDispatch()

  const router = useRouter()
  console.log(router.query.reset)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPassword({
      ...resetPassword,
      [name]: value,
      errorMessage: '',
      hasErrors: false,
    })

  }
  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault();
    const [, email, token] = router.query.reset as Array<string>
    setResetPassword({
      ...resetPassword,
      loading: true
    })
    // if (!resetPassword.password) {
    //   setResetPassword({
    //     ...resetPassword,
    //     errorMessage: 'Password cannot be empty!',
    //     hasErrors: true,
    //     loading: false
    //   })
    //   return;
    // }
    // if (resetPassword.password !== resetPassword.confirmPassword) {
    //   setResetPassword({
    //     ...resetPassword,
    //     errorMessage: 'Passwords are not the same!',
    //     hasErrors: true,
    //     loading: false
    //   })
    //   return;
    // }
    const data = {
      password: resetPassword.password,
      email,
      token
    }
    apiInstance.post('auth/reset/password', data).then(res => {
      setResetPassword({
        ...resetPassword,
        loading: false,
        passwordChanged: true
      })
    }).catch((err: unknown) => {
      setResetPassword({
        ...resetPassword,
        loading: false
      })
    })
  }

  const handleClick = () => {
    router.push("/")
    dispatch('LOGIN')

  }
  return (
    <>
      {resetPassword.loading ? <Loading /> :
        resetPassword.passwordChanged ?
          <AuthResetPassword
            icon={<CheckIcon className="w-8 h-8 mt-3 text-green-500" />}
            title="Password Reset"
            description={`Your password has been succesfully reset. Click Below to log in magically.`}
            buttonTitle="Continue"
            handleClick={handleClick}
            isSettingUpNewPassword={false}
            changebackgroundColor
            hideInput

          /> :
          <AuthResetPassword
            icon={<MailIcon className="w-8 h-8 mt-3 text-indigo-500" />}
            title="Set new password"
            description={`Your new password must be different to previously used passwords.`}
            buttonTitle="Reset password"
            handleClick={handleResetPassword}
            label="Password"
            isSettingUpNewPassword
            name='password'
            value={resetPassword.password}
            confirmPassword={resetPassword.confirmPassword}
            type="password"
            onChange={handleChange}
            hasErrors={resetPassword.hasErrors}
            errorMessage={resetPassword.errorMessage}
          />
      }

    </>

  )
}
