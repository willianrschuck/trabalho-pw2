import { useState } from "react";
import { Button, Form, Input, Label } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

export default ({tarefa, inserir, editar, token}) => {

    const [item, setItem] = useState(tarefa);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setItem({...item, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setShouldRedirect(true);

        if (inserir) {
            inserir(item);
        } else {
            editar(item);
        }

    }

    return (
        shouldRedirect || !token ? <Redirect to='/'/> :
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Id</label>
                <Input value={item.id} name='id' disabled />
            </Form.Field>
            <Form.Input label='Nome' value={item.nome} name='nome' onChange={handleChange}/>
            <Form.Input label='Descricao' value={item.descricao} name='descricao' onChange={handleChange}/>
            <Button type='submit'>Salvar</Button>
        </Form>
    );
}