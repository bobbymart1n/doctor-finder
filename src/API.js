class API {
  constructor() {
    this.type = "doctors";
    this.doctorName;
    this.location = "45.5231,-122.6765,10";
  }
  makeCall() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/${this.type}?location=${this.location}&limit=10&user_key=${process.env.API_KEY}`
      console.log(url);
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
    });
  }
}

export { API };
