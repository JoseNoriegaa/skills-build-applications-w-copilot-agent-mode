import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { id: 'user-1', username: 'octocat', name: 'The Octocat', email: 'octocat@example.com' },
      { id: 'user-2', username: 'mona', name: 'Mona Lisa', email: 'mona@example.com' },
    ]);
    await Team.insertMany([
      { id: 'team-1', name: 'OctoFitters', memberIds: ['user-1', 'user-2'] },
    ]);
    await Activity.insertMany([
      { id: 'activity-1', userId: 'user-1', type: 'walking', durationMinutes: 30, completedAt: new Date('2026-09-12') },
      { id: 'activity-2', userId: 'user-2', type: 'cycling', durationMinutes: 45, completedAt: new Date('2026-09-11') },
    ]);
    await Leaderboard.insertMany([
      { userId: 'user-1', points: 180, rank: 1 },
      { userId: 'user-2', points: 150, rank: 2 },
    ]);
    await Workout.insertMany([
      { id: 'workout-1', name: 'Starter strength', durationMinutes: 20, level: 'beginner', focus: 'full body' },
      { id: 'workout-2', name: 'Cardio boost', durationMinutes: 30, level: 'intermediate', focus: 'cardio' },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
