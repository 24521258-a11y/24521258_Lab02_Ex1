
const stateStore = [];
let stateCursor = 0;

let rootElement = null;
let currentComponent = null;
let eventHandlers = new Map();
let nextEventId = 0;

function resetCursor() {
  stateCursor = 0;
}

export function useState(initialValue) {
  const currentIndex = stateCursor++;

  if (!(currentIndex in stateStore)) {
    stateStore[currentIndex] = initialValue;
  }

  function setState(nextValue) {
    const previousValue = stateStore[currentIndex];

    stateStore[currentIndex] =
      typeof nextValue === "function"
        ? nextValue(previousValue)
        : nextValue;

    renderApp(currentComponent, rootElement);
  }

  return [stateStore[currentIndex], setState];
}


function createElement(type, props = {}, ...children) {
  return { type, props, children: children.flat() };
}

function renderNode(node) {
  if (node === null || node === undefined || node === false) {
    return document.createTextNode("");
  }

  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
  }

  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();
    node.forEach(child => fragment.appendChild(renderNode(child)));
    return fragment;
  }

  const element = document.createElement(node.type);

  for (const [key, value] of Object.entries(node.props || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      const id = String(++nextEventId);
      eventHandlers.set(id, value);
      element.dataset.eventId = id;
      element.dataset.eventType = key.slice(2).toLowerCase();
    } else if (key === "className") {
      element.className = value;
    } else if (key === "disabled") {
      element.disabled = Boolean(value);
    } else if (key !== "key" && value != null) {
      element.setAttribute(key, String(value));
    }
  }

  (node.children || []).forEach(child => {
    element.appendChild(renderNode(child));
  });

  return element;
}

function handleRootEvent(event) {
  const target = event.target.closest("[data-event-id]");

  if (!target || !rootElement.contains(target)) return;

  const eventType = target.dataset.eventType;
  if (event.type !== eventType) return;

  const handler = eventHandlers.get(target.dataset.eventId);
  if (handler) handler(event);
}

export function renderApp(Component, root) {
  currentComponent = Component;
  rootElement = root;

  if (!rootElement.dataset.delegationReady) {
    ["click", "input", "change", "submit"].forEach(type => {
      rootElement.addEventListener(type, handleRootEvent);
    });

    rootElement.dataset.delegationReady = "true";
  }

  resetCursor();
  eventHandlers = new Map();
  nextEventId = 0;

  const vnode = Component();
  rootElement.replaceChildren(renderNode(vnode));
}

export { createElement };