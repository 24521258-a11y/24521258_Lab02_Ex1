# Task Decomposition — Exercise 1

## Objective

Build a minimal Mini-React VNode factory and DOM mounting engine.

## Task 1: Define the VNode Structure

**File:** `src/mini-react.js`

* Define the VNode object structure.
* Store the element type, props, and children.
* Represent text values using `TEXT_ELEMENT`.

**Verification:** Inspect the returned VNode objects.

## Task 2: Implement the VNode Factory

**Functions:** `createTextElement()` and `createElement()`

* Convert strings and numbers into text VNodes.
* Normalize nested children.
* Handle empty or ignored children consistently.
* Preserve the supplied props.

**Verification:** Create a VNode tree using `main`, `header`, `h1`, `p`, and `button`.

## Task 3: Implement the DOM Renderer

**Function:** `renderToDOM()`

* Create text nodes using `document.createTextNode()`.
* Create HTML elements using `document.createElement()`.
* Apply props and event handlers.
* Render children recursively.

**Verification:** Mount the generated VNode tree into `#app`.

## Task 4: Security Verification

* Pass `'<script>alert(1)</script>'` as a text child.
* Pass `'<img onerror=alert(1)> Safe Text'` as a text child.
* Verify that these strings do not create actual `script` or `img` elements.

## Task 5: DevTools Audit

* Inspect the rendered DOM in Chrome DevTools.
* Compare the DOM hierarchy with the VNode tree.
* Check for unexpected or extra nodes.
* Verify that the button click handler works.

## Task 6: Git Version Control

* Commit 1: `feat(core): implement createElement factory`
* Commit 2: `feat(core): implement renderToDOM`

Check the commit history after implementation.

## Completion Criteria

* All three required functions work.
* Semantic HTML is used.
* Text content is rendered safely.
* The mounted DOM matches the VNode tree.
* Both required commits exist.

