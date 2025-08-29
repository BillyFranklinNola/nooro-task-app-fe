import React from "react";
import Image from "next/image";

const TasksHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-center h-[200px] bg-[#0D0D0D]">
      <div className="flex items-center gap-2 text-[40px] font-extrabold">
        <Image
          src="/rocket-icon.svg"
          alt="Logo"
          width={22}
          height={36}
          className="mt-3"
        />

        <h1 className="text-[#4ea8de]">
          Todo <span className="text-[#5E60CE]">App</span>
        </h1>
      </div>
    </header>
  );
};

export default TasksHeader;
