import mongoose from 'mongoose';
const { Schema } = mongoose;

const MessageSchema = new Schema({
   conversationId:{
      type: String,
      required: true,
   },
   userId:{
      type: String,
      required: true,
   },
   desc:{
      type: String,
      required: true,
   },
   seenAt:{
      type: Date,
   }
},{
    timestamps:true,
    toJSON: {virtuals: true}
});

export default mongoose.model("Message", MessageSchema);