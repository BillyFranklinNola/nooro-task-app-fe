import Header from "@/modules/task-list/TasksHeader";
import TasksBody from "@/modules/task-list/TasksBody";
import React from "react";

export default function Home() {
  return (
    <main role="main">
      <Header />
      <TasksBody />
    </main>
  );
}
