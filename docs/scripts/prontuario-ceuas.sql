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

-- object: dados_gerais.pessoa | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.pessoa CASCADE;
CREATE TABLE dados_gerais.pessoa (
	id bigint NOT NULL DEFAULT nextval('dados_gerais.pessoa_id_seq'::regclass),
	nome character varying NOT NULL,
	data_nascimento date,
	created_at timestamp,
	updated_at timestamp,
	sexo character varying,
	contato_id bigint,
	CONSTRAINT pessoa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.pessoa OWNER TO postgres;
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
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	ativo boolean,
	CONSTRAINT endereco_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.endereco OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.pais_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.pais_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.pais_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.pais_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.pais | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.pais CASCADE;
CREATE TABLE dados_gerais.pais (
	id integer NOT NULL DEFAULT nextval('dados_gerais.pais_id_seq'::regclass),
	nome character varying NOT NULL,
	sigla character varying(3),
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT pais_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.pais OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.estado_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.estado_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.estado_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.estado_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.estado | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.estado CASCADE;
CREATE TABLE dados_gerais.estado (
	id integer NOT NULL DEFAULT nextval('dados_gerais.estado_id_seq'::regclass),
	nome character varying NOT NULL,
	sigla character varying(2),
	pais_id smallint,
	cod_ibge smallint,
	CONSTRAINT estado_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.estado OWNER TO postgres;
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
	CONSTRAINT cidade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.cidade OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.estado_civil_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.estado_civil_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.estado_civil_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.estado_civil_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.estado_civil | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.estado_civil CASCADE;
CREATE TABLE dados_gerais.estado_civil (
	id integer NOT NULL DEFAULT nextval('dados_gerais.estado_civil_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT estado_civil_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.estado_civil OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.religiao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.religiao_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.religiao_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.religiao_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.religiao | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.religiao CASCADE;
CREATE TABLE dados_gerais.religiao (
	id integer NOT NULL DEFAULT nextval('dados_gerais.religiao_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT religiao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.religiao OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.cor_pele_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.cor_pele_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.cor_pele_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.cor_pele_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.cor_pele | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.cor_pele CASCADE;
CREATE TABLE dados_gerais.cor_pele (
	id integer NOT NULL DEFAULT nextval('dados_gerais.cor_pele_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT cor_pele_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.cor_pele OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.escolaridade_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.escolaridade_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.escolaridade_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.escolaridade_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.escolaridade | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.escolaridade CASCADE;
CREATE TABLE dados_gerais.escolaridade (
	id integer NOT NULL DEFAULT nextval('dados_gerais.escolaridade_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT escolaridade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.escolaridade OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.profissao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.profissao_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.profissao_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.profissao_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.profissao | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.profissao CASCADE;
CREATE TABLE dados_gerais.profissao (
	id integer NOT NULL DEFAULT nextval('dados_gerais.profissao_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT profissao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.profissao OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.situacao_profissional_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.situacao_profissional_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.situacao_profissional_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.situacao_profissional_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.situacao_profissional | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.situacao_profissional CASCADE;
CREATE TABLE dados_gerais.situacao_profissional (
	id integer NOT NULL DEFAULT nextval('dados_gerais.situacao_profissional_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT situacao_profissional_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.situacao_profissional OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.tipo_logradouro_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.tipo_logradouro_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.tipo_logradouro_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.tipo_logradouro_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.tipo_logradouro | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.tipo_logradouro CASCADE;
CREATE TABLE dados_gerais.tipo_logradouro (
	id integer NOT NULL DEFAULT nextval('dados_gerais.tipo_logradouro_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT tipo_logradouro_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.tipo_logradouro OWNER TO postgres;
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
	cartao_familia character varying,
	cns character varying,
	agente_comunitario character varying,
	encaminhado_por character varying,
	pessoa_id integer NOT NULL,
	unidade_saude_id integer,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	rg character varying,
	cpf character varying,
	nacionalidade_id smallint,
	naturalidade_id smallint,
	estado_civil_id smallint,
	religiao_id smallint,
	cor_pele_id smallint,
	escolaridade_id smallint,
	profissao_id smallint,
	situacao_profissional_id smallint,
	prontuario character varying,
	tempo_estudo_id smallint,
	CONSTRAINT paciente_pk PRIMARY KEY (id)

);
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
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
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
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	queixa_principal_id integer,
	suspeitas_diagnosticas text,
	plano_conduta text,
	CONSTRAINT consulta_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.consulta OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_queixa_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.tipo_queixa_id_seq CASCADE;
CREATE SEQUENCE ceuas.tipo_queixa_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.tipo_queixa_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_queixa | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.tipo_queixa CASCADE;
CREATE TABLE ceuas.tipo_queixa (
	id integer NOT NULL DEFAULT nextval('ceuas.tipo_queixa_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao character varying,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT tipo_queixa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.tipo_queixa OWNER TO postgres;
-- ddl-end --

-- object: ceuas.queixa_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.queixa_id_seq CASCADE;
CREATE SEQUENCE ceuas.queixa_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.queixa_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.queixa | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.queixa CASCADE;
CREATE TABLE ceuas.queixa (
	id integer NOT NULL DEFAULT nextval('ceuas.queixa_id_seq'::regclass),
	nome character varying NOT NULL,
	tipo_queixa_id integer NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT queixa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.queixa OWNER TO postgres;
-- ddl-end --

-- object: ceuas.consulta_queixa | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.consulta_queixa CASCADE;
CREATE TABLE ceuas.consulta_queixa (
	consulta_id bigint NOT NULL,
	queixa_id integer NOT NULL,
	CONSTRAINT consulta_queixa_pk PRIMARY KEY (consulta_id,queixa_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.consulta_queixa OWNER TO postgres;
-- ddl-end --

-- object: ceuas.consulta_queixa_consulta_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.consulta_queixa_consulta_id_seq CASCADE;
CREATE SEQUENCE ceuas.consulta_queixa_consulta_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.consulta_queixa_consulta_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.recordatorio_aliementar_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.recordatorio_aliementar_id_seq CASCADE;
CREATE SEQUENCE ceuas.recordatorio_aliementar_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.recordatorio_aliementar_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.recordatorio_alimentar | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.recordatorio_alimentar CASCADE;
CREATE TABLE ceuas.recordatorio_alimentar (
	id bigint NOT NULL DEFAULT nextval('ceuas.recordatorio_aliementar_id_seq'::regclass),
	quantidade smallint,
	tipo_refeicao_id smallint NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	alimento_id bigint,
	consulta_id bigint,
	CONSTRAINT recordatorio_aliementar_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.recordatorio_alimentar OWNER TO postgres;
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

-- object: ceuas.tipo_refeicao | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.tipo_refeicao CASCADE;
CREATE TABLE ceuas.tipo_refeicao (
	id smallint NOT NULL DEFAULT nextval('ceuas.tipo_refeicao_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT tipo_refeicao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.tipo_refeicao OWNER TO postgres;
-- ddl-end --

-- object: seguranca.grupo_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS seguranca.grupo_id_seq CASCADE;
CREATE SEQUENCE seguranca.grupo_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE seguranca.grupo_id_seq OWNER TO postgres;
-- ddl-end --

-- object: seguranca.grupo | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.grupo CASCADE;
CREATE TABLE seguranca.grupo (
	id integer NOT NULL DEFAULT nextval('seguranca.grupo_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT grupo_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE seguranca.grupo OWNER TO postgres;
-- ddl-end --

-- object: seguranca.permissao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS seguranca.permissao_id_seq CASCADE;
CREATE SEQUENCE seguranca.permissao_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE seguranca.permissao_id_seq OWNER TO postgres;
-- ddl-end --

-- object: seguranca.permissao | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.permissao CASCADE;
CREATE TABLE seguranca.permissao (
	id integer NOT NULL DEFAULT nextval('seguranca.permissao_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT permissao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE seguranca.permissao OWNER TO postgres;
-- ddl-end --

-- object: seguranca.usuario_grupo | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.usuario_grupo CASCADE;
CREATE TABLE seguranca.usuario_grupo (
	usuario_id bigint NOT NULL,
	grupo_id integer NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT usuario_grupo_pk PRIMARY KEY (usuario_id,grupo_id)

);
-- ddl-end --
-- ALTER TABLE seguranca.usuario_grupo OWNER TO postgres;
-- ddl-end --

-- object: seguranca.grupo_permissao | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.grupo_permissao CASCADE;
CREATE TABLE seguranca.grupo_permissao (
	grupo_id integer NOT NULL,
	permissao_id integer NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT grupo_permissao_pk PRIMARY KEY (grupo_id,permissao_id)

);
-- ddl-end --
-- ALTER TABLE seguranca.grupo_permissao OWNER TO postgres;
-- ddl-end --

-- object: public.auth_user_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.auth_user_id_seq CASCADE;
CREATE SEQUENCE public.auth_user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.auth_user_id_seq OWNER TO postgres;
-- ddl-end --

-- object: seguranca.usuario_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS seguranca.usuario_id_seq CASCADE;
CREATE SEQUENCE seguranca.usuario_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE seguranca.usuario_id_seq OWNER TO postgres;
-- ddl-end --

-- object: seguranca.usuario | type: TABLE --
-- DROP TABLE IF EXISTS seguranca.usuario CASCADE;
CREATE TABLE seguranca.usuario (
	id bigint NOT NULL DEFAULT nextval('seguranca.usuario_id_seq'::regclass),
	nome character varying,
	hash_senha character varying,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	pessoa_id bigint,
	CONSTRAINT usuario_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE seguranca.usuario OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.contato_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.contato_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.contato_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.contato_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.contato | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.contato CASCADE;
CREATE TABLE dados_gerais.contato (
	id bigint NOT NULL DEFAULT nextval('dados_gerais.contato_id_seq'::regclass),
	telefone character varying,
	email character varying,
	created_at timestamp,
	updated_at timestamp,
	celular character varying,
	CONSTRAINT contato_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.contato OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.sexo | type: TYPE --
-- DROP TYPE IF EXISTS dados_gerais.sexo CASCADE;
CREATE TYPE dados_gerais.sexo AS
 ENUM ('Feminino','Masculino');
-- ddl-end --
-- ALTER TYPE dados_gerais.sexo OWNER TO postgres;
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

-- object: ceuas.especialidade_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.especialidade_id_seq CASCADE;
CREATE SEQUENCE ceuas.especialidade_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.especialidade_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.especialidade | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.especialidade CASCADE;
CREATE TABLE ceuas.especialidade (
	id smallint NOT NULL DEFAULT nextval('ceuas.especialidade_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	created_at timestamp,
	updated_at timestamp,
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

-- object: ceuas.alimento_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.alimento_id_seq CASCADE;
CREATE SEQUENCE ceuas.alimento_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.alimento_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.alimento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.alimento CASCADE;
CREATE TABLE ceuas.alimento (
	id bigint NOT NULL DEFAULT nextval('ceuas.alimento_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT alimento_fk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.alimento OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.tempo_estudo_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS dados_gerais.tempo_estudo_id_seq CASCADE;
CREATE SEQUENCE dados_gerais.tempo_estudo_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE dados_gerais.tempo_estudo_id_seq OWNER TO postgres;
-- ddl-end --

-- object: dados_gerais.tempo_estudo | type: TABLE --
-- DROP TABLE IF EXISTS dados_gerais.tempo_estudo CASCADE;
CREATE TABLE dados_gerais.tempo_estudo (
	id smallint NOT NULL DEFAULT nextval('dados_gerais.tempo_estudo_id_seq'::regclass),
	nome character varying NOT NULL,
	CONSTRAINT tempo_estudo_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE dados_gerais.tempo_estudo OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_exame_fisico_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.tipo_exame_fisico_id_seq CASCADE;
CREATE SEQUENCE ceuas.tipo_exame_fisico_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.tipo_exame_fisico_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.tipo_exame_fisico CASCADE;
CREATE TABLE ceuas.tipo_exame_fisico (
	id smallint NOT NULL DEFAULT nextval('ceuas.tipo_exame_fisico_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	CONSTRAINT tipo_exame_fisico_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.tipo_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: ceuas.exame_fisico_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.exame_fisico_id_seq CASCADE;
CREATE SEQUENCE ceuas.exame_fisico_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.exame_fisico_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.exame_fisico CASCADE;
CREATE TABLE ceuas.exame_fisico (
	id integer NOT NULL DEFAULT nextval('ceuas.exame_fisico_id_seq'::regclass),
	nome character varying NOT NULL,
	tipo_exame_fisico_id smallint,
	CONSTRAINT exame_fisico_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: ceuas.consulta_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.consulta_exame_fisico CASCADE;
CREATE TABLE ceuas.consulta_exame_fisico (
	consulta_id bigint NOT NULL,
	exame_fisico_id integer NOT NULL,
	observacao text,
	CONSTRAINT consulta_exame_fisico_pk PRIMARY KEY (consulta_id,exame_fisico_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.consulta_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: ceuas.indicadores_exame_fisico_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.indicadores_exame_fisico_id_seq CASCADE;
CREATE SEQUENCE ceuas.indicadores_exame_fisico_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.indicadores_exame_fisico_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.indicadores_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.indicadores_exame_fisico CASCADE;
CREATE TABLE ceuas.indicadores_exame_fisico (
	peso numeric,
	altura numeric,
	imc numeric,
	circunferencia_abdomen numeric,
	circunferencia_braco numeric,
	bracadeira_apropriada character varying,
	pa_sentado_msd numeric,
	pa_sentado_mse numeric,
	pa_sentado_seg numeric,
	pa_em_pe numeric,
	fr smallint,
	pulso smallint,
	fc smallint,
	spo2 numeric,
	temperatura numeric,
	pas_doppler_msd numeric,
	pas_doppler_mid numeric,
	pas_doppler_mie numeric,
	pas_doppler_mse numeric,
	itb numeric,
	consulta_id bigint NOT NULL,
	id bigint NOT NULL DEFAULT nextval('ceuas.indicadores_exame_fisico_id_seq'::regclass),
	quadril numeric,
	indice_cq numeric,
	CONSTRAINT indicadores_exame_fisico_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.indicadores_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_antecedente_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.tipo_antecedente_id_seq CASCADE;
CREATE SEQUENCE ceuas.tipo_antecedente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.tipo_antecedente_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.tipo_antecedente | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.tipo_antecedente CASCADE;
CREATE TABLE ceuas.tipo_antecedente (
	id integer NOT NULL DEFAULT nextval('ceuas.tipo_antecedente_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	CONSTRAINT tipo_antecedente_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.tipo_antecedente OWNER TO postgres;
-- ddl-end --

-- object: ceuas.antecedente_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.antecedente_id_seq CASCADE;
CREATE SEQUENCE ceuas.antecedente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.antecedente_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.antecedente | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.antecedente CASCADE;
CREATE TABLE ceuas.antecedente (
	id integer NOT NULL DEFAULT nextval('ceuas.antecedente_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	tipo_antecedente_id smallint,
	CONSTRAINT antecedente_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.antecedente OWNER TO postgres;
-- ddl-end --

-- object: ceuas.atributo_antecedente_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.atributo_antecedente_id_seq CASCADE;
CREATE SEQUENCE ceuas.atributo_antecedente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.atributo_antecedente_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.atributo_antecedente | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.atributo_antecedente CASCADE;
CREATE TABLE ceuas.atributo_antecedente (
	id smallint NOT NULL DEFAULT nextval('ceuas.atributo_antecedente_id_seq'::regclass),
	nome character varying NOT NULL,
	tipo_dado character varying,
	antecedente_id smallint NOT NULL,
	CONSTRAINT atributo_antecedente_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.atributo_antecedente OWNER TO postgres;
-- ddl-end --

-- object: ceuas.responsavel_consulta | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.responsavel_consulta CASCADE;
CREATE TABLE ceuas.responsavel_consulta (
	consulta_id bigint NOT NULL,
	usuario_id integer NOT NULL,
	CONSTRAINT responsavel_consulta_pk PRIMARY KEY (consulta_id,usuario_id)

);
-- ddl-end --
-- ALTER TABLE ceuas.responsavel_consulta OWNER TO postgres;
-- ddl-end --

-- object: ceuas.avaliacao_atendimento_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS ceuas.avaliacao_atendimento_id_seq CASCADE;
CREATE SEQUENCE ceuas.avaliacao_atendimento_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE ceuas.avaliacao_atendimento_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ceuas.avaliacao_atendimento | type: TABLE --
-- DROP TABLE IF EXISTS ceuas.avaliacao_atendimento CASCADE;
CREATE TABLE ceuas.avaliacao_atendimento (
	id bigint NOT NULL DEFAULT nextval('ceuas.avaliacao_atendimento_id_seq'::regclass),
	nota numeric,
	usuario_id bigint,
	consulta_id bigint,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT avaliacao_atendimento_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE ceuas.avaliacao_atendimento OWNER TO postgres;
-- ddl-end --

-- object: pessoa_contato_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.pessoa DROP CONSTRAINT IF EXISTS pessoa_contato_fk CASCADE;
ALTER TABLE dados_gerais.pessoa ADD CONSTRAINT pessoa_contato_fk FOREIGN KEY (contato_id)
REFERENCES dados_gerais.contato (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
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

-- object: estado_fkey | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.estado DROP CONSTRAINT IF EXISTS estado_fkey CASCADE;
ALTER TABLE dados_gerais.estado ADD CONSTRAINT estado_fkey FOREIGN KEY (pais_id)
REFERENCES dados_gerais.pais (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: cidade_fkey | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.cidade DROP CONSTRAINT IF EXISTS cidade_fkey CASCADE;
ALTER TABLE dados_gerais.cidade ADD CONSTRAINT cidade_fkey FOREIGN KEY (estado_id)
REFERENCES dados_gerais.estado (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: paciente_unidade_saude_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_unidade_saude_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_unidade_saude_fk FOREIGN KEY (unidade_saude_id)
REFERENCES ceuas.unidade_saude (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_pessoa_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES dados_gerais.pessoa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_tempo_estudo_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente DROP CONSTRAINT IF EXISTS paciente_tempo_estudo_fk CASCADE;
ALTER TABLE ceuas.paciente ADD CONSTRAINT paciente_tempo_estudo_fk FOREIGN KEY (tempo_estudo_id)
REFERENCES dados_gerais.tempo_estudo (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_paciente_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.consulta DROP CONSTRAINT IF EXISTS consulta_paciente_fk CASCADE;
ALTER TABLE ceuas.consulta ADD CONSTRAINT consulta_paciente_fk FOREIGN KEY (paciente_id)
REFERENCES ceuas.paciente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_queixa_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.consulta DROP CONSTRAINT IF EXISTS consulta_queixa_fk CASCADE;
ALTER TABLE ceuas.consulta ADD CONSTRAINT consulta_queixa_fk FOREIGN KEY (queixa_principal_id)
REFERENCES ceuas.queixa (id) MATCH SIMPLE
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

-- object: recordatorio_alimentar_tipo_refeicao_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.recordatorio_alimentar DROP CONSTRAINT IF EXISTS recordatorio_alimentar_tipo_refeicao_fk CASCADE;
ALTER TABLE ceuas.recordatorio_alimentar ADD CONSTRAINT recordatorio_alimentar_tipo_refeicao_fk FOREIGN KEY (tipo_refeicao_id)
REFERENCES ceuas.tipo_refeicao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_aliementar_alimento_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.recordatorio_alimentar DROP CONSTRAINT IF EXISTS recordatorio_aliementar_alimento_fk CASCADE;
ALTER TABLE ceuas.recordatorio_alimentar ADD CONSTRAINT recordatorio_aliementar_alimento_fk FOREIGN KEY (alimento_id)
REFERENCES ceuas.alimento (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_alimentar_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.recordatorio_alimentar DROP CONSTRAINT IF EXISTS recordatorio_alimentar_consulta_fk CASCADE;
ALTER TABLE ceuas.recordatorio_alimentar ADD CONSTRAINT recordatorio_alimentar_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_grupo_grupo_fk | type: CONSTRAINT --
-- ALTER TABLE seguranca.usuario_grupo DROP CONSTRAINT IF EXISTS usuario_grupo_grupo_fk CASCADE;
ALTER TABLE seguranca.usuario_grupo ADD CONSTRAINT usuario_grupo_grupo_fk FOREIGN KEY (grupo_id)
REFERENCES seguranca.grupo (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: usuario_grupo_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE seguranca.usuario_grupo DROP CONSTRAINT IF EXISTS usuario_grupo_usuario_fk CASCADE;
ALTER TABLE seguranca.usuario_grupo ADD CONSTRAINT usuario_grupo_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH SIMPLE
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
REFERENCES dados_gerais.pessoa (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: pessoa_endereco_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.pessoa_endereco DROP CONSTRAINT IF EXISTS pessoa_endereco_pessoa_fk CASCADE;
ALTER TABLE dados_gerais.pessoa_endereco ADD CONSTRAINT pessoa_endereco_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES dados_gerais.pessoa (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: pessoa_endereco_endereco_fk | type: CONSTRAINT --
-- ALTER TABLE dados_gerais.pessoa_endereco DROP CONSTRAINT IF EXISTS pessoa_endereco_endereco_fk CASCADE;
ALTER TABLE dados_gerais.pessoa_endereco ADD CONSTRAINT pessoa_endereco_endereco_fk FOREIGN KEY (endereco_id)
REFERENCES dados_gerais.endereco (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_especialidade_especialidade_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente_especialidade DROP CONSTRAINT IF EXISTS paciente_especialidade_especialidade_fk CASCADE;
ALTER TABLE ceuas.paciente_especialidade ADD CONSTRAINT paciente_especialidade_especialidade_fk FOREIGN KEY (especialidade_id)
REFERENCES ceuas.especialidade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_especialidade_paciente_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.paciente_especialidade DROP CONSTRAINT IF EXISTS paciente_especialidade_paciente_fk CASCADE;
ALTER TABLE ceuas.paciente_especialidade ADD CONSTRAINT paciente_especialidade_paciente_fk FOREIGN KEY (paciente_id)
REFERENCES ceuas.paciente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: exame_fisico_tipo_exame_fiscio_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.exame_fisico DROP CONSTRAINT IF EXISTS exame_fisico_tipo_exame_fiscio_fk CASCADE;
ALTER TABLE ceuas.exame_fisico ADD CONSTRAINT exame_fisico_tipo_exame_fiscio_fk FOREIGN KEY (tipo_exame_fisico_id)
REFERENCES ceuas.tipo_exame_fisico (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: consulta_exame_fisico_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.consulta_exame_fisico DROP CONSTRAINT IF EXISTS consulta_exame_fisico_consulta_fk CASCADE;
ALTER TABLE ceuas.consulta_exame_fisico ADD CONSTRAINT consulta_exame_fisico_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: consulta_exame_fisico_exame_fisico_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.consulta_exame_fisico DROP CONSTRAINT IF EXISTS consulta_exame_fisico_exame_fisico_fk CASCADE;
ALTER TABLE ceuas.consulta_exame_fisico ADD CONSTRAINT consulta_exame_fisico_exame_fisico_fk FOREIGN KEY (exame_fisico_id)
REFERENCES ceuas.exame_fisico (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: indicadores_exame_fisico_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.indicadores_exame_fisico DROP CONSTRAINT IF EXISTS indicadores_exame_fisico_consulta_fk CASCADE;
ALTER TABLE ceuas.indicadores_exame_fisico ADD CONSTRAINT indicadores_exame_fisico_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: antecedente_tipo_antecedente_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.antecedente DROP CONSTRAINT IF EXISTS antecedente_tipo_antecedente_fk CASCADE;
ALTER TABLE ceuas.antecedente ADD CONSTRAINT antecedente_tipo_antecedente_fk FOREIGN KEY (tipo_antecedente_id)
REFERENCES ceuas.tipo_antecedente (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: atributo_antecedente_antecedente_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.atributo_antecedente DROP CONSTRAINT IF EXISTS atributo_antecedente_antecedente_fk CASCADE;
ALTER TABLE ceuas.atributo_antecedente ADD CONSTRAINT atributo_antecedente_antecedente_fk FOREIGN KEY (antecedente_id)
REFERENCES ceuas.antecedente (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: responsavel_consulta_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.responsavel_consulta DROP CONSTRAINT IF EXISTS responsavel_consulta_consulta_fk CASCADE;
ALTER TABLE ceuas.responsavel_consulta ADD CONSTRAINT responsavel_consulta_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: responsavel_consulta_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.responsavel_consulta DROP CONSTRAINT IF EXISTS responsavel_consulta_usuario_fk CASCADE;
ALTER TABLE ceuas.responsavel_consulta ADD CONSTRAINT responsavel_consulta_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: avaliacao_atendimento_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.avaliacao_atendimento DROP CONSTRAINT IF EXISTS avaliacao_atendimento_consulta_fk CASCADE;
ALTER TABLE ceuas.avaliacao_atendimento ADD CONSTRAINT avaliacao_atendimento_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES ceuas.consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: avaliacao_atendimento_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE ceuas.avaliacao_atendimento DROP CONSTRAINT IF EXISTS avaliacao_atendimento_usuario_fk CASCADE;
ALTER TABLE ceuas.avaliacao_atendimento ADD CONSTRAINT avaliacao_atendimento_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES seguranca.usuario (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- Table: ceuas.secao
-- DROP TABLE ceuas.secao;
CREATE TABLE ceuas.secao
(
    id bigint NOT NULL DEFAULT nextval('ceuas.secao_id_seq'::regclass),
    nome character varying COLLATE pg_catalog."default",
    descricao text COLLATE pg_catalog."default",
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    usuario_id smallint,
    CONSTRAINT secao_pk PRIMARY KEY (id),
    CONSTRAINT secao_usuario_id FOREIGN KEY (usuario_id)
        REFERENCES seguranca.usuario (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Table: ceuas.complemento_consulta_tipo_queixa
-- DROP TABLE ceuas.complemento_consulta_tipo_queixa;
CREATE TABLE ceuas.complemento_consulta_tipo_queixa
(
    id bigint NOT NULL DEFAULT nextval('ceuas.complemento_consulta_tipo_queixa_id_seq'::regclass),
    complemento text COLLATE pg_catalog."default",
    consulta_id bigint,
    tipo_queixa_id smallint,
    CONSTRAINT complemento_consulta_tipo_queixa_pk PRIMARY KEY (id),
    CONSTRAINT complemento_consulta_tipo_queixa_consulta_fk FOREIGN KEY (consulta_id)
        REFERENCES ceuas.consulta (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT complemento_consulta_tipo_queixa_tipo_queixa_fk FOREIGN KEY (tipo_queixa_id)
        REFERENCES ceuas.tipo_queixa (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Última alteração: 15/04/2021