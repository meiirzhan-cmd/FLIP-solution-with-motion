import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type Status, columns, initialTasks, getNextStatus } from "../lib/data";

// Everything that moves has layout prop:
//   Parent (column)  → height animates when cards enter/leave
//   Child (card)     → slides to new column via FLIP
//   Sibling (other cards) → shift up/down via FLIP
//
// All using GPU compositor. No layout reflow during animation.
// ============================================================

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: getNextStatus(t.status) } : t
      )
    );
  };

  const getCount = (status: Status) =>
    tasks.filter((t) => t.status === status).length;

  return (
    <div className="grid grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);
        return (
          // ▼ Column itself has layout — height animates
          <motion.div
            key={column.id}
            layout
            className={`rounded-xl ${column.bgColor} border-t-4 ${column.color} p-4`}
            transition={{
              layout: { type: "spring", stiffness: 300, damping: 30 },
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${column.dotColor}`} />
              <h2 className="font-semibold text-gray-700">{column.title}</h2>
              <motion.span
                layout
                className="ml-auto bg-white text-gray-600 text-xs font-medium
                           px-2 py-0.5 rounded-full shadow-sm"
              >
                {getCount(column.id)}
              </motion.span>
            </div>

            <div className="space-y-3 min-h-60px">
              <AnimatePresence mode="popLayout">
                {columnTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    layoutId={task.id}
                    onClick={() => moveTask(task.id)}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200
                               cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      },
                      opacity: { duration: 0.15 },
                      scale: { duration: 0.15 },
                    }}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${task.tagColor}`}
                      >
                        {task.tag}
                      </span>
                      <span className="text-xs text-gray-400">
                        → {getNextStatus(task.status)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
