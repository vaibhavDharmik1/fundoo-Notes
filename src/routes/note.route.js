import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/user.validator';

const router = express.Router();

// Create a new Note
router.post('', newNoteValidator, noteController.create);

// Retrieve all Notes
router.get('', noteController.getAllNotes);

// Retrieve a single Note with noteId
router.get('/:_id', noteController.getSingleNote);

// Update a Note with noteId
router.put('/:_id', noteController.updateNote);

// Delete a Note with noteId
router.delete('/:_id', noteController.deleteNote);

export default router;