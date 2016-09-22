const React = require('react');
const moment =require('moment');
const {Button, Modal} = require('react-bootstrap');

const TrackerTable = React.createClass({

  getInitialState(){
    return{
      showModal:false,
      editEvent:'',
      editStartDate:'',
      editEndDate:'',
      editId:''
      }
  },
  cancelEdit() {
    this.setState({editId: null});
    this.closeModal();
  },

  closeModal() {
    this.setState({showModal: false});
  },

  openModal() {
    this.setState({showModal: true});
  },
  
  editSchedule(schedule) {
      this.openModal();
      this.setState({
      editEvent: schedule.name,
      editStartDate: schedule.startDate,
      editEndDate: schedule.endDate,
      editId:schedule.id
    })

  },
  saveEdit(id) {
   let newSchedule = {
      name:this.state.editEvent,
      startDate:this.state.editStartDate,
      endDate:this.state.editEndDate,
      editId:this.state.editId
    };
    console.log("newSchedule in save edit",newSchedule)
    this.props.updateSched(id, newSchedule);
    //this.setState({editedDate: null});
    this.closeModal();
  },


 render(){
  const {schedules,deleteSched,updateSched} = this.props;
  console.log("schedules",schedules);
  var newSched = schedules.sort((cur,next)=>{
  console.log(Date.parse(cur.startDate));
  console.log(Date.parse(next.startDate));
  return Date.parse(cur.startDate) - Date.parse(next.startDate);
 })
 return (
  <table className= "table">
    <thead>
     <tr>
        <th>Event Name</th>
        <th>Start Time</th>
        <th>End Time</th>
    </tr>
    </thead>
    <tbody>
      {newSched.map(schedule=>{
        var sTime = schedule.startDate.toLocaleString();
        var eTime = schedule.endDate.toLocaleString();
        return(
          <tr key = {schedule.editId}>
            <td>{schedule.name}</td>
            <td>{moment(sTime).format('lll')}</td>
            <td>{moment(eTime).format('lll')}</td>
            <td onClick={()=> deleteSched(schedule.id)} className="btn btn-sm btn-danger glyphicon glyphicon-trash"></td>
            <td onClick={()=> this.editSchedule(schedule)} className="btn btn-sm btn-primary glyphicon glyphicon-edit"></td>
          </tr>)
      })}
    </tbody>
    <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        
            <span>Event: </span>
            <input
              type="text"
              min="0"
              placeholder="Event"
              value={this.state.editEvent}
              onChange={e => {this.setState({editEvent: e.target.value}) }}
            />
            <br/>
            <span>Start Date: </span>
            <input
              type="datetime-local"
              placeholder="Start Date"
              value={this.state.startDate}
              onChange={e => {this.setState({editStartDate: e.target.value}) }}
            />
            <br/>
            <span>End Date: </span>
            <input
              type="datetime-local"
              placeholder="End Date"
              value={this.state.endDate}
              onChange={e => {this.setState({editEndDate: e.target.value}) }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" onClick={() => this.saveEdit(this.state.editId)}>Save</Button>
            <Button onClick={this.cancelEdit}>Close</Button>
            <Button>Submit</Button>
          </Modal.Footer>
        </Modal>
  </table>
  )
}
})

module.exports = TrackerTable;