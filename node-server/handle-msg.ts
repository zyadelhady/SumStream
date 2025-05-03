import { updateSum } from "./update-sum";
import { Channel, ConsumeMessage } from "amqplib";

export async function handleMessage(
  channel: Channel,
  msg: ConsumeMessage | null,
): Promise<void> {
  if (msg !== null) {
    const raw = msg.content.toString();
    try {
      const parsed = JSON.parse(raw);
      const msgValue = parsed?.payload?.after?.msg;

      if (msgValue !== undefined) {
        const newSum = await updateSum(msgValue);
        console.log("Extracted msg:", msgValue, "→ New Sum:", newSum);
      } else {
        console.warn("msg not found:", parsed);
      }

      channel.ack(msg);
    } catch (err) {
      console.error("Failed to parse message:", err);
      channel.nack(msg);
    }
  }
}
