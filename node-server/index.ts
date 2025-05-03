import express from "express";
import { startConsumer } from "./consumer";
import { getCurrentSum, initSumFile } from "./update-sum";
import client from "./prometheus";

const app = express();
const port = 4000;


app.get("/sum", async (_, res) => {
  try {
    const sum = await getCurrentSum();
    res.json({ sum });
  } catch (error) {
    res.status(500).json({ error: "Failed to read sum" });
  }
});

// Expose Prometheus metrics
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);
  await initSumFile();
  await startConsumer();
});
