class API {
  constructor() {
    this.url;
    this.doctorFirstName;
    this.doctorLastName;
    this.symptom;
    this.searchResults;
    this.location = "45.5231,-122.6765,10";
  }
  spaceSearch(url) {
    url = this.url.split('');
    url.map((letter) => {
      letter.replace(/\s/, "%20");
    });
    let urlJoin = url.join('');
    this.url = urlJoin;
  }
  locationSearch() {
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
  }
  conditionSearch() {
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${this.symptom}&location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
    this.spaceSearch();
  }
  nameSearch() {
    if(this.doctorFirstName) {
      this.url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${this.doctorFirstName}&last_name=${this.doctorLastName}&location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
    } else if (this.doctorLastName) {
      this.url = `https://api.betterdoctor.com/2016-03-01/doctors?last_name=${this.doctorLastName}&location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
    } else {
      this.url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${this.doctorFirstName}&location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
    }
  }
  makeCall() {
    if (this.symptom) {
      this.conditionSearch();
    } else if(this.docFirstName || this.doctorLastName) {
      this.nameSearch();
    } else {
      this.locationSearch();
    }
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", this.url, true);
      request.send();
    }).then((response) => {
      let body = JSON.parse(response);
      console.log(body);
      this.searchResults = body;
    });
  }
}

export { API };
