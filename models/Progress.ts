import mongoose, { Schema, Document } from 'mongoose'

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId
  wordId: string
  word: string
  status: 'known' | 'unknown' | 'learning'
  reviewCount: number
  lastReviewed: Date
}

const ProgressSchema = new Schema<IProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  wordId: { type: String, required: true },
  word: { type: String, required: true },
  status: {
    type: String,
    enum: ['known', 'unknown', 'learning'],
    default: 'learning',
  },
  reviewCount: { type: Number, default: 0 },
  lastReviewed: { type: Date, default: Date.now },
}, {
  timestamps: true,
})

// Unique compound index: a user can only have one progress state per word ID
ProgressSchema.index({ userId: 1, wordId: 1 }, { unique: true })

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema)
