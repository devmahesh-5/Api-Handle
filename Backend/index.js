import express from "express";
const app=express();

app.get('/api/products',(req,res)=>{
    //create product object with id name price and image link from pixel
    const products=[{
        id:1,
        name:"laptop",
        price:100000,
        image:"https://images.pexels.com/photos/6893376/pexels-photo-6893376.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id:2,
        name:"macbook pro",
        price:200000,
        image:"https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id:3,
        name:"camera",
        price:30000,
        image:"https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id:4,
        name:"cookies",
        price:400,
        image:"https://images.pexels.com/photos/28857430/pexels-photo-28857430/free-photo-of-stack-of-delicious-homemade-cookies-on-plate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
]
//http://localhost:3000/api/products?search=%27metalTable%27
if(req.query.search){
    const filteredProduct=products.filter(product=> product.name.includes(req.query.search))
    res.send(filteredProduct);
    return;
}
    setTimeout(() => {
        res.send(products);
    }, 3000);
})

const port =process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
    
})