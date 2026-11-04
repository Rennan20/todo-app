export default function Form({ newTodo, setNewTodo, addTodo }) {
  return (
    <form onSubmit={addTodo}>
      <span className="todo-circle" aria-hidden="true"></span>

      <input
        type="text"
        placeholder="Create a new todo..."
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      />
    </form>
  );
}
