var express = require('express');
var request = require('request');
var router = express.Router();

var mongoose =require('mongoose');

var userSchema= mongoose.Schema({
    first_name:String,
    last_name:String,
    street:String, 
    ﬂoor:String, 
    apartment:String, 
    zip_code:String, 
    city:String, 
    email_address:String, 
    phone_number:String,
    special_notes:String
});
var UserInfo = mongoose.model("UserInfo",userSchema);
var user1 = new UserInfo({
    first_name:"Dor",
    last_name:"Florentin",
    street:"Greenberg", 
    ﬂoor:"10", 
    apartment:"73", 
    zip_code:"69373", 
    city:"Tel-Aviv", 
    email_address:"flordor@gmail.com", 
    phone_number:"0528196775",
    special_notes:"left entrance"
});
//user1.save();


router.post('/saveUserInfo', function(req, res, next) {
	request.get({ url: "http://www.yaddress.net/api/Address?AddressLine1=&AddressLine2="+req.body.city+","+req.body.zip_code+"&UserKey=" }
		,function(error, response, body) {
			
			console.log(response.body);
			var resBodyObj = JSON.parse(response.body);
			console.log(resBodyObj.ErrorCode);			
			
			if (!error && resBodyObj.ErrorCode == 0) { 
				var newUser = new UserInfo({
					first_name:req.body.first_name,
					last_name:req.body.last_name,
					street:req.body.street, 
					ﬂoor:req.body.ﬂoor, 
					apartment:req.body.apartment, 
					zip_code:req.body.zip_code, 
					city:req.body.city, 
					email_address:req.body.email_address, 
					phone_number:req.body.phone_number,
					special_notes:req.body.special_notes
				});
				newUser.save(function(err,user){
					if (err) throw err;
					res.send(user);
				}); 
			}else{
				console.log(resBodyObj.ErrorMassage);
			}
		}); 	
});
router.get('/getUsersInfo', function(req, res, next) {
     UserInfo.find({}, function (err, users) {
        if (err) throw err;
        console.log(users);
        res.send(users);
    });
});

module.exports = router;
