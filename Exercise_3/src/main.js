
const app = document.getElementById("app");

const state = {
  status: "IDLE",
  data: [],
  error: ""
};

let requestId = 0;

function render() {
  const card = document.createElement("section");
  card.className = "data-card";

  const title = document.createElement("h1");
  title.textContent = "Data Feed";
  card.appendChild(title);

  const status = document.createElement("p");
  status.className = "status";
  status.textContent = `Status: ${state.status}`;
  card.appendChild(status);

  if (state.status === "IDLE") {
    const button = document.createElement("button");
    button.textContent = "Load Data";
    button.addEventListener("click", loadData);
    card.appendChild(button);
  }

  if (state.status === "LOADING") {
    for (let i = 0; i < 3; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "skeleton";
      if (i === 2) skeleton.classList.add("short");
      card.appendChild(skeleton);
    }
  }

  if (state.status === "SUCCESS") {
    const list = document.createElement("ul");

    state.data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    card.appendChild(list);
  }

  if (state.status === "ERROR") {
    const message = document.createElement("p");
    message.textContent = state.error;
    card.appendChild(message);

    const retry = document.createElement("button");
    retry.textContent = "Retry Connection";
    retry.addEventListener("click", loadData);
    card.appendChild(retry);
  }

  app.replaceChildren(card);
}

function fetchFeed() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a temporary connection failure.
      if (Math.random() < 0.5) {
        reject(new Error("Unable to connect. Please try again."));
      } else {
        resolve([
          "Review project",
          "Verify application",
          "Complete assignment"
        ]);
      }
    }, 1500);
  });
}

async function loadData() {
  const currentRequest = ++requestId;

  state.status = "LOADING";
  state.error = "";
  render();

  try {
    const items = await fetchFeed();

    if (currentRequest !== requestId) return;

    state.status = "SUCCESS";
    state.data = items;
  } catch (error) {
    if (currentRequest !== requestId) return;

    state.status = "ERROR";
    state.error = error.message;
  }

  render();
}

render();
