ActiveRecord::Schema[8.0].define(version: 2024_12_12_054127) do
  create_table "posts", force: :cascade do |t|
    t.string "biography"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
