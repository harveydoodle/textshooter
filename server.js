const express = require('express');
const app = express();

const PORT = (process.env.PORT || 7007);

app.use(express.static(__dirname + '/rest-react-front/build'));

app.get('*', (req,res)=>{
    res.sendFile('index.html', {root: __dirname + '/rest-react-front/build'})
})

app.listen(PORT, () =>{
    console.log('Listening on port ' + PORT)
})