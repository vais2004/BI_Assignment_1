const mongoose = require('mongoose')



const MeetupSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },

    type:{
        type:String,
        required:true,
        enum:['Online', 'Offline']
    },
})


const Meetup=mongoose.model('Meetup', MeetupSchema)

module.exports=Meetup 