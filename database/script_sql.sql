create database db_controle_jogos_bb;
use db_controle_jogos_bb;

create table tbl_jogo(
	 id int not null primary key auto_increment,
	 id_faixa_etaria int not null,
     nome varchar(80) not null,
     data_lancamento date not null,
     tamanho varchar(10),
     descricao text,
     foto_capa varchar(200),
     link varchar(200)
);
CREATE TABLE tbl_usuarios(
		id_usuarios int not null primary key auto_increment,
		nome VARCHAR(85) not null,
		email VARCHAR(45) not null,
		senha VARCHAR(25) not null
);

CREATE TABLE tbl_genero(
		id_genero int not null primary key auto_increment,
		nome VARCHAR(85),
		genero_descricao text
);

CREATE TABLE tbl_desenvolvedores(
        id_desenvolvedores int not null primary key auto_increment,
		data_fabricado DATE,
		pais VARCHAR(45)
);

CREATE TABLE tbl_faixa_etaria(
		id_faixa_etaria int not null primary key auto_increment,
		categoria VARCHAR(45),
		descricao text
);

CREATE TABLE tbl_plataforma(
		id_plataforma int not null primary key auto_increment,
		nome_plataforma VARCHAR(85),
		destinatario VARCHAR(85)
);
CREATE TABLE tbl_versao (
    id_versao INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo_versao VARCHAR(45)
);

show tables;
desc tbl_jogo;
select * from tbl_jogo;