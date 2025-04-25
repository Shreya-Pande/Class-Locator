// // DialogBox.js
// import React, { useState } from 'react';
// import './DialogBox.css';

// const DialogBox = () => {
//   const [showRooms, setShowRooms] = useState(false);

//   const handleBookClick = () => {
//     setShowRooms(true);
//   };

//   return (
//     <div className="dialog-box">
//       <select>
//         <option>Select a block</option>
//         <option>Block A</option>
//         <option>Block B</option>
//         <option>Block C</option>
//         <option>Block D</option>
//       </select>
//       <select>
//         <option>Select Start Timings</option>
//         <option>9:00 AM</option>
//         <option>10:00 AM</option>
//         <option>11:00 AM</option>
//         <option>12:00 AM</option>
//         <option>13:00 AM</option>
//         <option>14:00 AM</option>
//         <option>15:00 AM</option>
//         <option>16:00 AM</option>
//       </select>
//       <select>
//         <option>Select End Timings</option>
//         <option>10:00 AM</option>
//         <option>11:00 AM</option>
//         <option>12:00 PM</option>
//         <option>13:00 PM</option>
//         <option>14:00 PM</option>
//         <option>15:00 PM</option>
//         <option>16:00 PM</option>
//         <option>17:00 PM</option>
//       </select>
//       <select>
//         <option>Select a day</option>
//         <option>Monday</option>
//         <option>Tuesday</option>
//         <option>Wednesday</option>
//         <option>Thursday</option>
//         <option>Friday</option>
//       </select>
//       <button onClick={handleBookClick}>Show Available Rooms</button>

//       {showRooms && (
//         <div className="room-cards">
//           <div className="room-card delay-1">
//             <h2>Room 303</h2>
//             <button>Book</button>
//           </div>
//           <div className="room-card delay-2">
//             <h2>Room 111</h2>
//             <button>Book</button>
//           </div>
//           <div className="room-card delay-3">
//             <h2>Room 205</h2>
//             <button>Book</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DialogBox;












import React, { useState } from "react";
import "./DialogBox.css";

const DialogBox = () => {
  const [block, setBlock] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  const handleBookClick = async () => {
    // Validate the inputs
    if (!block || !startTime || !endTime || !dayOfWeek) {
      setError("All fields are required.");
      setRooms([]);
      return;
    }

    setError(""); // Clear any previous errors

    try {
      // Call the API
      const response = await fetch(
        `http://localhost:3000/api/Book?block=${block}&dayOfWeek=${dayOfWeek}&startTime=${startTime}&endTime=${endTime}`
      );

      if (response.ok) {
        const data = await response.json();
        setRooms(data.matchingRooms || []);
      } else {
        const errorData = await response.json();
        setRooms([]);
        setError(errorData.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      setRooms([]);
      setError("Failed to fetch available rooms. Please try again later.");
    }
  };

  return (
    <div className="dialog-box">
      <select value={block} onChange={(e) => setBlock(e.target.value)}>
        <option value="">Select a block</option>
        <option value="A">Block A</option>
        <option value="B">Block B</option>
        <option value="C">Block C</option>
        <option value="D">Block D</option>
      </select>

      <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
        <option value="">Select Start Timings</option>
        <option value="09:00AM">9:00 AM</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="13:00 PM">1:00 PM</option>
        <option value="14:00 PM">2:00 PM</option>
        <option value="15:00 PM">3:00 PM</option>
        <option value="16:00 PM">4:00 PM</option>
      </select>

      <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
        <option value="">Select End Timings</option>
        <option value="10:00AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="13:00 PM">1:00 PM</option>
        <option value="14:00 PM">2:00 PM</option>
        <option value="15:00 PM">3:00 PM</option>
        <option value="16:00 PM">4:00 PM</option>
        <option value="17:00 PM">5:00 PM</option>
      </select>

      <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
        <option value="">Select a day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
      </select>

      <button onClick={handleBookClick}>Show Available Rooms</button>

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display available rooms */}
      <div className="room-cards">
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <div key={index} className={`room-card delay-${index + 1}`}>
              <h2>Room {room}</h2>
              <button>Book</button>
            </div>
          ))
        ) : (
          !error && <p>No rooms available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default DialogBox;
