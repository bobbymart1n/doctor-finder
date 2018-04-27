class API {
  constructor() {
    this.url;
    this.doctorName;
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
  conditionSearch() {
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${this.symptom}&location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
    this.spaceSearch();
  }
  nameSearch() {
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${this.doctorName}&location=${this.location}&limit=10&user_key=${process.env.exports.apiKey}`;
  }
  makeCall() {
    if (this.symptom) {
      this.conditionSearch();
      console.log(this.url);
    } else {
      this.nameSearch();
      console.log(this.url);
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
