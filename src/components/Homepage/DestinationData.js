import { Component } from "react";
import "./DestinationStyles.css";
import destimage from "../assest/4.jpeg";
import destimage2 from "../assest/5.jpeg";

class DestinationData extends Component{
    render(){
    return(   <div className={this.props.className}>
            <div className="des-text">
<p style={{fontSize: '1.7em',fontWeight:"bolder"}}>
{this.props.heading}
</p>
<p>
    {this.props.text}
</p>
 </div>
 <div className="image">
<img alt="img" src={this.props.img1}/>
<img alt="img" src={this.props.img2}/>
 </div>

         </div>
          );
    }
   
}
export default DestinationData;