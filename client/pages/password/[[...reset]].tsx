import React, { useState } from 'react'
import { useRouter } from 'next/router'
import AuthResetPassword from '../../common/AuthResetPassword'
import { KeyIcon, MailIcon } from '@heroicons/react/solid'
import { resetPassword as resetPasswordInterface } from '../../interfaces/resetPassword'
export default function Reset() {
  const [resetPassword, setResetPassword] = useState<resetPasswordInterface>({
    password: "",
    confirmPassword: "",
    loading: false

  })
  const router = useRouter()
  console.log(router.query)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPassword({
      ...resetPassword,
      [name]: value
    })

  }
  return (
    <>

      <AuthResetPassword
        icon={<MailIcon className="w-8 h-8 mt-3 text-indigo-500" />}
        title="Set new password"
        description={`Your new password must be different to previously used passwords.`}
        buttonTitle="Reset password"
        handleClick={() => { }}
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
