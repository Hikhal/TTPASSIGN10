const express = require('express')
const app = express();
app.use(express.json()) 

const artistRouter = require('./routes/artistRouter');
const albumRouter = require('./routes/albumRouter');
// const trackRouter = require('./routes/trackRouter');
// const labelRouter = require('./routes/labelRouter');

app.use('/artist', artistRouter);
app.use('/album', albumRouter);
// app.use('/track', trackRouter);
// app.use('/label', labelRouter);

app.listen(3000, (error) => {
    if (error) {
      console.log("Error while starting the server:", error);
    } else {
      console.log("Server started on port 3000");
    }
});
