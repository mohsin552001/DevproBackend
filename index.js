let express =require('express')
let connection =require('./db')

let cors =require('cors')
let app =express()
let bodyParser =require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use('/images',express.static('images'))

app.get(('/data'),(req,res)=>{
let query ='select * from Devwebtable'


connection.query(query,(err,result)=>{
if(err){
    console.log(err)
}else{
    res.status(200).json(result)
}
})
})


app.get(('/data/:id'),(req,res)=>{
    let query ='select * from Devwebtable where id=?'
    
    
    connection.query(query,[req.params.id],(err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.status(200).json(result)
    }
    })
    })

   



    app.get('/comments/:id', (req, res) => {
        const id = req.params.id;
        const query = `SELECT * FROM comments WHERE foreignId = ${id}`;
        connection.query(query, (error, results) => {
          if (error) throw error;
 
          res.status(200).json(results)
        });
      });


      app.post('/comments', (req, res) => {
        const foreignId = req.body.foreignId;
        const comments = req.body.comments;
        const nameforcomment =req.body.nameforcomment
        const query = `INSERT INTO comments (foreignId, comments,nameforcomment) VALUES (${foreignId}, "${comments}","${nameforcomment}")`;
        connection.query(query, (error, results) => {
          if (error) throw error;
          res.status(200).json(results)
        });
      });


    
//FOR THE PURPOSE OF COUNT COMMENTS 
      app.get('/count-comments/:id', function (req, res) {
        const id = req.params.id;
        connection.query('SELECT COUNT(*) FROM comments WHERE foreignId = ?', [id], function (error, results) {
          if (error) throw error;
          res.status(200).json(results)
        });
      });



   //INCREMENT FOR THE PURPOSE OF LIKE AND FAVOURITE
  




   


  // app.get('/increment', function (req, res) {
  //   connection.query('select `like` from Devwebtable where id =1', function (error, results, ) {
  //     if (error) throw error;
  //     res.send('Value incremented');
  //   });
  // });





  //FOR THE PURPOSE OF SEARCH FUNCTIONALITY


  app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    connection.query(`SELECT * FROM Devwebtable WHERE name LIKE '%${searchTerm}% '`, (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
    });
  });


  app.put('/data/:id/like', (req, res) => {
    const id = req.params.id;
    connection.query('UPDATE Devwebtable SET `like` = `like` + 1 WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          message: 'Post liked successfully!'
        });
      }
    });
  });


app.listen(3200,()=>{
    console.log('app is runngin at 3200 ')
})