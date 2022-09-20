

 import React, { useEffect } from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,PermissionsAndroid, Alert, TouchableOpacity,
 } from 'react-native';
 
 
 
 import Geolocation from 'react-native-geolocation-service';
 
 
 
 
 const App = () => {
   
 
  
 
   
   
   //ask for location permission and get Location
   const requestLocationPermission = async () => {
     if (Platform.OS === 'ios') {
      const permisson = await Geolocation.requestAuthorization('whenInUse');
       if (permisson === 'granted') {
         console.log('granted');
         Geolocation.getCurrentPosition(
           (position) => {
             console.log(position);
             let lat = position.coords.latitude;
             let long = position.coords.longitude;
             Alert.alert('lat: ' + lat + "\n" +' long: ' + long);
           },
           (error) => {
             // See error code charts below.
             console.log(error.code, error.message);
             Alert.alert('error: ' + error.code + "\n" +' message: ' + error.message);
           },
           {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
         );
       } else {
         console.log('not granted');
         Alert.alert('Access not granted,change in settings');
       }
       
     } else {
       try {
         const granted = await PermissionsAndroid.request(
           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
           {
             title: 'Location Access Required',
             message: 'This App needs to Access your location',
           },
         );
         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           //To Check, If Permission is granted
           console.log('Location Permission Granted.');
          
             Geolocation.getCurrentPosition(
                 (position) => {
                   console.log(position);
                   lat = position.coords.latitude;
                   long = position.coords.longitude;
                   console.log(lat,long);
                 },
                 (error) => {
                   // See error code charts below.
                   console.log(error.code, error.message);
                 },
                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
             );
           }
         
       } catch (err) {
         alert('err', err);
         console.warn(err);
       }
     }
   };
 
   
   return (
     
       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       
       <TouchableOpacity style={{backgroundColor:'blue',borderRadius:10}} onPress={requestLocationPermission}>
         <Text style={{fontSize:25,color:'white',margin:10}}>Get Location</Text>
       </TouchableOpacity>
       </View>
       
     
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 