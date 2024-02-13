import { Link } from 'react-router-dom';
import './HeroStyles.css';

function Hero(props){
  const destination = props.isLoggedIn ? '/TripSchedule2' : '/SignUp';

    return(
        <>
       <div className={props.cName}>
        <img alt="HeroImage" src={props.heroImg}/>
        <div className='hero-text'> 
        <h1 className={props.title}>{props.title}</h1>
          <p className={props.text}>{props.text}</p>
          <Link to={destination} className={props.btnClass}>
            {props.buttonText}
          </Link>
        </div>
       </div>
        </>
    )
    }
    export default Hero;