"use client";

import React from "react";
import { Task } from "@/types/tasks";
import Image from "next/image";

const TaskCard = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggle: (id: number, next: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}) => {
  const { id, title, completed } = task;

  return (
    <div className="flex items-start justify-between rounded-lg border border-[#333333] bg-[#262626] p-4">
      <label
        htmlFor={`task-${id}`}
        className="relative inline-flex h-[18px] w-[18px] cursor-pointer items-center justify-center"
        aria-label={
          completed
            ? `Mark "${title}" as not completed`
            : `Mark "${title}" as completed`
        }
      >
        <input
          id={`task-${id}`}
          type="checkbox"
          checked={completed}
          onChange={(e) => onToggle(id, e.target.checked)}
          className="peer sr-only"
        />

        <span
          className="
            h-[18px] w-[18px] rounded-full border border-[#4EA8DE]
            transition-colors
            peer-checked:bg-[#8257E5] peer-checked:border-[#8257E5]
          "
        />

        <Image
          src="/check-icon.svg"
          alt=""
          width={10}
          height={7}
          className="
            pointer-events-none absolute
            opacity-0 scale-75 transition-all
            peer-checked:opacity-100 peer-checked:scale-100
          "
        />
      </label>

      <button
        type="button"
        onClick={() => onEdit(task)}
        className={`block flex-1 min-w-0 text-left leading-snug text-[14px] ml-3 font-normal break-words whitespace-normal hyphens-aut cursor-pointer ${
          completed ? "text-[#808080] line-through" : "text-[#F2F2F2]"
        }`}
      >
        {title}
      </button>

      <button
        type="button"
        onClick={() => onDelete(id)}
        aria-label="Delete Task"
        className="flex-shrink-0 hover:opacity-80 cursor-pointer"
      >
        <Image src="/trash-icon.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
};

export default TaskCard;
