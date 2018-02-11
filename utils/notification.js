import {AsyncStorage} from 'react-native'
import { Notifications, Permissions} from 'expo'
import {STORAGE_NOTIFICATION_KEY} from '../config'


function createNotification () {
  return {
    title: 'Time to refresh that mind!',
    body: "Quiz Time! To keep the mind fresh and ready, please take/add a quiz today to keep that mind up to par!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}


export function clearLocalNotification () {
  return AsyncStorage.removeItem(STORAGE_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  
  AsyncStorage.getItem(STORAGE_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate())
              tomorrow.setHours(18)
              tomorrow.setMinutes(0)
              

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(STORAGE_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}