import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import AmazonHeader from '../components/AmazonHeader';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ route }: Props) {
  const query = route.params?.query ?? 'panela';
  return (
    <View style={styles.container}>
      <AmazonHeader initialQuery={query} />
      <ScrollView style={styles.list}>
        <Text style={styles.notice}>Consulte as páginas dos produtos para ver outras opções de compra.</Text>
        {products.filter(product => product.id !== 'fone-philips').map(product => <ProductCard key={product.id} product={product} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { borderTopWidth: 1, borderTopColor: '#d5d9d9' },
  notice: { fontSize: 19, color: '#555', padding: 16, lineHeight: 25 }
});
