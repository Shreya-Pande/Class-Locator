import mongoose from "mongoose";

const bookSchema= mongoose.Schema({
    BlockName: String,
    RoomNumber: String,
    DayOfWeek: String,
    StartTime: String,
    EndTime: String,
})

const Book = mongoose.model("Book", bookSchema);

export default Book;