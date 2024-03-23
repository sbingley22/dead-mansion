# dead mansion

A simple pre rendered background Resident Evil / Fatal Frame clone. Uses react three fiber, drei, pathfinding and other such libraries. Some assets are packed into the index.html to allow the game to be run without need of a server. It's just a demo / proof of concept.

Point and click to move on walkable tiles.
Hold right mouse button to aim camera, release to take a photo.
The longer you hold it, the more power the photo will have.
Snap photos of nightmare creatures to damage them.
Click items in your inventory to use them.
Watch for cursor changes to indicate new areas to move to.
This demo only contains 7 areas to explore.

------------------------------------

installation:
All you need to do is run:

npm run build

that will create a build folder with a index.html in.
Simply double click the index.html and it runs.
No need for a server.


-------------------------------------

my setup:

npm i three @react-three/fiber @react-three/drei pathfinding
npm i --save-dev vite-plugin-singlefile