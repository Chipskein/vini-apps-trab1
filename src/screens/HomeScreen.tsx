import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import AmazonHeader from '../components/AmazonHeader';
import { products } from '../data/products';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <AmazonHeader />
      <ScrollView style={styles.body}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.heroRow}>
          <Pressable style={[styles.hero, { backgroundColor: '#cfe8c4' }]} onPress={() => navigation.navigate('Search', { query: 'panela' })}>
            <Text style={styles.heroTitle}>Dia das Mães{`\n`}Encontre{`\n`}o presente ideal</Text>
            <Text style={styles.heroChip}>Frete GRÁTIS   Até 21x sem juros</Text>
            <Text style={styles.heroProducts}>💻 👟 💄</Text>
          </Pressable>
          <Pressable style={[styles.hero, { backgroundColor: '#ff6a00' }]} onPress={() => navigation.navigate('Search', { query: 'ofertas' })}>
            <Text style={[styles.heroTitle, styles.whiteText]}>Ofertas{`\n`}até 50%</Text>
            <Text style={styles.heroChip}>Frete GRÁTIS</Text>
            <Text style={styles.heroProducts}>📦 🎧 🥘</Text>
          </Pressable>
        </ScrollView>
        <View style={styles.grid}>
          {products.map(product => (
            <Pressable key={product.id} style={styles.tile} onPress={() => navigation.navigate('ProductDetail', { product })}>
              <Text style={styles.tileTitle}>{product.id === 'fone-philips' ? 'Comprar novamente' : 'Sugerido com base ...'}</Text>
              <Image source={product.image} style={styles.tileImage} resizeMode="contain" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  nav: { backgroundColor: '#223142', paddingHorizontal: 18, maxHeight: 58 },
  navText: { color: '#fff', fontSize: 22, marginRight: 36, paddingVertical: 12 },
  body: { flex: 1 },
  heroRow: { padding: 18, gap: 18 },
  hero: { width: 320, height: 470, borderRadius: 14, padding: 22, alignItems: 'center', justifyContent: 'space-between' },
  heroTitle: { color: '#111827', fontSize: 31, lineHeight: 39, textAlign: 'center', fontWeight: '900' },
  whiteText: { color: '#fff' },
  heroChip: { backgroundColor: '#1f2937', color: '#fff', fontSize: 18, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 4 },
  heroProducts: { fontSize: 68 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 18, gap: 12 },
  tile: { width: '47%', minHeight: 210, borderWidth: 1, borderColor: '#d5d9d9', borderRadius: 10, padding: 16, backgroundColor: '#fff' },
  tileTitle: { fontSize: 25, fontWeight: '800', lineHeight: 31 },
  tileImage: { width: '100%',height:150, textAlign: 'center', marginTop: 20 }
});
