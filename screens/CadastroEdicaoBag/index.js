import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Botao } from '../../components/Botao';
import { CampoTexto } from '../../components/CampoTexto';
import api from '../../services/api';
import { estilos } from './estilo';

export default function CadastroEdicaoBag({ navigation, route }) {
  const bagParaEditar = route.params?.bag;
  const isEdicao = !!bagParaEditar;

  const [formulario, setFormulario] = useState({
    codigo: '',
    produto: '',
    volume: '',
    capacidade: ''
  });
  
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const tiposProduto = [
    { label: 'Selecione um produto', value: '' },
    { label: 'Milho', value: 'MILHO' },
    { label: 'Soja', value: 'SOJA' },
    { label: 'Trigo', value: 'TRIGO' },
  ];

  useEffect(() => {
    if (isEdicao && bagParaEditar) {
      setFormulario({
        codigo: bagParaEditar.codigo?.toString() || '',
        produto: bagParaEditar.produto || '',
        volume: bagParaEditar.volume?.toString() || '',
        capacidade: bagParaEditar.capacidade?.toString() || ''
      });
    }
  }, [isEdicao, bagParaEditar]);

  // Efeito para mostrar sucesso e navegar
  useEffect(() => {
    if (sucesso) {
      const timer = setTimeout(() => {
        navigation.navigate('ListagemBags');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [sucesso, navigation]);

  const atualizarCampo = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
    
    if (erros[campo]) {
      setErros(prev => ({
        ...prev,
        [campo]: null
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!isEdicao) {
      if (!formulario.codigo.trim()) {
        novosErros.codigo = 'Código é obrigatório';
      } else if (isNaN(formulario.codigo) || parseInt(formulario.codigo) <= 0) {
        novosErros.codigo = 'Código deve ser um número maior que zero';
      }

      if (!formulario.capacidade.trim()) {
        novosErros.capacidade = 'Capacidade é obrigatória';
      } else {
        const capacidade = parseFloat(formulario.capacidade);
        if (isNaN(capacidade) || capacidade <= 0) {
          novosErros.capacidade = 'Capacidade deve ser um número maior que zero';
        }
      }
    }

    if (!formulario.produto) {
      novosErros.produto = 'Produto é obrigatório';
    }

    if (!formulario.volume.trim()) {
      novosErros.volume = 'Volume é obrigatório';
    } 
    else {
      const volume = parseFloat(formulario.volume);
      const capacidade = parseFloat(formulario.capacidade);
      
      if (isNaN(volume) || volume < 0) {
        novosErros.volume = 'Volume deve ser maior ou igual a zero';
      }
      
      if (!isNaN(capacidade) && volume > capacidade) {
        novosErros.volume = 'Volume deve ser menor ou igual à capacidade';
      }
      
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const mostrarSucesso = () => {
    setSucesso(true);
  };

  const mostrarErro = () => {
  };

  const salvarBag = async () => {
    if (!validarFormulario()) {
      mostrarErro();
      return;
    }

    setCarregando(true);

    try {
      if (isEdicao) {
        const dadosEdicao = {
          uid: bagParaEditar.uid,
          volume: parseFloat(formulario.volume),
          produto: formulario.produto
        };
        
        await api.put('/atualizar', dadosEdicao);
        setCarregando(false);
        mostrarSucesso();
        
      } else {
        const dadosCadastro = {
          codigo: parseInt(formulario.codigo),
          produto: formulario.produto,
          volume: parseFloat(formulario.volume),
          capacidade: parseFloat(formulario.capacidade)
        };
        
        await api.post('/adicionar', dadosCadastro);
        setCarregando(false);
        mostrarSucesso();
      }

    } catch (error) {
      setCarregando(false);
      console.error('Erro ao salvar:', error);
      mostrarErro();
    }
  };

  const cancelar = () => {
    navigation.navigate('ListagemBags');
  };

  if (sucesso) {
    return (
      <View style={estilos.containerSucesso}>
        <Text style={estilos.textoSucesso}>✅</Text>
        <Text style={estilos.mensagemSucesso}>
          {isEdicao ? 'Silobag atualizada!' : 'Silobag cadastrada!'}
        </Text>
        <Text style={estilos.subMensagem}>Redirecionando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container} showsVerticalScrollIndicator={false}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>
          {isEdicao ? 'Editar Silobag' : 'Nova Silobag'}
        </Text>
        {isEdicao && (
          <Text style={estilos.subtitulo}>
            Editando: #{bagParaEditar?.codigo}
          </Text>
        )}
      </View>

      <View style={estilos.formulario}>
        <CampoTexto
          label="Código"
          placeholder="Ex: 001"
          valor={formulario.codigo}
          onChangeText={(valor) => atualizarCampo('codigo', valor)}
          tipo="numerico"
          obrigatorio={!isEdicao}
          erro={erros.codigo}
          editable={!isEdicao}
        />

        <View style={estilos.grupoInput}>
          <Text style={estilos.label}>Produto *</Text>
          <View style={[estilos.pickerContainer, erros.produto && estilos.inputErro]}>
            <Picker
              selectedValue={formulario.produto}
              onValueChange={(valor) => atualizarCampo('produto', valor)}
              style={estilos.picker}
              dropdownIconColor="#fff"
            >
              {tiposProduto.map((tipo) => (
                <Picker.Item
                  key={tipo.value}
                  label={tipo.label}
                  value={tipo.value}
                  color="#000"
                />
              ))}
            </Picker>
          </View>
          {erros.produto && (
            <Text style={estilos.textoErro}>⚠️ {erros.produto}</Text>
          )}
        </View>

        <CampoTexto
          label="Capacidade (ton)"
          placeholder="Ex: 100.5"
          valor={formulario.capacidade}
          onChangeText={(valor) => atualizarCampo('capacidade', valor)}
          tipo="numerico"
          obrigatorio={!isEdicao}
          erro={erros.capacidade}
          editable={!isEdicao}
        />

        <CampoTexto
          label="Volume (ton)"
          placeholder="Ex: 85.2"
          valor={formulario.volume}
          onChangeText={(valor) => atualizarCampo('volume', valor)}
          tipo="numerico"
          obrigatorio={true}
          erro={erros.volume}
        />
        
        {!isEdicao && (
          <Text style={estilos.dica}>
            Volume deve ser menor ou igual à capacidade
          </Text>
        )}
      </View>

      <View style={estilos.botoesAcao}>
        <Botao
          texto="Cancelar"
          tipo="acaoAlternativo"
          onPress={cancelar}
          style={estilos.botaoCancelar}
          disabled={carregando}
        />
        <Botao
          texto={carregando ? 'Salvando...' : (isEdicao ? 'Atualizar' : 'Cadastrar')}
          tipo="acaoPrimario"
          onPress={salvarBag}
          disabled={carregando}
          style={estilos.botaoSalvar}
        />
      </View>
    </ScrollView>
  );
}