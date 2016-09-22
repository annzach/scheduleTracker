const React = require('react');
const TrackerForm = require('./TrackerForm');
const TrackerTable = require('./TrackerTable');

const App = React.createClass({ 
getInitialState(){
  return {
    schedules:[]
  }

},
componentWillMount(){
  const serializedData = localStorage.schedules;
  let localStorageSchedules;
  try{
    localStorageSchedules = JSON.parse(serializedData);
    console.log("schedules localStorage",localStorageSchedules);
    this.setState({schedules:localStorageSchedules});
  }
  catch(err){

  }

},
componentWillUpdate(nextProps,nextState){
  const serializedData =  JSON.stringify(nextState.schedules);
  localStorage.schedules = serializedData;


},

addSchedule(newSchedule){
  const {schedules} = this.state;
  console.log("newSchedules", newSchedule)
  this.setState({
    schedules:[...schedules,newSchedule]
  })
},

deleteSchedule(id){
 const {schedules} = this.state;
 this.setState({
  schedules:schedules.filter(element =>element.id !==id)
 });



},

  updateSchedule(id,newSchedule){
    console.log("updateTransaction id", id);
    const {schedules} = this.state;
    let index = schedules.findIndex(element =>{
      return element.id == id;
    });
    console.log("index", index);
    schedules[index] = newSchedule;
    console.log("this.state.schedules",this.state.schedules)
    this.setState({
      schedules: schedules
    })

  },

render(){
  const {schedules} = this.state;
  console.log("schedules",schedules)
  return (
    <div>
      <h1>Schedule Tracker</h1>
      <TrackerForm addSchedule={this.addSchedule}/>
      <TrackerTable schedules = {schedules} deleteSched = {this.deleteSchedule} 
                    updateSched ={this.updateSchedule} />
    </div>
    )
}

})

module.exports=App;