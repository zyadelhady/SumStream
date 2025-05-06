# SumStream

## Overview
This project is a distributed system built using multiple services, including a Ruby server, Node.js server, RabbitMQ, PostgreSQL, Debezium, Prometheus, and Grafana. The system performs reliable asynchronous processing using RabbitMQ and exposes a REST API and gRPC services. The project is designed to process a series of requests related to "addition" and maintain the sum, integrating monitoring and observability tools like Prometheus and Grafana.

## Architecture 
![image](https://github.com/user-attachments/assets/e6153e9f-cffa-4ef5-b7da-09ce1513778d)


## Services Overview
- **RabbitMQ**: Messaging broker that handles asynchronous communication between services.
- **PostgreSQL (db)**: Database for storing application data.
- **Ruby Server (ruby-server)**: Implements gRPC service for adding values and communicates with RabbitMQ.
- **Node.js Server (node-server)**: REST API service that gets the sum via HTTP requests.
- **Debezium**: Captures change data from PostgreSQL and streams it into RabbitMQ for processing.
- **Prometheus**: Collects and stores metrics from the services for monitoring.
- **Grafana**: Provides a dashboard for visualizing the metrics stored in Prometheus.


## Features Implemented
- **gRPC-based Addition Service**: Built a gRPC service in Ruby for addition operations, where messages are processed asynchronously with RabbitMQ.
- **RabbitMQ Integration**: RabbitMQ is used for decoupling communication between services and ensuring reliable message processing.
- **PostgreSQL**: Database used for storing the state, with change data capture (CDC) using Debezium.
- **Outbox Pattern**: Implemented the **Outbox Pattern** to ensure reliable message delivery by storing the message in a separate table (outbox) within the database, which is later picked up by the message consumer (RabbitMQ).
- **Prometheus + Grafana**: Integrated Prometheus for monitoring latency, request durations, and system health, and Grafana for visualizing metrics in real-time.
- **Docker Compose**: Used Docker Compose to run all services locally and manage dependencies between them.

## Dashboard

![dashboard](https://github.com/user-attachments/assets/4b4ad729-520f-4f3a-b00c-35a544e466d9)

## Technologies Used
- **Ruby** for implementing the gRPC service.
- **Node.js** for implementing the REST API service.
- **RabbitMQ** for messaging.
- **PostgreSQL** as the primary database.
- **Debezium** for change data capture (CDC).
- **Outbox Pattern** for reliable message delivery.
- **Prometheus** for metrics collection and monitoring.
- **Grafana** for visualization of Prometheus metrics.
- **Docker Compose** for local development and orchestration of services.

## Project Setup

### Docker Compose (for Local Development)
Docker Compose was used to define services such as RabbitMQ, PostgreSQL, Ruby server, Node.js server, Debezium, Prometheus, and Grafana.

Health checks are configured for RabbitMQ to ensure it is ready before other services can start.

### Monitoring and Observability
- Integrated Prometheus for tracking service metrics like request durations, CPU usage, and queue times.
- Set up Grafana to visualize metrics collected by Prometheus.
- Custom Prometheus metrics were created, such as `grpc_request_duration_ms` to track gRPC request durations, and `queue_time` to measure message processing times.

### Running Locally with Docker Compose
1. **Install Docker** (if not already installed):
    - Follow the instructions for your operating system to install Docker from the official Docker website.

2. **Start the Services**:
    - Navigate to the project directory.
    - Run the following command to start all services:
      ```bash
      docker-compose up
      ```

3. **Verify the Services**:
    - RabbitMQ will be available at [http://localhost:15672](http://localhost:15672).
    - grpc server will be available at [http://localhost:50051](http://localhost:50051).
    - The Ruby server will be accessible at [http://localhost:3001](http://localhost:3001).
    - The Node.js server will be accessible at [http://localhost:4000](http://localhost:4000).
    - Prometheus will be available at [http://localhost:9090](http://localhost:9090).
    - Grafana will be available at [http://localhost:3000](http://localhost:3000) (default login: `admin/admin`).

### Load Testing with K6
- **Node.js Load Testing**: Used K6 to simulate a load up to 15000 users hitting the `GET /sum` endpoint.
- **Ruby Server Load Testing**: Used K6 to simulate load for gRPC calls to the Add endpoint, ramping up users to 15000
  ```bash
  cd ruby-server
  k6 run grpc_add_test.js
  ```
  ```bash
  cd node-server
  k6 run rest_sum_test.js
  ```

## Key Observations and Performance Metrics
- **Queue Time**: Measured the time between receiving a message in the RabbitMQ queue and processing it.
- **Request Duration**: Monitored the duration of gRPC and HTTP requests.
- **CPU Usage**: Used Prometheus to track CPU usage and system performance.
- **Latency**: Used `Date.now()` for calculating the latency of messages in microseconds and milliseconds.

### Prometheus Metrics Example
- **gRPC Request Duration**:
  ```plaintext
  grpc_request_duration_ms_sum{method="grpc", path="add"} 203.0
  grpc_request_duration_ms_count{method="grpc", path="add"} 62.0

## Future Improvements

- **Scaling**: Consider scaling services like the Ruby server and Node.js server based on load.
- **Message Acknowledgments**: Implement better message acknowledgment mechanisms to avoid stuck messages in RabbitMQ.
- **File Locking**: Explore ways to mitigate potential bottlenecks caused by file locking on the sum storage file.
- **Use Kubernetes**: Implement Kubernetes for container orchestration to manage service scaling, automate deployment, and improve the overall system's resilience and availability.


