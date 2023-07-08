import mongoose from 'mongoose';

export const manipulateDocInDB = async (Model, operation, id, payload) => {
  // Checking if id we entered is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Please, enter a correct ID!');
  }

  let docToManipulate;

  // Checking the operation name and doing what it provides
  switch (operation) {
    case 'delete':
      docToManipulate = await Model.findByIdAndDelete(id);
      break;
    case 'update':
      docToManipulate = await Model.findByIdAndUpdate(id, payload, {
        new: true,
      });
      break;
    default:
      return null;
  }

  // Checking if document exists in DB
  if (!docToManipulate) {
    throw new Error(`No ${Model.modelName.toLowerCase()} found with that ID!`);
  }

  return docToManipulate;
};
