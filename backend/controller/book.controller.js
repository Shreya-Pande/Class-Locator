// import express from "express"
// import Book from "../model/book.model.js"

// const router = express.Router();

// export const getBook= async (req,res) =>{
//     const { block, dayOfWeek, startTime, endTime } = req.query;

//     // Validate query parameters
//     if (!block || !dayOfWeek || !startTime || !endTime) {
//         return res.status(400).json({ message: "All query parameters are required." });
//     }


//     try {
//         // Find all conflicting rooms
//         const conflictingRooms = await Book.find({
//             BlockName: block,
//             DayOfWeek: dayOfWeek,
//             // $or: [
//             //     { StartTime: { $lt: endTime }, EndTime: { $gt: startTime } }
//             // ]

//             StartTime: startTime,
//             EndTime:endTime
//         }).distinct('RoomNumber');

//         // Get all rooms in the block
//         const allRooms = await Book.distinct('RoomNumber', { BlockName: block });

//         // Filter out conflicting rooms
//         const availableRooms = allRooms.filter(room => !conflictingRooms.includes(room));

//         // Respond with the available rooms
//         if (availableRooms.length) {
//             res.status(200).json({ availableRooms });
//         } else {
//             res.status(404).json({ message: 'No available rooms found.' });
//         }

//         // const book=Book.find();
//         // res.status(200).json(book);
//     }catch(error){
//         console.log("Error: ",error);
//         res.status(500).json(error);
//     }
// }










// import express from "express";
// import Book from "../model/book.model.js";

// const router = express.Router();

// export const getBook = async (req, res) => {
//     const { block, dayOfWeek, startTime, endTime } = req.query;

//     // Validate query parameters
//     if (!block || !dayOfWeek || !startTime || !endTime) {
//         return res.status(400).json({ message: "All query parameters are required." });
//     }

//     try {
//         // Find rooms matching all 4 parameters
//         const matchingRooms = await Book.find({
//             BlockName: block,
//             DayOfWeek: dayOfWeek,
//             StartTime: startTime,
//             EndTime: endTime
//         }).distinct('RoomNumber');

//         // Respond with the list of matching rooms
//         if (matchingRooms.length > 0) {
//             return res.status(200).json({ matchingRooms });
//         } else {
//             return res.status(404).json({ message: "No rooms found matching the given criteria." });
//         }
//     } catch (error) {
//         console.error("Error: ", error);
//         res.status(500).json({ message: "Internal server error", error });
//     }
// };






import express from "express";
import Book from "../model/book.model.js";

const router = express.Router();

export const getBook = async (req, res) => {
    const { block, dayOfWeek, startTime, endTime } = req.query;

    // Validate query parameters
    if (!block || !dayOfWeek || !startTime || !endTime) {
        return res.status(400).json({ message: "All query parameters are required." });
    }

    // Parse startTime and endTime as integers
    const startTimeInt = parseInt(startTime, 10);
    const endTimeInt = parseInt(endTime, 10);

    if (isNaN(startTimeInt) || isNaN(endTimeInt)) {
        return res.status(400).json({ message: "startTime and endTime must be valid integers." });
    }

    try {
        // Find rooms where:
        // - BlockName matches `block`
        // - DayOfWeek matches `dayOfWeek`
        // - `startTimeInt` >= T1
        // - `endTimeInt` <= T2
        const rooms = await Book.find({
            BlockName: block,
            DayOfWeek: dayOfWeek,
            T1: { $lte: startTimeInt }, // T1 <= startTimeInt
            T2: { $gte: endTimeInt }   // T2 >= endTimeInt
        }).distinct('RoomNumber');

        // Respond with the list of matching rooms
        if (rooms.length > 0) {
            return res.status(200).json({ rooms });
        } else {
            return res.status(404).json({ message: "No rooms found matching the given criteria." });
        }
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export default router;
