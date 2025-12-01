import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Botao } from '../../components/Botao';
import { CampoTexto } from '../../components/CampoTexto';
import api from '../../services/api';
import { estilos } from './estilo';

export default function ListagemBags({ navigation }) {
  const [bags, setBags] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [carregandoBusca, setCarregandoBusca] = useState(false);
  const [erro, setErro] = useState(null);
  const [bagParaExcluir, setBagParaExcluir] = useState(null);

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

  const buscarPorTermo = async (termo) => {
    if (!termo.trim()) {
      // Se não há termo, busca todas
      buscarBags();
      return;
    }

    try {
      setCarregandoBusca(true);
      setErro(null);
      
      const response = await api.get(`/buscarFiltros/${encodeURIComponent(termo)}`);
      setBags(response.data);
      
    } catch (error) {
      console.error('Erro ao buscar silobags:', error);
      setErro('Erro na busca. Tente novamente.');
      setBags([]);
    } finally {
      setCarregandoBusca(false);
    }
  };

  // Evitar muitas requisições
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      buscarPorTermo(termoBusca);
    }, 500); // Aguarda 500ms após parar de digitar

    return () => clearTimeout(timeoutId);
  }, [termoBusca]);

  const confirmarExclusao = (bagUid) => {
    setBagParaExcluir(bagUid);
  };

  const cancelarExclusao = () => {
    setBagParaExcluir(null);
  };

  const excluirBag = async (bagUid) => {
    try {
      await api.delete(`/remover/${bagUid}`);
      buscarBags();
      setBagParaExcluir(null);
      
      console.log('Silobag excluída com sucesso!');
      
    } catch (error) {
      console.error('Erro ao excluir silobag:', error);
      setBagParaExcluir(null);
      // Recarrega a lista após erro
      if (termoBusca.trim()) {
        buscarPorTermo(termoBusca);
      } else {
        buscarBags();
      }
    }
  };

  useEffect(() => {
    buscarBags();
  }, []);

  const atualizarDados = () => {
    if (termoBusca.trim()) {
      buscarPorTermo(termoBusca);
    } else {
      buscarBags();
    }
  };

  const limparBusca = () => {
    setTermoBusca('');
    // buscarBags() será chamado automaticamente pelo useEffect
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

  const renderizarItemBag = ({ item: bag }) => {
    if (bagParaExcluir === bag.uid) {
      return (
        <View style={[estilos.itemBag, estilos.itemBagExclusao]}>
          <View style={estilos.confirmacaoExclusao}>
            <Text style={estilos.tituloConfirmacao}>⚠️ Confirmar Exclusão</Text>
            <Text style={estilos.textoConfirmacao}>
              Deseja excluir a Silobag #{bag.codigo}?
            </Text>
            <Text style={estilos.subtextoConfirmacao}>
              Esta ação não pode ser desfeita.
            </Text>
            
            <View style={estilos.botoesConfirmacao}>
              <Botao
                texto="Cancelar"
                tipo="acaoNeutro"
                onPress={cancelarExclusao}
                style={estilos.botaoConfirmacao}
              />
              <Botao
                texto="Excluir"
                tipo="acaoSecundario"
                onPress={() => excluirBag(bag.uid)}
                style={estilos.botaoConfirmacao}
              />
            </View>
          </View>
        </View>
      );
    }

    return (
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
            texto="Editar"
            tipo="acaoAlternativo"
            onPress={() => editarBag(bag)}
            style={estilos.botaoAcao}
          />
          <Botao
            texto="Excluir"
            tipo="acaoSecundario"
            onPress={() => confirmarExclusao(bag.uid)}
            style={estilos.botaoAcao}
          />
        </View>
      </View>
    );
  };

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
          {bags.length} bag{bags.length !== 1 ? 's' : ''} {termoBusca ? 'encontrada' : 'cadastrada'}{bags.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={estilos.containerBusca}>
        <CampoTexto
          placeholder="Buscar por código, produto, capacidade ou volume..."
          valor={termoBusca}
          onChangeText={setTermoBusca}
          style={[estilos.campoBusca, { flex: 1 }]}
        />
        {carregandoBusca && (
          <ActivityIndicator 
            size="small" 
            color="#e5c745ff" 
            style={estilos.indicadorBusca}
          />
        )}
      </View>

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
        <Botao
          texto="🗑"
          tipo={termoBusca !== "" ? "acaoNeutro" : "invisivel"}
          onPress={limparBusca}
          style={estilos.botaoAtualizar}
        />
      </View>

      <FlatList
        data={bags}
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