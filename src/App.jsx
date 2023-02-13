import "./App.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    {
      label: "Learn JavaScript",
      isChecked: true,
    },
    {
      label: "Learn React",
      isChecked: false,
    },
    {
      label: "Have a life!",
      isChecked: false,
    },
  ]);
  const [form, setForm] = useState({
    label: "",
    isChecked: true,
  });

  const [statusFilter, setStatusFilter] = useState("All");

  const changeCheckBox = (todo) => {
    const myTodo = todos.find((td) => td === todo);
    myTodo.isChecked = !todo.isChecked;
    setTodos([...todos]);
  };

  const clearCompletedTodo = () => {
    const activeTodos = todos.filter((todo) => todo.isChecked === false);
    setTodos(activeTodos);
  };

  const removeTodo = (todo) => {
    const myTodoIndex = todos.indexOf(todo);
    const newTodos = [...todos];

    newTodos.splice(myTodoIndex, 1);
    setTodos(newTodos);
  };

  const filterFunction = (statusFilter) => {
    if (statusFilter === "All") {
      return [...todos];
    } else if (statusFilter === "Active") {
      return todos.filter((todo) => todo.isChecked === false);
    }
    return todos.filter((todo) => todo.isChecked === true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, form]);
    console.log(todos);
  };
  const filteredTodos = filterFunction(statusFilter);
  const activeTodosLength = todos.filter((t) => !t.isChecked).length;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={onSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={form.label}
              autoFocus
              onChange={(e) =>
                setForm({ label: e.target.value, isChecked: false })
              }
            />
          </form>
          <div className="main">
            <input
              className="toggle-all"
              type="checkbox"
              onChange={(e) =>
                setForm({ label: e.target.value, isChecked: false })
              }
            />
            <label
              htmlFor="toggle-all"
              onClick={() => {
                const newArray = [...todos];
                newArray.map((item) => {
                  item.isChecked = !item.isChecked;
                });
                setTodos([...newArray]);
              }}
            >
              Mark all as complete
            </label>
          </div>
        </header>
        {/* <header className="header">
          <h1>todos</h1>
          <form onSubmit={onSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={form.label}
              onChange={(e) =>
                setForm({ label: e.target.value, isChecked: false })
              }
            />
          </form>
        </header> */}

        <section className="main">
          <ul className="todo-list">
            {filteredTodos.map((todo, i) => {
              return (
                <li key={i} className={todo.isChecked ? "completed" : ""}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => {
                        changeCheckBox(todo);
                      }}
                    />
                    <label>{todo.label.toUpperCase()}</label>
                    <button
                      className="destroy"
                      onClick={() => removeTodo(todo)}
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <ul className="filters">
            <span className="todo-count" style={{ marginLeft: "15px" }}>
              <strong>{activeTodosLength}</strong>
              items left
            </span>
            <li>
              <a
                href="#/"
                className={statusFilter === "All" ? "selected" : ""}
                onClick={() => setStatusFilter("All")}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={statusFilter === "Active" ? "selected" : ""}
                onClick={() => setStatusFilter("Active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={statusFilter === "Completed" ? "selected" : ""}
                onClick={() => setStatusFilter("Completed")}
              >
                Completed
              </a>
            </li>
            <li>
              <a
                style={{ marginLeft: "120px" }}
                href="#/"
                className={statusFilter === "Completed" ? "selected" : ""}
                onClick={clearCompletedTodo}
              >
                Clear completed
              </a>
            </li>
          </ul>
        </footer>
      </section>

      <footer className="info">
        <p>
          Created by <a href="https://github.com/msefaa">Sefa SARITEKE</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
