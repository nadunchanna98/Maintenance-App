// import { View, Text, StyleSheet, Dimensions,ToastAndroid , Alert } from 'react-native'
// import React, { useState, useEffect, useContext } from 'react'
// import BASE_URL from '../../Common/BaseURL'
// import axios from 'axios';


// const SamplePage = () => {

//     const [notes, setNotes] = useState([]);

//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     const fetchNotes = () => {
//         axios.get(`${BASE_URL}complainer-details/`)
//           .then(res => {
            
//             setNotes(res.data);
    
//           })
//           .catch(err => {
//             console.log(err);
//           })
    
//       }

//     return (

//         <View  >
         
//             <View style={styles.container}>
//                 <Text style={styles.Topic}>Complainer Details</Text>

// {/* array index,key */}
//                 {notes.map((note, index) => (
//                     <View style={styles.card} key={index}>
//                         <Text style={styles.title}>Complainer Name: {note.name}</Text>
//                         <Text style={styles.date}>Complainer Email: {note.email}</Text>
//                         <Text style={styles.date}>Complainer Phone: {note.phone}</Text>
//                         <Text style={styles.date}>Complainer Address: {note.type}</Text>
//                         <Text style={styles.date}>Complainer Role: {note.role}</Text>
             
//                 </View>

//                 ))}
//                 </View>

        
//         </View>
//     )
// }

// export default SamplePage


// const styles = StyleSheet.create({

//     container: {
//         alignItems: 'center',
//         width: Dimensions.get('window').width*0.9,
//         marginTop: Dimensions.get('window').height*0.02,
//         marginBottom: Dimensions.get('window').height*0.02,
//         borderRadius: 10,
//         borderWidth: 4,
//         borderColor: '#336699',
//     },

//     wait: {
//         paddingTop: 10,
//         paddingBottom: 10,
//         textAlign: 'center',
//         fontSize: 15,
//         fontWeight: "500",
//         fontFamily: 'sans-serif-light',
//         marginTop: 0,
        
//     },
//     Topic: {
//         paddingTop: 10,
//         paddingBottom: 10,
//         textAlign: 'center',
//         fontSize: 22,
//         fontWeight: "700",
//         fontFamily: 'sans-serif-light',
//         marginTop: 0,
        
//     },

//     date: {
  
//         fontSize: 14,
//         fontWeight: "700",
//         fontFamily: 'sans-serif-light',
//         marginTop: 2,
//         marginBottom: 10,
//         textTransform: 'none',
//         textTransform: 'capitalize',
//     },

//     title: {
//         fontSize: 17,
//         fontWeight: "700",
//         fontFamily: 'sans-serif-light',
//         marginTop: 2,
//         marginBottom: 0,
//         textTransform: 'none',
//         textTransform: 'capitalize',
//     },

//     body: {
//         fontSize: 18,
//         fontWeight: "700",

//         fontFamily: 'sans-serif-light',
//     },

//     buttonpanel: {

//         flexDirection: 'row',
//         justifyContent: 'center',
//         width: Dimensions.get('window').width * 0.7,
//         height: Dimensions.get('window').height * 0.1,
//         marginTop: Dimensions.get('window').height * 0.02,
//         marginBottom: Dimensions.get('window').height * 0.001,
    
//       },
    
//       buttons: {
//         width: Dimensions.get('window').width * 0.2,
//         height: Dimensions.get('window').height * 0.1,
//         margin: Dimensions.get('window').width * 0.01,
//       },

//     card: {
//         alignItems: 'stretch',
//         width: Dimensions.get('window').width * 0.8,
//         marginTop: Dimensions.get('window').height * 0.02,
//         marginBottom: Dimensions.get('window').height * 0.02,
//         padding: 5,
//         borderTopWidth: 1,
//         borderTopColor: '#336699'

//     },


// })

