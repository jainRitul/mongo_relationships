const mongoose = require('mongoose');
const {Schema} = mongoose;

//one to many approach 3 where we store parent ref in child 
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
    email : String
})
const postSchema = new Schema({
    content : String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId,
        ref :  "User"
    }
})
const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

const addData = async ()=>{
    // let user = await User.findOne({username : "rituljain"});
    // let post2 = new Post({
    //     content : "Bye bye :)",
    //     likes : 32
    // })
    // post2.user = user ;
    // await post2.save();

    let result = await Post.findOne({}).populate("user","username");
    console.log(result);
  
}
addData();