export default function Nav({ filter, setFilter }) {
  return (
    <nav aria-label="Todo filters">
      <button
        type="button"
        className={filter === "all" ? "active" : ""}
        aria-pressed={filter === "all"}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "active" ? "active" : ""}
        aria-pressed={filter === "active"}
        type="button"
        onClick={() => setFilter("active")}
      >
        Active
      </button>

      <button
        className={filter === "completed" ? "active" : ""}
        aria-pressed={filter === "completed"}
        type="button"
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </nav>
  );
}
