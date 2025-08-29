import Image from "next/image";
import React from "react";

const Button: React.FC<{
  title: string;
  className?: string;
  icon: string;
  onClick: () => void;
}> = ({ title, className, icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-2 items-center justify-center bg-[#1E6F9F] h-[52px] w-full max-w-[736px] rounded-lg cursor-pointer ${className}`}
    >
      <p className="text-[14px] font-bold text-[#F2F2F2]">{title}</p>
      <Image src={icon} alt={title} width={16} height={16} />
    </button>
  );
};

export default Button;
