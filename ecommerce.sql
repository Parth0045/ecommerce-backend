--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.5 (Ubuntu 13.5-0ubuntu0.21.04.1)

-- Started on 2025-06-03 14:44:13 IST

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

--
-- TOC entry 666 (class 1247 OID 16935)
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'seller',
    'buyer'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 16800)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    buyer_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    CONSTRAINT cart_items_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16401)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    seller_id uuid NOT NULL,
    category_name character varying(100) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16859)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid,
    product_id uuid,
    price numeric(10,2),
    quantity integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_items_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16836)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    seller_id uuid,
    buyer_id uuid,
    order_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(255) DEFAULT 'Pending'::character varying,
    total_amount numeric(12,2),
    delivery_address text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16878)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid,
    buyer_id uuid,
    seller_id uuid,
    amount numeric(12,2),
    payment_method character varying(50),
    payment_status character varying(50) DEFAULT 'pending'::character varying,
    transaction_id character varying(255),
    paid_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16771)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    seller_id uuid NOT NULL,
    category_id uuid NOT NULL,
    subcategory_id uuid NOT NULL,
    product_name character varying(255),
    description text,
    price numeric(10,2),
    quantity integer,
    image_url text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    CONSTRAINT products_price_check CHECK ((price >= (0)::numeric)),
    CONSTRAINT products_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16902)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid,
    product_id uuid,
    seller_id uuid,
    buyer_id uuid,
    rating integer,
    comment text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16410)
-- Name: sub_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    seller_id uuid NOT NULL,
    category_id uuid NOT NULL,
    sub_category_name character varying(100) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


ALTER TABLE public.sub_categories OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16385)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    email character varying(255),
    password_hash character varying(255),
    role character varying(6) DEFAULT 'buyer'::character varying,
    phone_number character varying(20),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['seller'::character varying, 'buyer'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16818)
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    buyer_id uuid NOT NULL,
    product_id uuid NOT NULL,
    added_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- TOC entry 3145 (class 0 OID 16800)
-- Dependencies: 204
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (buyer_id, product_id, quantity, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 3142 (class 0 OID 16401)
-- Dependencies: 201
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, seller_id, category_name, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 3148 (class 0 OID 16859)
-- Dependencies: 207
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, price, quantity, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3147 (class 0 OID 16836)
-- Dependencies: 206
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, seller_id, buyer_id, order_date, status, total_amount, delivery_address, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3149 (class 0 OID 16878)
-- Dependencies: 208
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, order_id, buyer_id, seller_id, amount, payment_method, payment_status, transaction_id, paid_at, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3144 (class 0 OID 16771)
-- Dependencies: 203
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, seller_id, category_id, subcategory_id, product_name, description, price, quantity, image_url, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 3150 (class 0 OID 16902)
-- Dependencies: 209
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, order_id, product_id, seller_id, buyer_id, rating, comment, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3143 (class 0 OID 16410)
-- Dependencies: 202
-- Data for Name: sub_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_categories (id, seller_id, category_id, sub_category_name, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 3141 (class 0 OID 16385)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password_hash, role, phone_number, is_active, created_at, updated_at, deleted_at) FROM stdin;
99228b23-0348-47b9-ad68-256e796f831d	Parth k	khambhadiya	parthkhmbhadiya123244@gmail.com	$2b$10$ZhbWSpndNij2ksNN2aj3duC2I6apewVih1OArxYjjtd1jMi/It8KW	buyer	9327537382	t	2025-06-03 12:25:09.281+05:30	2025-06-03 12:25:09.281+05:30	\N
37a52b02-d488-4854-8868-3c7b55a97c8a	Parth k	khambhadiya	parthkhmbhadiya1234@gmail.com	$2b$10$si0sKar82EOs2kELc.W8J.YnymlqyaBP5zhpP0tcVV8fUKHQX2.Eu	buyer	9327537382	t	2025-06-03 12:25:59.086+05:30	2025-06-03 12:27:42.954+05:30	\N
\.


--
-- TOC entry 3146 (class 0 OID 16818)
-- Dependencies: 205
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist (buyer_id, product_id, added_at, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- TOC entry 2982 (class 2606 OID 16807)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (buyer_id, product_id);


--
-- TOC entry 2976 (class 2606 OID 16409)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id, seller_id);


--
-- TOC entry 2988 (class 2606 OID 16867)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 2986 (class 2606 OID 16848)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 2990 (class 2606 OID 16886)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 2980 (class 2606 OID 16784)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 2992 (class 2606 OID 16913)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 2978 (class 2606 OID 16418)
-- Name: sub_categories sub_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_pkey PRIMARY KEY (id, seller_id, category_id);


--
-- TOC entry 2972 (class 2606 OID 16400)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2974 (class 2606 OID 16398)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2984 (class 2606 OID 16825)
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (buyer_id, product_id);


--
-- TOC entry 2996 (class 2606 OID 16808)
-- Name: cart_items fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 2998 (class 2606 OID 16826)
-- Name: wishlist fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3001 (class 2606 OID 16854)
-- Name: orders fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3005 (class 2606 OID 16892)
-- Name: payments fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3010 (class 2606 OID 16929)
-- Name: reviews fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 2994 (class 2606 OID 16790)
-- Name: products fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id, seller_id) REFERENCES public.categories(id, seller_id) ON DELETE SET NULL;


--
-- TOC entry 3002 (class 2606 OID 16868)
-- Name: order_items fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- TOC entry 3004 (class 2606 OID 16887)
-- Name: payments fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- TOC entry 3007 (class 2606 OID 16914)
-- Name: reviews fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- TOC entry 2997 (class 2606 OID 16813)
-- Name: cart_items fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 2999 (class 2606 OID 16831)
-- Name: wishlist fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 3003 (class 2606 OID 16873)
-- Name: order_items fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- TOC entry 3008 (class 2606 OID 16919)
-- Name: reviews fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- TOC entry 2993 (class 2606 OID 16785)
-- Name: products fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3000 (class 2606 OID 16849)
-- Name: orders fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3006 (class 2606 OID 16897)
-- Name: payments fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3009 (class 2606 OID 16924)
-- Name: reviews fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 2995 (class 2606 OID 16795)
-- Name: products fk_subcategory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_subcategory FOREIGN KEY (subcategory_id, seller_id, category_id) REFERENCES public.sub_categories(id, seller_id, category_id) ON DELETE SET NULL;


-- Completed on 2025-06-03 14:44:17 IST

--
-- PostgreSQL database dump complete
--

