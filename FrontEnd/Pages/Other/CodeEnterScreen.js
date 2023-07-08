import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const CodeEnterScreen = ({ navigation }) => {
  const code1Ref = useRef();
  const code2Ref = useRef();
  const code3Ref = useRef();
  const code4Ref = useRef();

  const handleCodeVerify = () => {
    console.log('Code verified!');
    // Add your code verification logic here
    // For example, compare the entered code with the expected code
    // You can navigate to the PasswordChangeScreen after successful verification
    navigation.navigate('PasswordChangeScreen');
  };

  const handleCodeInputChange = (code, nextRef) => {
    if (code.length === 1 && nextRef.current) {
      nextRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <></>
      </View>

      <View style={styles.lowerSection}>
        <Text style={styles.title}>Code Enter Screen</Text>

        <View style={styles.codeContainer}>
          <TextInput
            ref={code1Ref}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(code) => handleCodeInputChange(code, code2Ref)}
          />
          <TextInput
            ref={code2Ref}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(code) => handleCodeInputChange(code, code3Ref)}
          />
          <TextInput
            ref={code3Ref}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(code) => handleCodeInputChange(code, code4Ref)}
          />
          <TextInput
            ref={code4Ref}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(code) => handleCodeInputChange(code, null)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCodeVerify}>
          <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01a9e1',
  },
  upperSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
    borderTopLeftRadius: width * 0.15,
    borderTopRightRadius: width * 0.15,
    marginTop: -height * 0.2,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.15,
  },
  title: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  codeInput: {
    height: height * 0.08,
    width: width * 0.12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: height * 0.02,
    fontSize: height * 0.04,
    paddingHorizontal: width * 0.03,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#01a9e1',
    paddingVertical: height * 0.02,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CodeEnterScreen;
