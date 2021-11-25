import React, { useEffect, useState } from "react";
import { 
  Image,
  StatusBar,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View ,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { randomKey } from "../../utils/randomKey";

export function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  async function handleLogin() {
    const users = await AsyncStorage.getItem('_users');
    const usersParse = JSON.parse(users);
    
    let isUser = null;

    usersParse.map((value, index) => {
      if(name === value.name && password === value.password) {
        isUser = value
        return;
      };
      return;
    });

    if(!!isUser) {
      navigation.navigate('Home', { data: isUser });
      setName('');
      setPassword('');
    };
  };

  async function handleLogon() {
    if(name === '' || password === '') {
      alert('Preencha os campos primeiro!');
      return;
    };
    let isUserAccount = false;

    const user = {
      id: randomKey(),
      name: name,
      password: password
    };

    const users = await AsyncStorage.getItem('_users');
    if(users !== null) {
      let usersParse = JSON.parse(users);
      usersParse.map(value => {
        if(value.name === name) {
          alert('Usuário já cadastrado!\nFaça login ou tente outro');
          isUserAccount = true;
          return;
        };
      });

      const newUsers = [
        user,
        ...usersParse
      ];
      if(isUserAccount === false) {
        await AsyncStorage.setItem('_users', JSON.stringify(newUsers))
        .then(() => {
          navigation.navigate('Home', {data: user});
          setName('');
          setPassword('');
        });
      }
      return;
    }

    let userArray = [
      user
    ] 
    await AsyncStorage.setItem('_users', JSON.stringify(userArray))
    .then(() => {
        navigation.navigate('Home', {data: user});
        setName('');
        setPassword('');
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.containerLogin}>
        <Text style={styles.logoText}>
          iBurger
        </Text>
        <TextInput
          value={name}
          onChangeText={value => setName(value)}
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#F6F6F650"
        />
        <TextInput
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#F6F6F650"
          maxLength={10}
          secureTextEntry={true}
        />
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin()}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#F9F9F9'}]}
            onPress={() => handleLogon()}
          >
            <Text style={[styles.buttonText, {color: '#121313'}]}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  containerImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerLogin: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#121313',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 20
  },
  logoText: {
    fontSize: 45,
    fontStyle: 'italic',
    fontWeight: "bold",
    color: '#F9F9F9',
    marginBottom: 20,
    textShadowColor: 'red',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1
  },
  input: {
    padding: 10,
    backgroundColor: '#292929',
    width: '90%',
    marginBottom: 10,
    borderRadius: 7,
    fontSize: 18,
    elevation: 5,
    color: '#F9F9F9'
  },
  containerButtons: {
    flexDirection: "row",
    marginTop: 10,
    width: '90%',
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#292929',
    borderRadius: 7,
    elevation: 5
  },
  buttonText: {
    color: '#F9F9F9',
    fontWeight: 'bold',
    fontSize: 20
  }
})