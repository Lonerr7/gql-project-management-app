import mongoose from 'mongoose';

export const isValidID = (id) =>
  mongoose.Types.ObjectId.isValid(id) ? true : false;
