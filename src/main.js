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
          <h3 class="text-danger">Uh oh! Theres been in error processing your request.</h3>
        `);
      } else if(api.searchResults.data.length >= 1) {
        api.searchResults.data.map((doctor) => {
          let newPatients;
          if(doctor.practices[0].accepts_new_patients) {
            newPatients = `<p>Accepting new patients: Yes</p>`
          } else {
            newPatients = `<p>Accepting new patients: No</p>`
          }
          $("#results").prepend(`
            <div class="doctor-item">
              <img src=${doctor.profile.image_url} alt='A photo of Dr. ${doctor.profile.last_name}'>
              <h4>${doctor.profile.first_name} ${doctor.profile.last_name}</h4>
              <p class="mb-0">Phone: <a href="tel:${doctor.practices[0].phones[0].number}">${doctor.practices[0].phones[0].number}</a></p>
              <p class="mb-0">${doctor.practices[0].visit_address.street}</p>
              <p class="mb-0">${doctor.practices[0].visit_address.city} ${doctor.practices[0].visit_address.state}. ${doctor.practices[0].visit_address.zip}</p>
              ${newPatients}
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
