const mongoose = require('mongoose')



const MeetupSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    
    host:{
       
        startDate:{type:String,
            required:true},
        startTime:{type:String,
            required:true},
        endDate:{type:String,
            required:true},
        endTime:{type:String,
            required:true}

    },
    price:{
        type:Number,
        required:true
    },
    speakers:[
       {
        name:{ 
            type:String,
            required:true
        },
        title:{ 
            type:String,
            required:true
        },
        photo:{ 
            type:String,
            required:true
        }
       }
    ],
    description:{
        type:String,
        required:true
    },

    dressCode:{
        type:String,
        required:true
    },
    ageRestrictions:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },

    type:{
        type:String,
        required:true,
        enum:['Online', 'Offline', 'Both']
    },
},{
    timestamps:true
})


const Meetup=mongoose.model('Meetup', MeetupSchema)

module.exports=Meetup 