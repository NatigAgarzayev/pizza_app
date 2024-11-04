import React, { useState } from 'react'
import AdminEnter from './AdminEnter'
import Cookies from 'js-cookie';
import AdminLayout from './AdminLayout';
export default function Admin() {

    const [entered, setEntered] = useState(Cookies.get('name') || false)

    return (
        <>
            {
                entered ?
                    <>
                        <AdminLayout />
                    </>
                    :
                    <AdminEnter setEntered={setEntered} />
            }
        </>
    )
}
