import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Task({ key1, task, isDeleted, tasks, setTasks }) {
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    const checkToast = () => {
      setIsToastOpen(toast.isActive("deleteToast"));
    };

    const interval = setInterval(checkToast, 300);
    return () => clearInterval(interval);
  }, []);

  let removeTask = () => {
    if (isToastOpen || toast.isActive("deleteToast")) {
      return;
    }

    setIsToastOpen(true);
    toast.dismiss();

    setTasks((prevtasks) => {
      let update = [...prevtasks];
      const actualIndex = prevtasks.findIndex((t) => t.id === task.id);
      if (actualIndex !== -1) {
        update[actualIndex].isDeleted = true;
      }
      localStorage.setItem("tasks", JSON.stringify(update));
      return update;
    });

    let retreiveTask = () => {
      setTasks((prevtasks) => {
        let anotherTemp = [...prevtasks];
        const actualIndex = prevtasks.findIndex((t) => t.id === task.id);
        if (actualIndex !== -1) {
          anotherTemp[actualIndex].isDeleted = false;
        }
        localStorage.setItem("tasks", JSON.stringify(anotherTemp));
        return anotherTemp;
      });
      toast.dismiss("deleteToast");
      setIsToastOpen(false);
    };

    toast(
      <div className="p-1 ">
        مسحتها بالغلط؟{" "}
        <button
          onClick={retreiveTask}
          className="ml-2 px-4 py-1.5 text-xs font-semibold text-white bg-transparent border border-white/20 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
        >
          undo?
        </button>
      </div>,
      {
        toastId: "deleteToast",
        onClose: () => setIsToastOpen(false),
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="glass-task-item w-full p-4 flex items-center overflow-hidden "
      dir="auto"
    >
      <div className="flex items-start gap-2 flex-1 min-w-0 ">
        {key1 + 1}- &nbsp;&nbsp;
        <p className="text-white font-medium break-words text-[15px] md:text-xl">
          {task.text}
        </p>
      </div>
      <button
        disabled={isToastOpen}
        onClick={removeTask}
        className={`text-[10px] ml-auto px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 md:text-xl ${
          isToastOpen
            ? "bg-gray-500/10 text-gray-500 border-gray-500/20 cursor-not-allowed opacity-50"
            : "text-red-400 bg-white/[0.03] border border-white/[0.05] hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 active:scale-95"
        }`}
      >
        Remove
      </button>
    </motion.div>
  );
}
