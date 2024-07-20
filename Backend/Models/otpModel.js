import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phoneOtp: {
        type: Number,
        default: null,
    },
    emailOtp: {
        type: Number,
        default: null,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
        required: true,
        get: (timeStamp) => timeStamp.getTime(),
        set: (timeStamp) => new Date(timeStamp),
    }
})
otpSchema.index({ timeStamp: 1 }, { expireAfterSeconds: 10000 });
const otps=mongoose.model('otps',otpSchema)
export default otps