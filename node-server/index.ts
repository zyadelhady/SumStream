import express from "express";
import { startConsumer } from "./consumer";
import { initSumFile } from "./update-sum";

const app = express();
const port = 4000;

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);
  await initSumFile();
  await startConsumer();
});
