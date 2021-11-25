import React, { useState } from "react";
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { BoxItem } from "../../components/boxItem";
import { useNavigation } from "@react-navigation/native";

export function Checkout({route}) {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [cep, setCep] = useState('');
  const [complement, setComplement] = useState('');

  const navigation = useNavigation();
  
  const { cart } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#292929" />
        <View style={styles.containerHeader}>
          <Text style={styles.headerTitle} numberOfLines={2}>
            {`Finalizar\n   Pedido`}
          </Text>
          <View style={styles.containerHeaderActions}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Atenção',
                  `Voltar aos Items?`,
                  [
                    {
                      text: "NÂO",
                      onPress: () => console.log('cancelar'),
                      style: "cancel",
                    },
                    {
                      text: "SIM",
                      onPress: () => {
                        navigation.goBack();
                      },
                      style: "default",
                    }
                  ],
                )
              }}
            >
              <Feather name="arrow-left-circle" size={40} color="#F9F9F9" />
            </TouchableOpacity>
          </View>
        </View>
        <BoxItem data={cart} title="Carrinho" isInHorizontal={true} />
        <View style={styles.containerInputs}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={address}
              onChangeText={value => setAddress(value)}
              style={[styles.input, { flex: 1 }]}
              placeholder="Endereço"
              placeholderTextColor="#F6F6F650"
            />
            <TextInput
              value={number}
              onChangeText={value => setNumber(value)}
              style={[styles.input, { width: '20%', marginLeft: 10 }]}
              placeholder="Nº"
              placeholderTextColor="#F6F6F650"
              maxLength={4}
              keyboardType="numeric"
            />
          </View>
          <TextInput
            value={district}
            onChangeText={value => setDistrict(value)}
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor="#F6F6F650"
          />
          <TextInput
            value={cep}
            onChangeText={value => setCep(value)}
            style={styles.input}
            placeholder="CEP"
            placeholderTextColor="#F6F6F650"
            keyboardType="numeric"
          />
          <TextInput
            value={complement}
            onChangeText={value => setComplement(value)}
            style={styles.input}
            placeholder="Complemento"
            placeholderTextColor="#F6F6F650"
          />
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            Alert.alert(
              'Atenção',
              `Finalizar Pedido?`,
              [
                {
                  text: "NÂO",
                  onPress: () => console.log('cancelar'),
                  style: "cancel",
                },
                {
                  text: "SIM",
                  onPress: () => {
                    alert('Pedido finalizado, aguarde a chegada.');
                    navigation.goBack()
                  },
                  style: "default",
                }
              ],
            )
          }}
        >
          <Text style={styles.buttonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212'
  },
  containerHeader: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 30,
    color: '#F9F9F9',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  containerHeaderActions: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: "center"
  },
  containerInputs: {
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center"
  },
  input: {
    padding: 10,
    backgroundColor: '#292929',
    width: '100%',
    marginBottom: 10,
    borderRadius: 7,
    fontSize: 18,
    elevation: 5,
    color: '#F9F9F9'
  },
  button: {
    backgroundColor: '#292929',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 7
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9F9F9'
  }
})