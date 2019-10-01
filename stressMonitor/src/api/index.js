import firebase from 'react-native-firebase';

var config = {
    databaseURL: "https://stressmonitor-42210.firebaseio.com/",
    projectId: "stressmonitor-42210",
}

export default firebase.initializeApp(config);