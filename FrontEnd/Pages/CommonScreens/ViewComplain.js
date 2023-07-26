import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Modal } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
const { width, height } = Dimensions.get('window');

const Slideshow = ({ images }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlide = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentIndex(Math.round(currentIndex));
  };

  return (
    <View style={styles.slideshowContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSlide}
      >
        {images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={styles.slideshowImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const ViewComplain = () => {

  const windowWidth = Dimensions.get('window').width;
  const windowRatio = windowWidth / 425;
  const { userInfo } = useContext(AuthContext);
  const { allusers } = useContext(UserContext);

  const navigation = useNavigation();
  const route = useRoute();
  const complainId = route.params.complainId;

  const [complain, setComplain] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [createdTime, setCreatedTime] = useState('');
  const [visible, setVisible] = useState('');
  const [showScaledImage, setShowScaledImage] = useState(false);
  const [supervisorName, setSupervisorName] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State variable for pop-up message visibility
  const [rating, setRating] = useState(''); // State variable for rating selection
  const [showThankYou, setShowThankYou] = useState(false); // State variable for showing "Thank you" pop-up


  const handleChangeSupervisor = () => {
    navigation.navigate('SuperviserList', { complainID: complainId });
  };

  const handleDataSubmission = () => {
    navigation.navigate('SuperviserList', { complainId: complainId });
  };

  const handleCompleteSupervisor = () => {
    navigation.navigate('SupervisorFeedback', { complainID: complainId });
  };

  useEffect(() => {
    getData();
    getSupervisorName(complain.supervisorID);
  }, [complain.supervisorID]);

  const getData = () => {
    axios
      .get(`${BASE_URL}complains/complainbyid/${complainId}`)
      .then((response) => {
        setComplain(response.data);

        const formattedTime = moment(response.data.created_date).format('hh:mm A');
        const formattedDate = moment(response.data.created_date).format('MMMM DD, YYYY');
        setCreatedTime(formattedTime);
        setCreatedDate(formattedDate);
        setVisible(response.data.status === 'AssignedA');
        setShowPopup((response.data.status === 'Completed') && (userInfo.role === 'complainer') && (response.data.rate === 0)); // Show pop-up only when status is 'Completed' and role is 'complainer'
        setRating(response.data.rate);
        getSupervisorName(complain.supervisorID);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  const getSupervisorName = (id) => {

    if (id !== undefined) {
      axios.get(`${BASE_URL}supervisors/user/${id}`)
        .then((response) => {
          setSupervisorName(response.data.user.name);
        })
        .catch((error) => {
          console.log('error', error);
        });

    }

  };


  const handleImagePress = () => {
    setShowScaledImage(true);
  };
  const handleComplete = () => {
    navigation.navigate('AdminFeedback', { complainID: complainId });
  }
  const handlePopupDismiss = () => {
    setShowPopup(false);
  };

  const handleRateWork = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleThankYouDismiss = () => {
    setShowThankYou(false);
  };
  const handleAssignLaborer = () => {
    navigation.navigate('LaborerAssignmentScreen', { complainID: complainId });
  }
  const renderPopup = () => {
    if (!showPopup) {
      return null; // Don't render the pop-up if showPopup is false
    }

    const renderStarIcon = (index) => {
      if (index <= rating) {
        return (
          <TouchableOpacity key={index} style={styles.starButton} onPress={() => handleRateWork(index)}>
            <Image source={require('../../assets/star_filled.png')} style={styles.starIcon} />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity key={index} style={styles.starButton} onPress={() => handleRateWork(index)}>
            <Image source={require('../../assets/star_empty.png')} style={styles.starIcon} />
          </TouchableOpacity>
        );
      }
    };


    return (
      <Modal visible={showPopup} animationType="fade" transparent={true}>
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupText}>Rate this work</Text>
            <Text style={styles.popupDescription}>Please rate your satisfaction with the completed work:</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((index) => renderStarIcon(index))}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleThankYouSubmit}>
                <Text style={styles.submitButtonText}>Submit Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dismissButton} onPress={handlePopupDismiss}>
                <Text style={styles.dismissButtonText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderThankYouPopup = () => {
    if (!showThankYou) {
      return null; // Don't render the "Thank you" pop-up if showThankYou is false
    }

    return (
      <Modal visible={showThankYou} animationType="fade" transparent={true}>
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupText}>Thank you for your rating!</Text>
          </View>
        </View>
      </Modal>
    );
  };

  const handleThankYouSubmit = () => {

    axios.put(`${BASE_URL}complains/complain/${complainId}`, { rate: rating })
      .then((response) => {
        // console.log('response', response);
        Alert.alert(
          'Thank you for your rating!',
          '',
          [
            { text: 'OK', onPress: () => handleThankYouDismiss() }
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.log('error', error);
      });

    setShowPopup(false);
    handleThankYouDismiss();
  };

  return (
    <View style={styles.container}>
      {renderPopup()}
      {renderThankYouPopup()}
      <ScrollView contentContainerStyle={styles.contentContainer}>


        <View style={styles.imageContainer}>
          {complain && complain.complaineImages && complain.complaineImages.length > 0 ? (
            <Slideshow images={complain.complaineImages} />
          ) : (

            <View style={styles.noimage}>
              <Image source={require('../../assets/icon.png')} style={styles.image} />
              <Text style={styles.fieldValue}>No Images</Text>
            </View>
          )}
        </View>


        {/*         
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.image} />
        </TouchableOpacity> */}




        <View style={styles.dataContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Title:</Text>
          </View>
          <Text style={styles.fieldValue}>{complain.title}</Text>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Created Date:</Text>
            <Text style={styles.fieldValue}>{createdDate}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Created Time:</Text>
            <Text style={styles.fieldValue}>{createdTime}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Location:</Text>
            <Text style={styles.fieldValue}>{complain.location}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Description:</Text>
          </View>
          <Text style={styles.fieldValue}>{complain.description}</Text>
          <View style={styles.bottomLine} />

          {userInfo.role === 'admin' && !(complain.status === 'AssignedA') && (
            <View>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Superviser:</Text>
                <Text style={styles.fieldValue}>{supervisorName}</Text>
              </View>
              <View style={styles.bottomLine} />

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldTitle}>Assign Date:</Text>
                <Text style={styles.fieldValue}>{moment(complain.assigned_date).format('MMMM DD, YYYY')}</Text>
              </View>
              <View style={styles.bottomLine} />

              {complain.supervisor_feedback ?

                <View>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Supervisor Feedback:</Text>
                  </View>
                  <Text style={styles.fieldValue}>{complain.supervisor_feedback}</Text>
                  <View style={styles.bottomLine} />
                </View>
                : null

              }

              {complain.resolved_date ?

                <View>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Supervisor Sent Date:</Text>
                    <Text style={styles.fieldValue}>{moment(complain.resolved_date).format('MMMM DD, YYYY')}</Text>
                  </View>
                  <View style={styles.bottomLine} />
                </View>
                : null}
            </View>
          )}


          {userInfo.role === 'supervisor' && (complain.status === 'CompletedS' || complain.status === 'DeclinedS')
            && (
              <View >
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldTitle}>Status:</Text>
                  <Text style={styles.fieldValue}>{complain.status === 'CompletedS' ? 'Work Done Successfully ✅🎉' : 'Work Declined ⛔'}</Text>
                </View>
                <View style={styles.bottomLine} />

                {complain.supervisor_feedback ?

                  <View>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.fieldTitle}>My Feedback:</Text>
                    </View>
                    <Text style={styles.fieldValue}>{complain.supervisor_feedback}</Text>
                    <View style={styles.bottomLine} />
                  </View>
                  : null

                }
              </View>
            )
          }

          {

            userInfo.role === 'admin' && (complain.status === 'CompletedA' || complain.status === 'Completed') ? (

              rating > 0 ? ( // Only show the rating if it has been selected
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldTitle}>Rated:</Text>
                  <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} style={styles.starButton} onPress={() => handleRateWork(star)}>
                        <Image
                          source={star <= rating ? require('../../assets/star_filled.png') : require('../../assets/star_empty.png')}
                          style={styles.starIcon}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) :

                (
                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Rated:</Text>
                    <View style={styles.ratingContainer}>

                      <Text style={styles.fieldValue}>Not rated yet</Text>

                    </View>
                  </View>
                )


            ) : userInfo.role === 'complainer' ? (

              rating > 0 ? ( // Only show the rating if it has been selected
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldTitle}>Rated:</Text>
                  <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} style={styles.starButton} onPress={() => handleRateWork(star)}>
                        <Image
                          source={star <= rating ? require('../../assets/star_filled.png') : require('../../assets/star_empty.png')}
                          style={styles.starIcon}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldTitle}>Rated:</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.fieldValue}>Not Rated yet</Text>
                  </View>
                </View>
              )

            ) : userInfo.role === 'supervisor' && (complain.status === 'CompletedS' || complain.status === 'CompletedA' || complain.status === 'Completed') ? (

              rating > 0 ? ( // Only show the rating if it has been selected
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldTitle}>Rated:</Text>
                  <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} style={styles.starButton} onPress={() => handleRateWork(star)}>
                        <Image
                          source={star <= rating ? require('../../assets/star_filled.png') : require('../../assets/star_empty.png')}
                          style={styles.starIcon}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldTitle}>Rated:</Text>
                  <View style={styles.ratingContainer}>

                    <Text style={styles.fieldValue}>Not Rated yet</Text>

                  </View>
                </View>
              )

            ) : null

          }


        </View>
      </ScrollView>

      {(userInfo.role === 'admin' && complain.status === 'AssignedS') && (
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.button} onPress={handleChangeSupervisor}>
            <Text style={styles.buttonText}>Change the Supervisor</Text>
          </TouchableOpacity>
        </View>
      )}


      {(userInfo.role === 'admin' && complain.status === 'AssignedA') && (
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
            <Text style={styles.buttonText}>Assign A Supervisor</Text>
          </TouchableOpacity>
        </View>
      )}

      {(userInfo.role === 'admin') && (                                            //here
       
       complain.status === 'CompletedS' ? (
       <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {handleComplete()}}>
            <Text style={styles.buttonText}>Mark As Completed</Text>
          </TouchableOpacity>
        </View>
        ) : ( complain.status === 'DeclinedS') ? (
          <View style={styles.dataContainer}>
             <TouchableOpacity style={styles.button} onPress={handleComplete}>
               <Text style={styles.buttonText}>Get another Action</Text>
             </TouchableOpacity>
           </View>
           ) : null  

      )}

      {userInfo.role === 'supervisor' && complain.status === 'AssignedL' && (
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCompleteSupervisor}>
            <Text style={styles.buttonText}>Finish the Job</Text>
          </TouchableOpacity>
        </View>
      )}
      {(userInfo.role === 'supervisor' && complain.status === 'AssignedS') && (
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAssignLaborer}>
            <Text style={styles.buttonText}>Assign Laborers</Text>
          </TouchableOpacity>
        </View>
      )}

      {showScaledImage && (
        <TouchableOpacity style={styles.scaledImageContainer} onPress={() => setShowScaledImage(false)}>
          <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.scaledImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowRatio = windowWidth / 425;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 20 * windowRatio,
  },
  image: {
    alignSelf: 'center',
    width: 200 * windowRatio,
    height: 200 * windowRatio,
    resizeMode: 'cover',
    marginBottom: 20 * windowRatio,
    borderRadius: 20 * windowRatio,
    marginTop: 20 * windowRatio,
  },
  dataContainer: {
    marginHorizontal: 20 * windowRatio,
    marginBottom: 20 * windowRatio,
    top: 30 * windowRatio,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15 * windowRatio,
  },
  fieldTitle: {
    fontWeight: 'bold',
    color: '#45474b',
    fontSize: 20 * windowRatio,
    marginRight: 10 * windowRatio,
    textAlign: 'left',
  },
  fieldValue: {
    color: '#45474b',
    fontSize: 20 * windowRatio,
    textAlign: 'left',

  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#19AFE2',
    marginHorizontal: -20 * windowRatio,
    marginTop: windowRatio,
  },
  button: {
    backgroundColor: '#01a9e1',
    padding: 20 * windowRatio,
    borderRadius: 5 * windowRatio,
    alignItems: 'center',
    marginRight: 5 * windowRatio,
    marginBottom: 25 * windowRatio,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20 * windowRatio,
    fontWeight: 'bold',
  },
  scaledImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scaledImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 40 * windowRatio,
    borderRadius: 10 * windowRatio,
    alignItems: 'center',
    width: '90%',
  },
  popupText: {
    fontSize: 25 * windowRatio,
    fontWeight: 'bold',
    marginBottom: 10 * windowRatio,
    textAlign: 'center',
  },
  popupDescription: {
    fontSize: 20 * windowRatio,
    marginBottom: 20 * windowRatio,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5 * windowRatio,
    marginLeft: 5 * windowRatio,
  },
  starContainer: {
    marginHorizontal: 5 * windowRatio,
  },
  starButton: {
    marginHorizontal: 8 * windowRatio,
  },
  starIcon: {
    width: 30 * windowRatio,
    height: 30 * windowRatio,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20 * windowRatio,
  },
  submitButton: {
    backgroundColor: '#01a9e1',
    padding: 10 * windowRatio,
    borderRadius: 10 * windowRatio,
    flex: 1,
    marginRight: 10 * windowRatio,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20 * windowRatio,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dismissButton: {
    backgroundColor: '#ccc',
    padding: 10 * windowRatio,
    borderRadius: 10 * windowRatio,
    flex: 1,
    marginLeft: 10 * windowRatio,
  },
  dismissButtonText: {
    color: 'black',
    fontSize: 20 * windowRatio,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  //   // Slideshow styles
  imageContainer: {
    marginBottom: Dimensions.get('window').height * 0.05,
    marginTop: Dimensions.get('window').height * 0.05,
  },
  placeholderImage: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  imageStyle: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: 'center',
  },
  slideshowImage: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').width * 0.95 * 3 / 4,

  },
  slideshowContainer: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').width * 0.95 * 3 / 4,
    alignSelf: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noimage: {
    width: width * 0.9,
    height: width * 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default ViewComplain;
