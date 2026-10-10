
import {
  createElement as h,
  useState,
  renderApp
} from "./reactive-engine.js";

function TaskApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review PR", done: false },
    { id: 2, text: "Verify AST", done: false }
  ]);

  const [filter, setFilter] = useState("ALL");
  const [input, setInput] = useState("");

  const visibleTasks = tasks.filter(task => {
    if (filter === "ACTIVE") return !task.done;
    if (filter === "COMPLETED") return task.done;
    return true;
  });

  return h("main", { className: "app-container" },
    h("header", {},
      h("h1", {}, `Tasks: ${tasks.length}`)
    ),

    h("form", {
      onSubmit: event => {
        event.preventDefault();
        const text = input.trim();
        if (!text) return;

        setTasks(previous => [
          ...previous,
          { id: Date.now(), text, done: false }
        ]);
        setInput("");
      }
    },
      h("input", {
        value: input,
        placeholder: "Enter a task",
        onInput: event => setInput(event.target.value)
      }),
      h("button", { type: "submit" }, "Add Task")
    ),

    h("nav", {},
      ...["ALL", "ACTIVE", "COMPLETED"].map(value =>
        h("button", {
          type: "button",
          onClick: () => setFilter(value),
          "aria-pressed": filter === value
        }, value)
      )
    ),

    h("ul", {},
      ...visibleTasks.map(task =>
        h("li", { key: task.id },
          h("span", {}, task.text),
          h("button", {
            type: "button",
            onClick: () => setTasks(previous =>
              previous.map(item =>
                item.id === task.id
                  ? { ...item, done: !item.done }
                  : item
              )
            )
          }, task.done ? "Undo" : "Complete"),

          h("button", {
            type: "button",
            onClick: () => setTasks(previous =>
              previous.filter(item => item.id !== task.id)
            )
          }, "Delete")
        )
      )
    )
  );
}

renderApp(TaskApp, document.getElementById("app"));