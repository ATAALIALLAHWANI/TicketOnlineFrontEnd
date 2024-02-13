
import "./TripStyles.css";
import TripData from "./TripData";
import just from "../assest/Just.jpeg";
import just2 from "../assest/just2.jpeg";
import just3 from "../assest/just3.jpeg";
function Trip(){
    return(
        <div className="trip">
    <h1>Just university </h1>
    <p>
        Jordan University of Science and Technology
    </p>
    <div className="tripcard">
<TripData
image={just}
heading="Book tickets online"
text="Possibility of booking tickets online
Book a return ticket to and from the University 
of Science and Technology online, which makes it easier
 for students to move to and from the university. 
 In addition to the flexibility in the possibility of booking at
  any time, the availability of more than one booking point that is considered a
 gathering point for students, and the possibility of canceling the reservation.
 In addition to the availability of several alternative solutions 
 in the event of cancellation of the reservation, this is what makes the 
 service flexible and convenient and saves time and effort.
"
/>
<TripData
image={just2}
heading="Pay the ticket price online"
text="The ability to pay online is one of
 the most effective and convenient ways that distinguishes
  any site and increases its effectiveness, as people do not find some 
  traditional ways of doing things effective, so they prefer online payment methods, 
also the issue.
Reduces time and effort
What the user makes in traditional booking and payment
Reducing delays that cause problems for students.
Especially on exam days.
Objectives of this site
It includes providing a convenient and easy-to-use booking experience,
Non-monetary promotion
transactions and reduce the need for physical tickets, ensuring safety and security
All passengers."
/>
<TripData
image={just3}
heading="using QR code "
text="Passengers can use the system to search for available bus routes, 
receive a unique QR code as their ticket, view their booking details, 
and board the bus.
Using QR code.
The feature of searching for available bus routes increases flexibility, 
as the user can use it to make it easier for him to choose his ticket by searching
 for available destinations."
/>







    </div>
        </div>
    );
}
export default Trip;