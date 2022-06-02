import React from 'react'
import s from "./404.module.css"

function Page404() {
    return (
        <div className={s.error}>
            <div className={s.title}>404</div>
            <div>Page not found!</div>
            <div>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
        </div>
    )
}

export default Page404

