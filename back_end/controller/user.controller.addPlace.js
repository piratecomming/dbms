

 const addPlace = async (req,res,next)=>{
    
   
    
  const{name,email,url}=req.body
  const placename = name;
   const newplace = new Data({placename,placeDescription:"good place",images:"hey",location:"hhh"})
    newplace.save()
   
 }
 export default addPlace;
 
 