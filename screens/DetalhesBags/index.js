import React from 'react';
import { View, Text } from 'react-native';
import { estilosDetalhesBag } from './estilo';

export default function DetalhesBag() {
  return (
    <View style={estilosDetalhesBag.container}>
      <Text style={estilosDetalhesBag.titulo}>Detalhes da Bag</Text>
      <Text style={estilosDetalhesBag.texto}>
        Aqui serão exibidos os detalhes de uma silobag específica
      </Text>
    </View>
  );
}