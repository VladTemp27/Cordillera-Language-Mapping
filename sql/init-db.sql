--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-24 19:04:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 224 (class 1259 OID 16448)
-- Name: ethnic_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ethnic_groups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- TOC entry 223 (class 1259 OID 16447)
-- Name: ethnic_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ethnic_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 223
-- Name: ethnic_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ethnic_groups_id_seq OWNED BY public.ethnic_groups.id;


--
-- TOC entry 220 (class 1259 OID 16399)
-- Name: languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16398)
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 219
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- TOC entry 226 (class 1259 OID 16457)
-- Name: province_ethnic_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.province_ethnic_groups (
    id integer NOT NULL,
    province_id integer,
    ethnic_group_id integer
);


--
-- TOC entry 225 (class 1259 OID 16456)
-- Name: province_ethnic_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.province_ethnic_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 225
-- Name: province_ethnic_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.province_ethnic_groups_id_seq OWNED BY public.province_ethnic_groups.id;


--
-- TOC entry 222 (class 1259 OID 16408)
-- Name: province_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.province_languages (
    id integer NOT NULL,
    province_id integer,
    language_id integer,
    household_count integer NOT NULL,
    percentage numeric(5,2) NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: province_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.province_languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 221
-- Name: province_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.province_languages_id_seq OWNED BY public.province_languages.id;


--
-- TOC entry 218 (class 1259 OID 16390)
-- Name: provinces; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    history text
);


--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.provinces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 217
-- Name: provinces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.provinces_id_seq OWNED BY public.provinces.id;


