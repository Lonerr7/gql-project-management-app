import mongoose from 'mongoose';

export const deleteDocFromDB = async (Model, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Please, enter a correct ID!');
  }

  const deletedDoc = await Model.findByIdAndDelete(id);

  if (!deletedDoc) {
    throw new Error(`No ${Model.modelName.toLowerCase()} found with that ID!`);
  }

  return deletedDoc;
};
