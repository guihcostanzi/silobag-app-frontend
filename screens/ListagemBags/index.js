import { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Botao } from '../../components/Botao';
import { CampoTexto } from '../../components/CampoTexto';
import api from '../../services/api';
import { estilos } from './estilo';

export default function ListagemBags({ navigation }) {
  const [bags, setBags] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarBags = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      const response = await api.get('/listar');
      setBags(response.data);
      
    } catch (error) {
      console.error('Erro ao buscar silobags:', error);
      
      if (error.message === 'ECONNABORTED') {
        setErro('Tempo limite excedido. Verifique sua conexão.');
      } else if (error.message.includes('HTTP Error')) {
        setErro(`Erro do servidor: ${error.message}`);
      } else {
        setErro('Não foi possível conectar com o servidor. Verifique se a API está rodando.');
      }
    } finally {
      setCarregando(false);
    }
  };

  const excluirBag = async (bagUid) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta silobag?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/remover/${bagUid}`);
              setBags(bags.filter(bag => bag.uid !== bagUid));
              Alert.alert('Sucesso', 'Silobag excluída com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir silobag:', error);
              Alert.alert('Erro', 'Não foi possível excluir a silobag. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    buscarBags();
  }, []);

  const bagsFiltradas = bags.filter(bag =>
    bag.codigo?.toString().includes(termoBusca) ||
    bag.produto?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    bag.capacidade?.toString().includes(termoBusca) ||
    bag.volume?.toString().includes(termoBusca)
  );

  const atualizarDados = () => {
    buscarBags();
  };

  const verDetalhes = (bag) => {
    navigation.navigate('DetalhesBag', { bag });
  };

  const editarBag = (bag) => {
    navigation.navigate('CadastroEdicaoBag', { bag });
  };

  const abrirCadastro = () => {
    navigation.navigate('CadastroEdicaoBag');
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'Não informada';
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  const formatarProduto = (produto) => {
    if (!produto) return 'Não informado';
    return produto.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderizarItemBag = ({ item: bag }) => (
    <View style={estilos.itemBag}>
      <View style={estilos.infoBag}>
        <Text style={estilos.nomeBag}>Silobag #{bag.codigo || 'S/N'}</Text>
        <Text style={estilos.detalheBag}>
          🌾 {formatarProduto(bag.produto)}
        </Text>
        <Text style={estilos.detalheBag}>
          📦 {bag.capacidade ? `${bag.capacidade.toFixed(1)}ton` : 'N/A'} • 📊 {bag.volume ? `${bag.volume.toFixed(1)}ton` : 'N/A'}
        </Text>
        <Text style={estilos.detalheBag}>
          📅 {formatarData(bag.dataCadastro)}
        </Text>
      </View>
      
      <View style={estilos.acoesBag}>
        <Botao
          texto="Ver"
          tipo="acaoAlternativo"
          onPress={() => verDetalhes(bag)}
          style={estilos.botaoAcao}
        />
        <Botao
          texto="Editar"
          tipo="acaoTerciario"
          onPress={() => editarBag(bag)}
          style={estilos.botaoAcao}
        />
        <Botao
          texto="Excluir"
          tipo="acaoDestructivo"
          onPress={() => excluirBag(bag.uid)}
          style={estilos.botaoAcao}
        />
      </View>
    </View>
  );

  const renderizarListaVazia = () => (
    <View style={estilos.listaVazia}>
      <Text style={estilos.textoListaVazia}>
        {termoBusca ? 'Nenhuma silobag encontrada' : 'Nenhuma silobag cadastrada'}
      </Text>
      {!termoBusca && (
        <Text style={estilos.subtextoListaVazia}>
          Toque em "Nova Silobag" para começar
        </Text>
      )}
    </View>
  );

  if (carregando) {
    return (
      <View style={estilos.containerCentralizado}>
        <ActivityIndicator size="large" color="#e5c745ff" />
        <Text style={estilos.textoCarregando}>Carregando silobags...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={estilos.containerCentralizado}>
        <Text style={estilos.textoErro}>❌ {erro}</Text>
        <Botao
          texto="Tentar Novamente"
          tipo="acaoPrimario"
          onPress={atualizarDados}
          style={estilos.botaoTentarNovamente}
        />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Silobags</Text>
        <Text style={estilos.subtitulo}>
          {bags.length} bag{bags.length !== 1 ? 's' : ''} cadastrada{bags.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <CampoTexto
        placeholder="Buscar por código, produto, capacidade ou volume..."
        valor={termoBusca}
        onChangeText={setTermoBusca}
        style={estilos.campoBusca}
      />

      <View style={estilos.botoesAcao}>
        <Botao
          texto="🔄"
          tipo="acaoAlternativo"
          onPress={atualizarDados}
          style={estilos.botaoAtualizar}
        />
        <Botao
          texto="+ Nova"
          tipo="acaoPrimario"
          onPress={abrirCadastro}
          style={estilos.botaoAdicionar}
        />
      </View>

      <FlatList
        data={bagsFiltradas}
        renderItem={renderizarItemBag}
        keyExtractor={(item) => item.uid}
        showsVerticalScrollIndicator={false}
        style={estilos.lista}
        contentContainerStyle={estilos.listaContainer}
        ListEmptyComponent={renderizarListaVazia}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
}