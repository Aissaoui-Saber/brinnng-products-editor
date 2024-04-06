const express = require("express");
const cors = require('cors');
const fs = require('fs');
const mysql = require("mysql");
const idGenerator = require("./random_strings.js");


//const fileUpload = require('express-fileupload');
//const bodyParser = require('body-parser');
//const morgan = require('morgan');
//const _ = require('lodash');


const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Helldorado1996.",
    database: "BrinnngDB",
    multipleStatements: true
});


let app = express();
let router = express.Router();
app.use(express.json());
app.use(cors());


/*app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));*/



dbConnection.connect((err)=>{
    if (!err){
        console.log("Database connection secceded");
        app.use(router);
        app.listen(80);
        console.log("web server started listening on port 80");
    }else{
        console.log("Database connection failed");
    	console.log(err);
    }
});

/*app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            //let avatar = req.files.avatar;
        	console.log(req);
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: "name",
                    mimetype: "",
                    size: 223
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
*/

function getProductImagesList(productID){
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
      });
}





router.get("/products",(req,res)=>{
    dbConnection.query("SELECT product.id,product_lang_data.id as language_data_id,product.barcode,product.measuring_unit,product.quantity,product.creation_date,product.creation_time,product.treated,product.creator,product.pack_of,product_lang_data.nature,product_lang_data.type,product_lang_data.brand,product_lang_data.vending_unit,product_lang_data.taste,product_lang_data.language FROM BrinnngDB.product, BrinnngDB.product_lang_data",
         (err, rows, fields)=>{
        if (err){
            console.log(err);
        }else{{
            res.json(rows);            
        }}
    });
});




router.post("/products", (req, res, next) => {
    let productID = getFullCurrentTime()+idGenerator.randomID(5);

	if(req.files.file0 != null){req.files.file0.mv('./uploads/pictures/' + productID + '/' + req.files.file0.name);}
	if(req.files.file1 != null){req.files.file1.mv('./uploads/pictures/' + productID + '/' + req.files.file1.name);}
	if(req.files.file2 != null){req.files.file2.mv('./uploads/pictures/' + productID + '/' + req.files.file2.name);}
	if(req.files.file3 != null){req.files.file3.mv('./uploads/pictures/' + productID + '/' + req.files.file3.name);}
	if(req.files.file4 != null){req.files.file4.mv('./uploads/pictures/' + productID + '/' + req.files.file4.name);}
	if(req.files.file5 != null){req.files.file5.mv('./uploads/pictures/' + productID + '/' + req.files.file5.name);}

    dbConnection.query("INSERT INTO BrinnngDB.product (id,barcode,measuring_unit,quantity,creation_date,creation_time,creator,pack_of) VALUES ('"+productID+"','"+req.body.barcode+"','"+req.body.measuringUnit+"','"+req.body.quantity+"',CURDATE(),CURTIME(),'"+req.body.creator+"','"+req.body.packOf+"');",
     (err, rows, fields)=>{
        if (err){
            console.log(err);
        }else{
            dbConnection.query("INSERT INTO BrinnngDB.product_lang_data (nature,type,brand,vending_unit,taste,language,product_id) VALUES ('"+req.body.nature+"','"+req.body.type+"','"+req.body.brand+"','"+req.body.vendingUnit+"','"+req.body.taste+"','"+req.body.language+"','"+productID+"');",
            (err, rows, fields)=>{
                if (err){
                    console.log(err);
                }else{
                    res.json({"success": true});
                }
            });   
        }
    });
    //console.log(req.body);
    //console.log(getFullCurrentTime()+idGenerator.randomID(5));
});


//CHECK IF A PRODUCUT EXISTS OR NOT
router.get("/products/barcode/:barcode",(req,res)=>{
    dbConnection.query("SELECT product.id,product_lang_data.id as language_data_id,product.barcode,product.measuring_unit,product.quantity,product.creation_date,product.creation_time,product.treated,product.creator,product.pack_of,product_lang_data.nature,product_lang_data.type,product_lang_data.brand,product_lang_data.vending_unit,product_lang_data.taste,product_lang_data.language FROM BrinnngDB.product, BrinnngDB.product_lang_data WHERE product.barcode like ? AND product_lang_data.product_id = product.id",[req.params.barcode],
     (err, rows, fields)=>{
        if (err){
            console.log(err);
        }else{{
            res.json(rows);     
        }}
    });
});

router.get("/products/find/:keyword",(req,res)=>{
	let sql = 'SELECT product.id,product_lang_data.id as language_data_id,product.barcode,product.measuring_unit,product.quantity,product.creation_date,product.creation_time,product.treated,product.creator,product.pack_of,product_lang_data.nature,product_lang_data.type,product_lang_data.brand,product_lang_data.vending_unit,product_lang_data.taste,product_lang_data.language FROM BrinnngDB.product, BrinnngDB.product_lang_data WHERE product.ID like product_lang_data.product_id AND (product.barcode like "'+req.params.keyword+'%" OR product_lang_data.nature like "'+req.params.keyword+'%" OR product_lang_data.type like "'+req.params.keyword+'%" OR product_lang_data.brand like "'+req.params.keyword+'%" OR product_lang_data.vending_unit like "'+req.params.keyword+'%" OR product_lang_data.taste like "'+req.params.keyword+'%" )';
	dbConnection.query(sql,[req.params.keyword],
     (err, rows, fields)=>{
        if (err){
            console.log(err);
        }else{{
            res.json(rows);     
        }}
    });
});

router.get("/units_fr",(req,res)=>{
    res.json({"units":["g","Kg","L","cl","ml","autre"]});
});


router.get("/vending_units_fr",(req,res)=>{
    res.json({"units":["unité","bouteille","pot","boite","sac","sachet","packet","autres"]});
});

router.get("/units_ar",(req,res)=>{
    res.json({"units":["غ","كغ","ل","سل","مل","وحدة أخرى"]});
});


router.get("/vending_units_ar",(req,res)=>{
    res.json({"units":["وحدة","قارورة","كوب","علبة","كيس","حزمة","وحدة أخرى"]});
});


function getFullCurrentTime(){
    let time = new Date();

    let d = reverseString(formatDate(time.getDate()+"",2));
    let m = reverseString(formatDate(time.getMonth()+1+"",2));
    let y = reverseString(time.getFullYear()%1000 + "");
    let h = reverseString(formatDate(time.getHours()+"",2));
    let min = reverseString(formatDate(time.getMinutes()+"",2));
    let s = reverseString(formatDate(time.getSeconds()+"",2));
    let ms = reverseString(formatDate(time.getMilliseconds()+"",4));
    return d+m+y+h+min+s+ms;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function formatDate(str,length){
    if (length == 2){
        if(str.length == 1){
            str = "0"+str;
        }
    }else{
        if (str.length == 1){
            str = "000"+str;
        }
        if (str.length == 2){
            str = "00"+str;
        }
        if (str.length == 3){
            str = "0"+str;
        }
    }
    return str;
}

