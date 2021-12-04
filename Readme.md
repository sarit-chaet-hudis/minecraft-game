built by sarit chaet hudis.

gameboard state is stored in boardMatrix, display is handled by divs.
Drawing the board is done via drawBoard func, or replaceTile for single tile change.
mining requires proper tool, see miningPossible obj.
gameplay has two modes- miningMode enables mining and is triggered by selecting a tool.
BuildMode (miningMode=false) enables building and is triggered by selecting available resource.
inventory is stored in inventory obj, and display is via dynamically created divs (see refreshInventoryDisplay).
