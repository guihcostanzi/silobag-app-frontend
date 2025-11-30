import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { estilos } from './estilos';

export function CampoTexto({
  placeholder = '',
  valor = '',
  onChangeText = () => {},
  tipo = 'texto',
  label = '',
  erro = '',
  obrigatorio = false,
  multiline = false,
  numeroLinhas = 1,
  maxCaracteres = null,
  style = {},
  editable = true,
  autoFocus = false,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  ...outrasProps
}) {
  const [focoAtivo, setFocoAtivo] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const obterConfiguracoesTipo = () => {
    switch (tipo) {
      case 'email':
        return {
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        };
      case 'senha':
        return {
          secureTextEntry: !senhaVisivel,
          autoCapitalize: 'none',
          autoCorrect: false,
        };
      case 'numerico':
        return {
          keyboardType: 'numeric',
          autoCapitalize: 'none',
        };
      case 'telefone':
        return {
          keyboardType: 'phone-pad',
          autoCapitalize: 'none',
        };
      default:
        return {
          keyboardType: keyboardType,
          autoCapitalize: autoCapitalize,
        };
    }
  };

  const configuracoes = obterConfiguracoesTipo();

  const obterEstiloContainer = () => {
    let estiloBase = [estilos.container];
    
    if (focoAtivo) {
      estiloBase.push(estilos.containerFocado);
    }
    
    if (erro) {
      estiloBase.push(estilos.containerErro);
    }
    
    if (!editable) {
      estiloBase.push(estilos.containerDesabilitado);
    }
    
    return estiloBase;
  };

  const alternarVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  return (
    <View style={[estilos.wrapper, style]}>
      {label ? (
        <Text style={estilos.label}>
          {label}
          {obrigatorio && <Text style={estilos.obrigatorio}> *</Text>}
        </Text>
      ) : null}

      <View style={obterEstiloContainer()}>
        <TextInput
          style={[
            estilos.input,
            multiline && estilos.inputMultiline,
            !editable && estilos.inputDesabilitado,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={valor}
          onChangeText={onChangeText}
          onFocus={() => setFocoAtivo(true)}
          onBlur={() => setFocoAtivo(false)}
          editable={editable}
          autoFocus={autoFocus}
          multiline={multiline}
          numberOfLines={multiline ? numeroLinhas : 1}
          maxLength={maxCaracteres}
          {...configuracoes}
          {...outrasProps}
        />

        {tipo === 'senha' && (
          <TouchableOpacity
            style={estilos.botaoSenha}
            onPress={alternarVisibilidadeSenha}
            activeOpacity={0.7}
          >
            <Text style={estilos.textoSenha}>
              {senhaVisivel ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {maxCaracteres && (
        <Text style={estilos.contador}>
          {valor.length}/{maxCaracteres}
        </Text>
      )}

      {erro ? (
        <Text style={estilos.erro}>
          ⚠️ {erro}
        </Text>
      ) : null}
    </View>
  );
}