import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const TodoList = (props) => {
  const { title, id, created_at, deleteTodo, editingTodo } = props;
  return (
    <div className="bg-[#FFF] group flex justify-between py-3 px-3 rounded-lg hover:bg-gray-300">
      <Link to={`/todo/${id}`} className="truncate">
        {title}
      </Link>
      <p>{created_at}</p>
      <section className="gap-4 hidden group-hover:flex">
        <button onClick={() => editingTodo(id)} className="text-[#1e847f]">
          <FaEdit />
        </button>
        <button onClick={() => deleteTodo(id)} className="text-red-600">
          <MdDelete />
        </button>
      </section>
    </div>
  );
};

export default TodoList;
