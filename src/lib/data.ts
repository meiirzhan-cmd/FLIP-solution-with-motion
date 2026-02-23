export type Status = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  status: Status;
}

export interface Column {
  id: Status;
  title: string;
  color: string;
  bgColor: string;
  dotColor: string;
}

export const columns: Column[] = [
  {
    id: "todo",
    title: "Todo",
    color: "border-amber-400",
    bgColor: "bg-amber-50",
    dotColor: "bg-amber-400",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "border-blue-400",
    bgColor: "bg-blue-50",
    dotColor: "bg-blue-400",
  },
  {
    id: "done",
    title: "Done",
    color: "border-emerald-400",
    bgColor: "bg-emerald-50",
    dotColor: "bg-emerald-400",
  },
];

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Set up project structure",
    tag: "Setup",
    tagColor: "bg-purple-100 text-purple-700",
    status: "todo",
  },
  {
    id: "task-2",
    title: "Design database schema",
    tag: "Backend",
    tagColor: "bg-blue-100 text-blue-700",
    status: "todo",
  },
  {
    id: "task-3",
    title: "Create API endpoints",
    tag: "Backend",
    tagColor: "bg-blue-100 text-blue-700",
    status: "todo",
  },
  {
    id: "task-4",
    title: "Build login page",
    tag: "Frontend",
    tagColor: "bg-green-100 text-green-700",
    status: "in-progress",
  },
  {
    id: "task-5",
    title: "Write unit tests",
    tag: "Testing",
    tagColor: "bg-orange-100 text-orange-700",
    status: "in-progress",
  },
  {
    id: "task-6",
    title: "Configure CI/CD pipeline",
    tag: "DevOps",
    tagColor: "bg-red-100 text-red-700",
    status: "done",
  },
];

export function getNextStatus(current: Status): Status {
  const order: Status[] = ["todo", "in-progress", "done"];
  const index = order.indexOf(current);
  return order[(index + 1) % order.length];
}
