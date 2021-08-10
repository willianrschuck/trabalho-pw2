import { useEffect, useState } from "react";
import { Button, Dimmer, Grid, Header, Icon, Image, Loader, Modal, Placeholder, Segment } from "semantic-ui-react";
import { getTurma } from '../api/suap';

const ModalTurma = ({turma, token}) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)

    const abrir = () => {
      setOpen(true);
        getTurma(turma.id).then(
          (result) => {
            console.log(result);
            setData(result.data);
          },
          _ => {}
        );
    }

    useEffect(() => {
      setData(null);
    }, [turma])

    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => abrir()}
        open={open}
        trigger={<Button fluid>Exibir detalhes</Button>}
      >
        {data ?
          <>
            <Modal.Header>{turma.descricao}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Professores</Header>
                <Grid divided>
                  {data.professores.map(p => (<>
                    <Grid.Column width={3} verticalAlign='middle'>
                      <Image src={`https://suap.ifsul.edu.br/${p.foto}`} style={{width: 100, height: 100}} rounded centered/>
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <Header size='medium'>{p.nome}</Header>
                      <p>{p.email}</p>
                    </Grid.Column>
                  </>))}
                </Grid>
                {data.participantes && data.participantes.map(p => <Aluno {...p}/>)}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </Modal.Actions>
          </>
          :
          <>
            <Segment>
              <Dimmer active inverted>
                <Loader inverted/>
              </Dimmer>

              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
          </>
        }
      </Modal>
    );

}

const Aluno = ({nome, foto, matricula, email}) => (
  <Grid divided>
      <Grid.Column width={3} verticalAlign='middle'>
        <Image src={`https://suap.ifsul.edu.br/${foto}`} style={{width: 100, height: 100}} rounded centered/>
      </Grid.Column>
      <Grid.Column width={9}>
        <Header size='medium'>{nome}</Header>
        <p><Icon name='mail' />{email}</p>
        <p>{matricula}</p>
      </Grid.Column>
  </Grid>
);

export default ModalTurma;