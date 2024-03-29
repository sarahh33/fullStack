import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Navbar, Nav, Tab } from 'react-bootstrap'
import { Alert } from '@material-ui/lab'
import {
    Toolbar,IconButton,
    AppBar,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper, TextField
} from '@material-ui/core'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useHistory, useRouteMatch
} from "react-router-dom"

const Home = () => (
    <div> <h2>TKTL notes app</h2>  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
)

const Note = ({ notes }) => {
    const id = useParams().id
    const note = notes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'tärkeä' : ''}</strong></div>
        </div>
    )
}
const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <TableContainer component={Paper}>
            <Table striped>
                <TableBody>
                    {notes.map(note =>
                        <TableRow key={note.id}>
                            <TableCell>
                                <Link to={`/notes/${note.id}`}>{note.content}</Link>
                            </TableCell>
                            <TableCell>{note.user}</TableCell>
                        </TableRow>)}
                </TableBody></Table></TableContainer>
    </div>
)

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)
const Login = (props) => {
    const history = useHistory()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        //call path '/'
        history.push('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField label="username" />
                </div>

                <div>                    <TextField type="password"
                    label="password"
                /></div>
                <Button variant="contained" color="primary" type="submit">login</Button>
            </form>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only Javascript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])
    const [message, setMessgae] = useState(null)

    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
        setMessgae(`welcome ${user}`)
        setTimeout(() => {
            setMessgae(null)
        }, 10000)
    }

    const padding = {
        padding: 5
    }

    const match = useRouteMatch('/notes/:id')
    const note = match
        ? notes.find(note => note.id === Number(match.params.id))
        : null

    return (<Container>
        {(message &&
            <Alert variant="success">
                {message}
            </Alert>
        )}
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>

                <Button color="inherit">
                    <Link to="/">home</Link></Button>
                <Button color="inherit">
                    <Link to="/notes">notes</Link></Button>
                <Button color="inherit">
                    <Link style={padding} to="/users">users</Link>
                </Button>
                <Button color="inherit">{user
                    ? <em>{user} logged in</em>
                    : <Link to='/login' >login</Link>
                }</Button>

            </Toolbar></AppBar>
        <Switch>
            <Route path="/notes/:id">
                <Note notes={notes} />
            </Route><Route path="/notes"><Notes notes={notes} /></Route>
            <Route path="/users">
                {user ? <Users /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
                <Login onLogin={login} />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
        <div>
            <br />
            <em>Note app, Department of Computer Science 2021</em>

        </div></Container>


    )
}


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))
