import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Task({ key1, element, tasks, setTasks }) {
  let removeTask = () => {
    let anotherTemp = [...tasks];

    anotherTemp.splice(key1, 1);
    setTasks(anotherTemp);
    localStorage.setItem("tasks", JSON.stringify(anotherTemp));

    let retreiveTask = () => {
      setTasks([...tasks]);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    toast(
      <div className="p-1 ">
        مسحتها بالغلط؟{" "}
        <button
          onClick={retreiveTask}
          className="ml-2 px-4 py-1.5 text-xs font-semibold text-white bg-transparent border border-white/20 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
        >
          {" "}
          undo?
        </button>
      </div>,
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="glass-task-item w-full p-4 flex items-center "
      dir="auto"
    >
      <div className="flex items-start gap-2 flex-1 min-w-0 ">
        {key1 + 1}- &nbsp;&nbsp;
        <p className="text-white font-medium break-words text-[15px] md:text-xl">
          {element}
        </p>
      </div>
      <button
        onClick={removeTask}
        className="text-[10px] ml-auto px-4 py-2 text-sm font-semibold text-red-400 bg-white/[0.03] border border-white/[0.05] rounded-xl transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 active:scale-95  md:text-xl"
      >
        Remove
      </button>
    </motion.div>
  );
}
