/**
 * Making use of the Geolocation API
 * More info: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
 */

const getErrorByCode = (errorCode) => {
  const errorArray = [
    "User didn't allow the location tracking.",
    "Device can't get data.",
    'Location tracking timed out.',
  ];
  return errorArray[errorCode - 1];
};

const getLocation = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      (error) => {
        reject(new Error(getErrorByCode(error.code)));
      },
    );
  } else reject(new Error('No location was found.'));
});

export default getLocation;
