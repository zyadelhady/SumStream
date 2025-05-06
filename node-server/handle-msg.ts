import {
  errormessageCounter,
  messageCounter,
  queue_time,
  queueduration,
  updateFileDuration,
} from "./prometheus";
import { updateSum } from "./update-sum";
import { Channel, ConsumeMessage } from "amqplib";
import { performance } from "perf_hooks";

export async function handleMessage(
  channel: Channel,
  msg: ConsumeMessage | null,
): Promise<void> {
  if (msg !== null) {
    const msgArrived = Date.now();
    const raw = msg.content.toString();
    try {
      const parsed = JSON.parse(raw);
      const msgValue = parsed?.payload?.after?.msg;
      const started_at = parsed?.payload?.after?.started_at;
      const created_at = parsed?.payload?.after?.created_at / 1000;

      queue_time.observe(msgArrived - created_at);
      if (msgValue !== undefined) {
        const start = performance.now();
        const newSum = await updateSum(msgValue);
        const end = performance.now();
        updateFileDuration.observe(end - start);
        console.log("Extracted msg:", msgValue, "→ New Sum:", newSum);
      } else {
        console.warn("msg not found:", parsed);
      }

      messageCounter.inc();
      channel.ack(msg);

      const latency = Date.now() - Math.floor(started_at / 1000); // µs to ms
      queueduration.observe(latency);
    } catch (err) {
      console.error("Failed to parse message:", err);
      errormessageCounter.inc();
      channel.nack(msg);
    }
  }
}
