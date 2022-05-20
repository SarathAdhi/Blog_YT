import React from 'react'
import Link from 'next/link'

export const Links = ({ href, className, onClick, children }) => {
    return (
        <Link href={href} >
            <a className={className} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}
