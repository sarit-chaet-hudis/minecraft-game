built by sarit chaet hudis over a weekend during appleseeds bootcamp.

---

live version is available at: https://minecraft-2d-sarit-chaet-hudis.netlify.app/

---

for now, suited mainly for landscape displays.

Design overview:
gameboard state is stored in boardMatrix, display is handled by divs and classes.
Drawing the board is done via drawBoard func, or replaceTile for single tile change.
mining requires proper tool, see miningPossible obj.
**
gameplay has two modes-
MiningMode enables mining and is triggered by selecting a tool.
BuildMode (miningMode=false) enables building and is triggered by selecting available resource.
**
inventory is stored in inventory obj, and display is via dynamically created divs (see refreshInventoryDisplay).
**
special emphasis on ux, clear user messages and smooth experience.
**
known issues:
after building on a cloud, mining the tile will reveal sky and not cloud texture.
