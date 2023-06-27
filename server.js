const express = require('express');
const app = express();
const artistRouter = require('./routes/artistRouter');
const albumRouter = require('./routes/albumRouter');
const trackRouter = require('./routes/trackRouter');

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use('/artist', artistRouter);
app.use('/album', albumRouter);
app.use('/track', trackRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error while starting the server:", error);
    process.exit(1); // Stop the process if an error occurs
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
