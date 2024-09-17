import ExercisesModel from "./Exercises.models";
import ProgressModel from "./Progress.models";
import UsersModel from "./Users.models";
import WorkoutExersicesModel from "./WorkoutExercises.models";
import WorkoutsModel from "./Workouts.models";

// A user could have many workouts
UsersModel.hasMany(WorkoutsModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// A workout belongs to a user
WorkoutsModel.belongsTo(UsersModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// A user could have many progress records
UsersModel.hasMany(ProgressModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// A exercise could have many progress records
ExercisesModel.hasMany(ProgressModel, {
  foreignKey: 'exercise_id',
  onDelete: 'CASCADE'
})

// A workout could have many exercise throught WorkoutExercise
WorkoutsModel.hasMany(WorkoutExersicesModel, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE'
})

// A exercise could be in many workouts throught WorkoutExercise
ExercisesModel.hasMany(WorkoutExersicesModel, {
  foreignKey: 'exercise_id',
  onDelete: 'CASCADE'
})

// A WorkoutExercise record belongs to a single workout
WorkoutExersicesModel.belongsTo(WorkoutsModel, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE'
})

// A WorkoutExercise record belongs to a single exercise
WorkoutExersicesModel.belongsTo(ExercisesModel, {
  foreignKey: 'exercise_id',
  onDelete: 'CASCADE'
})

// A progress belongs to a single workout
ProgressModel.belongsTo(WorkoutsModel, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE'
})

// A progress belongs to a user
ProgressModel.belongsTo(UsersModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A progress belongs to an exersice
ProgressModel.belongsTo(ExercisesModel, {
  foreignKey: 'exercise_id',
  onDelete: 'CASCADE'
})