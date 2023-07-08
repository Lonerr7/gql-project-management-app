import { isValidID } from './isValidID.js';

export const deleteDocFromDB = async (Model, id) => {
  if (!isValidID(id)) {
    throw new Error('Please, enter a correct ID!');
  }

  const deletedDoc = await Model.findByIdAndDelete(id);

  if (!deletedDoc) {
    throw new Error(`No ${Model.modelName.toLowerCase()} found with that ID!`);
  }

  return deletedDoc;
};
