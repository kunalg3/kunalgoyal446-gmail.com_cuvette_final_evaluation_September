const mongoose=require('mongoose')

const dynamicSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
dynamicSchema.add({
    impressions: { type: Number, default: 0 }
  });
const DynamicModel = mongoose.model('Dynamic', dynamicSchema)

module.exports=DynamicModel