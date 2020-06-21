import React, {useState} from 'react';
import './../App.css';


class Timer extends React.Component {

  state = {
    id:0,
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    count: 0,
    increment:0,
    temp1:0,
    temp2:0,
    incrementText:''
  };

  constructor(props) {
      super(props);
      this.state = { ...this.state, ...props };
    }

    runOnce() {
        this.state.temp1 = this.state.increment-100;
        this.state.temp2 = this.state.increment;
    }

  startTimer = () => {   
    
    if(this.state.temp1 === 0)
    {
        this.runOnce();
    }
    
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
      console.log("Lower level of increment =>s "+this.state.temp1+" High level of Increment => "+this.state.temp2);

      if((this.state.temp1 < this.state.timerTime) && (this.state.temp2 > this.state.timerTime )){
          this.props.onDataReset(this.state.timerTime,this.state.id);
          this.state.temp2 += this.state.increment;
          this.state.temp1 = this.state.temp2-100;
          console.log("Level Matched => "+this.state.timerTime+ " Increment :"+this.state.increment);
      }
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
      temp1: 0,
      temp2: 0
    });
    this.props.onDataReset(0,this.state.id)
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <div className="divider-content">
        <div className="Stopwatch">
            <div className="Stopwatch-header">STOPWATCH : {this.state.id}</div>
            <div className="Stopwatch-display">
            {hours} : {minutes} : {seconds} : {centiseconds}
            </div>
            {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button onClick={this.startTimer}>Start</button>
            )}
            {this.state.timerOn === true && (
            <button onClick={this.stopTimer}>Stop</button>
            )}
            {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button onClick={this.startTimer}>Resume</button>
            )}
            {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button onClick={this.resetTimer}>Reset</button>
            )}
        </div>
        <div className="user-info">
            <label className="info">
                THIS STOPWATCH WHICH ID : {this.state.id}, WILL BE INCREMENT ONLY ON EVERY => {this.state.incrementText}
            </label>
        </div>
      </div>
    );
  }
}

export default Timer;