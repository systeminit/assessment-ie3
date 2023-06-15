// The entrypoint for the backend.
import { app } from "./app";

// Start the application listening on port 3030.
console.log("Starting tasky backend on http://0.0.0.0:3030");
app.listen(3030);
