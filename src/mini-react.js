
/**
 * Create a VNode representing a text node.
 */
export function createTextElement(value) {
    return {
      type: "TEXT_ELEMENT",
      props: {},
      children: [],
      value: String(value),
    };
  }
  
  /**
   * Convert primitive values into text VNodes.
   */
  function normalizeChild(child) {
    if (
      child === null ||
      child === undefined ||
      child === false ||
      child === true
    ) {
      return null;
    }
  
    if (Array.isArray(child)) {
      return child.flat(Infinity).map(normalizeChild).filter(Boolean);
    }
  
    if (typeof child === "string" || typeof child === "number") {
      return createTextElement(child);
    }
  
    return child;
  }
  
  /**
   * Create a VNode from a tag, props, and children.
   */
  export function createElement(type, props, ...children) {
    const normalizedChildren = children
      .flat(Infinity)
      .map(normalizeChild)
      .flat(Infinity)
      .filter(Boolean);
  
    return {
      type,
      props: props ?? {},
      children: normalizedChildren,
    };
  }
  
  /**
   * Convert a VNode tree into real DOM nodes.
   */
  export function renderToDOM(vnode) {
    if (vnode.type === "TEXT_ELEMENT") {
      return document.createTextNode(vnode.value);
    }
  
    const element = document.createElement(vnode.type);
  
    for (const [name, value] of Object.entries(vnode.props ?? {})) {
      if (name === "children" || name === "key" || value == null) {
        continue;
      }
  
      if (name.startsWith("on") && typeof value === "function") {
        const eventName = name.slice(2).toLowerCase();
        element.addEventListener(eventName, value);
        continue;
      }
  
      if (name === "className") {
        element.setAttribute("class", value);
        continue;
      }
  
      if (name === "style" && typeof value === "object") {
        Object.assign(element.style, value);
        continue;
      }
  
      if (name === "checked" || name === "disabled") {
        element[name] = Boolean(value);
        continue;
      }
  
      element.setAttribute(name, String(value));
    }
  
    for (const child of vnode.children ?? []) {
      element.appendChild(renderToDOM(child));
    }
  
    return element;
  }