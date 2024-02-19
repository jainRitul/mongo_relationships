const mongoose = require('mongoose');
const {Schema} = mongoose;

//one to many approach 2 where we store child ref in parent order is child and custome is parent
main()
.then(()=>{
    console.log("Conncetion established");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const customerSchema = new Schema({
    name : String,
    orders  : [
        {
            type : Schema.Types.ObjectId,
            ref : "Order"
        }
    ]
})

const orderSchema = new Schema({
    item : String,
    price : Number
})

// customerSchema.pre("findOneAndDelete",()=>{
//     console.log("pre middleware");
// })
customerSchema.post("findOneAndDelete",async (customer)=>{
   if(customer.orders.length){
    let res = await Order.deleteMany({_id : {$in : customer.orders}})
    console.log(res);
   }
})
const Order = mongoose.model("Order",orderSchema);
const Customer = mongoose.model("Customer",customerSchema);


// const addCustomer = async () =>{
//     // let cus1 = new Customer({
//     //     name : "Ritul Jain",
    
//     // })
//     // let order1 = await Order.findOne({item :"Pizza"});
//     // let order2 = await Order.findOne({item : "Burger"});

//     // cus1.orders.push(order1);
//     // cus1.orders.push(order2);
//     // let result = await cus1.save();
//     // console.log(result);

//     let result = await Customer.find({}).populate("orders");
//     console.log(result[0]);
// }
// addCustomer();



// const addOrders = async()=>{
//    let result =  await Order.insertMany([
//         {item : "Samosa" , price : 12},
//         {item : "Pizza" , price :199},
//         {item : "Burger" , price: 50 }
//     ])

//     console.log(result);

// }
// addOrders();

const addCustomer = async ()=>{
    let newCust = new Customer({
        name : "neha singh"
    })

    let newOrder  = new Order({
        item : "Aloo paratha",
        price : 10
    })

    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();
    console.log("added new customer");
}
// addCustomer();
const delCus = async ()=>{
    let data = await Customer.findByIdAndDelete('65d042b63f117dce631f51c5');
    console.log(data);
}
delCus();
