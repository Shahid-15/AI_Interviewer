import mongoose from 'mongoose';

let model1 = mongoose.Schema({
       
    mockIdRef:String,
    question:String,
    correctAns:{type: mongoose.Schema.Types.Mixed},
    userAns:String,
    feedback:String,
    rating:String,
    userEmail:String,
    createdAt: { type: Date, default: Date.now },

});

// Correct way to check if model already exists in mongoose.models
export const testModel = mongoose.models.testmodel || mongoose.model("testmodel", model1);
