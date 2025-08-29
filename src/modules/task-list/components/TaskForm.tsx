"use client";

import React, { useState } from "react";
import { Task } from "@/types/tasks";
import Button from "./Button";
import Image from "next/image";

const COLOR_OPTIONS = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#A2845E",
];

const TaskForm: React.FC<{
  task?: Task;
  onSubmit: (title: string, color: string) => void;
  setIsListView: (isListView: boolean) => void;
}> = ({ task, onSubmit, setIsListView }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [color, setColor] = useState(task?.color || "#FF3B30");
  const buttonTitle = task ? "Save" : "Add Task";

  return (
    <div className="flex flex-col gap-12 mt-[100px]">
      <button
        type="button"
        onClick={() => setIsListView(true)}
        aria-label="Back"
        className="cursor-pointer"
      >
        <Image src="/back-arrow.svg" alt="" width={14} height={14} />
      </button>
      <form
        className="flex flex-col gap-6 text-[14px] text-[#4EA8DE] font-bold"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(title, color);
        }}
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="task-title">Title</label>
          <input
            type="text"
            id="task-title"
            required
            placeholder="Ex. Brush Your Teeth"
            className="px-4 rounded-lg text-[#F2F2F2] bg-[#262626] h-[52px] border border-[#333333] font-normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <fieldset>
          <legend className="mb-3">Color</legend>
          <div className="flex gap-3">
            {COLOR_OPTIONS.map((hex) => (
              <label key={hex} className="cursor-pointer">
                <input
                  type="radio"
                  name="task-color"
                  value={hex}
                  checked={color === hex}
                  onChange={() => setColor(hex)}
                  className="sr-only peer"
                />
                <span
                  className={`
                  block h-13 w-13 rounded-full 
                  peer-checked:ring-1 peer-checked:ring-offset-1
                `}
                  style={{
                    backgroundColor: hex,
                    borderColor: color === hex ? "white" : "transparent",
                  }}
                />
                <span className="sr-only">Color {hex}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>
      <Button
        title={buttonTitle}
        onClick={() => onSubmit(title, color)}
        icon="/plus-icon.svg"
      />
    </div>
  );
};

export default TaskForm;
