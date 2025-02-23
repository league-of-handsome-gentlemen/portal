import { createRoot } from "react-dom/client";
import { App } from "./app";
import { Amplify } from 'aws-amplify';
import './styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_fn14642b3',
      userPoolClientId: '7t96getqfbbsatb8p2pm2p9b0p'
    },
  }
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

const root = createRoot(rootElement);

root.render(<App />);
