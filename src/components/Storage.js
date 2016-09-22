const Storage = {

  read() {
    console.log("inside read");
    const serializedData = localStorage.schedules;
    console.log("serializedData",serializedData);
    let localStorageSchedules;
    try{
      localStorageSchedules = JSON.parse(serializedData);
      console.log("schedules localStorage",localStorageSchedules);
      return localStorageSchedules;
    }
      catch(err){
        return null;
      }
  },

  write(data) {
    const serializedData =  JSON.stringify(nextState.schedules);
    localStorage.schedules = serializedData;
  }
}

export default Storage;


