import React from 'react';
import { View, Text } from 'react-native';
import { estilosListagemBags } from './estilo';

export default function ListagemBags() {
  return (
    <View style={estilosListagemBags.container}>
      <Text style={estilosListagemBags.titulo}>Listagem de Bags</Text>
      <Text style={estilosListagemBags.texto}>
        Aqui será exibida a lista de silobags
      </Text>
    </View>
  );
}