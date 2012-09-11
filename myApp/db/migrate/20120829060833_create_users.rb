class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :id
      t.string :password
      t.string :nickname
      t.string :description

      t.timestamps
    end
  end
end
