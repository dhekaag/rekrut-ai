import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryProvider } from "./providers/QueryProvider";
import { ReduxProvider } from "./providers/ReduxProvider";

function App() {
  return (
    <QueryProvider>
      <ReduxProvider>
        <RouterProvider router={router} />
      </ReduxProvider>
    </QueryProvider>
  );
}

export default App;
