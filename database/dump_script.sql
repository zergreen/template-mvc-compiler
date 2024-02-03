-- SQL Script to set up the boardgame_booking database

-- Drop tables if they already exist (to avoid errors on rerun)
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS games;

-- Creates a table for rooms
CREATE TABLE rooms (
    roomId TEXT PRIMARY KEY,
    roomName TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('available', 'reserved')), -- Ensures status is either 'available' or 'reserved'
    reservedBy TEXT -- Name of the person who reserved the room, NULL if no reservation
);

-- Creates a table for games
CREATE TABLE games (
    gameId TEXT PRIMARY KEY,
    gameName TEXT NOT NULL,
    roomId TEXT, -- ID of the room the game is assigned to, NULL if not assigned
    status TEXT NOT NULL CHECK(status IN ('available', 'reserved')), -- Ensures status is either 'available' or 'reserved'
    FOREIGN KEY(roomId) REFERENCES rooms(roomId) -- Ensures that gameId references an existing roomId
);

-- Sample Data Insertion
-- Inserting rooms
INSERT INTO rooms (roomId, roomName, status) VALUES 
('A1', 'Room A1', 'available'),
('A2', 'Room A2', 'available'),
('A3', 'Room A3', 'available'),
('A4', 'Room A4', 'available'),
('A5', 'Room A5', 'available');

-- Inserting games
INSERT INTO games (gameId, gameName, roomId, status) VALUES 
('G1', 'Chess', NULL, 'available'),
('G2', 'Monopoly', NULL, 'available'),
('G3', 'Catan', NULL, 'available'),
('G4', 'Ticket to Ride', NULL, 'available'),
('G5', 'Pandemic', NULL, 'available');

CREATE TABLE IF NOT EXISTS reservations (
    reservationId INTEGER PRIMARY KEY AUTOINCREMENT,
    roomId TEXT NOT NULL,
    gameId TEXT NOT NULL,
    reservedBy TEXT NOT NULL,
    reservationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (roomId) REFERENCES rooms(roomId),
    FOREIGN KEY (gameId) REFERENCES games(gameId)
);


