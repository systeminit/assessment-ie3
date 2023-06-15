// Models are the data our application stores. Taskly stores its
// data in memory - so when the application is restarted, it will
// be wiped out.

import { tasksClear } from "./models/task";
import { usersClear } from "./models/user";

// Clears the state of our models - used extensively in our
// tests.
export const clearState = () => {
  usersClear();
  tasksClear();
}
