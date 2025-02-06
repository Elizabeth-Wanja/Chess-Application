const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // Black pieces
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // Black pawns
  ["", "", "", "", "", "", "", ""],           // Empty rows
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // White pawns
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]  // White pieces
];

document.addEventListener("DOMContentLoaded", () => {
  const chessboard = document.getElementById("chessboard");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");

      // Assign a unique ID for each tile
      tile.id = `tile-${row}-${col}`;

      // Alternate tile colors based on row and column
      tile.setAttribute(
        "data-color",
        (row + col) % 2 === 0 ? "light" : "dark"
      );

      // Add chess pieces if present
      const piece = initialBoard[row][col];
      if (piece) {
        const pieceElement = document.createElement("span");
        pieceElement.textContent = piece;

        // Assign data attributes for the piece
        pieceElement.setAttribute("data-piece", piece);
        pieceElement.setAttribute(
          "data-color",
          row < 2 ? "black" : "white" // Black for rows 0-1, white for rows 6-7
        );

        // Style the piece
        pieceElement.style.fontSize = "36px";
        pieceElement.style.fontWeight = "bold";
        pieceElement.style.display = "inline-block";
        pieceElement.style.textAlign = "center";
        pieceElement.style.lineHeight = "80%"; // Center the piece within the tile
        pieceElement.style.width = "80%";
        pieceElement.style.height = "80%";
        pieceElement.style.borderRadius = "50%"; // Rounded appearance
        pieceElement.style.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.2)"; // Subtle shadow effect

        tile.appendChild(pieceElement);
      }

      chessboard.appendChild(tile);
    }
  }
});



// new code that am coming up with that tries to handle fetch

fetch('http://localhost:3000/chessboard/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    piece: 'pawn',
    colour: 'white',
    position: 'a3',
  }),
})
  .then(response => response.json())
  .then(data => console.log('Updated piece:', data))
  .catch(error => console.error('Error:', error));

  function movePiece(pieceId, newPosition) {
    fetch(`http://localhost:3000/chessboard/${pieceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ position: newPosition }),
    })
      .then(response => response.json())
      .then(updatedPiece => {
        console.log('Piece updated:', updatedPiece);
        // Update the UI
        const oldTile = document.querySelector(`[data-position="${updatedPiece.position}"]`);
        const newTile = document.querySelector(`[data-position="${newPosition}"]`);
        if (oldTile) oldTile.innerHTML = '';
        if (newTile) newTile.innerHTML = `<span>${updatedPiece.piece}</span>`;
      })
      .catch(error => console.error('Error updating piece:', error));
  }
  