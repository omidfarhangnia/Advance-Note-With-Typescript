import { useState } from "react";
import { PiGhostFill } from "react-icons/pi";
import { note } from "./projectTypes";

type homeProps = {
  notes: note[];
  tags: string[];
};

export default function Home({ notes, tags }: homeProps) {
  return (
    <>
      <div className="w-full h-screen bg-gray-400/30 flex gap-[7vh] flex-col px-[10vw] py-[5vh]">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-6xl font-belanosima">Note</h1>
          <div className="flex gap-3 text-[25px]">
            <button className="font-belanosima font-light capitalize rounded-lg bg-blue-600 text-white px-4 py-2">
              create
            </button>
            <button className="font-belanosima font-light capitalize rounded-lg bg-white text-blue-600 px-4 py-2">
              edit tags
            </button>
          </div>
        </div>
        <div>
          <form className="flex justify-between">
            <div className="w-[43%] flex flex-col gap-3 p-3">
              <label className="text-[28px] capitalize">title</label>
              <input
                type="text"
                className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg"
                spellCheck={false}
              />
            </div>
            <div className="w-[43%] flex flex-col gap-3 p-3">
              <label className="text-[28px] capitalize">tags</label>
              <select className="p-3 text-[20px] bg-transparent outline-none border-2 border-solid border-blue-400 rounded-lg">
                {tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="border-2 flex flex-col items-center justify-around border-solid border-blue-600 rounded-xl min-h-[40vh]">
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={index}>this is note number {index}</div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center gap-3">
              <PiGhostFill size={90} className="opacity-70 animatedGhost" />
              <span className="text-[25px] capitalize">there is no note</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
