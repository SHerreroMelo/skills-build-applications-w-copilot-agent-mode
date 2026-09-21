import { Router } from 'express';
import { database } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

export const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: database.readyState === 1 ? 'connected' : 'disconnected',
  });
});

apiRouter.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members').sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('user').sort({ points: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});