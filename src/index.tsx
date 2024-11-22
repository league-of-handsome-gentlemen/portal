import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_ZV25h2yxa',
      userPoolClientId: '4lmqpf0c5j0ftkng7512df869b'
    },
  }
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

const root = createRoot(rootElement);

root.render(<App />);
