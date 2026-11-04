export default function Header({ title, theme, toggleTheme }) {
  return (
    <header>
      <h1>{title}</h1>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          theme === "light" ? "Activate dark mode" : "Activate light mode"
        }
      >
        <img
          src={
            theme === "light" ? "/images/icon-moon.svg" : "/images/icon-sun.svg"
          }
          alt=""
        />
      </button>
    </header>
  );
}
