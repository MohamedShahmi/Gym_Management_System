import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        workoutType: { 
            type: String, 
            required: true,
            enum: ['Cardio', 'Weight Training', 'HIIT', 'Yoga', 'Swimming', 'Running', 'Walking', 'Cycling', 'Other']
        },
        duration: { 
            type: Number, 
            required: true 
        },
        date: { 
            type: Date, 
            required: true,
            default: Date.now 
        },
        caloriesBurned: { 
            type: Number,
            default: 0
        },
        notes: { 
            type: String 
        }
    },
    {
        timestamps: true,
    }
);

export const Progress = mongoose.model('Progress', ProgressSchema);
