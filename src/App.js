import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Button, Card, Container, Form, Grid, Icon, Label, Message, Segment } from 'semantic-ui-react'
import SimpleStorage from 'react-simple-storage'

import { useEffect, useState } from 'react';
import { authSuap, getToken, getTarefas } from './services/auth';
import { getBoletim } from './api/suap';

import TarefaForm from './components/tarefas/TarefaForm';
import Turmas from './components/Turmas';
import Menu from './components/Menu';
import Home from './components/Home';

import './App.css';

function App() {

  const [token, setToken] = useState(getToken());
  const [config, setConfig] = useState({periodo: {ano: 2021, periodo: 1}});

  const [seqId, setSeqId] = useState(0);
  const [tarefas, setTarefas] = useState(getTarefas());

  useEffect(() => {
    localStorage.setItem('TAREFAS', JSON.stringify(tarefas));
  })

  const inserir = (tarefa) => {
    tarefa.id = seqId+1;
    setTarefas([...tarefas, tarefa]);
    setSeqId(tarefa.id);
  };

  const remover = (tarefa) => {
    if (window.confirm("Remover esta tarefa?")) {
      const lista = tarefas.filter(t => t.id !== tarefa.id);
      setTarefas(lista);
    }
  };

  const editar = (tarefa) => {
    const index = tarefas.findIndex(p => p.id === tarefa.id);
    const listaItemRemovido = tarefas.splice(0, index).concat(tarefas.splice(index + 1));
    const listaEditada = [...listaItemRemovido, tarefa].sort((a, b) => a.id - b.id);
    setTarefas(listaEditada);
  }

  return (
    <Router>
      <Menu token={token} setToken={setToken} config={config} setConfig={setConfig}/>
      <SimpleStorage parent={this}/>
      <Switch>
        <Route exact path="/" render={(p) => <Home token={token} remover={remover} tarefas={tarefas}/>} />
        <Route exact path="/boletim" render={(p) => <Boletim token={token} periodo={config.periodo}/>} />
        <Route exact path="/login" render={() => <Login token={token} setToken={setToken}/>} />
        <Route exact path="/turmas" render={() => <Turmas token={token} setToken={setToken} periodo={config.periodo}/>} />
        <Route exact path="/tarefa/cadastro" render={() => <TarefaForm token={token} inserir={inserir} tarefa={{id: 0, nome: '', descricao: ''}}/>} />
        <Route exact path="/tarefa/editar/:id" render={(props) => {
          const tarefa = tarefas.find(t => t.id === Number(props.match.params.id));
          return (<TarefaForm token={token} editar={editar} tarefa={tarefa}/>);
        }} />
      </Switch>
    </Router>
  );
}

const Boletim = ({token, periodo}) => {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('Montou boletim')
    getBoletim(periodo)
      .then(
        (result) => {
          console.log(result);
          setItems(result.data);
        },
        _ => {}
      )
  }, [periodo])

  return (
    token && items ?
      <Container>
        <Card.Group centered style={{marginTop: 5}} itemsPerRow={3}>
          {items.map(d => <CardDisciplina disciplina={d} />)}
        </Card.Group>
      </Container>
    :
      <h1>Deslogado!</h1>
  )


}

const CardDisciplina = ({disciplina}) => (
  <Card>
    <Card.Content header={disciplina.disciplina.replace(/^SUP\.\d{4}\s-\s/g, '')} />
    <Card.Content description>
      {disciplina.nota_etapa_1.nota && ('Nota final: ' + disciplina.nota_etapa_1.nota.toFixed(2))}
    </Card.Content>
    <Card.Content extra>
      <Label title='Carga Horaria'><Icon name='clock' /> {disciplina.carga_horaria}h</Label>
      <Label title='Faltas'><Icon name='ban' /> {disciplina.numero_faltas}</Label>
    </Card.Content>
  </Card>
);

const Login = ({token, setToken}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [detail, setDetail] = useState('');

  const onSubmit = async(e) => {
    e.preventDefault();
    let [data] = await authSuap({username, password}, setToken);
    setDetail(data?.detail);
  }

  return (
    token ? <Redirect to='/'/> :
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450, margin: 5}}>
        <Form onSubmit={onSubmit} error={detail}>
          <Segment raised>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Nome de usuário'
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Message error header='Erro ao realizar login' content={detail}/>
            <Button color='black' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default App;

