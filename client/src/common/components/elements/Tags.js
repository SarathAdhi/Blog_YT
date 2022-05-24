import React from 'react'
import { P } from './Text'

export const Tags = ({ children }) => {
    return (
        <P className="text-black my-1 text-center rounded-2xl px-2 py-1 mr-2 bg-white">
            {children}
        </P>
    )
}
