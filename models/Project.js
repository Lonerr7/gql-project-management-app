import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    max: [50, 'Too many letters, short it down'],
  },
  description: {
    type: String,
    max: [300, "Description can't be more than 300 characters"],
  },
  status: {
    type: String,
    enum: ['Not Started', 'In progress', 'Completed'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
});

export default mongoose.model('Project', ProjectSchema);
