import clsx from "clsx";
import { NextPage } from "next";

interface Props {
  className?: string;
  onClick?: any;
  children?: string;
  disable?: boolean;
}

const Button: NextPage<Props> = ({ className, onClick, disable = false, children }) => {
  return (
    <button
      disabled={disable}
      className={clsx(
        "border-0 bg-green-600 text-lg font-bold px-4 py-1 rounded duration-300 hover:rounded-xl",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button
