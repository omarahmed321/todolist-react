import React from "react";

export default function Input({ myInput1, newTask }) {
  let handleInput = (event) => {
    let element = event.target;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  return (
    <div className="relative my-6 w-full max-w-md">
      <textarea
        dir="auto"
        ref={myInput1}
        rows="1"
        onChange={handleInput}
        // onKeyDown={(event) => event.key === "Enter" && newTask()}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            newTask();
          }
        }}
        placeholder="اي حاجه عاوز تعينها اكتبها"
        className="block w-full h-[56px] max-h-[150px] resize-none overflow-y-hidden rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-3xl py-4 pl-6 pr-16 text-base text-white transition-all duration-100 placeholder:text-slate-500/70 focus:border-[var(--color-neon-cyan)]/40 focus:outline-none focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(34,211,238,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] text-[15px] text-right "
      />
      <div className="absolute top-2 right-2 flex items-center">
        <button
          onClick={newTask}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-[var(--color-neon-cyan)] transition-all duration-300 hover:bg-[var(--color-neon-cyan)]/15 hover:border-[var(--color-neon-cyan)]/40 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] active:scale-95"
        >
          <svg
            viewBox="0 0 16 6"
            aria-hidden="true"
            className="w-4 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 3 10 .5v2H0v1h10v2L16 3Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
