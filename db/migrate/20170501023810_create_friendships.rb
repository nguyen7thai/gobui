class CreateFriendships < ActiveRecord::Migration[5.0]
  def change
    create_table :friendships do |t|
      t.integer :inviter
      t.integer :invitee
      t.string :status

      t.timestamps
    end
  end
end
