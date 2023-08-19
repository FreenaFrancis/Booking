

const express = require('express');
const Hotel = require('../models/Hotel');
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require('../controllers/hotel');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();
try{

router.post("/", createHotel);
}catch(err){
  console.log(err);
}

// update
router.put('/:id',verifyAdmin, updateHotel);

// delete
router.delete('/find/:id',verifyAdmin, deleteHotel);

// Get
router.get('/:id', getHotel);

// Get all
router.get('/', getHotels);

router.get('/countByCity',countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms );


module.exports = router;





// const express = require('express');
// const Hotel = require('../models/Hotel');
// const { createHotel } = require('../controllers/hotel');

// const router = express.Router();
// // create
// // router.post("/",async(req,res)=>{
// // const newHotel = new Hotel(req.body);
// // try{
// //     const savedHotel = await newHotel.save()
// //     res.status(200).json(savedHotel)
// // }catch(err){
// //     res.status(500).json(err)
// // }
// // })
// // // update
// // router.put("/:id",async(req,res)=>{
   
// //     try{
// //         const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
// //         res.status(200).json(updatedHotel)
// //     }catch(err){
// //         res.status(500).json(err)
// //     }
// //     })
// // // get
// // router.get("/:id",async(req,res)=>{
   
// //     try{
// //        const hotel = await Hotel.findById(req.params.id)
// //         res.status(200).json(gethotel)
// //     }catch(err){
// //         res.status(500).json(err)
// //     }
// //     })
// // // getall
// // router.get("/:id",async(req,res)=>{
   
// //     try{
// //         const hotel = await Hotel.find()
// //         res.status(200).json(hotel)
// //     }catch(err){
// //         res.status(500).json(err)
// //     }
// //     })
// // // delete
// // router.delete("/:id",async(req,res)=>{
   
// //     try{
// //         await Hotel.findByIdAndDelete(req.params.id,{$set: req.body},{new: true})
// //         res.status(200).json(deleteHotel)
// //     }catch(err){
// //         res.status(500).json(err)
// //     }
// //     })

// router.post("/", createHotel);

// // update
// router.put('/:id', updateHotel);



// // delete
// router.delete('/:id', deleteHotel);


// // Get
// router.get('/:id', getHotel);


// // Get all
// router.get('/', getHotels);

// module.exports = router;


