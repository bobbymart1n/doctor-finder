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
  });
});
