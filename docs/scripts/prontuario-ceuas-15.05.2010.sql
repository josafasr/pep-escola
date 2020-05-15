-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: Josafá Santos dos Reis


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: prontuario_ceuas | type: DATABASE --
-- -- DROP DATABASE IF EXISTS prontuario_ceuas;
-- CREATE DATABASE prontuario_ceuas
-- 	ENCODING = 'UTF8'
-- 	LC_COLLATE = 'pt_BR.UTF-8'
-- 	LC_CTYPE = 'pt_BR.UTF-8'
-- 	TABLESPACE = pg_default
-- 	OWNER = postgres;
-- -- ddl-end --
-- 

-- object: dados_gerais | type: SCHEMA --
-- DROP SCHEMA IF EXISTS dados_gerais CASCADE;
CREATE SCHEMA dados_gerais;
-- ddl-end --
-- ALTER SCHEMA dados_gerais OWNER TO postgres;
-- ddl-end --

-- object: ceuas | type: SCHEMA --
-- DROP SCHEMA IF EXISTS ceuas CASCADE;
CREATE SCHEMA ceuas;
-- ddl-end --
-- ALTER SCHEMA ceuas OWNER TO postgres;
-- ddl-end --

-- object: seguranca | type: SCHEMA --
-- DROP SCHEMA IF EXISTS seguranca CASCADE;
CREATE SCHEMA seguranca;
-- ddl-end --
-- ALTER SCHEMA seguranca OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,dados_gerais,ceuas,seguranca;
-- ddl-end --

-- object: dados_gerais.pessoa_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.pessoa_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.pessoa_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.pessoa_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.sexo | type: TYPE --
-- DROP TYPE IF EXISTS dados_gerais.sexo CASCADE;
CREATE TYPE dados_gerais.sexo AS
 ENUM ('Feminino','Masculino');
