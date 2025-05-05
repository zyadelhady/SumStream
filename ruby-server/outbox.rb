require "active_record"

class OutBox < ActiveRecord::Base

  self.table_name = "outbox"
  # Validations
  validates :msg, presence: true, numericality: {only_integer: true}

  # Add a new row to the outbox
  def self.add(msg, started_at)
    create!(msg: msg, started_at: started_at)
  end

  # Get all rows from the outbox
  def self.all_rows
    all.order(created_at: :desc)
  end
end
