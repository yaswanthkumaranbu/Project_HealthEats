// jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import * as tf from "@tensorflow/tfjs";

async function setupTensorflow() {
  await tf.ready();
  const backend = await tf.findBackend("webgl");
  if (backend != null) {
    tf.setBackend(backend);
  }
}

const root = createRoot(document.getElementById("root"));

setupTensorflow().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
