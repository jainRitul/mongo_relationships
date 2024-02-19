const mongoose = require('mongoose');
const {Schema} = mongoose;

//one to many approach one  one to few relation
main()
.then(()=>{
    console.log("Conncetion established");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new Schema({
    username : String,
    addresses : [
        {
            _id : false,
            location : String,
            city : String
        }
    ]
})
const User = mongoose.model("User",userSchema);

//one to few
const addUser = async ()=>{

    let user1 = new User({
        username : "Ritul Jain",
        addresses : [
            {
            
               location : "Kalinjara",
               city : "Banswara"
            }
        ]
    })
    user1.addresses.push({location : "Parul University",city:"Vadodara"});
    let result =  await user1.save();
    console.log(result);
}

addUser();