-- ddl-end --
-- ALTER TYPE dados_gerais.sexo OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.endereco_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.endereco_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.endereco_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.endereco_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.endereco | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.endereco CASCADE;
CREATE TABLE dados_gerais.endereco (
	id integer NOT NULL DEFAULT nextval('dados_gerais.endereco_id_seq'::regclass),
	logradouro character varying NOT NULL,
	numero integer,
	bairro character varying,
	complemento character varying,
	cep character varying(8),
	tipo_logradouro_id smallint,
	cidade_id integer,
	ativo boolean NOT NULL DEFAULT true,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT endereco_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.endereco OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.pais_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.pais_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.pais_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.estado_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.estado_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.estado_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.cidade_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.cidade_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.cidade_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.cidade_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.cidade | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.cidade CASCADE;
CREATE TABLE dados_gerais.cidade (
	id integer NOT NULL DEFAULT nextval('dados_gerais.cidade_id_seq'::regclass),
	nome character varying NOT NULL,
	codigo_ibge character varying,
	estado_id smallint,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT cidade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.cidade OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.estado_civil_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.estado_civil_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.estado_civil_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.religiao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.religiao_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.religiao_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.cor_pele_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.cor_pele_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.cor_pele_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.escolaridade_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.escolaridade_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.escolaridade_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.profissao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.profissao_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.profissao_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.situacao_profissional_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.situacao_profissional_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.situacao_profissional_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: dados_gerais.tipo_logradouro_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.tipo_logradouro_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.tipo_logradouro_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: ceuas.paciente_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.paciente_id_seq CASCADE;
CREATE SEQUENCE ceuas.paciente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.paciente_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.paciente | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.paciente CASCADE;
CREATE TABLE ceuas.paciente (
	id integer NOT NULL DEFAULT nextval('ceuas.paciente_id_seq'::regclass),
	rg character varying,
	cpf character varying,
	cartao_familia character varying,
	cns character varying,
	agente_comunitario character varying,
	encaminhado_por character varying,
	pessoa_id integer NOT NULL,
	unidade_saude_id integer,
	nacionalidade_id smallint,
	naturalidade_id integer,
	estado_civil_id smallint,
	religiao_id smallint,
	cor_pele_id smallint,
	escolaridade_id smallint,
	profissao_id smallint,
	situacao_profissional_id smallint,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT paciente_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN ceuas.paciente.nacionalidade_id IS E'pais_id';
-- ddl-end --
COMMENT ON COLUMN ceuas.paciente.naturalidade_id IS E'cidade_id';
-- ddl-end --
-- ALTER TABLE ceuas.paciente OWNER TO postgres;
-- ddl-end --

-- object: ceuas.unidade_saude_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.unidade_saude_id_seq CASCADE;
CREATE SEQUENCE ceuas.unidade_saude_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.unidade_saude_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.unidade_saude | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.unidade_saude CASCADE;
CREATE TABLE ceuas.unidade_saude (
	id integer NOT NULL DEFAULT nextval('ceuas.unidade_saude_id_seq'::regclass),
	nome character varying NOT NULL,
	cnes character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT unidade_saude_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.unidade_saude OWNER TO postgres;
-- ddl-end --

-- object: ceuas.consulta_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.consulta_id_seq CASCADE;
CREATE SEQUENCE ceuas.consulta_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.consulta_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.consulta | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.consulta CASCADE;
CREATE TABLE ceuas.consulta (
	id bigint NOT NULL DEFAULT nextval('ceuas.consulta_id_seq'::regclass),
	acompanhante character varying,
	queixa_principal_obs text,
	historia_doenca_atual text,
	paciente_id bigint NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT consulta_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.consulta OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_queixa | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.tipo_queixa CASCADE;
CREATE TABLE ceuas.tipo_queixa (
	id smallserial NOT NULL,
	nome character varying NOT NULL,
	descricao character varying,
	CONSTRAINT tipo_queixa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.tipo_queixa OWNER TO postgres;
-- ddl-end --

-- object: ceuas.queixa | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.queixa CASCADE;
CREATE TABLE ceuas.queixa (
	id serial NOT NULL,
	nome character varying NOT NULL,
	tipo_queixa_id integer NOT NULL,
	CONSTRAINT queixa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.queixa OWNER TO postgres;
-- ddl-end --

-- object: ceuas.consulta_queixa | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.consulta_queixa CASCADE;
CREATE TABLE ceuas.consulta_queixa (
	consulta_id bigserial NOT NULL,
	queixa_id integer NOT NULL,
	principal boolean DEFAULT false,
	CONSTRAINT consulta_queixa_pk PRIMARY KEY (consulta_id,queixa_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.consulta_queixa OWNER TO postgres;
-- ddl-end --

-- object: ceuas.recordatorio_alimentar_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.recordatorio_alimentar_id_seq CASCADE;
CREATE SEQUENCE ceuas.recordatorio_alimentar_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.recordatorio_alimentar_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.recordatorio_aliementar | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.recordatorio_aliementar CASCADE;
CREATE TABLE ceuas.recordatorio_aliementar (
	id bigint NOT NULL DEFAULT nextval('ceuas.recordatorio_alimentar_id_seq'::regclass),
	quantidade smallint,
	tipo_refeicao_id smallint,
	alimento_id bigint,
	consulta_id bigint,
	CONSTRAINT recordatorio_aliementar_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.recordatorio_aliementar OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_refeicao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.tipo_refeicao_id_seq CASCADE;
CREATE SEQUENCE ceuas.tipo_refeicao_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.tipo_refeicao_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.alimento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.alimento CASCADE;
CREATE TABLE ceuas.alimento (
	id bigserial NOT NULL,
	nome character varying NOT NULL,
	CONSTRAINT alimento_fk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.alimento OWNER TO postgres;
-- ddl-end --

-- object: seguranca.usuario_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS seguranca.usuario_id_seq CASCADE;
CREATE SEQUENCE seguranca.usuario_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: seguranca.grupo_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS seguranca.grupo_id_seq CASCADE;
CREATE SEQUENCE seguranca.grupo_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: seguranca.permissao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS seguranca.permissao_id_seq CASCADE;
CREATE SEQUENCE seguranca.permissao_id_seq
	INCREMENT BY 1
	MINVALUE -32768
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --

-- object: seguranca.usuario_grupo | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.usuario_grupo CASCADE;
CREATE TABLE seguranca.usuario_grupo (
	usuario_id smallint NOT NULL,
	grupo_id smallint NOT NULL,
	CONSTRAINT usuario_grupo_pk PRIMARY KEY (usuario_id,grupo_id)

);
-- ddl-end --
-- ALTER TABLE seguranca.usuario_grupo OWNER TO postgres;
-- ddl-end --

-- object: seguranca.grupo_permissao | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.grupo_permissao CASCADE;
CREATE TABLE seguranca.grupo_permissao (
	grupo_id smallint NOT NULL,
	permissao_id smallint NOT NULL,
	CONSTRAINT grupo_permissao_pk PRIMARY KEY (grupo_id,permissao_id)

);
-- ddl-end --
-- ALTER TABLE seguranca.grupo_permissao OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.pais | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.pais CASCADE;
CREATE TABLE dados_gerais.pais (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.pais_id_seq'::regclass),
	nome character varying NOT NULL,
	sigla character varying(3),
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT pais_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.pais OWNER TO postgres;
-- ddl-end --

-- object: seguranca.usuario | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.usuario CASCADE;
CREATE TABLE seguranca.usuario (
	id smallint NOT NULL DEFAULT nextval('seguranca.usuario_id_seq'::regclass),
	nome character varying NOT NULL,
	hash_senha character varying NOT NULL,
	pessoa_id bigint NOT NULL,
	created_at timestamptz,
	updated_at smallint,
	CONSTRAINT usuario_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE seguranca.usuario OWNER TO postgres;
-- ddl-end --

-- object: seguranca.permissao | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.permissao CASCADE;
CREATE TABLE seguranca.permissao (
	id smallint NOT NULL DEFAULT nextval('seguranca.permissao_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	created_at timestamptz,
	updated_at timestamptz,
	CONSTRAINT permissao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE seguranca.permissao OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.estado_civil | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.estado_civil CASCADE;
CREATE TABLE dados_gerais.estado_civil (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.estado_civil_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT estado_civil_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.estado_civil OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.religiao | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.religiao CASCADE;
CREATE TABLE dados_gerais.religiao (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.religiao_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT religiao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.religiao OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.cor_pele | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.cor_pele CASCADE;
CREATE TABLE dados_gerais.cor_pele (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.cor_pele_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT cor_pele_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.cor_pele OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.escolaridade | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.escolaridade CASCADE;
CREATE TABLE dados_gerais.escolaridade (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.escolaridade_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT escolaridade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.escolaridade OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.situacao_profissional | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.situacao_profissional CASCADE;
CREATE TABLE dados_gerais.situacao_profissional (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.situacao_profissional_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT situacao_profissional_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.situacao_profissional OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.profissao | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.profissao CASCADE;
CREATE TABLE dados_gerais.profissao (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.profissao_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT profissao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.profissao OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.contato | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.contato CASCADE;
CREATE TABLE dados_gerais.contato (
	id bigserial NOT NULL,
	celular character varying,
	telefone character varying,
	email character varying,
	home_page character varying,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT contato_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.contato OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.pessoa_endereco | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.pessoa_endereco CASCADE;
CREATE TABLE dados_gerais.pessoa_endereco (
	pessoa_id bigint NOT NULL,
	endereco_id bigint NOT NULL,
	CONSTRAINT pessoa_endereco_pk PRIMARY KEY (pessoa_id,endereco_id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.pessoa_endereco OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.tipo_logradouro | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.tipo_logradouro CASCADE;
CREATE TABLE dados_gerais.tipo_logradouro (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.tipo_logradouro_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT tipo_logradouro_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.tipo_logradouro OWNER TO postgres;
-- ddl-end --

-- object: seguranca.grupo | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.grupo CASCADE;
CREATE TABLE seguranca.grupo (
	id smallint NOT NULL DEFAULT nextval('seguranca.grupo_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	created_at timestamptz,
	updated_at timestamptz,
	CONSTRAINT grupo_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE seguranca.grupo OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.estado | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.estado CASCADE;
CREATE TABLE dados_gerais.estado (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.estado_id_seq'::regclass),
	nome character varying NOT NULL,
	sigla character varying(2),
	pais_id smallint,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT estado_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.estado OWNER TO postgres;
-- ddl-end --

-- object: ceuas.status_agendamento | type: TYPE --
-- DROP TYPE IF EXISTS ceuas.status_agendamento CASCADE;
CREATE TYPE ceuas.status_agendamento AS
 ENUM ('ausente','falta','em atendimento','atendido');
-- ddl-end --
-- ALTER TYPE ceuas.status_agendamento OWNER TO postgres;
-- ddl-end --

-- object: ceuas.especialidade | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.especialidade CASCADE;
CREATE TABLE ceuas.especialidade (
	id smallserial NOT NULL,
	nome character varying NOT NULL,
	descricao text,
	CONSTRAINT especialidade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.especialidade OWNER TO postgres;
-- ddl-end --

-- object: ceuas.paciente_especialidade | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.paciente_especialidade CASCADE;
CREATE TABLE ceuas.paciente_especialidade (
	paciente_id bigint NOT NULL,
	especialidade_id smallint NOT NULL,
	CONSTRAINT paciente_especialidade_pk PRIMARY KEY (paciente_id,especialidade_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.paciente_especialidade OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.pessoa | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.pessoa CASCADE;
CREATE TABLE dados_gerais.pessoa (
	id bigint NOT NULL DEFAULT nextval('dados_gerais.pessoa_id_seq'::regclass),
	nome character varying NOT NULL,
	data_nascimento date,
	sexo dados_gerais.sexo,
	contato_id bigserial,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT pessoa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.pessoa OWNER TO postgres;
-- ddl-end --

-- object: ceuas.agendamento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.agendamento CASCADE;
CREATE TABLE ceuas.agendamento (
	id bigserial NOT NULL,
	insercao boolean,
	retorno boolean,
	ambulatorio character varying,
	data_horario timestamp,
	confirmado boolean,
	status ceuas.status_agendamento,
	cancelado boolean DEFAULT false,
	paciente_id bigint,
	usuario_id smallint,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT agendamento_pk PRIMARY KEY (id)

);
-- ddl-end --
COMMENT ON COLUMN ceuas.agendamento.ambulatorio IS E'Professor Responsável';
-- ddl-end --
-- ALTER TABLE ceuas.agendamento OWNER TO postgres;
-- ddl-end --

-- object: ceuas.alteracao_agendamento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.alteracao_agendamento CASCADE;
CREATE TABLE ceuas.alteracao_agendamento (
	id bigserial NOT NULL,
	data_hora_anterior timestamptz,
	data_hora_proxima timestamptz,
	motivo text,
	agendamento_id bigint,
	usuario_id smallint,
	created_at timestamptz,
	updated_at timestamptz,
	CONSTRAINT alteracao_agendamento_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.alteracao_agendamento OWNER TO postgres;
-- ddl-end --

-- object: ceuas.responsavel_consulta | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.responsavel_consulta CASCADE;
CREATE TABLE ceuas.responsavel_consulta (
	usuario_id smallint NOT NULL,
	avaliacao_atendimento_id bigint NOT NULL,
	CONSTRAINT responsavel_consulta_pk PRIMARY KEY (usuario_id,avaliacao_atendimento_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.responsavel_consulta OWNER TO postgres;
-- ddl-end --

-- object: ceuas.avaliacao_atendimento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.avaliacao_atendimento CASCADE;
CREATE TABLE ceuas.avaliacao_atendimento (
	id bigserial NOT NULL,
	nota decimal,
	usuario_id bigint,
	consulta_id bigint,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT avaliacao_atendimento_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.avaliacao_atendimento OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_refeicao | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.tipo_refeicao CASCADE;
CREATE TABLE ceuas.tipo_refeicao (
	id smallint NOT NULL DEFAULT nextval('ceuas.tipo_refeicao_id_seq'::regclass),
	nome character varying NOT NULL,
	CONSTRAINT tipo_refeicao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.tipo_refeicao OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_patologia | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.tipo_patologia CASCADE;
CREATE TABLE ceuas.tipo_patologia (
	id smallserial NOT NULL,
	nome character varying NOT NULL,
	descricao text,
	CONSTRAINT tipo_patologia_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.tipo_patologia OWNER TO postgres;
-- ddl-end --

-- object: ceuas.patologia | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.patologia CASCADE;
CREATE TABLE ceuas.patologia (
	id serial NOT NULL,
	nome character varying NOT NULL,
	descricao text,
	tipo_patologia_id smallint NOT NULL,
	CONSTRAINT patologia_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.patologia OWNER TO postgres;
-- ddl-end --

-- object: ceuas.antecedente_patologico | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.antecedente_patologico CASCADE;
CREATE TABLE ceuas.antecedente_patologico (
	consulta_id bigserial NOT NULL,
	patologia_id integer NOT NULL,
	idade_diagnostico int2,
	observacao text,
	CONSTRAINT consulta_antecedente_patologico_pk PRIMARY KEY (consulta_id,patologia_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.antecedente_patologico OWNER TO postgres;
-- ddl-end --

-- object: ceuas.apresentacao_medicamento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.apresentacao_medicamento CASCADE;
CREATE TABLE ceuas.apresentacao_medicamento (
	id smallserial NOT NULL,
	nome character varying NOT NULL,
	CONSTRAINT apresentacao_medicamento_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.apresentacao_medicamento OWNER TO postgres;
-- ddl-end --

-- object: ceuas.medicamento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.medicamento CASCADE;
CREATE TABLE ceuas.medicamento (
	id bigserial NOT NULL,
	nome character varying NOT NULL,
	apresentacao_medicamento_id smallint NOT NULL,
	CONSTRAINT medicamento_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.medicamento OWNER TO postgres;
-- ddl-end --

-- object: ceuas.medicamento_uso | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.medicamento_uso CASCADE;
CREATE TABLE ceuas.medicamento_uso (
	consulta_id bigint NOT NULL,
	medicamento_id bigint NOT NULL,
	possologia smallint,
	CONSTRAINT medicamento_uso_pk PRIMARY KEY (consulta_id,medicamento_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.medicamento_uso OWNER TO postgres;
-- ddl-end --

-- object: endereco_cidade_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.endereco DROP CONSTRAINT IF EXISTS endereco_cidade_fk CASCADE;
ALTER TABLE dados_gerais.endereco ADD CONSTRAINT endereco_cidade_fk FOREIGN KEY (cidade_id)
REFERENCES dados_gerais.cidade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: endereco_tipo_logradouro_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.endereco DROP CONSTRAINT IF EXISTS endereco_tipo_logradouro_fk CASCADE;
ALTER TABLE dados_gerais.endereco ADD CONSTRAINT endereco_tipo_logradouro_fk FOREIGN KEY (tipo_logradouro_id)
REFERENCES dados_gerais.tipo_logradouro (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: cidade_fkey | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.cidade DROP CONSTRAINT IF EXISTS cidade_fkey CASCADE;
ALTER TABLE dados_gerais.cidade ADD CONSTRAINT cidade_fkey FOREIGN KEY (estado_id)
REFERENCES dados_gerais.estado (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: paciente_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_pessoa_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES dados_gerais.pessoa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_unidade_saude_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_unidade_saude_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_unidade_saude_fk FOREIGN KEY (unidade_saude_id)
REFERENCES ceuas.unidade_saude (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_estado_civil_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_estado_civil_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_estado_civil_fk FOREIGN KEY (estado_civil_id)
REFERENCES dados_gerais.estado_civil (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_religiao_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_religiao_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_religiao_fk FOREIGN KEY (religiao_id)
REFERENCES dados_gerais.religiao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_cor_pele_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_cor_pele_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_cor_pele_fk FOREIGN KEY (cor_pele_id)
REFERENCES dados_gerais.cor_pele (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_escolaridade_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_escolaridade_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_escolaridade_fk FOREIGN KEY (escolaridade_id)
REFERENCES dados_gerais.escolaridade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_situacao_profissional_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_situacao_profissional_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_situacao_profissional_fk FOREIGN KEY (situacao_profissional_id)
REFERENCES dados_gerais.situacao_profissional (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_profissao_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_profissao_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_profissao_fk FOREIGN KEY (profissao_id)
REFERENCES dados_gerais.profissao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_pais_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_pais_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_pais_fk FOREIGN KEY (nacionalidade_id)
REFERENCES dados_gerais.pais (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_cidade_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_cidade_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_cidade_fk FOREIGN KEY (naturalidade_id)
REFERENCES dados_gerais.cidade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_paciente_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.consulta DROP CONSTRAINT IF EXISTS consulta_paciente_fk CASCADE;
ALTER TABLE ceuas.consulta ADD CONSTRAINT consulta_paciente_fk FOREIGN KEY (paciente_id)
REFERENCES ceuas.paciente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: queixa_tipo_queixa_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.queixa DROP CONSTRAINT IF EXISTS queixa_tipo_queixa_fk CASCADE;
ALTER TABLE ceuas.queixa ADD CONSTRAINT queixa_tipo_queixa_fk FOREIGN KEY (tipo_queixa_id)
REFERENCES ceuas.tipo_queixa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_queixa_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.consulta_queixa DROP CONSTRAINT IF EXISTS consulta_queixa_consulta_fk CASCADE;
ALTER TABLE ceuas.consulta_queixa ADD CONSTRAINT consulta_queixa_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_queixa_queixa_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.consulta_queixa DROP CONSTRAINT IF EXISTS consulta_queixa_queixa_fk CASCADE;
ALTER TABLE ceuas.consulta_queixa ADD CONSTRAINT consulta_queixa_queixa_fk FOREIGN KEY (queixa_id)
REFERENCES ceuas.queixa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_alimentar_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.recordatorio_aliementar DROP CONSTRAINT IF EXISTS recordatorio_alimentar_consulta_fk CASCADE;
ALTER TABLE ceuas.recordatorio_aliementar ADD CONSTRAINT recordatorio_alimentar_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_alimentar_tipo_refeicao_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.recordatorio_aliementar DROP CONSTRAINT IF EXISTS recordatorio_alimentar_tipo_refeicao_fk CASCADE;
ALTER TABLE ceuas.recordatorio_aliementar ADD CONSTRAINT recordatorio_alimentar_tipo_refeicao_fk FOREIGN KEY (tipo_refeicao_id)
REFERENCES ceuas.tipo_refeicao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_alimentar_alimento_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.recordatorio_aliementar DROP CONSTRAINT IF EXISTS recordatorio_alimentar_alimento_fk CASCADE;
ALTER TABLE ceuas.recordatorio_aliementar ADD CONSTRAINT recordatorio_alimentar_alimento_fk FOREIGN KEY (alimento_id)
REFERENCES ceuas.alimento (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_grupo_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE seguranca.usuario_grupo DROP CONSTRAINT IF EXISTS usuario_grupo_usuario_fk CASCADE;
ALTER TABLE seguranca.usuario_grupo ADD CONSTRAINT usuario_grupo_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_grupo_grupo_fk | type: CONSTRAINT --
-- ALTER TABLE seguranca.usuario_grupo DROP CONSTRAINT IF EXISTS usuario_grupo_grupo_fk CASCADE;
ALTER TABLE seguranca.usuario_grupo ADD CONSTRAINT usuario_grupo_grupo_fk FOREIGN KEY (grupo_id)
REFERENCES seguranca.grupo (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: grupo_permissao_grupo_fk | type: CONSTRAINT --
-- ALTER TABLE seguranca.grupo_permissao DROP CONSTRAINT IF EXISTS grupo_permissao_grupo_fk CASCADE;
ALTER TABLE seguranca.grupo_permissao ADD CONSTRAINT grupo_permissao_grupo_fk FOREIGN KEY (grupo_id)
REFERENCES seguranca.grupo (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: grupo_permissao_permissao_fk | type: CONSTRAINT --
-- ALTER TABLE seguranca.grupo_permissao DROP CONSTRAINT IF EXISTS grupo_permissao_permissao_fk CASCADE;
ALTER TABLE seguranca.grupo_permissao ADD CONSTRAINT grupo_permissao_permissao_fk FOREIGN KEY (permissao_id)
REFERENCES seguranca.permissao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE seguranca.usuario DROP CONSTRAINT IF EXISTS usuario_pessoa_fk CASCADE;
ALTER TABLE seguranca.usuario ADD CONSTRAINT usuario_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES dados_gerais.pessoa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: pesssoa_endereco_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.pessoa_endereco DROP CONSTRAINT IF EXISTS pesssoa_endereco_pessoa_fk CASCADE;
ALTER TABLE dados_gerais.pessoa_endereco ADD CONSTRAINT pesssoa_endereco_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES dados_gerais.pessoa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: pesssoa_endereco_endereco_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.pessoa_endereco DROP CONSTRAINT IF EXISTS pesssoa_endereco_endereco_fk CASCADE;
ALTER TABLE dados_gerais.pessoa_endereco ADD CONSTRAINT pesssoa_endereco_endereco_fk FOREIGN KEY (endereco_id)
REFERENCES dados_gerais.endereco (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: estado_fkey | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.estado DROP CONSTRAINT IF EXISTS estado_fkey CASCADE;
ALTER TABLE dados_gerais.estado ADD CONSTRAINT estado_fkey FOREIGN KEY (pais_id)
REFERENCES dados_gerais.pais (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: paciente_especialidade_paciente_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente_especialidade DROP CONSTRAINT IF EXISTS paciente_especialidade_paciente_fk CASCADE;
ALTER TABLE ceuas.paciente_especialidade ADD CONSTRAINT paciente_especialidade_paciente_fk FOREIGN KEY (paciente_id)
REFERENCES ceuas.paciente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_especialidade_especialidade_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente_especialidade DROP CONSTRAINT IF EXISTS paciente_especialidade_especialidade_fk CASCADE;
ALTER TABLE ceuas.paciente_especialidade ADD CONSTRAINT paciente_especialidade_especialidade_fk FOREIGN KEY (especialidade_id)
REFERENCES ceuas.especialidade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: pessoa_contato_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.pessoa DROP CONSTRAINT IF EXISTS pessoa_contato_fk CASCADE;
ALTER TABLE dados_gerais.pessoa ADD CONSTRAINT pessoa_contato_fk FOREIGN KEY (contato_id)
REFERENCES dados_gerais.contato (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: agendamento_paciente_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.agendamento DROP CONSTRAINT IF EXISTS agendamento_paciente_fk CASCADE;
ALTER TABLE ceuas.agendamento ADD CONSTRAINT agendamento_paciente_fk FOREIGN KEY (paciente_id)
REFERENCES ceuas.paciente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: agendamento_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.agendamento DROP CONSTRAINT IF EXISTS agendamento_usuario_fk CASCADE;
ALTER TABLE ceuas.agendamento ADD CONSTRAINT agendamento_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: alteracao_agendamento_agendamento_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.alteracao_agendamento DROP CONSTRAINT IF EXISTS alteracao_agendamento_agendamento_fk CASCADE;
ALTER TABLE ceuas.alteracao_agendamento ADD CONSTRAINT alteracao_agendamento_agendamento_fk FOREIGN KEY (agendamento_id)
REFERENCES ceuas.agendamento (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: alteracao_agendamento_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.alteracao_agendamento DROP CONSTRAINT IF EXISTS alteracao_agendamento_usuario_fk CASCADE;
ALTER TABLE ceuas.alteracao_agendamento ADD CONSTRAINT alteracao_agendamento_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: responsavel_consulta_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.responsavel_consulta DROP CONSTRAINT IF EXISTS responsavel_consulta_usuario_fk CASCADE;
ALTER TABLE ceuas.responsavel_consulta ADD CONSTRAINT responsavel_consulta_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: responsavel_consulta_avaliacao_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.responsavel_consulta DROP CONSTRAINT IF EXISTS responsavel_consulta_avaliacao_fk CASCADE;
ALTER TABLE ceuas.responsavel_consulta ADD CONSTRAINT responsavel_consulta_avaliacao_fk FOREIGN KEY (avaliacao_atendimento_id)
REFERENCES ceuas.avaliacao_atendimento (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: avaliacao_atendimento_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.avaliacao_atendimento DROP CONSTRAINT IF EXISTS avaliacao_atendimento_usuario_fk CASCADE;
ALTER TABLE ceuas.avaliacao_atendimento ADD CONSTRAINT avaliacao_atendimento_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: avaliacao_atendimento_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.avaliacao_atendimento DROP CONSTRAINT IF EXISTS avaliacao_atendimento_consulta_fk CASCADE;
ALTER TABLE ceuas.avaliacao_atendimento ADD CONSTRAINT avaliacao_atendimento_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: patologia_tipo_patologia_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.patologia DROP CONSTRAINT IF EXISTS patologia_tipo_patologia_fk CASCADE;
ALTER TABLE ceuas.patologia ADD CONSTRAINT patologia_tipo_patologia_fk FOREIGN KEY (tipo_patologia_id)
REFERENCES ceuas.tipo_patologia (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_antecedente_patologico_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.antecedente_patologico DROP CONSTRAINT IF EXISTS consulta_antecedente_patologico_consulta_fk CASCADE;
ALTER TABLE ceuas.antecedente_patologico ADD CONSTRAINT consulta_antecedente_patologico_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_antecedente_patologico_patologia_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.antecedente_patologico DROP CONSTRAINT IF EXISTS consulta_antecedente_patologico_patologia_fk CASCADE;
ALTER TABLE ceuas.antecedente_patologico ADD CONSTRAINT consulta_antecedente_patologico_patologia_fk FOREIGN KEY (patologia_id)
REFERENCES ceuas.patologia (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: medicamento_apresentacao_medicamento_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.medicamento DROP CONSTRAINT IF EXISTS medicamento_apresentacao_medicamento_fk CASCADE;
ALTER TABLE ceuas.medicamento ADD CONSTRAINT medicamento_apresentacao_medicamento_fk FOREIGN KEY (apresentacao_medicamento_id)
REFERENCES ceuas.apresentacao_medicamento (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: medicamento_uso_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.medicamento_uso DROP CONSTRAINT IF EXISTS medicamento_uso_consulta_fk CASCADE;
ALTER TABLE ceuas.medicamento_uso ADD CONSTRAINT medicamento_uso_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: medicamento_uso_medicamento_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.medicamento_uso DROP CONSTRAINT IF EXISTS medicamento_uso_medicamento_fk CASCADE;
ALTER TABLE ceuas.medicamento_uso ADD CONSTRAINT medicamento_uso_medicamento_fk FOREIGN KEY (medicamento_id)
REFERENCES ceuas.medicamento (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


