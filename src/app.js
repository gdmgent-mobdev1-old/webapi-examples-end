import './styles/main.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import anonLogo from './images/anon-logo.png';
import showNotification from './scripts/notifications';
import getLocation from './scripts/geolocation';
import { SITE_TITLE, MAPBOX_ACCESS_TOKEN } from './consts';

const App = () => {
  // -----
  // THE APP TITLE
  // -----

  document.getElementById('mainTitle').innerHTML = `<h1>${SITE_TITLE}</h1>`;

  // -----
  // NOTIFICATIONS API
  // https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
  // -----

  // get the notification button
  const notificationButton = document.getElementById('showNotification');
  notificationButton.addEventListener('click', () => {
    showNotification({ title: 'Web Api Examples', body: 'I show you a demo notification!', icon: anonLogo });
  });

  // -----
  // MAPBOX External API
  // https://www.mapbox.com/
  // -----

  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  // eslint-disable-next-line no-unused-vars
  const map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 13,
  });

  // -----
  // GEOLOCATION API
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
  // -----

  // add location and append to our DOM
  getLocation().then((myLocation) => {
    // get latitude and longitude
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    latitude.innerHTML = `My latitude is ${myLocation.lat}`;
    longitude.innerHTML = `My longitude is ${myLocation.lon}`;

    // fly to position via mapbox
    if (map) map.flyTo({ center: myLocation });
  });

  // -----
  // DRAG AND DROP API
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
  // -----

  // get drag drop elements
  const dragDropExample = document.getElementById('dragdropExample');
  const dragDropBlock = dragDropExample.getElementsByClassName('dragDropBlock')[0];
  const dragDropZones = dragDropExample.querySelectorAll('.dragDropZone');

  // drag block event listeners
  dragDropBlock.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', e.target.id); });
  dragDropBlock.addEventListener('drag', (e) => console.log(e));

  // drop zone event listeners
  // NOTE: By default, data/elements cannot be dropped in other elements.
  // To allow a drop, we must prevent the default handling of the element (dragover)
  dragDropZones.forEach((dragDropZone) => {
    dragDropZone.addEventListener('dragend', () => console.log('dragend'));
    dragDropZone.addEventListener('dragenter', (e) => { e.target.style.border = '3px dotted red'; });
    dragDropZone.addEventListener('dragleave', (e) => { e.target.style.border = ''; });
    document.addEventListener('dragover', (e) => { e.preventDefault(); }); // Important one!
    dragDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.target.className === 'dragDropZone') {
        e.target.style.border = '';
        const data = e.dataTransfer.getData('Text');
        e.target.appendChild(document.getElementById(data));
        e.dataTransfer.clearData();
      }
    });
  });
};

App();
