import React, { Component } from 'react';
import TimeBox from '../Components/TimeBox';
import UserBookingFields from '../Components/UserBookingFields';
import DropDown from '../Components/DropDown';
import { getAvailabilities } from '../actions/getAvailabilities';
import swal from 'sweetalert';

class Booking extends Component {
  state: { data: {}, availabilitiesDates: [], availabilitiesTimes: [] };

  componentWillMount() {
    this.setState(() => {
      return {
        data: this.props.location.state.category.tutorial,
        availabilitiesDates: this.props.location.state.category.tutorial.availabilities.map(
          availability => availability.date
        ),
      };
    });
    console.log('this from booking will mount', this.props.location.state.category.tutorial);
  }

  handleGettingetAvailabilities = async date => {
    const options = {
      id: this.state.data.id,
      category: this.state.data.category,
      availabilityDate: new Date(date).toDateString(),
    };
    try {
      const res = await getAvailabilities(options);
      console.log('from booking', res);
      this.setState({ availabilitiesTimes: res.data.availabilities });
    } catch (error) {
      swal('Oops!', 'Could not get availabilities!', 'error');
    }
  };
  render() {
    return (
      <div className="container" style={{ width: '100%' }}>
        <h3>{this.state.data.name}</h3>
        <p>{this.state.data.description}</p>
        <div className="d-flex flex-wrap align-items-center" style={{ width: '60%' }}>
          <div style={{ width: '50%', marginBottom: '5px' }}>
            <i class="fas fa-map-marker-alt" />
            <span className="icons">{this.state.data.location}</span>
          </div>
          <i class="far fa-clock" style={{ width: '50%', marginBottom: '5px' }}>
            <span className="icons">{'Recurring Service'}</span>
          </i>
          <i class="far fa-user " style={{ width: '50%', marginBottom: '5px' }}>
            <span className="icons">{this.state.data.mentor}</span>
          </i>
          <i class="far fa-clock" style={{ width: '50%', marginBottom: '5px' }}>
            <span className="icons col ">{'Group Service'}</span>
          </i>
          <i class="far fa-clock" style={{ width: '50%', marginBottom: '5px' }}>
            <span className="icons col ">{'Wednesdays'}</span>
          </i>
        </div>
        <br />
        <div style={{ width: '100%' }}>
          <h3>Available appointments</h3>
          <DropDown
            handleGettingetAvailabilities={this.handleGettingetAvailabilities}
            availabilitiesDates={this.state.availabilitiesDates}
          />
          <div class="d-flex flex-row flex-wrap  justify-content-start" style={{ width: '70%' }}>
            {this.state.availabilitiesTimes && this.state.availabilitiesTimes.map(time => <TimeBox time={time} />)}
          </div>
          <br />
          <br />
        </div>
        <UserBookingFields />
        {console.log('this from inside booking render', this.state.data.availabilities.time)}
      </div>
    );
  }
}

export default Booking;