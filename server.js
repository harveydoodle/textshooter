const express = require('express');
const app = express();

const PORT = (process.env.PORT || 7007);

app.use(express.static(__dirname + '/rest-react-front/build'));

app.get('*', (req,res)=>{
    res.send(__dirname + '/rest-react-front/build/index.html')
})

app.listen(PORT, () =>{
    console.log('listening on port ' + PORT)
})