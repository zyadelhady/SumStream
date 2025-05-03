class CreateOutbox < ActiveRecord::Migration[8.0]
  def change
    create_table(:outbox) do |t|
      t.integer(:msg, null: false)
      t.datetime(:started_at)
      t.timestamps
    end
  end
end
