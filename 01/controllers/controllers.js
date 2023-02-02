const { pool } = require("../connection/connection")


const cadastrarAutor = async (req, res) => {
    const { nome, idade } = req.body;

    if (!nome) {
        return res.status(402).json({
            mensagem: "o campo nome é obrigatório."
        })
    }

    try {
        const query = 'insert into autores (nome, idade) values ($1, $2);'
        await pool.query(query, [nome, idade])
        const result = await pool.query('select * from autores')
        const author = result.rows.slice(-1)

        return res.json(author)
    } catch (error) {
        console.log(error)
    }
}

const buscarAutor = async (req, res) => {
    const { id } = req.params

    try {
        const query = `select a.id, a.nome, a.idade,
         l.id as livro_id, l.nome as livro_nome, l.genero, l.editora, l.data_publicacao 
        from autores a join livros l on
         a.id = l.autor_id and a.id=$1;`
        const result = await pool.query(query, [id])

        if (!result.rowCount) {
            return res.status(402).json({
                mensagem: "livro não encontrado"
            })
        }

        const { rows } = result
        const user = {
            id: rows[0].id,
            nome: rows[0].nome,
            idade: rows[0].idade,
            livros: rows.map((book) => {
                return {
                    id: book.livro_id,
                    nome: book.livro_nome,
                    genero: book.genero,
                    editora: book.editora,
                    data_publicacao: book.data_publicacao
                }
            })
        }

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const adicionarLivro = async (req, res) => {
    const { id } = req.params
    const { nome, genero, editora, data_publicacao } = req.body

    if (!nome) {
        return res.status(402).json({ mensagem: "o campo nome é obrigatório." })
    }

    try {
        const query = 'insert into livros (nome, genero, editora, data_publicacao, autor_id) values ($1, $2, $3, $4, $5)'
        await pool.query(query, [nome, genero, editora, data_publicacao, id])
        const result = await pool.query('select * from livros')
        const book = result.rows.slice(-1)

        return res.json(book)
    } catch (error) {
        console.log(error)
    }
}

const buscarLivro = async (req, res) => {
    const { id } = req.params
    try {
        const query = `select l.id, l.nome, l.genero, l.editora, l.data_publicacao,
         a.id as autor_id, a.nome as autor_nome, a.idade
        from livros l join autores a on
         l.autor_id = a.id and a.id = $1;`
        const result = await pool.query(query, [id])

        if (!result.rowCount) {
            return res.json(result.rows)
        }

        const { rows } = result
        const book = rows.map((book) => {
            return {
                id: book.id,
                nome: book.nome,
                genero: book.genero,
                editora: book.editora,
                data_publicacao: book.data_publicacao,
                autor: {
                    id: book.autor_id,
                    nome: book.autor_nome,
                    idade: book.idade
                }
            }
        })

        return res.json(book)
    } catch (error) {
        console.log(error)
    }

}

const buscarLivros = async (req, res) => {
    try {
        const query = `select l.id, l.nome, l.genero, l.editora, l.data_publicacao,
        a.id as autor_id, a.nome as autor_nome, a.idade
       from livros l join autores a on
        l.autor_id = a.id`
        const result = await pool.query(query)
        const { rows } = result
        const book = rows.map((book) => {
            return {
                id: book.id,
                nome: book.nome,
                genero: book.genero,
                editora: book.editora,
                data_publicacao: book.data_publicacao,
                autor: {
                    id: book.autor_id,
                    nome: book.autor_nome,
                    idade: book.idade
                }
            }
        })
        return res.json(book)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    cadastrarAutor,
    buscarAutor,
    adicionarLivro,
    buscarLivro,
    buscarLivros
}