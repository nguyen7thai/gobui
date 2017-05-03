class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :device_token
      t.string :password

      t.timestamps
    end
  end
end
