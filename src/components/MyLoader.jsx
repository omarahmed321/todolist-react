const letters = ["G","e","n","e","r","a","t","i","n","g",".",".","."];
const delays  = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2];

export default function MyLoader() {
  return (
    <>
      <style>{`
        @keyframes loader-combined {
          0%   { transform:rotate(90deg);  box-shadow:0 6px 12px 0 #38bdf8 inset,0 12px 18px 0 #005dff inset,0 36px 36px 0 #1e40af inset,0 0 3px 1.2px rgba(56,189,248,.3),0 0 6px 1.8px rgba(0,93,255,.2); }
          25%  { transform:rotate(180deg); box-shadow:0 6px 12px 0 #0099ff inset,0 12px 18px 0 #38bdf8 inset,0 36px 36px 0 #005dff inset,0 0 6px 2.4px rgba(56,189,248,.3),0 0 12px 3.6px rgba(0,93,255,.2),0 0 18px 6px rgba(30,64,175,.15); }
          50%  { transform:rotate(270deg); box-shadow:0 6px 12px 0 #60a5fa inset,0 12px 6px 0 #0284c7 inset,0 24px 36px 0 #005dff inset,0 0 3px 1.2px rgba(56,189,248,.3),0 0 6px 1.8px rgba(0,93,255,.2); }
          75%  { transform:rotate(360deg); box-shadow:0 6px 12px 0 #3b82f6 inset,0 12px 18px 0 #0ea5e9 inset,0 36px 36px 0 #2563eb inset,0 0 6px 2.4px rgba(56,189,248,.3),0 0 12px 3.6px rgba(0,93,255,.2),0 0 18px 6px rgba(30,64,175,.15); }
          100% { transform:rotate(450deg); box-shadow:0 6px 12px 0 #4dc8fd inset,0 12px 18px 0 #005dff inset,0 36px 36px 0 #1e40af inset,0 0 3px 1.2px rgba(56,189,248,.3),0 0 6px 1.8px rgba(0,93,255,.2); }
        }
        @keyframes loader-letter-anim {
          0%,100% { opacity:.4; transform:translateY(0); }
          20%     { opacity:1;  text-shadow:#f8fcff 0 0 5px; }
          40%     { opacity:.7; transform:translateY(0); }
        }
        .animate-loader-circle  { animation: loader-combined    2.3s linear  infinite; }
        .animate-loader-letter  { animation: loader-letter-anim 2.4s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 flex items-center justify-center z-0"
           style={{ background: "linear-gradient(0deg,#1a3379,#0f172a,#000)" }}>

        <div className="relative flex items-center justify-center w-[180px] h-[180px]
                        font-sans text-[1.1em] font-light text-white rounded-full
                        bg-transparent select-none">

          {letters.map((letter, i) => (
            <span
              key={i}
              className="inline-block opacity-40 z-[1] rounded-[50ch] animate-loader-letter"
              style={{ animationDelay: `${delays[i]}s` }}
            >
              {letter}
            </span>
          ))}

          <div className="absolute inset-0 w-full aspect-square rounded-full
                          bg-transparent z-0 animate-loader-circle" />
        </div>
      </div>
    </>
  );
}
