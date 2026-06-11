import { UNSAFE_shouldHydrateRouteLoader } from "react-router-dom";
import MyLoader from "./components/MyLoader";
import { useEffect, useRef, useState } from "react";
import Input from "./components/Input";
import Task from "./components/Task";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    localStorage.getItem("tasks")
      ? setTasks(JSON.parse(localStorage.getItem("tasks")))
      : setTasks([]);
  }, []);
  const myinput = useRef();
  let addTask = () => {
    let task = myinput.current.value;

    let temp = [...tasks];
    if (task.trim() != "") {
      temp.push(task);
      setTasks(temp);
      localStorage.setItem("tasks", JSON.stringify(temp));
      myinput.current.value = "";
      myinput.current.style.height = "56px";
      toast("ياااه اخيرا عندك حاجه تعمليها يلاااا", {
        className:
          "!backdrop-blur-xl !bg-white/[0.03] !border !border-white/5 text-white font-medium rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
        progressClassName: "!bg-gradient-to-r !from-cyan-500 !to-blue-500",
      });
    }
  };

  return (
    <div class="w-full h-dvh flex flex-col  bg-gradient-to-tr from-[#020813] via-[#0b1528] to-[#0f2042] items-center justify-center p-4 ">
      <div className="  container w-full  overflow-auto mx-auto flex flex-col  items-center p-6">
        <h1 className="text-white font-bold mb-10 neon-text text-[35px] md:text-5xl ">
          Todolist
        </h1>

        <Input myInput1={myinput} newTask={addTask} />

        <div className="tasks flex flex-col gap-6 w-full ">
          <AnimatePresence>
            {tasks.map((el, index) => {
              return (
                <Task
                  key1={index}
                  element={el}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              );
            })}
          </AnimatePresence>
        </div>
        <p className=" neon-text mt-8 text-center">
          {" "}
          موقع بسيط عامله لتسجيل الملاحظات والتاسكات اليوميه made by Omar
        </p>
      </div>
      <ToastContainer
        theme="dark"
        position="top-center"
        toastClassName={() =>
          "!relative !flex !p-4 !min-h-10 !rounded-2xl !justify-between !overflow-hidden !cursor-pointer !bg-white/[0.02] !backdrop-blur-xl !border !border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        }
        bodyClassName={() => "!flex !items-center !text-white !font-medium"}
      />
    </div>
  );
}
