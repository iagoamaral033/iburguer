import React from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';

function Item({data, add, isAddItem}) {
  return (
    <View style={stylesItem.container}>
      <Image
        source={{uri: data.image}}
        style={stylesItem.image}
      />
      { isAddItem &&
        <TouchableOpacity style={stylesItem.button}
          onPress={() => add(data)}
        >
          <Feather name="plus" size={30} color="#F9F9F9"/>
        </TouchableOpacity>
      }
    </View>
  )
}

export function BoxItem({data, title, isInHorizontal, addItem, isAddItem}) {

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
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        style={{marginLeft: 5}}
        keyExtractor={item => item.id}
        horizontal={isInHorizontal}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Item data={item} add={addToCart} isAddItem={isAddItem} />}
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
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: '#292929',
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
    padding: 5,
    bottom: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: '#29292980',
    borderRadius: 50
  },
  image: {
    width: 80,
    height: 80
  }
})