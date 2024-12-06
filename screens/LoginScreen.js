import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginLogo from "../assets/LoginLogo.svg";
import Google from "../assets/Google.svg";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // adjust this value as needed
    >
     
        <View style={styles.innerView}>
          {/* <LoginLogo /> */}
           {/* <LoginLogo/> */}
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKimsLvTitGNjXhbytt4yhhqnejgi_x4l9g&s' }}
        style={{width:100,height:80,borderRadius:20}}
        resizeMode="cover"
      />
          <Text style={styles.logoText}>LOGIN</Text>
        </View>
        <View style={styles.formView}>
          <Text style={styles.innerText}>Login To Your Account</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#A1A1A1"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A1A1A1"
            style={styles.textInput}
            secureTextEntry
          />
          <TouchableOpacity  onPress={()=>navigation.navigate("status")}   style={styles.buttonView}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.googleButton}>
            <Google />
            <Text style={styles.googleButtonText}>Login With Google</Text>
          </TouchableOpacity> */}
        </View>
    
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerView: {
    width: "100%",
    height: "40%",
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  logoText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#fff",
    marginTop: 8,
  },
  formView: {
    width: "90%",
    height:"55%",
    alignSelf: "center",
    marginTop: "6%",
   
  },
  innerText: {
    fontSize: 15,
    fontWeight: "900",
    color: "black",
    marginBottom: 20,
    left:"5%"
  },
  textInput: {
    width: "95%",
    height: 60,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 10,
    paddingLeft: 30,
    marginBottom: 20,
    alignSelf:"center"
  },
  buttonView: {
    width: "55%",
    height: 60,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    top:"4%",
    alignSelf:"center"
   
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },
  forgotButton: {
    alignItems: "flex-end",
    top:"10%",
    right:"4%"
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#262424",
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 60,
    borderColor: "#C8C8C8",
    borderWidth: 1,
    borderRadius: 10,
    top:"30%",
    alignSelf:"center"
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000",
    marginLeft: 20,
  },
});
