class API {
  constructor() {
    this.doctorName;
    this.searchResults;
    this.location = "45.5231,-122.6765,10";
  }
  makeCall() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${this.doctorName}&location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    }).then((response) => {
      let body = JSON.parse(response);
      console.log(body);
      this.searchResults = body;
    });
  }
}

export { API };
