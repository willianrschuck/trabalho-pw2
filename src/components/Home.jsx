import { Link } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";

export default ({tarefas, remover, token}) => {
    return (
        <Table>
            <Table.Header>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Descrição</Table.HeaderCell>
                {token && <Table.HeaderCell></Table.HeaderCell>}
                {token && <Table.HeaderCell></Table.HeaderCell>}
            </Table.Header>
            {tarefas && tarefas.map((tarefa) => {
                const {id, nome, descricao} = tarefa;
                return (
                    <Table.Body>
                        <Table.Cell>{id}</Table.Cell>
                        <Table.Cell>{nome}</Table.Cell>
                        <Table.Cell>{descricao}</Table.Cell>
                        {token && <Table.Cell width='1'><Button as={Link} to={`/tarefa/editar/${id}`} icon='pencil'></Button></Table.Cell>}
                        {token && <Table.Cell width='1'><Button onClick={() => remover(tarefa)} icon='trash'></Button></Table.Cell>}
                    </Table.Body>
                )
            })}
        </Table>
    );
}