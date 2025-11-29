import React from 'react';
import { View, Text } from 'react-native';
import { estilosCadastroEdicaoBag } from './estilo';

export default function CadastroEdicaoBag() {
  return (
    <View style={estilosCadastroEdicaoBag.container}>
      <Text style={estilosCadastroEdicaoBag.titulo}>Cadastro/Edição de Bag</Text>
      <Text style={estilosCadastroEdicaoBag.texto}>
        Aqui será o formulário para cadastrar ou editar uma silobag
      </Text>
    </View>
  );
}