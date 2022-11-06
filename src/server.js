const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => res.status(200).send({
  message: "Server is running..."
}));


const WriteTextToFileAsync = async (contentToWrite) => {
  fs.writeFile('./src/data.json', contentToWrite, (err) => {
    console.log(contentToWrite);
    if(err) {
      console.log(err);
    } else {
      console.log('Done writing to file...');
    }
  })
}


app.post('/write', async (req, res, next) => {
    const requestContent = JSON.stringify(req.body);
  await WriteTextToFileAsync(requestContent)
});
app.use((req, res, next) => res.status(404).send({
  message: "Could not find specified route that was requested...!"
}));

app.listen(port, () => {
  console.log(
    `
    !!! server is running
    !!! Listening for incoming requests on port ${port}
    !!! http://localhost:5000
    `
  )
});