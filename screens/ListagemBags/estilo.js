import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  
  containerCentralizado: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  cabecalho: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#888',
  },
  
  campoBusca: {
    marginBottom: 12,
  },
  
  botoesAcao: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
    height: 32,
  },
  botaoAtualizar: {
    flex: 0.8,
    height: 32,
    minHeight: 32,
  },
  botaoAdicionar: {
    flex: 1.2,
    height: 32,
    minHeight: 32,
  },
  
  lista: {
    flex: 1,
  },
  
  listaContainer: {
    paddingBottom: 16,
  },
  
  itemBag: {
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#e5c745ff',
  },
  
  infoBag: {
    marginBottom: 10,
  },
  
  nomeBag: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  
  detalheBag: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 2,
    lineHeight: 18,
  },
  
  acoesBag: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    height: 32,
  },
  
  botaoAcao: {
    height: 32,
    minHeight: 32,
    width: 60,
    paddingVertical: 0,
    paddingHorizontal: 6,
    flex: 0,
  },
  
  textoCarregando: {
    fontSize: 16,
    color: '#888',
    marginTop: 12,
    textAlign: 'center',
  },
  
  textoErro: {
    fontSize: 14,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  
  botaoTentarNovamente: {
    marginTop: 8,
    minWidth: 180,
    height: 36,
    minHeight: 36,
  },
  
  listaVazia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  
  textoListaVazia: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  subtextoListaVazia: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
  
  texto: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 16,
    lineHeight: 20,
  },
  
  botaoVoltar: {
    marginTop: 16,
    height: 36,
    minHeight: 36,
  },
});