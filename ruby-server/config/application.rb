require "active_record"
require "sqlite3"
require "yaml"

config_path = File.join(__dir__, "database.yml")
ActiveRecord::Base.configurations = YAML.load_file(config_path)
ActiveRecord::Base.establish_connection(:development)

# Set a logger so that you can view the SQL actually performed by ActiveRecord
logger = Logger.new($stdout)
logger.formatter = proc do |_severity, _datetime, _progname, msg|
  "#{msg}\n"
end

ActiveRecord::Base.logger = logger
