import express from "express";
import amqp from "amqplib";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  // send a simple json response
  res.json({ message: "Hello World! ALaaaaasdasd" });
});

app.get("/alo", (req, res) => {
  // send a simple json response
  res.json({ message: " ALaaaaasdasd" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// RabbitMQ Consumer Setup
async function startConsumer() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://guest:guest@rabbitmq:5672");
    const channel = await connection.createChannel();

    const queue = "addition";

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: true });

    console.log(`Waiting for messages in queue: ${queue}`);

    // Consume messages from the queue
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const raw = msg.content.toString();
        try {
          const parsed = JSON.parse(raw);
          const msgValue = parsed?.payload?.after?.msg;

          if (msgValue !== undefined) {
            console.log("Extracted msg:", msgValue);
          } else {
            console.warn("msg not found:", parsed);
          }

          channel.ack(msg);
        } catch (err) {
          console.error("Failed to parse message:", err);
          channel.nack(msg);
        }
      }
    });
  } catch (error) {
    console.error("Error in RabbitMQ consumer:", error);
  }
}

// Start the consumer
startConsumer();
