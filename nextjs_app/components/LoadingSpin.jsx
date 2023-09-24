import LoadingComponent from "@/components/Loading";
const LoadingSpin = ({isload}) => { 
    if(isload){
  return (
   <>
   <div className="fixed top-2/4 left-2/4 -translate-x-2/4">
   <LoadingComponent/></div>
   <div className=" absolute top-0 left-0 bg-gray-500 w-full h-[1000px] bg-opacity-40 pointer-events-auto z-40">
   </div>
</>
  )
    }else{
        return
    }
  
}

export default LoadingSpin