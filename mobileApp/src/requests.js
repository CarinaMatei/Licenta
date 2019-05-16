const API_HOST = "http://192.168.215.226:5000"; //change to your current ip address

export default {
    async getObjectives() {
        console.log(API_HOST + "/getObjectives")
       const response = await fetch(API_HOST + "/getObjectives");
       console.log(response)
       return response.json();
    }
}
