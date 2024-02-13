import React, { useState ,useEffect} from 'react'; 
import Swal from 'sweetalert2'; 
import { Link, useNavigate } from 'react-router-dom'; 
import IconSteeringWheel from './IconSteeringWheel.js'; 
import axios from "axios"; 
import './Modal.css'; 
import { useUserSeat } from '../SelectedSeatsContext.js'; 
 
const Modal = ({ showModal, onClose }) => { 
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { selectedSeats, setSeatsSelection } = useUserSeat();
  const navigate = useNavigate(); 

  const handleSeatClick = (event) => {
    const seat = event.target;
  
    if (selectedSeat) {
      selectedSeat.classList.remove('selected');
    }

    // Toggle selection for the clicked seat
    if (selectedSeat !== seat) {
      seat.classList.add('selected');
      setSelectedSeat(seat);
    } else {
      seat.classList.remove('selected');
      setSelectedSeat(null);
    }

    // Update the selected seat state with the current seat number
    const seatNumber = seat.dataset.seatNumber;
    setSeatsSelection(seatNumber);
  };

  const handleSave = async () => {
    if (!selectedSeat) {
      Swal.fire({
        text: 'Please select a seat.',
        icon: 'error',
        confirmButtonColor: '#000',
        width: '370px',
      });
      return; 
    }
      Swal.fire({
        text: 'Your selected seat is booked successfully.',
        confirmButtonColor: 'rgb(1, 169, 1)',
        icon: 'success',
        width: '370px',
      });

      onClose();
      navigate('/TicketDetails');
  };
 
  return ( 
    <> 
      {showModal && ( 
        <div className="modal-overlay"> 
          <div className="modal-container"> 
            <h3>Please select a seat</h3> 
            <button className='close' onClick={onClose}>X</button> 
            <div className="icon-container" onClick={handleSeatClick}> 
            <IconSteeringWheel /> 
            
            <div className='all-seats'> 
            <div className='row'> 
             <div className='seat' data-seat-number='49'>49</div> 
              
            <div className='seat' data-seat-number='48'>48</div> 
            <div className='seat' data-seat-number='47'>47</div> 
            <div className='seat' data-seat-number='46'>46</div> 
            <div className='seat' data-seat-number='45'>45</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='44'>44</div> 
            <div className='seat' data-seat-number='43'>43</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='42'>42</div> 
            <div className='seat' data-seat-number='41'>41</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='40'>40</div> 
            <div className='seat' data-seat-number='39'>39</div>
            <div className='spase'></div> 
            <div className='seat' data-seat-number='38'>38</div> 
            <div className='seat' data-seat-number='37'>37</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='36'>36</div> 
            <div className='seat' data-seat-number='35'>35</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='34'>34</div> 
            <div className='seat' data-seat-number='33'>33</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='32'>32</div> 
            <div className='seat' data-seat-number='31'>31</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='30'>30</div> 
            <div className='seat' data-seat-number='29'>29</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='28'>28</div> 
            <div className='seat' data-seat-number='27'>27</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='26'>26</div> 
            <div className='seat' data-seat-number='25'>25</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='24'>24</div> 
            <div className='seat' data-seat-number='23'>23</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='22'>22</div> 
            <div className='seat' data-seat-number='21'>21</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='20'>20</div> 
            <div className='seat' data-seat-number='19'>19</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='18'>18</div> 
            <div className='seat' data-seat-number='17'>17</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='16'>16</div> 
            <div className='seat' data-seat-number='15'>15</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='14'>14</div> 
            <div className='seat' data-seat-number='13'>13</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='12'>12</div> 
            <div className='seat' data-seat-number='11'>11</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='10'>10</div> 
            <div className='seat' data-seat-number='9'>9</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='8'>8</div> 
            <div className='seat' data-seat-number='7'>7</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='6'>6</div> 
            <div className='seat' data-seat-number='5'>5</div> 
            </div> 
            <div className='row'> 
            <div className='seat' data-seat-number='4'>4</div> 
            <div className='seat' data-seat-number='3'>3</div> 
            <div className='spase'></div> 
            <div className='seat' data-seat-number='2'>2</div> 
            <div className='seat' data-seat-number='1'>1</div> 
            </div> 
            </div> 
            </div> 
             
            <div className="status"> 
              <div className='item'>Available</div>    
              <div className='item'>Booked</div>  
              <div className='item'>Selected</div>        
            </div> 
 
            <div className="button-container"> 
              <button className='butt' onClick={handleSave}>Save</button> 
              <button className='butt' onClick={onClose}>Cancel</button>               
            </div> 
          </div> 
        </div> 
      )
          }
      </> 

      )
          }
        
 
export default Modal;