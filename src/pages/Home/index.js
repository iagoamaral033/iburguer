import React, { useEffect, useState } from "react";
import { 
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import { Feather } from '@expo/vector-icons';

import { BoxItem } from "../../components/boxItem";
import { drinks, snacks, all } from "../../data";
import { BoxItemSearch } from "../../components/BoxItemSearch";
import { useNavigation } from "@react-navigation/native";

export function Home({route}) {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [cart, setCart] = useState([]);
 
  const navigation = useNavigation();
  const { data } = route.params;

  function addItemCart(item) {
    setCart(oldItems => [item, ...oldItems]);
  };

  function handleCheckout() {
    if(cart.length === 0) {
      Alert.alert('Carrinho Vazio','Adicione pelo menos 1 item para continuar.')
      return;
    };
    navigation.navigate('Checkout', {cart: cart});
  };

  useEffect(() => {
    if (search === '') {
      setList([]);
    } else {
      setList(
        all.filter(item => {
          if (item.name.indexOf(search) > -1) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [search]);

  useEffect(() => {
    setCart([])
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#292929" />
        <View style={styles.containerHeader}>
          <Text style={styles.headerTitle} numberOfLines={2}>
            {`Olá,\n   ${data.name}`}
          </Text>
          <View style={styles.containerHeaderActions}>
            <TouchableOpacity 
              style={styles.containerIconUser}
              onPress={() => navigation.navigate('Login')}
            >
              <Feather name="user" size={24} color="#F9F9F9" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCheckout()}
              onLongPress={() => {
                setCart([]);
                alert('O carrinho foi limpo');
              }}
            >
              <Feather name="shopping-cart" size={24} color="#F9F9F9" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerSearch}>
          <Feather name="search" size={24} color="#F9F9F950" style={{marginRight: 10}}/>
          <TextInput
            value={search}
            onChangeText={value => setSearch(value)}
            placeholder="Pesquisar"
            placeholderTextColor="#F9F9F950"
            style={styles.inputSearch}
          />
        </View>
        { search !== ''
          ? <BoxItemSearch data={list} addItem={addItemCart}/>
          : <>
            <BoxItem isInHorizontal={true} data={snacks} title="Recomendados" addItem={addItemCart} isAddItem={true} />
            <BoxItem isInHorizontal={true} data={snacks} title="Lanches" addItem={addItemCart} isAddItem={true} />
            <BoxItem isInHorizontal={true} data={drinks} title="Bebidas" addItem={addItemCart} isAddItem={true} />
          </>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  containerHeader: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 10
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
  containerIconUser: {
    padding: 10,
    backgroundColor: '#292929',
    borderRadius: 50,
    marginRight: 10
  },
  containerSearch: {
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: '#292929'
  },
  inputSearch: {
    flex: 1,
    fontSize: 20,
    color: '#F9F9F9'
  }
})