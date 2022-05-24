import React from 'react';
import clsx from 'clsx'

export const Divider = ({ className }) => {
    return <hr className={clsx("border-none h-px bg-slate-500 w-full", className)} />;
}
