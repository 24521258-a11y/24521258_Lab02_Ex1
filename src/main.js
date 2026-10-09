
import {
    createElement,
    renderToDOM,
  } from "./mini-react.js";
  
  const app = document.getElementById("app");
  
  const vnode = createElement(
    "main",
    { id: "root-view", role: "main" },
    createElement(
      "section",
      { className: "hero" },
      createElement("h1", null, "Mini React Engine"),
      createElement(
        "p",
        null,
        "<img onerror=alert(1)> Safe Text"
      ),
      createElement(
        "p",
        null,
        "<script>alert(1)</script>"
      ),
      createElement(
        "button",
        {
          type: "button",
          onClick: () => {
            console.log("Button clicked!");
          },
        },
        "Test Button"
      )
    )
  );
  
  app.replaceChildren(renderToDOM(vnode));
  
  console.assert(
    app.querySelector("button") !== null,
    "Button should exist in the DOM"
  );
  
  console.assert(
    app.querySelector("script") === null,
    "Untrusted script text must not create a script element"
  );
  
  console.log("VNode mounted successfully:", vnode);