import { API } from './API.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(function() {
  $("#form").submit(function(event) {
    event.preventDefault();
    // const symptom = $("#symptom").val();
    const drFirstName = $("#docFirstName").val().toLowerCase();
    let api = new API();
    api.doctorName = drFirstName;
    api.makeCall();
    $(this).hide();
    $("#results").show();
    $("#loading").show();
    setTimeout(() => {
      $("#loading").hide();
      api.searchResults.data.map((doctor) => {
        $("#results").prepend(`
          <div class="doctor-item">
            <img src=${doctor.profile.image_url} alt='A photo of Dr. ${doctor.profile.last_name}'>
            <h4>${doctor.profile.first_name} ${doctor.profile.last_name}</h4>
            <p>${doctor.practices[0].visit_address.street}</p>
          </div>
        `);
      });
    }, 1500);
  });
});
