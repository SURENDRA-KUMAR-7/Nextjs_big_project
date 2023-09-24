import Navbar from "@/components/Navbar";
import PlanBuiedRefer from "@/components/PlanBuiedRefer";
export default function Refer() {
 
    return (
      <>
        <Navbar title={"Refer and Earn"} />
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
        <PlanBuiedRefer baseUrl={process.env.BASE_URL}/>
          </div>
        </section>
      </>

     );
}
