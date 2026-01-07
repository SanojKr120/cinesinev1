import express from 'express';
// import { getStories, createStory } from '../controllers/storyController.js';

const router = express.Router();

// router.get('/', getStories);
// router.post('/', createStory);

router.get('/', (req, res) => res.json({ message: "Get all stories endpoint" }));

export default router;
