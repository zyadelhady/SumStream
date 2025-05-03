$LOAD_PATH.unshift(File.expand_path(__dir__))
$LOAD_PATH.unshift(File.expand_path("models", __dir__))

require "sinatra"
require "json"
require "bunny"
require "grpc"
require "sinatra/activerecord"

require_relative "addition_pb"
require_relative "addition_services_pb"
require_relative "outbox"

# === RabbitMQ Connection ===
RABBIT_CONN = Bunny.new(hostname: "rabbitmq", username: "guest", password: "guest")
RABBIT_CONN.start
RABBIT_CHANNEL = RABBIT_CONN.create_channel

RABBIT_EXCHANGE = RABBIT_CHANNEL.topic("amq.topic", durable: true)

RABBIT_QUEUE = RABBIT_CHANNEL.queue("addition", durable: true).bind(RABBIT_EXCHANGE, routing_key: "addition")

class AdditionServiceImpl < Addition::Service
  def add(add_request, _call)
    a = add_request.a
    b = add_request.b
    sum = a + b
    OutBox.add(sum)
    AddResponse.new(sum: sum)
  end
end

Thread.new do
  grpc_server = GRPC::RpcServer.new
  grpc_server.add_http2_port("0.0.0.0:50051", :this_port_is_insecure)
  grpc_server.handle(AdditionServiceImpl)
  puts("gRPC server listening on 50051")
  grpc_server.run_till_terminated
end

set(:bind, "0.0.0.0")
set(:port, 3000)

configure do
  set(:json_encoder, :to_json)
end

before do
  content_type(:json)
end

get("/") do
end
