const React = require('react');
const uuid =require('uuid');
const moment = require('moment');

const TrackerForm = React.createClass({

  submitForm(event){
  event.preventDefault();
  let {name,startDate,endDate} =this.refs;
  let schedule = {
    name:name.value,
    startDate:startDate.value,
    endDate:endDate.value,
    id: uuid()
  }
  this.props.addSchedule(schedule);
  },

  render(){
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <label >Event Name</label>
          <input type="text"  ref="name"/>
        </div>
        <div>
          <label>Start Time </label> &nbsp;
          <input type="datetime-local" ref="startDate"/>
         
        </div>
        <div>
          <label>End Time </label> &nbsp;
          <input type="datetime-local" ref="endDate"/>
          
        </div>
        <button className = "btn btn-success">Submit</button>
      </form>
    )
  }
})

module.exports = TrackerForm;