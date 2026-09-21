import { connectDatabase, database } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    if (database.readyState !== 1) {
      throw new Error('MongoDB connection is unavailable');
    }

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@octofit.example', avatarUrl: 'https://i.pravatar.cc/150?img=47' },
      { name: 'Grace Hopper', email: 'grace@octofit.example', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
      { name: 'Katherine Johnson', email: 'katherine@octofit.example', avatarUrl: 'https://i.pravatar.cc/150?img=49' },
    ]);

    await Team.insertMany([
      { name: 'Code Runners', members: [users[0]._id, users[1]._id] },
      { name: 'Orbit Crew', members: [users[2]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Run', durationMinutes: 32, completedAt: new Date('2026-09-18T07:30:00Z') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 45, completedAt: new Date('2026-09-19T17:00:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 50, completedAt: new Date('2026-09-20T08:15:00Z') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 420 },
      { user: users[1]._id, points: 365 },
      { user: users[2]._id, points: 310 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Momentum',
        description: 'A steady full-body session to start the day with energy.',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        title: 'Core Circuit',
        description: 'A focused circuit for core strength, stability, and control.',
        difficulty: 'intermediate',
        durationMinutes: 30,
      },
      {
        title: 'Endurance Builder',
        description: 'A challenging interval workout for sustained cardiovascular fitness.',
        difficulty: 'advanced',
        durationMinutes: 45,
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await database.close();
  }
}

seedDatabase();
