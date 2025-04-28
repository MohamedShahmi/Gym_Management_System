import { Schedule } from "../models/scheduleModel.js";


// get all schedules
const getSchedules = async(req, res) => {

    try{
        const schedules =await Schedule.find({});
        res.status(200).json(schedules);
    }catch(error){
        res.status(500).json({message: error.message});
    }
    
}

// get schedule by id
const getSchedule = async(req, res) => {

    try{
        const { id } = req.params;
        const schedule =await Schedule.findById(id);
        if (!schedule) return res.status(404).json({ message: "Schedule not found" });

        res.status(200).json(schedule);
        
    }catch(error){
        res.status(500).json({message: error.message});
    }
}


//create schedule
const createSchedule = async(req, res) => {

    try{
        const schedule =await Schedule.create(req.body);
        res.status(200).json(schedule);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//update a schedule by id
const updateSchedule =  async(req, res) => {

    try{
        const { id } = req.params;
        const schedule =await Schedule.findByIdAndUpdate(id, req.body, { new: true });
        if (!schedule) {
            return res.status(404).json({message: "Schedule not found"})        }

        const updatedSchedule = await Schedule.findById(id);
        res.status(200).json(updatedSchedule);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//delete a schedule by id
const deleteSchedule = async(req, res) => {

    try{
        const { id } = req.params;
        const schedule = await Schedule.findByIdAndDelete(id);
        
        if (!schedule) {
            return res.status(404).json({message: "Schedule not found"})
        }

        res.status(200).json({message: "Schedule deleted successfully" });

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//report generation
const getScheduleBySessionID = async (req, res) => {
    try {
      const { sessionID } = req.params;
      const schedule = await Schedule.findOne({ sessionID }); // Query by sessionID
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export { getSchedules, getSchedule,getScheduleBySessionID, createSchedule, updateSchedule, deleteSchedule };