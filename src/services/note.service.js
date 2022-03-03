import Note from '../models/note.model';

//create new note
export const create = async (body) => {
        // const note = await Note.findOne({ userID: body.userID })
    // if (note === null) {
      const data = await Note.create(body);
      return data;
    // }else {
      throw new Error ("Note Already Exists") ;
    
};

//get all notes
export const getAllNotes = async () => {
    const data = await Note.find();
    return data;
  };

//get single note
export const getSingleNote = async (_id) => {
    const data = await Note.findById(_id);
    return data;
  };
  
// Archieve note
export const archieveById = async (_id) => {
    const archieve = await Note.findByIdAndUpdate(
      {
        _id
      },
      {
      $set: {isArchived: true},
      }
    );
    return archieve;
  };

//trash note
export const trashById = async (_id) => {
   const trash = await Note.findByIdAndDelete(
     {
       _id
     },
     {
       $set: {isDeleted: true }
     }
   );
    return trash;
  }

  // Update note
  
export const updateById  = async (_id, body) => {
  const update = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
     new: true
    }
  );
  return update;
};



  // Delete note
  
export const deleteNote = async (_id) => {
    await Note.findByIdAndDelete(_id);
    return '';
  };