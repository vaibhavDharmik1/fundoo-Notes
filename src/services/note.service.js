import { client } from '../config/redis';
import Note from '../models/note.model';

//create new note
export const create = async (body) => {
      const data = await Note.create(body);
      if(data){
      await client.del('getAllNotes')
      return data;
      }
      
};

//get all notes
export const getAllNotes = async (userID) => {
  const data = await Note.find({userID});
  if(data.length === 0){
    throw new Error('notes are empty')
  }else{
    await client.set('getAllNotes', JSON.stringify(data))
  return data;
  }
};

//get single note
export const getSingleNote = async (_id, userID) => {
    const data = await Note.findById({_id, userID});
    return data;
  };
  
// Archieve note
export const archieveById = async (_id) => {
  const data = await Note.findByIdAndUpdate({ _id },
     { $set: { isArchived: true }
     },
     {
      new: true
     })
  return data;
}

//trash note
export const  trashById = async(_id,body)=>{
  const data = await Note.findByIdAndUpdate({_id : _id,
      UserID : body.UserID}, 
      {$set : {isDeleted :true}
    },
    {
      new: true
     }
  );
  return data; 
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
  
export const deleteNote = async (userID) => {
    await Note.findByIdAndDelete(userID);
    return '';
  };