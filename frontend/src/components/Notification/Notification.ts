import { store } from 'react-notifications-component';
const defaultNotificationSettings = {
  insert: 'top',
  container: 'top-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
};

export const defaultNotifcation = (
  title: string,
  message: string,
  type: string
) => {
  store.addNotification({
    ...defaultNotificationSettings,
    title,
    message,
    type,
  });
};
