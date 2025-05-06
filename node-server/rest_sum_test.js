import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 500 }, // Ramp-up to 2 VUs
    { duration: "10m", target: 10000 }, // Ramp-up to 10 VUs
    { duration: "10m", target: 15000 }, // Ramp-down to 50 VUs
    { duration: "30s", target: 0 }, // Ramp-down to 0 VUs
  ],
};

export default () => {
  const res = http.get("http://localhost:4000/sum"); // Adjust the URL as needed

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
};