--
-- TOC entry 4765 (class 2604 OID 16451)
-- Name: ethnic_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ethnic_groups ALTER COLUMN id SET DEFAULT nextval('public.ethnic_groups_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 16402)
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 16460)
-- Name: province_ethnic_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_ethnic_groups ALTER COLUMN id SET DEFAULT nextval('public.province_ethnic_groups_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 16411)
-- Name: province_languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_languages ALTER COLUMN id SET DEFAULT nextval('public.province_languages_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 16393)
-- Name: provinces id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provinces ALTER COLUMN id SET DEFAULT nextval('public.provinces_id_seq'::regclass);


--
-- TOC entry 4941 (class 0 OID 16448)
-- Dependencies: 224
-- Data for Name: ethnic_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ethnic_groups (id, name, description) FROM stdin;
1	Ilocano	The most common ethnicity in the Cordillera Administrative Region (CAR) as of 2020, comprising 22.1% of the total household population. They are found mostly in Abra (58.1% of Abra's population) and Baguio City.
2	Kankanaey	The second major ethnic group in CAR as of 2020, comprising 19.0% of the regional household population. They are located mostly in Benguet (46.6% of Benguet's population), Baguio City, and Mountain Province.
3	Kalinga	The third largest ethnic group in CAR as of 2020, comprising 10.1% of the regional household population. Predominantly found in Kalinga province where they make up 67.5% of the household population.
4	Ibaloy	The fourth largest ethnic group in CAR as of 2020, comprising 8.9% of the regional household population. Most Ibaloys are located in Benguet.
5	Itneg/Tinguian	Comprises 5.6% of CAR's total regional household population as of 2020. The majority (92.2%) of this ethnic group in the region is found in Abra province.
6	Tuwali	Comprises 4.3% of CAR's total regional household population as of 2020.
7	Ayangan	Comprises 3.9% of CAR's total regional household population as of 2020.
8	Tagalog	Comprises 3.5% of CAR's total regional household population as of 2020.
9	Applai	Comprises 3.1% of CAR's total regional household population as of 2020.
10	Kalanguya	Comprises 2.8% of CAR's total regional household population as of 2020.
11	Bontok	Comprises 2.5% of CAR's total regional household population as of 2020.
\.


--
-- TOC entry 4937 (class 0 OID 16399)
-- Dependencies: 220
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.languages (id, name) FROM stdin;
1	Ilocano
2	Itneg/Tinguian-Maeng
3	Itneg/Tinguian-Masadiit
4	Itneg/Tinguian-Adasen
5	Itneg/Tinguian-Inlaud
6	Isnag
7	Malaueg
8	Kalinga
9	Tagalog
10	Kankanaey
11	Ibaloi/Ibaloy
12	English
13	Pangasinan
14	Tuwali
15	Ayangan
16	Kalanguya
17	Ayangan-Henanga
18	Baliwon
19	Sinadanga
20	Applai
21	Bontok
22	Balangao
\.


--
-- TOC entry 4943 (class 0 OID 16457)
-- Dependencies: 226
-- Data for Name: province_ethnic_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.province_ethnic_groups (id, province_id, ethnic_group_id) FROM stdin;
1	1	1
2	1	5
3	16	1
4	16	2
5	16	3
6	16	5
7	3	2
8	3	3
9	3	4
10	2	1
11	2	3
12	2	5
13	6	3
14	5	1
15	7	1
16	7	2
\.


--
-- TOC entry 4939 (class 0 OID 16408)
-- Dependencies: 222
-- Data for Name: province_languages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.province_languages (id, province_id, language_id, household_count, percentage) FROM stdin;
1	1	1	44501	75.50
2	1	2	3090	5.20
3	1	3	2097	3.60
4	1	4	1816	3.10
5	1	5	1384	2.30
6	2	1	17673	61.20
7	2	6	7939	27.50
8	2	7	1077	3.70
9	2	8	687	2.40
10	2	9	332	1.20
11	3	10	42333	36.30
12	3	1	39527	33.90
13	3	11	19227	16.50
14	3	9	8532	7.30
15	3	16	3365	2.90
16	4	9	44623	44.50
17	4	1	44172	44.10
18	4	10	4311	4.30
19	4	12	1892	1.90
20	4	13	968	1.00
21	5	14	15739	32.30
22	5	15	13598	27.90
23	5	1	9566	19.60
24	5	16	5473	11.20
25	5	17	2128	4.40
26	6	8	25178	52.40
27	6	1	21149	44.00
28	6	9	780	1.60
29	6	18	153	0.32
30	6	19	146	0.30
31	7	10	11777	31.30
32	7	20	6744	17.90
33	7	21	5475	14.60
34	7	1	4989	13.30
35	7	22	2535	6.70
\.


--
-- TOC entry 4935 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.provinces (id, name, history) FROM stdin;
1	Abra	The history of Abra traces back to pre-colonial times when its inhabitants engaged in agriculture and trade along the Abra River. During World War II, Japanese forces occupied the province in 1942, and it was liberated by Filipino soldiers and guerrillas in 1945.
2	Apayao	Originally part of the larger Mountain Province established in 1908, Apayao became a sub-province under Kalinga-Apayao in 1966. In 1995, it was separated to form its own province, emphasizing its unique cultural and geographical identity.
3	Benguet	Benguet was established as a province in 1899 under the First Philippine Republic. It became a sub-province of Mountain Province in 1908 and regained provincial status in 1966. The province is known for its rich cultural heritage and as a center for agriculture in the Cordillera region.
4	Baguio	Baguio was established as a hill station by the United States in 1900 at the site of an Ibaloi village known as Kafagway. It served as the summer capital of the Philippines and has grown into a major center for education and tourism in Northern Luzon.
5	Ifugao	Ifugao was separated from Nueva Vizcaya and annexed to the newly created Mountain Province in 1908. It is renowned for its ancient rice terraces and rich cultural traditions, including the Hudhud chants and woodcarving arts.
6	Kalinga	Kalinga was established as a sub-province in 1907 and later became part of Mountain Province in 1908. It gained provincial status in 1995. The province is known for its strong cultural identity, including traditional tattooing practices preserved by artists like Apo Whang-Od.
7	Mountain Province	Mountain Province was established in 1908 during American rule, encompassing several sub-provinces including Benguet, Bontoc, Ifugao, and Kalinga. In 1966, it was reorganized, and the current Mountain Province was formed, retaining Bontoc as its capital.
16	Baguio City	Baguio City, established in 1900, served as a hill station and the summer capital of the Philippines during American colonization. It has since evolved into a major urban center in the Cordillera region, known for its cool climate and cultural significance.
\.


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 223
-- Name: ethnic_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ethnic_groups_id_seq', 11, true);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 219
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.languages_id_seq', 44, true);


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 225
-- Name: province_ethnic_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.province_ethnic_groups_id_seq', 16, true);


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 221
-- Name: province_languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.province_languages_id_seq', 70, true);


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 217
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.provinces_id_seq', 21, true);


--
-- TOC entry 4780 (class 2606 OID 16455)
-- Name: ethnic_groups ethnic_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ethnic_groups
    ADD CONSTRAINT ethnic_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 16406)
-- Name: languages languages_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_name_key UNIQUE (name);


--
-- TOC entry 4774 (class 2606 OID 16404)
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- TOC entry 4782 (class 2606 OID 16462)
-- Name: province_ethnic_groups province_ethnic_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_ethnic_groups
    ADD CONSTRAINT province_ethnic_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 4784 (class 2606 OID 16464)
-- Name: province_ethnic_groups province_ethnic_groups_province_id_ethnic_group_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_ethnic_groups
    ADD CONSTRAINT province_ethnic_groups_province_id_ethnic_group_id_key UNIQUE (province_id, ethnic_group_id);


--
-- TOC entry 4776 (class 2606 OID 16413)
-- Name: province_languages province_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_languages
    ADD CONSTRAINT province_languages_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 16415)
-- Name: province_languages province_languages_province_id_language_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_languages
    ADD CONSTRAINT province_languages_province_id_language_id_key UNIQUE (province_id, language_id);


--
-- TOC entry 4768 (class 2606 OID 16397)
-- Name: provinces provinces_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_name_key UNIQUE (name);


--
-- TOC entry 4770 (class 2606 OID 16395)
-- Name: provinces provinces_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16470)
-- Name: province_ethnic_groups province_ethnic_groups_ethnic_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_ethnic_groups
    ADD CONSTRAINT province_ethnic_groups_ethnic_group_id_fkey FOREIGN KEY (ethnic_group_id) REFERENCES public.ethnic_groups(id) ON DELETE CASCADE;


--
-- TOC entry 4788 (class 2606 OID 16465)
-- Name: province_ethnic_groups province_ethnic_groups_province_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_ethnic_groups
    ADD CONSTRAINT province_ethnic_groups_province_id_fkey FOREIGN KEY (province_id) REFERENCES public.provinces(id) ON DELETE CASCADE;


--
-- TOC entry 4785 (class 2606 OID 16421)
-- Name: province_languages province_languages_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_languages
    ADD CONSTRAINT province_languages_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON DELETE CASCADE;


--
-- TOC entry 4786 (class 2606 OID 16416)
-- Name: province_languages province_languages_province_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.province_languages
    ADD CONSTRAINT province_languages_province_id_fkey FOREIGN KEY (province_id) REFERENCES public.provinces(id) ON DELETE CASCADE;


-- Completed on 2025-04-24 19:04:07

--
-- PostgreSQL database dump complete
--

