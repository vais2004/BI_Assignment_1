const express = require('express')
const app = express()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const {initializeDatabase}= require('./db/db.connect')
const Meetup= require('./models/meetup.models')

app.use(express.json())

initializeDatabase()

const meetup1={
  title:"Marketing Seminar",
  host:{
    startDate:"Thu Jul 13 2023",
    startTime:"7:00:00 AM IST",
    endDate:"Thu Jul 13 2023",
    endTime:"12:00:00 AM IST"
  }, 
  price:3000,
  speakers:[
    {
      name:"Sarah Johnson",
      title:"Marketing Manager",
      photo:"https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name:"Michael Brown",
      title:"SEO Specialist",
      photo:"https://images.pexels.com/photos/8117528/pexels-photo-8117528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ],
  description: "Stay ahead of the game in the dynamic field of digital marketing by attending the Marketing Seminar organized by Marketing Experts. This offline seminar will be held on August 15th from 10:00 AM to 12:00 PM at Marketing City, situated at 789 Marketing Avenue, City. Join industry leaders Sarah Johnson, Marketing Manager, and Michael Brown, SEO Specialist, as they delve into the latest trends and strategies in digital marketing. The seminar is open to individuals aged 18 and above and requires a ticket priced at ₹3,000. The dress code for the event is smart casual.",
  dressCode:"Smart casual",
  ageRestrictions:"18 and above",
  tags:['Marketing','Digital'],
  imageUrl:"https://images.pexels.com/photos/9301156/pexels-photo-9301156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  type:"Offline"
}

const meetup2={
  title:"Tech Conference",
  host:{
    startDate:"Mon Jul 10 2023",
    startTime:"2:00:00 PM IST",
    endDate:"Mon Jul 10 2023",
    endTime:"6:00:00 PM IST"
  }, 
  price:2500,
  speakers:[
    {
      name:"Alice Williams",
      title:"Software Engineer",
      photo:"https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name:"Jane Smith",
      title:"AI Research Scientist",
      photo:"https://images.pexels.com/photos/8117528/pexels-photo-8117528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ],
  description: " This conference is a must-attend event for anyone passionate about driving change and advancing tech solutions to address real-world challenges. Join us for an immersive experience where industry experts explore the latest breakthroughs in AI, cybersecurity, and software engineering. Gain insights into cutting-edge innovations, emerging trends, and the future of technology.",
  dressCode:"Smart casual",
  ageRestrictions:"18 and above",
  tags:['Technology', 'Innovation', 'AI', ],
  imageUrl:"https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  type:"Offline"
}

const meetup3={
  title: "Photography for Beginners",
  host: {
    startDate:"Tue Aug 15 2023",
    startTime:"10:00:00 AM IST",
    endDate:"Tue Aug 15 2023",
    endTime:"6:00:00 PM IST"
  },
  price: 2000,
  speakers: [
    {
      name: "Varun Patel",
      title: "Professional Photographer",
      photo: "https://images.pexels.com/photos/4579374/pexels-photo-4579374.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Shiv Prasad",
      title: "Photography Instructor",
      photo: "https://images.pexels.com/photos/7620804/pexels-photo-7620804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ],
  description: "Join our 'Photography for Beginners' workshop, designed to introduce you to the world of photography. This hands-on session covers essential topics, from camera settings to composition techniques, making it perfect for beginners eager to capture stunning images. Learn tips and tricks from expert photographers, and leave with the skills to start your own creative journey.",
  dressCode: "Comfortable casual",
  ageRestrictions: "15 and above",
  tags: ["Photography", "Beginner", "Workshop"],
  imageUrl: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  type: "Offline"
}

const meetup4={
  title: "Coding Bootcamp",
  host: {
    startDate:"Mon Jul 10 2023",
    startTime:"10:00:00 AM IST",
    endDate:"Mon Jul 10 2023",
    endTime:"6:00:00 PM IST"
  },
  price: 3000,
  speakers: [
    {
      name: "Siya Nohara",
      title: "Full Stack Developer",
      photo: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Max Kim",
      title: "Software Engineering Instructor",
      photo: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ],
  description: "Perfect for aspiring developers, this bootcamp will give you a strong foundation in coding and prepare you for the tech industry. This day-long event is designed for beginners and those looking to sharpen their coding skills. Dive into the world of coding with our immersive 'Coding Bootcamp.'  Our expert instructors will guide you through programming fundamentals, problem-solving techniques, and hands-on coding exercises. ",
  dressCode: "Casual",
  ageRestrictions: "16 and above",
  tags: ["Coding", "Bootcamp", "Programming", "Development"],
  imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  type: "Offline"
}

const meetup5={
  title: "Social Media Marketing ",
  host: {
    startDate:"Wed Sep 20 2023",
    startTime:"3:00:00 PM IST",
    endDate:"Wed Sep 20 2023",
    endTime:"6:00:00 PM IST"
  },
  price: 2000,
  speakers: [
    {
      name: "Tom Cruise",
      title: "Digital Marketing Expert",
      photo: "https://images.pexels.com/photos/4473561/pexels-photo-4473561.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Jackie Chan",
      title: "Social Media Strategist",
      photo: "https://images.pexels.com/photos/5475569/pexels-photo-5475569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ],
  description: "This event is designed for beginners and business owners looking to build a strong online presence. Unlock the power of social media with our 'Social Media Marketing Made Simple' workshop. Learn key strategies for content creation, audience engagement, and brand growth on popular platforms. With insights from industry professionals, you’ll gain practical skills to elevate your social media marketing efforts.",
  dressCode: "Smart casual",
  ageRestrictions: "18 and above",
  tags: ["Social Media", "Marketing", , "Digital Marketing"],
  imageUrl: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  type: "Offline"
}



async function createMeetup(newMeetup) {
  try{
    const meetup = new Meetup(newMeetup)
    const saveMeetup= await meetup.save()
    //console.log('New Meetup data: ', saveMeetup)
    return saveMeetup
  }catch(error){
      throw error
  } 
}

// createMeetup(meetup1)
// createMeetup(meetup2)
// createMeetup(meetup3)
// createMeetup(meetup4)
// createMeetup(meetup5)


// add new book by post

app.post('/meetup', async(req,res)=>{
  try{
    const savedMeetup = await createMeetup(req.body)

    res.status(201).json({message:"meetup added successfully.", meetup:savedMeetup})

  }catch(error){
    res.status(500).json({error:"Failed to add data" })
  }
})


//get all meetup from the database

async function readAllMeetups() {
  try{
    const meetup = await Meetup.find()
    return meetup

  }catch(error){
    throw error
  }
}

app.get('/meetup/all',async (req,res)=>{
  try{
    const meetups=await readAllMeetups()
    if(meetups.length !=0){
      res.json(meetups)
    }else{
      res.status(404).json({error:"Meetup not found"})
    }

  }catch(error){
    res.status(500).json({error:"failed to fetch data from meetups"})
  }
})



//get meetup by id from the database

async function readMeetupById(meetupId) {
  try {
    const meetup = await Meetup.findById(meetupId);
    return meetup;
  } catch (error) {
    throw error;
  }
}

app.get('/meetup/:meetupId', async (req, res) => {
  try {
    const meetup = await readMeetupById(req.params.meetupId);
    if (meetup) {
      res.json(meetup);
    } else {
      res.status(404).json({ error: "Meetup not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from meetups" });
  }
});


//update a meetup's data with the help of its id

async function updateMeetupData(meetupId,dataToUpdate) {
  try{
      const updatedMeetup= await Meetup.findByIdAndUpdate(meetupId, dataToUpdate,{new:true})
      return updatedMeetup
  }catch(error){
      throw error
  }
}

app.post('/meetup/:meetupId', async (req,res)=>{
  try{
      const updatedMeetup= await updateMeetupData(req.params.meetupId, req.body)

      if(updatedMeetup){
          res.status(200).json({message:"meetup updated successfully."})
      }else{
          res.status(404).json({error:"meetup not found."})
      }
  }catch(error){
      res.status(500).json({error:"failed to update data."})
  }
})





//delete meetup by id
async function deleteMeetupById(meetupId) {
  try{
      const deleteMeetup = await Meetup.findByIdAndDelete(meetupId)
      return deleteMeetup
  }catch(error){
    throw error
  }
}

app.delete('/meetup/:meetupId', async (req,res)=>{
  try{
    const deleteMeetup= await deleteMeetupById(req.params.meetupId)

    if(deleteMeetup){
      res.status(200).json({message:"meetup deleted successfully."})
    }else{
      res.status(404).json({message:"Meetup not found."})
    }

  }catch(error){
    res.status(500).json({message:"failed to delete data."})
  }
})



const PORT =3000
app.listen(PORT,()=>{
  console.log(`Server is running on PORT ${PORT}`)
})