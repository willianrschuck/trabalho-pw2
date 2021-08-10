import { useEffect, useState } from "react";
import { Card, Container, Icon } from 'semantic-ui-react'
import { getTurmas } from "../api/suap";
import ModalTurma from "./ModalTurma";

const Turmas = ({token, periodo}) => {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTurmas(periodo)
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
        <Card.Group centered stackable style={{marginTop: 5}} itemsPerRow={3}>
        {items.map(d => <CardTurma turma={d} token={token}/>)}
        </Card.Group>
      </Container>
    :
      <h1>Deslogado!</h1>
  )

}

const CardTurma = ({turma, token}) => (
  <Card>
    <Card.Content header={turma.descricao} />
    <Card.Content extra>
      {turma.locais_de_aula && turma.locais_de_aula.map(l => <> <Icon name='map marker alternate'/> {l}</>)}
    </Card.Content>
    <Card.Content extra>
      {turma.horarios_de_aula && <><Icon name='clock'/> {'Horários: ' + turma.horarios_de_aula}</>}
    </Card.Content>
    <Card.Content extra>
      <ModalTurma turma={turma} token={token}/>
    </Card.Content>
  </Card>
);

export default Turmas;