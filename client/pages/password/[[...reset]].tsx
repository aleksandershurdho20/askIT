import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import AuthResetPassword from '../../common/AuthResetPassword'
import { KeyIcon, MailIcon } from '@heroicons/react/solid'
import { resetPassword as resetPasswordInterface } from '../../interfaces/resetPassword'
import { apiInstance } from '../../utils/apiInstance'
export default function Reset() {
  const [resetPassword, setResetPassword] = useState<resetPasswordInterface>({
    password: "",
    confirmPassword: "",
    loading: false

  })
  const router = useRouter()
  console.log(router.query.reset)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPassword({
      ...resetPassword,
      [name]: value
    })

  }
  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault();
    const [, email, token] = router.query.reset as Array<string>
    const data = {
      password: resetPassword.password,
      email,
      token
    }
    apiInstance.post('auth/reset/password', data).then(res => console.log(res)).catch(err => console.log(err))
  }


  return (
    <>

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
      />
    </>

  )
}
