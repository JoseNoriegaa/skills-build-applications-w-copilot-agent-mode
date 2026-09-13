import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const teamSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  memberIds: { type: [String], required: true },
});

const activitySchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  completedAt: { type: Date, required: true },
});

const leaderboardSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  level: { type: String, required: true },
  focus: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
