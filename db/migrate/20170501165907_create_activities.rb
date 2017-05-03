class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.string :name
      t.string :description
      t.string :voice_name
      t.string :accept_message
      t.string :deny_message
      t.timestamps
    end
  end
end
