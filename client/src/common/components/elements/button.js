import clsx from 'clsx'
import React from 'react'

export const Button = ({className, onClick, children}) => {
    return (
        <button className={clsx('border-0 bg-green-600 text-lg font-bold px-4 py-1 rounded duration-300 hover:rounded-xl', className)} onClick={onClick}>{children}</button>
    )
}
