-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: Josafá Santos dos Reis


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: pepescola | type: DATABASE --
-- -- DROP DATABASE IF EXISTS pepescola;
-- CREATE DATABASE pepescola
-- 	ENCODING = 'UTF8'
-- 	LC_COLLATE = 'en_US.utf8'
-- 	LC_CTYPE = 'en_US.utf8'
-- 	TABLESPACE = pg_default
-- 	OWNER = postgres;
-- -- ddl-end --
-- 

-- object: public.auth_grupo | type: TABLE --
-- DROP TABLE IF EXISTS public.auth_grupo CASCADE;
CREATE TABLE public.auth_grupo (
	id uuid NOT NULL,
	nome character varying NOT NULL,
	descricao text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT auth_group_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.auth_grupo OWNER TO postgres;
-- ddl-end --

-- object: public.auth_grupo_permissao | type: TABLE --
-- DROP TABLE IF EXISTS public.auth_grupo_permissao CASCADE;
CREATE TABLE public.auth_grupo_permissao (
	grupo_id uuid NOT NULL,
	permissao_id uuid NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT auth_grupo_permissao_pk PRIMARY KEY (grupo_id,permissao_id)

);
-- ddl-end --
-- ALTER TABLE public.auth_grupo_permissao OWNER TO postgres;
-- ddl-end --

-- object: public.auth_permissao | type: TABLE --
-- DROP TABLE IF EXISTS public.auth_permissao CASCADE;
CREATE TABLE public.auth_permissao (
	id uuid NOT NULL,
	nome character varying NOT NULL,
	descricao text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT auth_permissao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.auth_permissao OWNER TO postgres;
-- ddl-end --

-- object: public.auth_usuario | type: TABLE --
-- DROP TABLE IF EXISTS public.auth_usuario CASCADE;
CREATE TABLE public.auth_usuario (
	id uuid NOT NULL,
	nome character varying,
	hash_senha character varying,
	token_version bigint DEFAULT 0,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	pessoa_id uuid,
	CONSTRAINT auth_user_pk PRIMARY KEY (id),
	CONSTRAINT auth_user_un UNIQUE (nome)

);
-- ddl-end --
-- ALTER TABLE public.auth_usuario OWNER TO postgres;
-- ddl-end --

-- object: public.auth_usuario_grupo | type: TABLE --
-- DROP TABLE IF EXISTS public.auth_usuario_grupo CASCADE;
CREATE TABLE public.auth_usuario_grupo (
	usuario_id uuid NOT NULL,
	grupo_id uuid NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT auth_usuario_grupo_pk PRIMARY KEY (usuario_id,grupo_id)

);
-- ddl-end --
-- ALTER TABLE public.auth_usuario_grupo OWNER TO postgres;
-- ddl-end --

-- object: public.dg_contato_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.dg_contato_id_seq CASCADE;
CREATE SEQUENCE public.dg_contato_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.dg_contato_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.dg_contato | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_contato CASCADE;
CREATE TABLE public.dg_contato (
	id bigint NOT NULL DEFAULT nextval('public.dg_contato_id_seq'::regclass),
	telefone character varying,
	celular character varying,
	email character varying,
	pessoa_id uuid,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT gd_contato_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_contato OWNER TO postgres;
-- ddl-end --

-- object: public.dg_pessoa | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_pessoa CASCADE;
CREATE TABLE public.dg_pessoa (
	id uuid NOT NULL,
	nome character varying NOT NULL,
	data_nascimento date,
	sexo character varying,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT pessoa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_pessoa OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_unidade_saude | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_unidade_saude CASCADE;
CREATE TABLE public.ceuas_unidade_saude (
	id uuid NOT NULL,
	nome character varying NOT NULL,
	cnes character varying,
	telefone character varying,
	celular character varying,
	email character varying,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT unidade_saude_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_unidade_saude OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_paciente | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_paciente CASCADE;
CREATE TABLE public.ceuas_paciente (
	id uuid NOT NULL,
	prontuario character varying,
	rg character varying,
	cpf character varying,
	cartao_familia character varying,
	cns character varying,
	agente_comunitario character varying,
	pessoa_id uuid NOT NULL,
	unidade_saude_id uuid,
	nacionalidade_id smallint,
	naturalidade_id smallint,
	estado_civil_id smallint,
	religiao_id smallint,
	cor_pele_id smallint,
	escolaridade_id smallint,
	profissao_id smallint,
	situacao_profissional_id smallint,
	tempo_estudo_id smallint,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT paciente_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_paciente OWNER TO postgres;
-- ddl-end --

-- object: public.dg_pais | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_pais CASCADE;
CREATE TABLE public.dg_pais (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	sigla character varying(3),
	CONSTRAINT pais_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_pais OWNER TO postgres;
-- ddl-end --

-- object: public.dg_estado | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_estado CASCADE;
CREATE TABLE public.dg_estado (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	sigla character varying(2),
	cod_ibge smallint,
	CONSTRAINT estado_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_estado OWNER TO postgres;
-- ddl-end --

-- object: public.dg_cidade | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_cidade CASCADE;
CREATE TABLE public.dg_cidade (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	codigo_ibge character varying,
	estado_id smallint,
	CONSTRAINT cidade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_cidade OWNER TO postgres;
-- ddl-end --

-- object: public.dg_estado_civil | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_estado_civil CASCADE;
CREATE TABLE public.dg_estado_civil (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT estado_civil_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_estado_civil OWNER TO postgres;
-- ddl-end --

-- object: public.dg_religiao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.dg_religiao_id_seq CASCADE;
CREATE SEQUENCE public.dg_religiao_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.dg_religiao_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.dg_cor_pele | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_cor_pele CASCADE;
CREATE TABLE public.dg_cor_pele (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT cor_pele_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_cor_pele OWNER TO postgres;
-- ddl-end --

-- object: public.dg_escolaridade | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_escolaridade CASCADE;
CREATE TABLE public.dg_escolaridade (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT escolaridade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_escolaridade OWNER TO postgres;
-- ddl-end --

-- object: public.dg_profissao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.dg_profissao_id_seq CASCADE;
CREATE SEQUENCE public.dg_profissao_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.dg_profissao_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.dg_situacao_profissional | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_situacao_profissional CASCADE;
CREATE TABLE public.dg_situacao_profissional (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT situacao_profissional_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_situacao_profissional OWNER TO postgres;
-- ddl-end --

-- object: public.dg_tempo_estudo | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_tempo_estudo CASCADE;
CREATE TABLE public.dg_tempo_estudo (
	id smallint NOT NULL,
	nome character varying NOT NULL,
	CONSTRAINT tempo_estudo_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_tempo_estudo OWNER TO postgres;
-- ddl-end --

-- object: public.dg_profissao | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_profissao CASCADE;
CREATE TABLE public.dg_profissao (
	id smallint NOT NULL DEFAULT nextval('public.dg_profissao_id_seq'::regclass),
	nome character varying NOT NULL,
	CONSTRAINT profissao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_profissao OWNER TO postgres;
-- ddl-end --

-- object: public.dg_religiao | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_religiao CASCADE;
CREATE TABLE public.dg_religiao (
	id smallint NOT NULL DEFAULT nextval('public.dg_religiao_id_seq'::regclass),
	nome character varying NOT NULL,
	CONSTRAINT religiao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_religiao OWNER TO postgres;
-- ddl-end --

-- object: public.dg_tipo_logradouro_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.dg_tipo_logradouro_id_seq CASCADE;
CREATE SEQUENCE public.dg_tipo_logradouro_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.dg_tipo_logradouro_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.dg_tipo_logradouro | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_tipo_logradouro CASCADE;
CREATE TABLE public.dg_tipo_logradouro (
	id integer NOT NULL DEFAULT nextval('public.dg_tipo_logradouro_id_seq'::regclass),
	nome character varying NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT tipo_logradouro_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_tipo_logradouro OWNER TO postgres;
-- ddl-end --

-- object: public.dg_endereco_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.dg_endereco_id_seq CASCADE;
CREATE SEQUENCE public.dg_endereco_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.dg_endereco_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.dg_endereco | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_endereco CASCADE;
CREATE TABLE public.dg_endereco (
	id bigint NOT NULL DEFAULT nextval('public.dg_endereco_id_seq'::regclass),
	ativo boolean,
	logradouro character varying NOT NULL,
	numero integer,
	bairro character varying,
	complemento character varying,
	cep character varying(8),
	tipo_logradouro_id smallint,
	cidade_id integer,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	CONSTRAINT endereco_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.dg_endereco OWNER TO postgres;
-- ddl-end --

-- object: public.dg_pessoa_endereco | type: TABLE --
-- DROP TABLE IF EXISTS public.dg_pessoa_endereco CASCADE;
CREATE TABLE public.dg_pessoa_endereco (
	pessoa_id uuid NOT NULL,
	endereco_id bigint NOT NULL,
	CONSTRAINT pessoa_endereco_pk PRIMARY KEY (pessoa_id,endereco_id)

);
-- ddl-end --
-- ALTER TABLE public.dg_pessoa_endereco OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_especialidade_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_especialidade_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_especialidade_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_especialidade_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_especialidade | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_especialidade CASCADE;
CREATE TABLE public.ceuas_especialidade (
	id smallint NOT NULL DEFAULT nextval('public.ceuas_especialidade_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	CONSTRAINT especialidade_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_especialidade OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_consulta | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_consulta CASCADE;
CREATE TABLE public.ceuas_consulta (
	id uuid NOT NULL,
	primeira boolean NOT NULL DEFAULT false,
	queixa_principal_id integer,
	queixa_principal_obs text,
	historia_doenca_atual text,
	acompanhante character varying,
	suspeitas_diagnosticas text,
	plano_conduta text,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	fonte_encaminhamento character varying,
	paciente_id character varying,
	CONSTRAINT consulta_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_consulta OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_queixa_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_tipo_queixa_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_tipo_queixa_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_tipo_queixa_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_queixa | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_tipo_queixa CASCADE;
CREATE TABLE public.ceuas_tipo_queixa (
	id integer NOT NULL DEFAULT nextval('public.ceuas_tipo_queixa_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao character varying,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT tipo_queixa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_tipo_queixa OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_queixa_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_queixa_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_queixa_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_queixa_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_queixa | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_queixa CASCADE;
CREATE TABLE public.ceuas_queixa (
	id integer NOT NULL DEFAULT nextval('public.ceuas_queixa_id_seq'::regclass),
	nome character varying NOT NULL,
	tipo_queixa_id integer NOT NULL,
	created_at timestamp,
	updated_at timestamp,
	CONSTRAINT queixa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_queixa OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_exame_fisico_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_tipo_exame_fisico_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_tipo_exame_fisico_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_tipo_exame_fisico_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_tipo_exame_fisico CASCADE;
CREATE TABLE public.ceuas_tipo_exame_fisico (
	id smallint NOT NULL DEFAULT nextval('public.ceuas_tipo_exame_fisico_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	CONSTRAINT tipo_exame_fisico_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_tipo_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_consulta_exame_fisico_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_complemento_consulta_exame_fisico_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_complemento_consulta_exame_fisico_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_complemento_consulta_exame_fisico_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_consulta_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_complemento_consulta_exame_fisico CASCADE;
CREATE TABLE public.ceuas_complemento_consulta_exame_fisico (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_complemento_consulta_exame_fisico_id_seq'::regclass),
	complemento text,
	consulta_id uuid,
	tipo_exame_fisico_id smallint,
	CONSTRAINT complemento_consulta_exame_fisico_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_complemento_consulta_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_exame_fisico_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_exame_fisico_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_exame_fisico_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_exame_fisico_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_exame_fisico CASCADE;
CREATE TABLE public.ceuas_exame_fisico (
	id integer NOT NULL DEFAULT nextval('public.ceuas_exame_fisico_id_seq'::regclass),
	nome character varying NOT NULL,
	tipo_exame_fisico_id smallint,
	CONSTRAINT exame_fisico_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_consulta_tipo_queixa_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_complemento_consulta_tipo_queixa_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_complemento_consulta_tipo_queixa_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_complemento_consulta_tipo_queixa_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_consulta_tipo_queixa | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_complemento_consulta_tipo_queixa CASCADE;
CREATE TABLE public.ceuas_complemento_consulta_tipo_queixa (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_complemento_consulta_tipo_queixa_id_seq'::regclass),
	complemento text,
	consulta_id uuid,
	tipo_queixa_id smallint,
	CONSTRAINT complemento_consulta_tipo_queixa_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_complemento_consulta_tipo_queixa OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_antecedente_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_tipo_antecedente_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_tipo_antecedente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_tipo_antecedente_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_antecedente | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_tipo_antecedente CASCADE;
CREATE TABLE public.ceuas_tipo_antecedente (
	id integer NOT NULL DEFAULT nextval('public.ceuas_tipo_antecedente_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	CONSTRAINT tipo_antecedente_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_tipo_antecedente OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_antecedente_atributo_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_antecedente_atributo_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_antecedente_atributo_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_antecedente_atributo_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_antecedente_atributo | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_antecedente_atributo CASCADE;
CREATE TABLE public.ceuas_antecedente_atributo (
	id smallint NOT NULL DEFAULT nextval('public.ceuas_antecedente_atributo_id_seq'::regclass),
	nome character varying NOT NULL,
	tipo_dado character varying,
	tipo_antecedente_id smallint NOT NULL,
	CONSTRAINT antecedente_atributo_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_antecedente_atributo OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_antecedente_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_antecedente_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_antecedente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_antecedente_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_antecedente | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_antecedente CASCADE;
CREATE TABLE public.ceuas_antecedente (
	id integer NOT NULL DEFAULT nextval('public.ceuas_antecedente_id_seq'::regclass),
	nome character varying NOT NULL,
	descricao text,
	tipo_antecedente_id smallint,
	CONSTRAINT antecedente_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_antecedente OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_consulta_antecedente_atributo_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_consulta_antecedente_atributo_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_consulta_antecedente_atributo_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_consulta_antecedente_atributo_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_consulta_antecedente_atributo | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_consulta_antecedente_atributo CASCADE;
CREATE TABLE public.ceuas_consulta_antecedente_atributo (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_consulta_antecedente_atributo_id_seq'::regclass),
	atributo_valor character varying,
	consulta_id uuid,
	antecedente_atributo_id integer,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	antecedente_id smallint,
	CONSTRAINT consulta_antecedente_atributo_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_consulta_antecedente_atributo OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_consulta_antecedente_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_complemento_consulta_antecedente_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_complemento_consulta_antecedente_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_complemento_consulta_antecedente_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_consulta_antecedente | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_complemento_consulta_antecedente CASCADE;
CREATE TABLE public.ceuas_complemento_consulta_antecedente (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_complemento_consulta_antecedente_id_seq'::regclass),
	complemento text NOT NULL,
	consulta_id uuid NOT NULL,
	tipo_antecedente_id smallint,
	CONSTRAINT complemento_consulta_antecedente_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_complemento_consulta_antecedente OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_consulta_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_consulta_exame_fisico CASCADE;
CREATE TABLE public.ceuas_consulta_exame_fisico (
	consulta_id uuid NOT NULL,
	exame_fisico_id integer NOT NULL,
	observacao text,
	CONSTRAINT consulta_exame_fisico_pk PRIMARY KEY (consulta_id,exame_fisico_id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_consulta_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_consulta_queixa | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_consulta_queixa CASCADE;
CREATE TABLE public.ceuas_consulta_queixa (
	consulta_id uuid NOT NULL,
	queixa_id integer NOT NULL,
	CONSTRAINT consulta_queixa_pk PRIMARY KEY (consulta_id,queixa_id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_consulta_queixa OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_indicadores_exame_fisico_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_indicadores_exame_fisico_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_indicadores_exame_fisico_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_indicadores_exame_fisico_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_indicadores_exame_fisico | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_indicadores_exame_fisico CASCADE;
CREATE TABLE public.ceuas_indicadores_exame_fisico (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_indicadores_exame_fisico_id_seq'::regclass),
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
	consulta_id uuid NOT NULL,
	quadril numeric,
	indice_cq numeric,
	CONSTRAINT indicadores_exame_fisico_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_indicadores_exame_fisico OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_alimento_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_alimento_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_alimento_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_alimento_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_alimento | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_alimento CASCADE;
CREATE TABLE public.ceuas_alimento (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_alimento_id_seq'::regclass),
	nome character varying NOT NULL,
	CONSTRAINT alimento_fk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_alimento OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_refeicao_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_tipo_refeicao_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_tipo_refeicao_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 32767
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_tipo_refeicao_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_tipo_refeicao | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_tipo_refeicao CASCADE;
CREATE TABLE public.ceuas_tipo_refeicao (
	id smallint NOT NULL DEFAULT nextval('public.ceuas_tipo_refeicao_id_seq'::regclass),
	nome character varying NOT NULL,
	CONSTRAINT tipo_refeicao_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_tipo_refeicao OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_recordatorio_alimentar_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_recordatorio_alimentar_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_recordatorio_alimentar_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_recordatorio_alimentar_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_recordatorio_alimentar | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_recordatorio_alimentar CASCADE;
CREATE TABLE public.ceuas_recordatorio_alimentar (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_recordatorio_alimentar_id_seq'::regclass),
	quantidade smallint,
	tipo_refeicao_id smallint NOT NULL,
	alimento_id bigint,
	consulta_id uuid,
	CONSTRAINT recordatorio_aliementar_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_recordatorio_alimentar OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_responsavel_consulta_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_responsavel_consulta_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_responsavel_consulta_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_responsavel_consulta_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_responsavel_consulta | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_responsavel_consulta CASCADE;
CREATE TABLE public.ceuas_responsavel_consulta (
	consulta_id uuid NOT NULL,
	id bigint NOT NULL DEFAULT nextval('public.ceuas_responsavel_consulta_id_seq'::regclass),
	nomes text,
	CONSTRAINT ceuas_responsavel_consulta_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_responsavel_consulta OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_recordatorio_alimentar_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ceuas_complemento_recordatorio_alimentar_id_seq CASCADE;
CREATE SEQUENCE public.ceuas_complemento_recordatorio_alimentar_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE public.ceuas_complemento_recordatorio_alimentar_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_complemento_recordatorio_alimentar | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_complemento_recordatorio_alimentar CASCADE;
CREATE TABLE public.ceuas_complemento_recordatorio_alimentar (
	id bigint NOT NULL DEFAULT nextval('public.ceuas_complemento_recordatorio_alimentar_id_seq'::regclass),
	complemento text NOT NULL,
	consulta_id uuid NOT NULL,
	CONSTRAINT complemento_recordatorio_alimentar_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_complemento_recordatorio_alimentar OWNER TO postgres;
-- ddl-end --

-- object: public.ceuas_paciente_especialidade | type: TABLE --
-- DROP TABLE IF EXISTS public.ceuas_paciente_especialidade CASCADE;
CREATE TABLE public.ceuas_paciente_especialidade (
	paciente_id uuid NOT NULL,
	especialidade_id smallint NOT NULL,
	CONSTRAINT ceuas_paciente_especialidade_pk PRIMARY KEY (paciente_id,especialidade_id)

);
-- ddl-end --
-- ALTER TABLE public.ceuas_paciente_especialidade OWNER TO postgres;
-- ddl-end --

-- object: auth_grupo_permissao_grupo_fk | type: CONSTRAINT --
-- ALTER TABLE public.auth_grupo_permissao DROP CONSTRAINT IF EXISTS auth_grupo_permissao_grupo_fk CASCADE;
ALTER TABLE public.auth_grupo_permissao ADD CONSTRAINT auth_grupo_permissao_grupo_fk FOREIGN KEY (grupo_id)
REFERENCES public.auth_grupo (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: auth_grupo_permissao_permissao_fk | type: CONSTRAINT --
-- ALTER TABLE public.auth_grupo_permissao DROP CONSTRAINT IF EXISTS auth_grupo_permissao_permissao_fk CASCADE;
ALTER TABLE public.auth_grupo_permissao ADD CONSTRAINT auth_grupo_permissao_permissao_fk FOREIGN KEY (permissao_id)
REFERENCES public.auth_permissao (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: auth_user_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE public.auth_usuario DROP CONSTRAINT IF EXISTS auth_user_pessoa_fk CASCADE;
ALTER TABLE public.auth_usuario ADD CONSTRAINT auth_user_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES public.dg_pessoa (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: auth_usuario_grupo_grupo_fk | type: CONSTRAINT --
-- ALTER TABLE public.auth_usuario_grupo DROP CONSTRAINT IF EXISTS auth_usuario_grupo_grupo_fk CASCADE;
ALTER TABLE public.auth_usuario_grupo ADD CONSTRAINT auth_usuario_grupo_grupo_fk FOREIGN KEY (grupo_id)
REFERENCES public.auth_grupo (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: auth_usuario_grupo_usuario_fk | type: CONSTRAINT --
-- ALTER TABLE public.auth_usuario_grupo DROP CONSTRAINT IF EXISTS auth_usuario_grupo_usuario_fk CASCADE;
ALTER TABLE public.auth_usuario_grupo ADD CONSTRAINT auth_usuario_grupo_usuario_fk FOREIGN KEY (usuario_id)
REFERENCES public.auth_usuario (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: gd_contato_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE public.dg_contato DROP CONSTRAINT IF EXISTS gd_contato_pessoa_fk CASCADE;
ALTER TABLE public.dg_contato ADD CONSTRAINT gd_contato_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES public.dg_pessoa (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_pessoa_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES public.dg_pessoa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_unidade_saude_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_unidade_saude_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_unidade_saude_fk FOREIGN KEY (unidade_saude_id)
REFERENCES public.ceuas_unidade_saude (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_nacionalidade_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_nacionalidade_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_nacionalidade_fk FOREIGN KEY (nacionalidade_id)
REFERENCES public.dg_pais (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_naturalidade_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_naturalidade_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_naturalidade_fk FOREIGN KEY (naturalidade_id)
REFERENCES public.dg_cidade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_estado_civil_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_estado_civil_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_estado_civil_fk FOREIGN KEY (estado_civil_id)
REFERENCES public.dg_estado_civil (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_religiao_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_religiao_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_religiao_fk FOREIGN KEY (religiao_id)
REFERENCES public.dg_religiao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_cor_pele_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_cor_pele_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_cor_pele_fk FOREIGN KEY (cor_pele_id)
REFERENCES public.dg_cor_pele (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_escolaridade_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_escolaridade_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_escolaridade_fk FOREIGN KEY (escolaridade_id)
REFERENCES public.dg_escolaridade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_profissao_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_profissao_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_profissao_fk FOREIGN KEY (profissao_id)
REFERENCES public.dg_profissao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_situacao_profissional_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_situacao_profissional_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_situacao_profissional_fk FOREIGN KEY (situacao_profissional_id)
REFERENCES public.dg_situacao_profissional (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: paciente_tempo_estudo_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente DROP CONSTRAINT IF EXISTS paciente_tempo_estudo_fk CASCADE;
ALTER TABLE public.ceuas_paciente ADD CONSTRAINT paciente_tempo_estudo_fk FOREIGN KEY (tempo_estudo_id)
REFERENCES public.dg_tempo_estudo (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: cidade_estado_fk | type: CONSTRAINT --
-- ALTER TABLE public.dg_cidade DROP CONSTRAINT IF EXISTS cidade_estado_fk CASCADE;
ALTER TABLE public.dg_cidade ADD CONSTRAINT cidade_estado_fk FOREIGN KEY (estado_id)
REFERENCES public.dg_estado (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: endereco_cidade_fk | type: CONSTRAINT --
-- ALTER TABLE public.dg_endereco DROP CONSTRAINT IF EXISTS endereco_cidade_fk CASCADE;
ALTER TABLE public.dg_endereco ADD CONSTRAINT endereco_cidade_fk FOREIGN KEY (cidade_id)
REFERENCES public.dg_cidade (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: endereco_tipo_logradouro_fk | type: CONSTRAINT --
-- ALTER TABLE public.dg_endereco DROP CONSTRAINT IF EXISTS endereco_tipo_logradouro_fk CASCADE;
ALTER TABLE public.dg_endereco ADD CONSTRAINT endereco_tipo_logradouro_fk FOREIGN KEY (tipo_logradouro_id)
REFERENCES public.dg_tipo_logradouro (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: pessoa_endereco_endereco_fk | type: CONSTRAINT --
-- ALTER TABLE public.dg_pessoa_endereco DROP CONSTRAINT IF EXISTS pessoa_endereco_endereco_fk CASCADE;
ALTER TABLE public.dg_pessoa_endereco ADD CONSTRAINT pessoa_endereco_endereco_fk FOREIGN KEY (endereco_id)
REFERENCES public.dg_endereco (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: pessoa_endereco_pessoa_fk | type: CONSTRAINT --
-- ALTER TABLE public.dg_pessoa_endereco DROP CONSTRAINT IF EXISTS pessoa_endereco_pessoa_fk CASCADE;
ALTER TABLE public.dg_pessoa_endereco ADD CONSTRAINT pessoa_endereco_pessoa_fk FOREIGN KEY (pessoa_id)
REFERENCES public.dg_pessoa (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_queixa_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta DROP CONSTRAINT IF EXISTS consulta_queixa_fk CASCADE;
ALTER TABLE public.ceuas_consulta ADD CONSTRAINT consulta_queixa_fk FOREIGN KEY (queixa_principal_id)
REFERENCES public.ceuas_queixa (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: queixa_tipo_queixa_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_queixa DROP CONSTRAINT IF EXISTS queixa_tipo_queixa_fk CASCADE;
ALTER TABLE public.ceuas_queixa ADD CONSTRAINT queixa_tipo_queixa_fk FOREIGN KEY (tipo_queixa_id)
REFERENCES public.ceuas_tipo_queixa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complemento_consulta_exame_fisico_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_complemento_consulta_exame_fisico DROP CONSTRAINT IF EXISTS complemento_consulta_exame_fisico_consulta_fk CASCADE;
ALTER TABLE public.ceuas_complemento_consulta_exame_fisico ADD CONSTRAINT complemento_consulta_exame_fisico_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complemento_consulta_exame_fisico_tipo_exame_fisico_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_complemento_consulta_exame_fisico DROP CONSTRAINT IF EXISTS complemento_consulta_exame_fisico_tipo_exame_fisico_fk CASCADE;
ALTER TABLE public.ceuas_complemento_consulta_exame_fisico ADD CONSTRAINT complemento_consulta_exame_fisico_tipo_exame_fisico_fk FOREIGN KEY (tipo_exame_fisico_id)
REFERENCES public.ceuas_tipo_exame_fisico (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: exame_fisico_tipo_exame_fiscio_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_exame_fisico DROP CONSTRAINT IF EXISTS exame_fisico_tipo_exame_fiscio_fk CASCADE;
ALTER TABLE public.ceuas_exame_fisico ADD CONSTRAINT exame_fisico_tipo_exame_fiscio_fk FOREIGN KEY (tipo_exame_fisico_id)
REFERENCES public.ceuas_tipo_exame_fisico (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: complemento_consulta_tipo_queixa_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_complemento_consulta_tipo_queixa DROP CONSTRAINT IF EXISTS complemento_consulta_tipo_queixa_consulta_fk CASCADE;
ALTER TABLE public.ceuas_complemento_consulta_tipo_queixa ADD CONSTRAINT complemento_consulta_tipo_queixa_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complemento_consulta_tipo_queixa_tipo_queixa_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_complemento_consulta_tipo_queixa DROP CONSTRAINT IF EXISTS complemento_consulta_tipo_queixa_tipo_queixa_fk CASCADE;
ALTER TABLE public.ceuas_complemento_consulta_tipo_queixa ADD CONSTRAINT complemento_consulta_tipo_queixa_tipo_queixa_fk FOREIGN KEY (tipo_queixa_id)
REFERENCES public.ceuas_tipo_queixa (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: antecedente_atributo_tipo_antecedente_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_antecedente_atributo DROP CONSTRAINT IF EXISTS antecedente_atributo_tipo_antecedente_fk CASCADE;
ALTER TABLE public.ceuas_antecedente_atributo ADD CONSTRAINT antecedente_atributo_tipo_antecedente_fk FOREIGN KEY (tipo_antecedente_id)
REFERENCES public.ceuas_tipo_antecedente (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: antecedente_tipo_antecedente_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_antecedente DROP CONSTRAINT IF EXISTS antecedente_tipo_antecedente_fk CASCADE;
ALTER TABLE public.ceuas_antecedente ADD CONSTRAINT antecedente_tipo_antecedente_fk FOREIGN KEY (tipo_antecedente_id)
REFERENCES public.ceuas_tipo_antecedente (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_antecedente_atributo_antecedente_atributo_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta_antecedente_atributo DROP CONSTRAINT IF EXISTS consulta_antecedente_atributo_antecedente_atributo_fk CASCADE;
ALTER TABLE public.ceuas_consulta_antecedente_atributo ADD CONSTRAINT consulta_antecedente_atributo_antecedente_atributo_fk FOREIGN KEY (antecedente_atributo_id)
REFERENCES public.ceuas_antecedente_atributo (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_antecedente_atributo_antecedente_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta_antecedente_atributo DROP CONSTRAINT IF EXISTS consulta_antecedente_atributo_antecedente_fk CASCADE;
ALTER TABLE public.ceuas_consulta_antecedente_atributo ADD CONSTRAINT consulta_antecedente_atributo_antecedente_fk FOREIGN KEY (antecedente_id)
REFERENCES public.ceuas_antecedente (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_antecedente_atributo_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta_antecedente_atributo DROP CONSTRAINT IF EXISTS consulta_antecedente_atributo_consulta_fk CASCADE;
ALTER TABLE public.ceuas_consulta_antecedente_atributo ADD CONSTRAINT consulta_antecedente_atributo_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complemento_consulta_antecedente_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_complemento_consulta_antecedente DROP CONSTRAINT IF EXISTS complemento_consulta_antecedente_consulta_fk CASCADE;
ALTER TABLE public.ceuas_complemento_consulta_antecedente ADD CONSTRAINT complemento_consulta_antecedente_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complemento_consulta_antecedente_tipo_antecedente_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_complemento_consulta_antecedente DROP CONSTRAINT IF EXISTS complemento_consulta_antecedente_tipo_antecedente_fk CASCADE;
ALTER TABLE public.ceuas_complemento_consulta_antecedente ADD CONSTRAINT complemento_consulta_antecedente_tipo_antecedente_fk FOREIGN KEY (tipo_antecedente_id)
REFERENCES public.ceuas_tipo_antecedente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_exame_fisico_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta_exame_fisico DROP CONSTRAINT IF EXISTS consulta_exame_fisico_consulta_fk CASCADE;
ALTER TABLE public.ceuas_consulta_exame_fisico ADD CONSTRAINT consulta_exame_fisico_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: consulta_exame_fisico_exame_fisico_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta_exame_fisico DROP CONSTRAINT IF EXISTS consulta_exame_fisico_exame_fisico_fk CASCADE;
ALTER TABLE public.ceuas_consulta_exame_fisico ADD CONSTRAINT consulta_exame_fisico_exame_fisico_fk FOREIGN KEY (exame_fisico_id)
REFERENCES public.ceuas_exame_fisico (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: consulta_queixa_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta_queixa DROP CONSTRAINT IF EXISTS consulta_queixa_consulta_fk CASCADE;
ALTER TABLE public.ceuas_consulta_queixa ADD CONSTRAINT consulta_queixa_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: consulta_queixa_queixa_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_consulta_queixa DROP CONSTRAINT IF EXISTS consulta_queixa_queixa_fk CASCADE;
ALTER TABLE public.ceuas_consulta_queixa ADD CONSTRAINT consulta_queixa_queixa_fk FOREIGN KEY (queixa_id)
REFERENCES public.ceuas_queixa (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: indicadores_exame_fisico_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_indicadores_exame_fisico DROP CONSTRAINT IF EXISTS indicadores_exame_fisico_consulta_fk CASCADE;
ALTER TABLE public.ceuas_indicadores_exame_fisico ADD CONSTRAINT indicadores_exame_fisico_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_aliementar_alimento_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_recordatorio_alimentar DROP CONSTRAINT IF EXISTS recordatorio_aliementar_alimento_fk CASCADE;
ALTER TABLE public.ceuas_recordatorio_alimentar ADD CONSTRAINT recordatorio_aliementar_alimento_fk FOREIGN KEY (alimento_id)
REFERENCES public.ceuas_alimento (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_alimentar_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_recordatorio_alimentar DROP CONSTRAINT IF EXISTS recordatorio_alimentar_consulta_fk CASCADE;
ALTER TABLE public.ceuas_recordatorio_alimentar ADD CONSTRAINT recordatorio_alimentar_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: recordatorio_alimentar_tipo_refeicao_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_recordatorio_alimentar DROP CONSTRAINT IF EXISTS recordatorio_alimentar_tipo_refeicao_fk CASCADE;
ALTER TABLE public.ceuas_recordatorio_alimentar ADD CONSTRAINT recordatorio_alimentar_tipo_refeicao_fk FOREIGN KEY (tipo_refeicao_id)
REFERENCES public.ceuas_tipo_refeicao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: responsavel_consulta_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_responsavel_consulta DROP CONSTRAINT IF EXISTS responsavel_consulta_consulta_fk CASCADE;
ALTER TABLE public.ceuas_responsavel_consulta ADD CONSTRAINT responsavel_consulta_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: complemento_recordatorio_alimentar_consulta_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_complemento_recordatorio_alimentar DROP CONSTRAINT IF EXISTS complemento_recordatorio_alimentar_consulta_fk CASCADE;
ALTER TABLE public.ceuas_complemento_recordatorio_alimentar ADD CONSTRAINT complemento_recordatorio_alimentar_consulta_fk FOREIGN KEY (consulta_id)
REFERENCES public.ceuas_consulta (id) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: ceuas_paciente_especialidade_especialidade_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente_especialidade DROP CONSTRAINT IF EXISTS ceuas_paciente_especialidade_especialidade_fk CASCADE;
ALTER TABLE public.ceuas_paciente_especialidade ADD CONSTRAINT ceuas_paciente_especialidade_especialidade_fk FOREIGN KEY (especialidade_id)
REFERENCES public.ceuas_especialidade (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: ceuas_paciente_especialidade_paciente_fk | type: CONSTRAINT --
-- ALTER TABLE public.ceuas_paciente_especialidade DROP CONSTRAINT IF EXISTS ceuas_paciente_especialidade_paciente_fk CASCADE;
ALTER TABLE public.ceuas_paciente_especialidade ADD CONSTRAINT ceuas_paciente_especialidade_paciente_fk FOREIGN KEY (paciente_id)
REFERENCES public.ceuas_paciente (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


