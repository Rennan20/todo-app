export default function Filter({
  filteredTodos,
  toggleTodo,
  deleteTodo,
  setDraggedTodoId,
  moveTodo,
  draggedTodoId,
  dragOverTodoId,
  setDragOverTodoId,
  moveTodoByOne,
}) {
  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          draggable
          onDragStart={() => setDraggedTodoId(todo.id)}
          onDragOver={(event) => {
            event.preventDefault();

            if (todo.id !== draggedTodoId && dragOverTodoId !== todo.id) {
              setDragOverTodoId(todo.id);
            }
          }}
          onDrop={() => {
            moveTodo(todo.id);
            setDragOverTodoId(null);
          }}
          className={[
            todo.completed ? "completed" : "",
            todo.id === draggedTodoId ? "dragging" : "",
            todo.id === dragOverTodoId && todo.id !== draggedTodoId
              ? "drag-over"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onDragEnd={() => {
            setDraggedTodoId(null);
            setDragOverTodoId(null);
          }}
        >
          <button
            type="button"
            onClick={() => moveTodoByOne(todo.id, -1)}
            aria-label={`Move ${todo.title} up`}
          >
            ↑
          </button>

          <button
            type="button"
            onClick={() => moveTodoByOne(todo.id, 1)}
            aria-label={`Move ${todo.title} down`}
          >
            ↓
          </button>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.title}
          </label>
          <button
            type="button"
            onClick={() => deleteTodo(todo.id)}
            aria-label={`Delete ${todo.title}`}
          >
            <img src="/images/icon-cross.svg" alt="" />{" "}
          </button>
        </li>
      ))}
    </ul>
  );
}
