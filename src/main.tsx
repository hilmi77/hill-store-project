import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./styles/globals.css";

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root container not found");
}
