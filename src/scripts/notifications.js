/**
 * Make use of the Notification API
 * More info: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
 */

const hasPermisson = async () => {
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

const showNotification = async ({ title, body, icon }) => {
  // check if we have notification permission
  const hasPermission = await hasPermisson();

  // if we have no permission, ask for permission
  if (!hasPermission) {
    Notification.requestPermission();
    showNotification();
  } else {
    /* eslint-disable no-unused-vars */
    const notification = new Notification(title, { body, icon });
  }
};

export default showNotification;
