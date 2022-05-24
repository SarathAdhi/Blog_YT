import React from 'react'
import { Label } from './Text'
import clsx from 'clsx'

export const Input = ({type, name, label, placeholder, margin, className, onChange}) => {

    return (
        <div className={clsx('flex flex-col w-full', margin)}>
            {label && <Label label={label} className="text-base text-gray-300" />}
            <input type={type} name={name} placeholder={placeholder} className={clsx("text-black mt-1 px-2 py-2 w-full rounded focus:outline-none", className)} onChange={onChange} />
        </div>
    )
}

export const Textarea = ({name, label, placeholder, margin, className, onChange}) => {

    return (
        <div className={clsx('flex flex-col w-full', margin)}>
            {label && <Label label={label} className="text-base text-gray-300" />}
            <textarea name={name} rows={5} placeholder={placeholder} className={clsx("text-black mt-1 px-2 py-1 w-full rounded focus:outline-none", className)} onChange={onChange} ></textarea>
        </div>
    )
}
