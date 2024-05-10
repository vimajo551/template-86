import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import firebase from "firebase"
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      confirm_password: "",
      fontsLoaded: false
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  registerUser = (email,password,confirm_password,first_name,last_name) => {
    if(password == confirm_password){
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((userCredential) => {
        alert("usuario registrado")
        this.props.navigation.replace("Login")
        firebase.database().ref("/users/"+userCredential.user.uid).set({
          email: userCredential.user.email,
          first_name: first_name,
          last_name: last_name
        })
      })
      .catch(error => alert(error.message))
    }else{
      alert("senha incompativel")
    }
  }
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password} = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>Registrar</Text>

          {/* Adicione código para criar mais duas entradas de texto para nome e sobrenome */}
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ first_name: text })}
            placeholder={"Digite o seu primeiro nome"}
            placeholderTextColor={"#FFFFFF"}

          />

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ last_name: text })}
            placeholder={"Digite o seu sobrenome"}
            placeholderTextColor={"#FFFFFF"}

          />

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ email: text })}
            placeholder={"Digite o e-mail"}
            placeholderTextColor={"#FFFFFF"}

          />
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ password: text })}
            placeholder={"Digite a senha"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ confirm_password: text })}
            placeholder={"Digite a senha novamente"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />


          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress = {() => this.resgisterUser(email,password,confirm_password,first_name,last_name)}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {() => this.props.navigation.replace("Login")}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: 'underline'
  }
});
