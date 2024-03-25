import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { motion as m, AnimatePresence } from "framer-motion";

function CustomNode({ data }) {
  const [isShown, setIsShown] = useState(null);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsShown(data.name)}
      onMouseLeave={() => setIsShown(null)}
    >
      <AnimatePresence>
        {isShown && (
          <m.div
            initial={{ scale: 0, opacity: 0, y: 200 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 200 }}
            transition={{ type: "just", duration: 0.3 }}
            className="absolute bottom-[50px] right-[-90px] w-80 z-50 p-5 bg-slate-100 rounded-lg"
          >
            <img src={data.hoverimage} />
            <p>{data.hovercontent}</p>
          </m.div>
        )}
      </AnimatePresence>
      <m.div
        className="px-4 py-2 shadow-md rounded-md flex justify-center border-2 border-stone-400 min-w-[150px]"
        style={{ backgroundColor: data.bgcolor }}
      >
        <div className="text-lg font-bold">{data.name}</div>
        <Handle
          type="target"
          position={Position.Left}
          className={`w-2 h-2 !bg-black rounded-full ${
            !isShown && "invisible"
          }`}
        />
        <Handle
          type="source"
          position={Position.Right}
          className={`w-2 h-2 !bg-black rounded-full ${
            !isShown && "invisible"
          }`}
        />
      </m.div>
    </div>
  );
}

export default memo(CustomNode);
