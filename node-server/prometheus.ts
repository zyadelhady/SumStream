import client from "prom-client";

const messageCounter = new client.Counter({
  name: "processed_messages_total",
  help: "Total number of processed messages",
});

const requestCount = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "url", "status"],
});

const latencyHistogram = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "url"],
  buckets: [50, 100, 300, 500, 1000, 2000], // in milliseconds
});

client.collectDefaultMetrics();
client.register.registerMetric(messageCounter);
client.register.registerMetric(requestCount);
client.register.registerMetric(latencyHistogram);


export default client;
