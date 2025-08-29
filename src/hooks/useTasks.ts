"use client";
import { useState, useEffect } from "react";
import { Task } from "@/types/tasks";
import { apiBase } from "@/utils/api";
import toast from "react-hot-toast";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch(`${apiBase()}/tasks`);
      if (!res.ok) throw new Error("There was a problem loading your tasks");
      setTasks(await res.json());
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message ?? "Unknown error");
      toast.error("There was a problem loading your tasks");
    }
  }

  async function create(input: { title: string; color: string }) {
    try {
      const res = await fetch(`${apiBase()}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Failed to create task");

      toast.success("Task created");
      load();
    } catch (err: unknown) {
      toast.error((err as Error).message ?? "Failed to create task");
    }
  }

  async function update(
    id: number,
    patch: Partial<Pick<Task, "title" | "color" | "completed">>
  ) {
    try {
      const res = await fetch(`${apiBase()}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("There was a problem updating the task");

      if (patch.title || patch.color) {
        toast.success("Task updated");
      }
      load();
    } catch (err: unknown) {
      toast.error((err as Error).message ?? "There was a problem updating the task");
    }
  }

  async function remove(id: number) {
    try {
      const res = await fetch(`${apiBase()}/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("There was a problem deleting the task");

      toast.success("Task deleted");
      load();
    } catch (err: unknown) {
      toast.error((err as Error).message ?? "There was a problem deleting the task");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { tasks, error, create, update, remove, reload: load };
}
