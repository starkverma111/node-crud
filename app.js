var express = require('express');
var app = express();

//ejs templete
app.set('view engine', 'ejs');

//Database connection file config.js..
var connection = require('./config');

// this is for read POST data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//All routing start here.. 

// index page get data by database...
app.get('/', function(req, res){
res.render("Create");
});
app.get('/Read', function(req, res){
    connection.query("SELECT * FROM student", function (err, result) {
        if (err) throw err;
        //console.log(result);
        res.render('Read', { title: 'pizza', userData: result});
      });

 });

 // index page insert data in databse...
app.post('/', function(req, res){
   var a = req.body.name;
   var b = req.body.email;
   var c = req.body.message;
            
            var sql = "INSERT INTO `student`(`name`,`email`,message) VALUES ('"+a+"','"+b+"','"+c+"')";
            connection.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
            return res.render('Create', { errormessage: 'insert data successfully' });
 });




// Delete page.... delete data by id
app.get('/delete/:id', function(req, res) {
    var id= req.params.id;
      var sql = 'DELETE FROM student WHERE id = ?';
      connection.query(sql, [id], function (err, data) {
      if (err) throw err;
      console.log(id);
      console.log(" record deleted"+id);
    });
    return res.redirect('/Read');

  });


 // Update page get data by id... 
  app.get('/Update/:id', function(req, res) {
       var id= req.params.id;
       
       var sql = 'SELECT * FROM student WHERE id = ?';
      connection.query(sql, [id], function (err, data) {
      if (err) throw err;
     
      console.log(data);
      res.render('Update', { title: 'User List', editData: data[0]});
      
    });
    
  });


  //update page sned post request to update data into database...
  app.post('/Update/:id', function(req, res) {
    var id= req.params.id;
      var updateData=req.body;
      var sql = `UPDATE student SET ? WHERE id= ?`;
      connection.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      return res.redirect('/Read');
    });
  
  });



app.listen(3000);