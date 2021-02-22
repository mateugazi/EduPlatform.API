import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('sampleSchema', sampleSchema);
