import React, { useState } from 'react'
import AuthResetPassword from '../../common/AuthResetPassword'
import { KeyIcon, MailIcon } from '@heroicons/react/solid'

export default function ResetPassword() {
    return (
        <>
            <AuthResetPassword
                icon={<KeyIcon className="w-8 h-8 mt-3 text-indigo-500" />}
                title="Set new password"
                description={`Your new password must be different to previously used password`}
                buttonTitle="Reset Password"
                handleClick={() => { }}
                label="Password"
                isSettingUpNewPassword
                type='password'

            />
        </>
    )
}
