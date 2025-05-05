import grpc from "k6/net/grpc";
import { check, sleep } from "k6";

const client = new grpc.Client();
client.load(["./proto"], "addition.proto"); // Adjust the path and filename as needed

export const options = {
  stages: [
    { duration: "30s", target: 50 }, // Ramp-up to 2 VUs
    { duration: "3m", target: 400 }, // Ramp-up to 10 VUs
    { duration: "57m", target: 600 }, // Ramp-down to 50 VUs
    { duration: "30s", target: 0 }, // Ramp-down to 0 VUs
  ],
};

export default () => {
  client.connect("localhost:50051", {
    plaintext: true,
  });

  const response = client.invoke("Addition/Add", {
    a: Math.floor(Math.random() * 100),
    b: Math.floor(Math.random() * 100),
  });

  check(response, {
    "status is OK": (r) => r && r.status === grpc.StatusOK,
  });

  client.close();
  sleep(2);
};
