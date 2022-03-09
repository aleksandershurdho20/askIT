import React, { useState } from 'react'
import { createSub } from '../../interfaces/Sub'

import Head from 'next/head'
export default function Create() {
    const [subData, setSubData] = useState<createSub>({
        name: '',
        description: '',
        title: '',
        loading: false
    })

    return (
        <>
            <Head>
                <title>Create a Community</title>
            </Head>

        </>
    )
}
