import Note from '../models/note.model';

//create new note
export const create = async (body) => {
        const note = await Note.findOne({ userID: body.userID })
    if (note === null) {
      const data = await Note.create(body);
      return data;
    }else {
      throw new Error ("Note Already Exists") ;
    }
};

//get all notes
export const getAllNotes = async () => {
    const data = await Note.find();
    return data;
  };

//get single note
export const getSingleNote = async (id) => {
    const data = await Note.findById(id);
    return data;
  };
  
//update note
export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        $set: {isArchieve: true}
      }
    );
    return data;
  };

//delete note
export const deleteNote = async (id) => {
    await User.findByIdAndDelete(id);
    return '';
  };