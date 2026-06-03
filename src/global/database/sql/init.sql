--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

-- Started on 2023-04-06 20:16:25 -04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 24290)
-- Name: departamento; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.departamento (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 24295)
-- Name: distrito; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.distrito (
    id integer NOT NULL,
    id_departamento integer NOT NULL,
    nombre character varying(150) NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 24280)
-- Name: local; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.local (
    id integer NOT NULL,
    nombre character varying(200) NOT NULL,
    id_zona integer NOT NULL,
    id_distrito integer NOT NULL,
    id_departamento integer NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 24275)
-- Name: votante; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votante (
    ci integer NOT NULL,
    nombres character varying(80) NOT NULL,
    apellidos character varying(80) NOT NULL,
    id_local integer NOT NULL,
    id_zona integer NOT NULL,
    id_distrito integer NOT NULL,
    id_departamento integer NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 24285)
-- Name: votante_local; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votante_local (
    ci_votante_carga integer NOT NULL,
    ci_votante integer NOT NULL
);

--
-- TOC entry 207 (class 1259 OID 24300)
-- Name: zona; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zona (
    id integer NOT NULL,
    nombre character varying(100),
    id_distrito integer NOT NULL,
    id_departamento integer NOT NULL
);


--
-- TOC entry 210 (class 1259 OID 24347)
-- Name: vw_votantes; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.vw_votantes AS
 SELECT votante.ci,
    votante.nombres,
    votante.apellidos,
    votante.id_local AS idlocal,
    local.nombre AS local,
    votante.id_zona AS idzona,
    zona.nombre AS zona,
    votante.id_distrito AS iddistrito,
    distrito.nombre AS distrito,
    votante.id_departamento AS iddepartamento,
    departamento.nombre AS departamento,
        CASE
            WHEN (votante_local.ci_votante IS NOT NULL) THEN true
            ELSE false
        END AS agregado
   FROM (((((public.votante
     JOIN public.local ON (((local.id = votante.id_local) AND (local.id_zona = votante.id_zona) AND (local.id_distrito = votante.id_distrito) AND (local.id_departamento = votante.id_departamento))))
     JOIN public.zona ON (((zona.id = votante.id_zona) AND (zona.id_distrito = votante.id_distrito) AND (zona.id_departamento = votante.id_departamento))))
     JOIN public.distrito ON (((distrito.id = votante.id_distrito) AND (distrito.id_departamento = votante.id_departamento))))
     JOIN public.departamento ON ((departamento.id = votante.id_departamento)))
     LEFT JOIN public.votante_local ON ((votante_local.ci_votante = votante.ci)));


--
-- TOC entry 211 (class 1259 OID 24353)
-- Name: vw_resumen_locales; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.vw_resumen_locales AS
 SELECT count(*) AS cantidad,
    vw_votantes.idlocal,
    vw_votantes.local,
    vw_votantes.idzona,
    vw_votantes.zona,
    vw_votantes.iddistrito,
    vw_votantes.distrito,
    vw_votantes.iddepartamento,
    vw_votantes.departamento
   FROM public.vw_votantes
  WHERE (vw_votantes.ci IN ( SELECT votante_local.ci_votante
           FROM public.votante_local))
  GROUP BY vw_votantes.idlocal, vw_votantes.local, vw_votantes.idzona, vw_votantes.zona, vw_votantes.iddistrito, vw_votantes.distrito, vw_votantes.iddepartamento, vw_votantes.departamento;


--
-- TOC entry 2837 (class 2606 OID 24294)
-- Name: departamento departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id);


--
-- TOC entry 2839 (class 2606 OID 24299)
-- Name: distrito pk_distrito; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.distrito
    ADD CONSTRAINT pk_distrito PRIMARY KEY (id_departamento, id);


--
-- TOC entry 2833 (class 2606 OID 24284)
-- Name: local pk_local; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.local
    ADD CONSTRAINT pk_local PRIMARY KEY (id, id_distrito, id_zona, id_departamento);


--
-- TOC entry 2841 (class 2606 OID 24304)
-- Name: zona pk_zona; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zona
    ADD CONSTRAINT pk_zona PRIMARY KEY (id, id_distrito, id_departamento);


--
-- TOC entry 2835 (class 2606 OID 24289)
-- Name: votante_local votante_local_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votante_local
    ADD CONSTRAINT votante_local_pkey PRIMARY KEY (ci_votante, ci_votante_carga);


--
-- TOC entry 2831 (class 2606 OID 24279)
-- Name: votante votante_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votante
    ADD CONSTRAINT votante_pkey PRIMARY KEY (ci);


--
-- TOC entry 2848 (class 2606 OID 24325)
-- Name: distrito fk_departamento_distrito; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.distrito
    ADD CONSTRAINT fk_departamento_distrito FOREIGN KEY (id_departamento) REFERENCES public.departamento(id) NOT VALID;


--
-- TOC entry 2845 (class 2606 OID 24310)
-- Name: local fk_local_zona; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.local
    ADD CONSTRAINT fk_local_zona FOREIGN KEY (id_zona, id_distrito, id_departamento) REFERENCES public.zona(id, id_distrito, id_departamento) NOT VALID;


--
-- TOC entry 2844 (class 2606 OID 24305)
-- Name: votante fk_votante_local; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votante
    ADD CONSTRAINT fk_votante_local FOREIGN KEY (id_local, id_zona, id_distrito, id_departamento) REFERENCES public.local(id, id_zona, id_distrito, id_departamento) NOT VALID;


--
-- TOC entry 2849 (class 2606 OID 24330)
-- Name: zona fk_zona_distrito; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.zona
    ADD CONSTRAINT fk_zona_distrito FOREIGN KEY (id_distrito, id_departamento) REFERENCES public.distrito(id, id_departamento) NOT VALID;


--
-- TOC entry 2846 (class 2606 OID 24315)
-- Name: votante_local votante_local_ci_votante_carga_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votante_local
    ADD CONSTRAINT votante_local_ci_votante_carga_fkey FOREIGN KEY (ci_votante_carga) REFERENCES public.votante(ci) NOT VALID;


--
-- TOC entry 2847 (class 2606 OID 24320)
-- Name: votante_local votante_local_ci_votante_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votante_local
    ADD CONSTRAINT votante_local_ci_votante_fkey FOREIGN KEY (ci_votante) REFERENCES public.votante(ci) NOT VALID;


-- Completed on 2023-04-06 20:16:25 -04

--
-- PostgreSQL database dump complete
--

