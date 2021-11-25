import React from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';

function Item({data, add}) {
  return (
    <View style={stylesItem.container}>
      <View style={stylesItem.containerImage}>
        <Image
          source={{uri: data.image}}
          style={stylesItem.image}
        />
        <TouchableOpacity style={stylesItem.button}
          onPress={() => add(data)}
        >
          <Feather name="plus" size={30} color="#FFF"/>
        </TouchableOpacity>
      </View>
      <View style={stylesItem.containerContent}>
        <Text style={stylesItem.itemName}>{data.name}</Text>
        <Text style={stylesItem.itemPrice}>R${data.price} Reais</Text>
      </View>
    </View>
  )
}

export function BoxItemSearch({data, addItem}) {

  function addToCart(data) {
    Alert.alert(
      data.name,
      `Deseja adicionar ${data.name} no valor de R$${parseFloat(data.price)} Reais ao carrinho?`,
      [
        {
          text: "CANCELAR",
          onPress: () => console.log('cancelar'),
          style: "cancel",
        },
        {
          text: "ADICIONAR",
          onPress: () => addItem(data),
          style: "default",
        }
      ],
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={{marginLeft: 5}}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Item data={item} add={addToCart} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 35
  },
  title: {
    fontSize: 20,
    color: '#F9F9F9',
    marginBottom: 10
  }
})

const stylesItem = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 20
  },
  containerImage: {
    backgroundColor: '#292929',
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 10,
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#292929'
  }, 
  button: {
    position: 'absolute',
    padding: 1,
    bottom: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: '#29292980',
    borderRadius: 50
  },
  image: {
    width: 80,
    height: 80
  },
  containerContent: {
    flex: 1,
    height: 110,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  itemName: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 5
  },
  itemPrice: {
    fontSize: 16,
    color: '#FFFFFF50',
    fontStyle: 'italic'
  }
})