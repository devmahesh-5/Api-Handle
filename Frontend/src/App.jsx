import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
 
  // const [products,error,loading]=customReactQuery('/api/products');
   
//2nd method:
  const [products,setProducts]=useState([])
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const [search,setSearch]=useState('');
  useEffect(()=>{
    // axios.get('/api/products')
    // .then((res)=>{
    //   setProducts(res.data)
    // })
    const controller=new AbortController();
    ;(async()=>{
      try {
        setLoading(true);
        setError(false);
        const response=await axios.get('/api/products?search='+search,{
          signal: controller.signal//previous requests are thrown to catch so handle the error there
        })
        setProducts(response.data);
      } catch (error) {
        if(axios.isCancel(error)){
          console.log("Axios Error thrown"+error);
          return;
        }else{
        setError(true)
      }
      } finally{
        setLoading(false);
      }
    })()
    
    return ()=>controller.abort();
    
  },[search])
  

  // if(error){
  //   return(
  //     <>
  //     <h1>Something Went Wrong</h1>
  //     </>
  //   )
  // }
  // if(loading){
  //   return(
  //     <>
  //     <h1>Loading...</h1>
  //     </>
  //   )
  // }
  return (
    <>
     <h1>Api handling with axios </h1>
     <input type="text" 
      onChange={(e)=>{setSearch(e.currentTarget.value)}}
     />
     {loading && (<h1>Loading...</h1>)}
     {error && ( <h1>Something Went Wrong</h1>)}
     {products.map((product)=>(
      <div key={product.id}>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} height={180} width={200}/>
        <p>Price: {product.price}</p>
      </div>
     ))}
     <h2>No of products are: {products.length}</h2>
    </>
  )

}
export default App
// const customReactQuery=(urlPath)=>{
//   const [products,setProducts]=useState([])
//   const [error,setError]=useState(false)
//   const [loading,setLoading]=useState(false)
//   useEffect(()=>{
//     // axios.get('/api/products')
//     // .then((res)=>{
//     //   setProducts(res.data)
//     // })
//     ;(async()=>{
//       try {
//         setLoading(true);
//         setError(false);
//         const response=await axios.get(urlPath)
//         setProducts(response.data);
//       } catch (error) {
//         setError(true)
        
//       } finally{
//         setLoading(false);
//       }
//     })()
    
    
//   },[])
//   return [products,error,loading];
// }