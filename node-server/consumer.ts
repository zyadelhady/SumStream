import amqp from "amqplib";
import { handleMessage } from "./handle-msg";

export async function startConsumer() {
  try {
    const connection = await amqp.connect("amqp://guest:guest@rabbitmq:5672");
    const channel = await connection.createChannel();
    const queue = "addition";

    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in queue: ${queue}`);

    channel.consume(queue, async (msg) => {
      await handleMessage(channel, msg);
    });
  } catch (error) {
    console.error("Error in RabbitMQ consumer:", error);
  }
}
