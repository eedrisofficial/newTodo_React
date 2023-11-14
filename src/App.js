import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getLocalStorage, setLocalStorage } from "./Utils/local-storage";
import IsLoading from "./Components/IsLoading";
import TodoList from "./Components/TodoList";
import Swal from "sweetalert2";

const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;

function App() {
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [formError, setFormError] = useState({
    isError: false,
    errorMessage: null,
  });

  //TODO : CREATING TODOS
  const addTodo = (event) => {
    event.preventDefault();

    if (!todoInput) {
      setFormError({
        isError: true,
        errorMessage: "Please write a todo...",
      });

      setTimeout(() => {
        setFormError({
          isError: false,
          errorMessage: null,
        });
      }, 5000);
    }

    const newTodo = {
      id: uuidv4(),
      title: todoInput,
      created_at: new Date().toDateString(),
      exactTime: new Date().toLocaleTimeString(),
    };

    const todos = getLocalStorage(todo_ls_name);
    const new_todos = [...todos, newTodo];
    setLocalStorage(todo_ls_name, new_todos);
    fetchTodos();
    setTodoInput("");
  };

  // TODO: RENDERING TODOS
  const fetchTodos = () => {
    const todoDB = getLocalStorage(todo_ls_name);
    setTodos(todoDB);
    setTimeout(() => {
      setIsLoadingTodos(false);
    }, 2000);
  };
  //sorting func goes here...

  useEffect(() => {
    fetchTodos();
  }, []);

  // TODO DELETE
  const deleteTodo = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3d59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const todoDB = getLocalStorage(todo_ls_name);
        const new_Todo_database = todoDB.filter((todo) => todo.id !== id);
        setLocalStorage(todo_ls_name, new_Todo_database);
        fetchTodos();
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    });
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <header className="px-5 py-4 mx-auto max-w-lg">
        <h1 className="text-4xl text-[#1e3d59] font-mono  border-red-400 border-b-2 inline-flex gap-3">
          <span className="text-red-400 font-bold">Reed </span> Todoist
        </h1>
      </header>
      <section className="px-5 mx-auto max-w-lg">
        <form action>
          <div className="flex flex-col gap-2 lg:flex-row">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="What are you doing today?"
              className=" border-2 p-1 w-full border-black rounded-lg outline-none focus:border-red-400"
            />
            <button
              onClick={addTodo}
              className="bg-[#1e3d59] w-[50%] lg:w-[20%] p-1 py-2 font-bold text-[#FFF] rounded-lg hover:bg-red-400 duration-500"
            >
              Add
            </button>
            <button
              // onClick="updatedTodo(event)"
              className="hidden bg-[#1e847f] w-[50%] lg:w-[20%] p-1 py-2 font-bold text-[#FFF] rounded-lg hover:bg-[#316879] duration-500"
            >
              Update
            </button>
          </div>
        </form>
        {formError.isError && (
          <span className="text-red-700 text-lg font-bold">
            {formError.errorMessage}
          </span>
        )}
        {/* <section id="todoList" className="flex flex-col gap-3 pb-10 mt-5" /> */}
        {!isLoadingTodos && todos.length === 0 && (
          <h1 class="text-gray-500 font-semibold font-mono">
            No todo yet, Please add todo......
          </h1>
        )}
        {isLoadingTodos ? (
          <section className="flex flex-col justify-center items-center">
            <IsLoading />
          </section>
        ) : (
          <section className="flex flex-col gap-3  mt-5">
            {todos.map(({ title, id, created_at, exactTime }) => {
              return (
                <TodoList
                  title={title}
                  id={id}
                  created_at={created_at}
                  exactTime={exactTime}
                  key={id}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </section>
        )}
      </section>
    </div>
  );
}

export default App;
