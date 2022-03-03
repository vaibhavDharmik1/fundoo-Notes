import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

// Create new Note
export const create = async (req, res, next) => {
  try {
    const data = await NoteService.create(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    next(error);
  }
};

//retrieve all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

//retrieve single note by id
export const getSingleNote = async (req, res, next) => {
  try {
    const data = await NoteService.getSingleNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

//Archieve note
export const archieveById = async (req, res, next) => {
  try {
    const archieve = await NoteService.archieveById(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: archieve,
      message: 'Note Archieve successfully'
    });
  } catch (error) {
    next(error);
  }
};

// trash note
export const trashById = async (req, res, next) => {
  try {
    const trash = await NoteService.trashById(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: trash,
      message: 'Note trash successfully'
    });
  } catch (error) {
    next(error);
  }
};

// update by ID 
export const updateById = async (req, res, next) => {
  try {
    const update = await NoteService.updateById(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: update,
      message: 'Note updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete by  ID
export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK, data: [],
      message: 'Note deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

