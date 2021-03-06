import { API } from './API.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(function() {
  $("#form").submit(function(event) {
    event.preventDefault();
    let api = new API();
    const symptom = $("#symptom").val().toLowerCase();
    const drFirstName = $("#docFirstName").val().toLowerCase();
    const drLastName = $("#docLastName").val().toLowerCase();
    api.doctorFirstName = drFirstName;
    api.doctorLastName = drLastName;
    api.symptom = symptom;
    api.makeCall();
    $(this).hide();
    $("#results").show();
    $("#loading").show();
    setTimeout(() => {
      $("#loading").hide();
      if(api.searchResults === undefined) {
        $("#results").prepend(`
          <h3 class="text-danger server-error mt-5">Uh oh! Theres been in error processing your request.</h3>
        `);
      } else if(api.searchResults.data.length >= 1) {
        $("h3.result-heading").show();
        api.searchResults.data.map((doctor) => {
          let newPatients;
          let website;
          if(doctor.practices[0].accepts_new_patients) {
            newPatients = `<p class="mb-0">Accepting new patients: Yes</p>`
          } else {
            newPatients = `<p class="mb-0">Accepting new patients: No</p>`
          }
          if(doctor.practices[0].website) {
            website = `<a href="${doctor.practices[0].website}" class="mb-0">${doctor.practices[0].website}</a>`
          } else {
            website = `<p class="mb-0">No website available</p>`
          }
          $("#results").append(`
            <div class="doctor-item mt-3 mb-3 row">
              <div class="col-md-2 doctor-image">
                <img src=${doctor.profile.image_url} alt='A photo of Dr. ${doctor.profile.last_name}'>
              </div>
              <div class="doctor-info col-md-6">
                <h4>${doctor.profile.first_name} ${doctor.profile.last_name}</h4>
                <p class="mb-0">Phone: <a href="tel:${doctor.practices[0].phones[0].number}">${doctor.practices[0].phones[0].number}</a></p>
                <p class="mb-0">${doctor.practices[0].visit_address.street}</p>
                <p class="mb-0">${doctor.practices[0].visit_address.city} ${doctor.practices[0].visit_address.state}. ${doctor.practices[0].visit_address.zip}</p>
                ${website}
                ${newPatients}
              </div>
            </div>
          `);
        });
      } else {
        $("#results").prepend(`
          <h3>Uh oh! We can't find any doctors for you! If this is a medical emergency, call 911 immediately.</h3>
        `);
      }
    }, 3000);
  });
});
