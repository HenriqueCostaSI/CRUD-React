import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    name: '',
    email: ''
}

const UserCrud = () => {
    const [user, setUser] = useState(initialState)
    const [list, setList] = useState([])

    useEffect(() => {
        axios(baseUrl).then(resp => {
            setList(resp.data)
        })
    }, [])

    const clear = () => {
        setUser(initialState)
    }

    const save = () => {
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        
        axios[method](url, user)
            .then(resp => {
                const updatedList = getUpdatedList(resp.data)
                setList(updatedList)
                setUser(initialState)
            })
    }

    const 
    getUpdatedList = (user, add = true) => {
        const filteredList = list.filter(u => u.id !== user.id)
        if(add) return [user, ...filteredList]
        return filteredList
    }

    const updateField = (event) => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const load = (user) => {
        setUser(user)
    }

    const remove = (user) => {
        axios.delete(`${baseUrl}/${user.id}`).then(() => {
            const updatedList = getUpdatedList(user, false)
            setList(updatedList)
        })
    }

    const renderForm = () => {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                value={user.name}
                                onChange={updateField}
                                placeholder="Digite o nome..." 
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={updateField}
                                placeholder="Digite o e-mail..." 
                            />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button 
                            className="btn btn-primary"
                            onClick={save}>
                            Salvar
                        </button>

                        <button 
                            className="btn btn-secondary ml-2"
                            onClick={clear}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const renderTable = () => {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    const renderRows = () => {
        return list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button 
                            className="btn btn-warning"
                            onClick={() => load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button 
                            className="btn btn-danger ml-2"
                            onClick={() => remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Main {...headerProps}>
            {renderForm()}
            {renderTable()}
        </Main>
    )
}

export default UserCrud