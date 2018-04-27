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
      $("#results").prepend(`
        <div class="doctor-item">
        <h3>${api.searchResults.data[0].profile.first_name}</h3>
        </div>
        `);
    }, 1500);
  });
});
