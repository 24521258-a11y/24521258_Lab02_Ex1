# Project Rules — Exercise 1: Mini-React VNode & Mounting Engine

## 1. Scope

Implement a minimal Virtual DOM (VNode) factory and DOM mounting engine from scratch.

Required functions:

* `createElement()`
* `createTextElement()`
* `renderToDOM()`

## 2. Coding Rules

* Use JavaScript ES modules.
* Use `const` by default and `let` only when reassignment is needed.
* Use descriptive function and variable names.
* Keep the implementation simple and focused on Exercise 1.
* Do not implement unrelated features such as `useState`, hooks, or event delegation.

## 3. Semantic HTML

* Use semantic elements such as `main`, `section`, `header`, and `button`.
* Avoid unnecessary nested `div` elements (div-soup).
* Ensure the rendered DOM structure follows the VNode tree.

## 4. Security

* Render text children using `document.createTextNode()`.
* Do not inject untrusted text through `innerHTML`.
* Verify that `'<script>alert(1)</script>'` is rendered as text and does not create an executable script element.

## 5. DOM Mounting

* Create HTML elements using `document.createElement()`.
* Render child VNodes recursively.
* Attach event handlers safely.
* Verify the mounted DOM in Chrome DevTools.

## 6. Git Requirements

Required commit messages:

1. `feat(core): implement createElement factory`
2. `feat(core): implement renderToDOM`

Each commit should represent the corresponding implementation stage.

## 7. Verification

* Confirm the required functions are exported and usable.
* Confirm the button exists and its click handler works.
* Confirm XSS test strings remain text.
* Inspect the DOM tree for unexpected or orphan nodes.
