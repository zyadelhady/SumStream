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

export const requestduration = new client.Summary({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "path"],
  percentiles: [0.95, 0.9, 0.75, 0.65],
});

export const queueduration = new client.Summary({
  name: "queue_request_duration",
  help: "Duration of The request From the start till the end",
  percentiles: [0.95, 0.9, 0.75, 0.65],
});

export const queue_time = new client.Summary({
  name: "time_from_fire_to_queue_till_consumed",
  help: "time taken from creating the row to arriving to consumer",
  percentiles: [0.95, 0.9, 0.75, 0.65],
});

export const updateFileDuration = new client.Summary({
  name: "Updateing_File_latency",
  help: "Updating File Duration",
  percentiles: [0.95, 0.9, 0.75, 0.65],
});

client.collectDefaultMetrics();
client.register.registerMetric(messageCounter);
client.register.registerMetric(errormessageCounter);
client.register.registerMetric(requestCount);
client.register.registerMetric(requestduration);
client.register.registerMetric(queueduration);
client.register.registerMetric(updateFileDuration);
client.register.registerMetric(queue_time);

export default client;
