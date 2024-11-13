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
    start:"2023-08-15T10:00:00.000Z",
    end:"2023-08-15T12:00:00.000Z"
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
    start:"2023-07-13T07:00:00.000Z",
    end:"2023-07-13T10:00:00.000Z"
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
  description: "The Tech Innovators Summit is a premier conference bringing together the brightest minds and leaders in technology. Join us for an immersive experience where industry experts explore the latest breakthroughs in AI, cybersecurity, and software engineering. Gain insights into cutting-edge innovations, emerging trends, and the future of technology. This conference is a must-attend event for anyone passionate about driving change and advancing tech solutions to address real-world challenges.",
  dressCode:"Smart casual",
  ageRestrictions:"18 and above",
  tags:['Technology', 'Innovation', 'AI', ],
  imageUrl:"https://images.pexels.com/photos/9301156/pexels-photo-9301156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  type:"Offline"
}

async function createMeetup(newMeetup) {
  try{
    const meetup = new Meetup(newMeetup)
    const saveMeetup= await meetup.save()
    console.log('New Meetup data: ', saveMeetup)
  }catch(error){
      throw error
  } 
}

//createMeetup(meetup1)
//createMeetup(meetup2)

// add new book by post

app.post('/meetups', async(req,res)=>{
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

app.get('/meetups',async (req,res)=>{
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

app.get('/meetups/:meetupId', async (req, res) => {
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

//add new data


//delete meetup by id
async function deleteMeetupById(meetupId) {
  try{
      const deleteMeetup = await Meetup.findByIdAndDelete(meetupId)
      return deleteMeetup
  }catch(error){
    throw error
  }
}

app.delete('/meetups/:meetupId', async (req,res)=>{
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