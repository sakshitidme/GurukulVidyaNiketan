const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  studentName: {
    surname: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true }
  },
  fatherName: {
    surname: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    education: { type: String, required: true }
  },
  motherName: {
    surname: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    education: { type: String, required: true }
  },
  dateOfBirth: { type: Date, required: true },
  applyingForGrade: { type: String, required: true },
  disability: { type: String, enum: ['Yes', 'No'], default: 'No' },
  disabilityType: { type: String },
  category: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  pincode: { type: String, required: true },
  // File fields (can store paths or boolean if uploaded)
  photos: {
    studentPhoto: { type: String },
    fatherPhoto: { type: String },
    motherPhoto: { type: String }
  },
  signatures: {
    father: { type: String },
    mother: { type: String }
  },
  registrationFeePaid: { type: Boolean, default: false },
  paymentDetails: {
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String }
  },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', AdmissionSchema);
