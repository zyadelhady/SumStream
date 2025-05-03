import client from "prom-client";

export const messageCounter = new client.Counter({
  name: "processed_messages_total",
  help: "Total number of processed messages",
});

export const errormessageCounter = new client.Counter({
  name: "error_messages_total",
  help: "Total number of unprocessed messages that produced errors",
});

export const requestCount = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "url", "status"],
});

export const requestduration = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "path"],
  buckets: [1, 50, 100, 200, 400, 500, 800],
});

export const queueduration = new client.Histogram({
  name: "queue_request_duration",
  help: "Duration of The request From the start till the end",
  buckets: [1, 50, 100, 200, 400, 500, 800],
});

client.collectDefaultMetrics();
client.register.registerMetric(messageCounter);
client.register.registerMetric(errormessageCounter);
client.register.registerMetric(requestCount);
client.register.registerMetric(requestduration);
client.register.registerMetric(queueduration);

export default client;
