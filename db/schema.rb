# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_29_052630) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exercises", force: :cascade do |t|
    t.string "name"
    t.string "weight"
    t.string "bodypart"
    t.string "region"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "progresses", force: :cascade do |t|
    t.boolean "checkedIn"
    t.date "checkInFrequency"
    t.string "checkInDay"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_progresses_on_user_id"
  end

  create_table "routine_workouts", force: :cascade do |t|
    t.string "day"
    t.boolean "day_complete"
    t.bigint "routine_id", null: false
    t.bigint "workout_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["routine_id"], name: "index_routine_workouts_on_routine_id"
    t.index ["workout_id"], name: "index_routine_workouts_on_workout_id"
  end

  create_table "routines", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_exercises", force: :cascade do |t|
    t.integer "weight"
    t.bigint "user_id", null: false
    t.bigint "exercise_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exercise_id"], name: "index_user_exercises_on_exercise_id"
    t.index ["user_id"], name: "index_user_exercises_on_user_id"
  end

  create_table "user_progresses", force: :cascade do |t|
    t.integer "weight"
    t.string "image_url"
    t.string "date"
    t.bigint "user_id", null: false
    t.bigint "progress_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["progress_id"], name: "index_user_progresses_on_progress_id"
    t.index ["user_id"], name: "index_user_progresses_on_user_id"
  end

  create_table "user_routines", force: :cascade do |t|
    t.boolean "day_complete"
    t.boolean "current"
    t.bigint "user_id", null: false
    t.bigint "routine_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "days", default: [], array: true
    t.index ["routine_id"], name: "index_user_routines_on_routine_id"
    t.index ["user_id"], name: "index_user_routines_on_user_id"
  end

  create_table "user_workouts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "workout_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_workouts_on_user_id"
    t.index ["workout_id"], name: "index_user_workouts_on_workout_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "workout_exercises", force: :cascade do |t|
    t.bigint "workout_id", null: false
    t.bigint "exercise_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exercise_id"], name: "index_workout_exercises_on_exercise_id"
    t.index ["workout_id"], name: "index_workout_exercises_on_workout_id"
  end

  create_table "workouts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "progresses", "users"
  add_foreign_key "routine_workouts", "routines"
  add_foreign_key "routine_workouts", "workouts"
  add_foreign_key "user_exercises", "exercises"
  add_foreign_key "user_exercises", "users"
  add_foreign_key "user_progresses", "progresses"
  add_foreign_key "user_progresses", "users"
  add_foreign_key "user_routines", "routines"
  add_foreign_key "user_routines", "users"
  add_foreign_key "user_workouts", "users"
  add_foreign_key "user_workouts", "workouts"
  add_foreign_key "workout_exercises", "exercises"
  add_foreign_key "workout_exercises", "workouts"
end
