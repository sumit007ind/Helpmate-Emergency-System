import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['SOS_BUTTON_PRESS', 'HEALTH_EMERGENCY', 'PANIC_BUTTON', 'FALL_DETECTION', 'MANUAL_TRIGGER']
  },
  severity: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 3
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'cancelled'],
    default: 'active'
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    accuracy: Number
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  contactsNotified: [{
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    },
    notifiedAt: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['sms', 'email', 'push'],
      default: 'sms'
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'failed'],
      default: 'sent'
    }
  }],
  resolvedAt: Date,
  resolvedBy: {
    type: String,
    enum: ['user', 'contact', 'system', 'professional']
  },
  responseTime: Number, // in seconds
  metadata: {
    userAgent: String,
    ipAddress: String,
    deviceInfo: String
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
alertSchema.index({ userId: 1, createdAt: -1 });
alertSchema.index({ status: 1, createdAt: -1 });
alertSchema.index({ type: 1, severity: -1 });

export default mongoose.model('Alert', alertSchema);