"use client";

import React, { useState } from "react";
import { Task } from "@/types/tasks";
import { useTasks } from "@/hooks/useTasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Dialog from "./components/Dialog";
import toast from "react-hot-toast";

const TasksBody: React.FC = () => {
  const { tasks, error, create, update, remove } = useTasks();
  const [isListView, setIsListView] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const onToggle = (id: number, next: boolean) =>
    update(id, { completed: next });

  const onRequestDelete = (id: number) => {
    setPendingDeleteId(id);
    setShowDialog(true);
  };

  const onConfirmDelete = () => {
    if (pendingDeleteId !== null) {
      remove(pendingDeleteId);
      setPendingDeleteId(null);
    }
    setShowDialog(false);
  };

  const onCancelDelete = () => {
    setPendingDeleteId(null);
    setShowDialog(false);
  };

  const onEdit = (task: Task) => {
    setIsListView(false);
    setSelectedTask(task);
  };

  const onCreateClick = () => {
    setIsListView(false);
    setSelectedTask(undefined);
  };

  async function onSubmit(title: string, color: string) {
    if (!/[A-Za-z]/.test(title)) {
      toast.error("Title must contain at least one letter");
      return;
    }

    if (selectedTask) {
      await update(selectedTask.id, { title, color });
    } else {
      await create({ title, color });
    }
    setIsListView(true);
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <main className="flex flex-col items-center h-[calc(100vh-200px)] w-full bg-[#1a1a1a] max-md:px-4 max-md:pb-4">
      {isListView ? (
        <TaskList
          tasks={tasks}
          onToggle={onToggle}
          onDelete={onRequestDelete}
          onCreateClick={onCreateClick}
          onEdit={onEdit}
        />
      ) : (
        <TaskForm
          task={selectedTask}
          onSubmit={onSubmit}
          setIsListView={setIsListView}
        />
      )}
      <Dialog
        show={showDialog}
        title="Are you sure you want to delete this task?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </main>
  );
};

export default TasksBody;
