import React from 'react';
import clsx from 'clsx'


export const H1 = ({ className, children }) => {
    return (
        <h1 className={clsx("font-semibold text-5xl", className)}>{children}</h1>
    )
}

export const H2 = ({ className, children }) => {
    return (
        <h2 className={clsx("font-semibold text-3xl", className)}>{children}</h2>
    )
}

export const H3 = ({ className, children }) => {
    return (
        <h3 className={clsx("font-semibold text-xl", className)}>{children}</h3>
    )
}

export const H4 = ({ className, children }) => {
    return (
        <h4 className={clsx("font-semibold text-lg", className)}>{children}</h4>
    )
}

export const H5 = ({ className, children }) => {
    return (
        <h5 className={clsx("font-semibold text-sm", className)}>{children}</h5>
    )
}

export const H6 = ({ className, children }) => {
    return (
        <h6 className={clsx("font-semibold text-xs", className)}>{children}</h6>
    )
}

export const P = ({ className, children }) => {
    return (
        <p className={clsx("font-normal text-xm", className)}>{children}</p>
    )
}

export const Label = ({ label, className }) => {
    return (
        <label className={clsx("font-normal", className)}>{label}</label>
    )
}
