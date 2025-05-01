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

CMD ["rerun", "--", "ruby", "app.rb"]
