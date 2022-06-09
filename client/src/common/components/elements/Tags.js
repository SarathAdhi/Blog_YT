import clsx from 'clsx'
import React from 'react'
import { P } from './Text'

export const Tags = ({ className, children }) => {
    return (
        <P className={clsx("text-black my-1 text-center rounded px-2 py-1 mr-2 bg-white duration-300 hover:rounded-xl hover:bg-indigo-600 hover:text-white", className)}>
            {children}
        </P>
    )
}
