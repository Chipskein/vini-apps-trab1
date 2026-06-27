import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { useCart } from '../context/CartContext';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

type Props = { initialQuery?: string; showMenu?: boolean };

export default function AmazonHeader({ initialQuery = '', showMenu = false }: Props) {
  const navigation = useNavigation<Navigation>();
  const [query, setQuery] = useState(initialQuery);
  const { totalItems } = useCart();

  const submit = () => navigation.navigate('Search', { query: query || 'panela' });

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Pressable 
          style={styles.logoContainer} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={34} color="#fff" />
        </Pressable>
        
        <View style={styles.account}><Text style={styles.accountText}>Usuario ›</Text><Ionicons name="person-outline" size={32} color="#fff" /></View>
        <Pressable style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={38} color="#fff" />
          <Text style={styles.cartCount}>{totalItems}</Text>
        </Pressable>
      </View>
      <View style={styles.searchRow}>
        <TextInput value={query} onChangeText={setQuery} placeholder="Pesquisar" placeholderTextColor="#777" style={styles.searchInput} returnKeyType="search" onSubmitEditing={submit} />
        <Pressable style={styles.searchButton} onPress={submit}><Ionicons name="search" size={34} color="#000" /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#223142', paddingTop: 34, paddingHorizontal: 14, paddingBottom: 10 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { color: '#fff', fontSize: 15, fontWeight: '800', flex: 1 },
  logoSmall: { fontSize: 10, fontWeight: '400' },
  account: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  accountText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  cartIcon: { width: 50, alignItems: 'center' },
  cartCount: { position: 'absolute', top: -8, right: 5, color: '#ff9900', fontWeight: '900', fontSize: 22 },
  searchRow: { flexDirection: 'row', marginTop: 18, borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff' },
  searchInput: { flex: 1, minHeight: 58, paddingHorizontal: 16, fontSize: 22 },
  searchButton: { width: 66, backgroundColor: '#febd69', alignItems: 'center', justifyContent: 'center' },
  logoContainer: { flex: 1, justifyContent: 'center' }
});
