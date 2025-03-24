import mongoose from 'mongoose';

// Define the schema
const mockInterviewSchema = new mongoose.Schema({
  jsonMockResponse: { type: String },
  jobPosition: { type: String },
  jobDescription: { type: String },
  jobExperience: { type: String },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  mockId: { type: String },
});

// Ensure mongoose.models is available and handle redefinition
let userModel;

if (mongoose.models.MockInterview) {
  userModel = mongoose.models.MockInterview; // Use existing model if it exists
} else {
  userModel = mongoose.model('MockInterview', mockInterviewSchema); // Create a new model if it doesn't
}

export default userModel;
