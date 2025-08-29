"use client";

import React from "react";
import { Task } from "@/types/tasks";
import TaskCard from "./TaskCard";
import Button from "./Button";
import Image from "next/image";
import TaskTrackers from "./TaskTrackers";

const TaskList: React.FC<{
  tasks: Task[];
  onToggle: (id: number, next: boolean) => void;
  onDelete: (id: number) => void;
  onCreateClick: () => void;
  onEdit: (task: Task) => void;
}> = ({ tasks, onToggle, onDelete, onCreateClick, onEdit }) => {
  const emptyState = tasks.length === 0;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="flex flex-col w-full max-w-[736px]">
      <Button
        title="Create Task"
        onClick={() => onCreateClick()}
        className="mt-[-26px]  mb-[52px]"
        icon="/plus-icon.svg"
      />

      <TaskTrackers total={tasks.length} completed={completedTasks} />
      {emptyState ? (
        <div className="flex flex-col gap-4 w-[736px] h-[266px] items-center py-[64px] px-[24px] mt-6 border-t border-[#333333] text-[16px] text-[#808080] leading-snug">
          <Image
            src="/clipboard-icon.svg"
            alt="clipboard"
            width={52}
            height={52}
          />
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold">
              You don&#39;t have any tasks registered yet.
            </p>
            <p>Create tasks and organize your to-do items.</p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-3 mt-6">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
