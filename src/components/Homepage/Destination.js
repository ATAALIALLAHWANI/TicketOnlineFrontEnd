 
import destimage from "../assest/4.jpeg";
import destimage2 from "../assest/5.jpeg";
import destimage3 from "../assest/6.jpeg";
import destimage4 from "../assest/8.jpeg";
import "./DestinationStyles.css";
import DestinationData from "../Homepage/DestinationData.js";
 const Destination=()=>{
    return(
    <div className="destination">
        <h1>Popular sites</h1>
        <p>University of Science and Technology bus traffic locations</p>
         
        <DestinationData
        className="first-des"
        heading="Northern Bus Station"
        text="
        The Northern Jordanian Complex constitutes an important center and gathering point for University of Science and Technology
         students and people residing in Irbid and the surrounding areas. The complex is a prime target for students who
          use public transportation, as it offers them various amenities and services.
        The complex represents a meeting point where students gather daily to go to the university and usually 
        use public transportation such as buses to reach the university. 
        Hence the importance of having an application that facilitates the process of booking tickets and paying for students through it."
        img1={destimage}
        img2={destimage2}
        
        
        
        
        />
      <DestinationData
      className="first-des-reverse"
        heading="New Amman Comprehensive Bus Station"
        text="The new comprehensive Amman complex 
        constitutes an important and pivotal point in 
        transporting university students, especially 
        students from the University of Science and
         Technology, and residents residing in Irbid
          and its surrounding areas.
           To facilitate this process for students and 
           reduce crowding, we have created this site.
       "
        img1={destimage3}
        img2={destimage4}
        
        />


















         </div>
       

    )
 }
 export default Destination;