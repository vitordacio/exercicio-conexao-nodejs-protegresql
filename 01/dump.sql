create database biblioteca;

create table autores (
	id serial primary key,
	nome text not null,
	idade int
);

create table livros (
  id serial primary key,
  nome text not null,
  genero text,
  editora text,
  data_publicacao date,
  autor_id int references autores(id)
);


insert into autores (nome, idade) values ($1, $2);

select a.id, a.nome, a.idade, l.id as livro_id, l.nome as livro_nome, l.genero, l.editora, l.data_publicacao 
from autores a join livros l on a.id = l.autor_id and a.id=$1;

insert into livros (nome, genero, editora, data_publicacao, autor_id) values ($1, $2, $3, $4, $5);

select l.id, l.nome, l.genero, l.editora, l.data_publicacao, a.id as autor_id, a.nome as autor_nome, a.idade
from livros l join autores a on l.autor_id = a.id and a.id = $1;

select l.id, l.nome, l.genero, l.editora, l.data_publicacao, a.id as autor_id, a.nome as autor_nome, a.idade
from livros l join autores a on l.autor_id = a.id;












