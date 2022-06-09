import React from 'react';
import clsx from 'clsx'

export const Divider = ({ className }) => {
    return <hr className={clsx("border-none h-[0.5px] bg-gray-700 w-full", className)} />;
}
