require "sinatra"
require "json"

set(:bind, "0.0.0.0")
set(:port, 3000)

get("/") do
  "Sinatra is running!"
end


post("/sum") do
  data = JSON.parse(request.body.read)
  sum = data["a"] + data["b"]
  # send sum to RabbitMQ here
  {sum: sum}.to_json
end
