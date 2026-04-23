import { build } from "./builder.js";
import { startServer } from "./server.js";

build();
startServer(3000);