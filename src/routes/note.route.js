import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/user.validator';
import { allNotes } from '../middlewares/redis.middleware';


const router = express.Router();

// Create a new Note
router.post('', newNoteValidator, userAuth, noteController.create);

// Retrieve all Notes
router.get('', allNotes, userAuth, noteController.getAllNotes);

// Retrieve a single Note with noteId
router.get('/:_id', userAuth, noteController.getSingleNote);

// note added to archive
router.put('/archive/:_id',userAuth , noteController.archieveById);

// Note added to trash
router.put('/trash/:_id', userAuth , noteController.trashById);

// Note update by id
router.put('/:_id', userAuth , noteController.updateById);

// Note Delete by id
router.delete('', userAuth, noteController.deleteNote);

export default router;