import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  relationship: {
    type: String,
    required: [true, 'Relationship is required'],
    enum: ['Family', 'Friend', 'Colleague', 'Neighbor', 'Doctor', 'Emergency Services', 'Other']
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastNotified: {
    type: Date
  },
  notificationCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create compound index for efficient queries
contactSchema.index({ userId: 1, priority: 1 });
contactSchema.index({ userId: 1, isActive: 1 });

export default mongoose.model('Contact', contactSchema);