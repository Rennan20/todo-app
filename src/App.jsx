import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/TodoForm";
import Filter from "./components/TodoFilters";
import Nav from "./components/TodoNav";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const [theme, setTheme] = useState("light");
  const [draggedTodoId, setDraggedTodoId] = useState(null);
  const [dragOverTodoId, setDragOverTodoId] = useState(null);

  function addTodo(e) {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      const newTask = {
        id: crypto.randomUUID(),
        title: newTodo.trim(),
        completed: false,
      };

      setTodos((previousTodos) => [...previousTodos, newTask]);
    }
    setNewTodo("");
  }
  function toggleTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    );
  }
  function deleteTodo(id) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  const activeCount = todos.filter((todo) => !todo.completed).length;
  function clearCompleted() {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.completed),
    );
  }
  function moveTodo(targetTodoId) {
    setTodos((previousTodos) => {
      const updatedTodos = [...previousTodos];

      const draggedIndex = updatedTodos.findIndex(
        (todo) => todo.id === draggedTodoId,
      );

      const targetIndex = updatedTodos.findIndex(
        (todo) => todo.id === targetTodoId,
      );
      if (draggedIndex === -1 || targetIndex === -1) {
        return previousTodos;
      }
      const removedTodo = updatedTodos.splice(draggedIndex, 1);

      updatedTodos.splice(targetIndex, 0, removedTodo[0]);

      return updatedTodos;
    });
  }
  function toggleTheme() {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  }
  function moveTodoByOne(id, direction) {
    setTodos((previousTodos) => {
      const updatedTodos = [...previousTodos];

      const currentIndex = updatedTodos.findIndex((todo) => todo.id === id);

      const newIndex = currentIndex + direction;

      if (
        currentIndex === -1 ||
        newIndex < 0 ||
        newIndex >= updatedTodos.length
      ) {
        return previousTodos;
      }

      [updatedTodos[currentIndex], updatedTodos[newIndex]] = [
        updatedTodos[newIndex],
        updatedTodos[currentIndex],
      ];

      return updatedTodos;
    });
  }
  return (
    <main data-theme={theme}>
      <Header title="TODO" toggleTheme={toggleTheme} theme={theme} />
      <Form newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <section className="todo-container" aria-label="Todo list">
        <Filter
          deleteTodo={deleteTodo}
          filteredTodos={filteredTodos}
          toggleTodo={toggleTodo}
          draggedTodoId={draggedTodoId}
          setDraggedTodoId={setDraggedTodoId}
          moveTodo={moveTodo}
          dragOverTodoId={dragOverTodoId}
          setDragOverTodoId={setDragOverTodoId}
          moveTodoByOne={moveTodoByOne}
        />
        <div className="todo-footer">
          <p>{activeCount} items left</p>

          <Nav filter={filter} setFilter={setFilter} />

          <button type="button" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
