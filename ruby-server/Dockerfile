FROM ruby:3.4

# Install dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev

# Set working directory
WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

# Copy the app source code
COPY . .

# Compile .proto files
RUN grpc_tools_ruby_protoc -I ./proto --ruby_out=../ --grpc_out=../ addition.proto

# CMD ["rerun", "--", "ruby", "app.rb"]
