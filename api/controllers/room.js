const Room = require("../models/Room");
const Hotel = require('../models/Hotel');
const createError = require("../utils/error");


const createRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid;
    const newRoom =  newRoom(req.body)

    try{
const savedRoom = await newRoom.save()
try{
    await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms:savedRoom._id},});
}catch(err){
    next(err);
}
  res.status(200).json(savedRoom) 

}catch(err){
        next()
    }
}


  
  const updateRoom= async (req, res, next) => {
    // const newHotel = new Room(req.body);
    try {
      const updateRoom = await Room.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new:true}
      );
      res.status(200).json(updateRoom);
    } catch (err) {
      next(err);
    }
  };


  const updateRoomAvailability= async (req, res, next) => {
    // const newHotel = new Room(req.body);
    try {
      await Room.updateOne(
        {"roomNumber._id": req.params.id},{
          $push: {
            "roomNumbers.$.unavilableDates" : req.body.dattes
          }
        }
      );
      res.status(200).json(updateRoom);
    } catch (err) {
      next(err);
    }
  };
  
  
  const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull : {rooms:req.params.id},});
        }catch(err){
            next(err);
        }
          res.status(200).json(savedRoom) 
        
        }catch(err){
                next()
            }
  };
  
  const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };
  
  const getRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find(req.params.id);
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };
  

  module.exports = {createRoom,updateRoom,deleteRoom,getRoom,getRooms,updateRoomAvailability}