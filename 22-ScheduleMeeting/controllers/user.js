const fs = require('fs').promises;
const Slots = require('../models/slots');
const Meeting = require('../models/meeting');

exports.getSchedulepage = async(request,response,next)=>{
    response.sendFile('index.html',{root:'views'});
}

exports.getSlotDetails = async (request,response,next)=>{
    try{
        // await Slots.create({
        //     time:"14:00:00",
        //     noOfslot:4
        // })
        const slotData = await Slots.findAll();
        response.send(slotData);
    }catch(err){
        console.log(err);
    }
}

exports.increaseSlot = async (request,response,next)=>{
    const rID = request.params.rID;
    try {  
        const meetingdata = await Meeting.findByPk(rID);  
        const oneData = await Slots.findByPk(meetingdata.SlotId);
        if(oneData.noOfslot<4){
          oneData.noOfslot+=1;
          oneData.save();  
          response.send('Slot no increased') 
        }else{
            response.send('Maximum Slot Reached')   
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.postmeetingDetails = async(request,response,next)=>{
    const dID = request.params.dID;
    try{
        const slot = await Slots.findByPk(dID);
        const{Name,email} = request.body;
        await slot.createMeeting({
            Name:Name,
            emailId:email,        
        })

        const oneData = await Slots.findByPk(dID);
        if(oneData.noOfslot>0){
          oneData.noOfslot-=1;
          oneData.save();  
        } 

        response.redirect('/user/schedule-meeting');

    }catch(err){
        console.log("Error while adding the details of a new User",err);
        response.send('Duplicate Entry');
    }
}
exports.getmeetingDetails = async(request,response,next)=>{
    const dID = request.params.dID;
    try {
        const meetingdata = await Meeting.findAll({include:['Slot']});
        response.send(meetingdata);
        
    } catch (error) {
        console.log(error);
    }
}

exports.deletemeetingDeatils = async(request,response,next)=>{
    const dID = request.params.dID;
    try {
        const meetingdata = await Meeting.findByPk(dID);
        meetingdata.destroy();
        response.send("meeting removed")
    } catch (error) {
        console.log(error);
    }
}


