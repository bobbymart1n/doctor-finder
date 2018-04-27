import { API } from './API.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(function() {
  $("#form").submit(function(event) {
    event.preventDefault();
    const symptom = $("#symptom").val();
    let api = new API(symptom);
    api.makeCall();
  });
});
