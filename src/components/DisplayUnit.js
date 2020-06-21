import React from 'react';
import Timer from './Timer';

class DisplayUnit extends React.Component {
    state = {
      count:0,
      id:0,
      el:0,
      oldCount:0,
      newCount:0,
      total:0
    };

    handleDataReset = (county,idy) => {
      console.log("In pram => "+county+" id = > "+idy);

      this.setState ({
        el: county,
        id:idy
      });
    }

render(){
    let miliseconds = ("0" + (Math.floor(this.state.el / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(this.state.el / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(this.state.el / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(this.state.el / 3600000)).slice(-2);

    return(
        <div>
            <div className="header-label">
              <label><b>CODING CHALLENGE : KEVIN PERERA *</b></label>
            </div>
            
            {/* increment refers when to update the timer */}
            <div>
              <Timer onDataReset={this.handleDataReset} id={1} increment={10000} incrementText={'10 seconds'}/>
              <Timer onDataReset={this.handleDataReset} id={2} increment={1000} incrementText={'1 seconds'}/>
              <Timer onDataReset={this.handleDataReset} id={3} increment={100} incrementText={'0.1 seconds'}/>
            </div>

          {/* label to display total Escaped Time */}
           <div className="counter-label">
              <label>
                Total Time Escaped : {hours} : {minutes} : {seconds} : {miliseconds}
              </label>
            </div>
        </div>
    );
}
}

export default DisplayUnit;