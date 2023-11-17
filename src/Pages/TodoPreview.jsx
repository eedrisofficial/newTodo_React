import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdArrowBack, MdCancel, MdDelete } from "react-icons/md";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getLocalStorage } from "../Utils/local-storage";
import IsLoading from "../Components/IsLoading";

const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;
const TodoPreview = () => {
  const { todo_id } = useParams();
  const [todo, setTodo] = useState("");
  const [showingPopup, setShowingpopup] = useState();

  useEffect(() => {
    const renderCurrentPreviewTodo = () => {
      const todo_db = getLocalStorage(todo_ls_name);
      const currentTodo = todo_db.find((todo) => todo.id === todo_id);
      setTimeout(() => {
        setTodo(currentTodo);
      }, 4000);
    };
    if (todo_id) {
      renderCurrentPreviewTodo();
    }
  }, [todo_id]);

  if (!todo) {
    return (
      <p className="flex justify-center items-center h-[100vh]">
        <IsLoading />;
      </p>
    );
  }
  return (
    <React.Fragment>
      <div>
        <header className="px-5 py-4 mx-auto max-w-lg">
          <h1 className="text-4xl text-[#1e3d59] font-mono  border-red-400 border-b-2 inline-flex gap-3">
            <span className="text-red-400 font-bold">Reed </span> Todoist
          </h1>
        </header>
        <main className="px-5 py-4 mx-auto max-w-lg">
          <section className="flex flex-col gap-4">
            <div>
              <section className="flex justify-between items-center">
                <h1 className="text-lg font-semibold font-mono">
                  {todo.title}
                </h1>
              </section>
              <section className="flex flex-col gap-2">
                <div className="flex gap-40 items-center">
                  <p className="text-md text-gray-500">
                    {todo.description || "No description.."}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowingpopup(!showingPopup);
                      }}
                      className="text-[#1e847f]"
                      id="viewDescription"
                    >
                      <FaEdit />
                    </button>
                    <button id="deleteBtn" className="text-red-600">
                      <MdDelete />
                    </button>
                  </div>
                </div>
                <section className="flex flex-co items-center gap-3">
                  <span className="text-sm text-gray-700 truncate">
                    {todo.created_at}
                  </span>
                  <span className="text-sm text-gray-700 truncate">
                    {todo.exactTime}
                  </span>
                  <span className="mx-1">·</span>
                  <button className="bg-slate-300 text-sm text-slate-800 px-1 rounded-lg">
                    pending
                  </button>
                </section>
              </section>
            </div>
          </section>
          <Link to="/">
            <section className="text-[12px] mt-10 duration-500 border rounded-full inline-flex px-2 items-center gap-2 hover:text-red-400 hover:border-red-400">
              <MdArrowBack />
              <span className="text-[12px]">view all todo</span>
            </section>
          </Link>
        </main>
      </div>

      {/* Preview popup modal */}
      <div
        className={
          showingPopup
            ? "flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-60"
            : "hidden"
        }
      >
        <div className="absolute top-[20%] right-[8%] lg:right-[40%] rounded-[5px]">
          <span
            onClick={() => {
              setShowingpopup(!showingPopup);
            }}
            className=" mb-10 text-white cursor-pointer hover:text-red-400 duration-300"
          >
            <MdCancel size={30} />
          </span>
          <div id="form" className="flex flex-col gap-4 w-full">
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={10}
              placeholder="Describe your task here.."
              className="p-1 border-gray-500 outline-none rounded-[4px] border-2 focus:border-[#F5868D] resize-none"
              defaultValue={""}
            />
            <button
              type="submit"
              id="addDescription"
              className="cursor-pointer text-white border-none p-[4px] rounded-[4px] bg-[#F5868D] duration-500 font-bold font-mono hover:bg-[#f6606a]"
            >
              Add description
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TodoPreview;
