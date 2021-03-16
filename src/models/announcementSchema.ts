import {model, Schema, Document, Types} from 'mongoose';
import mongoose from 'mongoose';



export interface IAnnouncement extends Document{
    _id: Types.ObjectId,
    title: string,
    content: string,
    type: string
}

export const announcementSchema = new Schema<IAnnouncement>( {
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 60
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1200
    },
    type: {
        type: String,
        required: true
    }  
});

export default mongoose.model('announcementSchema', announcementSchema);