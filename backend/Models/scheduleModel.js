import mongoose from 'mongoose';



const ScheduleSchema = new mongoose.Schema(
    {
        sessionID: { type: String, required:true, unique: true }, // Ensure sessionID is properly defined
        sessionTitle: { type: String, required: true },
        description: { type: String },
        sessionType: {
            type: String,
            enum: ['Cardio', 'Strength Training', 'HIIT', 'StretchFit'],
            required: true
        },
        date: { type: Date, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        trainerName: { type: String, required: true },
        memberName: { type: String, required: true },
        status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }
    },
    {
        timestamps: true,
    }
);

export const Schedule = mongoose.model('Schedule', ScheduleSchema);
