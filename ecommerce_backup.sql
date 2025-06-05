--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.5 (Ubuntu 13.5-0ubuntu0.21.04.1)

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
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    buyer_id uuid NOT NULL,
    product_id uuid NOT NULL,
    added_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (buyer_id, product_id, quantity, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, seller_id, category_name, is_active, created_at, updated_at, deleted_at) FROM stdin;
e3d044b5-32b5-488c-9cb2-10860ba768c0	488f76e6-b859-4150-8c57-8db74711c975	Electronics	t	2025-06-04 17:19:24.71+05:30	2025-06-04 17:19:24.71+05:30	\N
786dc2fc-64f3-420f-82e7-37b59a0bba0f	488f76e6-b859-4150-8c57-8db74711c975	Cloths	t	2025-06-05 09:33:46.962+05:30	2025-06-05 09:33:46.962+05:30	\N
231cf5df-a927-4f7a-b131-497479713b78	bf3a34e0-2926-42d2-983a-2e881c32b081	Cloths	t	2025-06-05 12:00:53.822+05:30	2025-06-05 12:00:53.822+05:30	\N
2729401c-3a8d-4123-8da4-8fba8024ebc7	bf3a34e0-2926-42d2-983a-2e881c32b081	Cloths	t	2025-06-05 12:05:36.699+05:30	2025-06-05 12:05:36.699+05:30	\N
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, price, quantity, created_at, updated_at) FROM stdin;
f05974ad-2d88-4290-93ec-a11e76b36de9	47b5cb10-529c-40c7-9135-11e0699b9620	726f1512-65bc-465e-bdd8-55e312e1cc8e	20000.00	10	2025-06-04 17:22:53.962+05:30	2025-06-04 17:22:53.962+05:30
72c51b27-ae8b-4e76-a7ef-80f952c49adc	47b5cb10-529c-40c7-9135-11e0699b9620	eb85c4d3-d22b-424e-9b73-8da9a2d79549	40000.00	10	2025-06-04 17:22:53.962+05:30	2025-06-04 17:22:53.962+05:30
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, seller_id, buyer_id, order_date, status, total_amount, delivery_address, created_at, updated_at) FROM stdin;
47b5cb10-529c-40c7-9135-11e0699b9620	488f76e6-b859-4150-8c57-8db74711c975	488f76e6-b859-4150-8c57-8db74711c975	2025-06-04 17:22:53.955+05:30	Pending	600000.00	123 Main Street, City	2025-06-04 17:22:53.956+05:30	2025-06-04 17:22:53.956+05:30
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, order_id, buyer_id, seller_id, amount, payment_method, payment_status, transaction_id, paid_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, seller_id, category_id, subcategory_id, product_name, description, price, quantity, image_url, is_active, created_at, updated_at, deleted_at) FROM stdin;
726f1512-65bc-465e-bdd8-55e312e1cc8e	488f76e6-b859-4150-8c57-8db74711c975	e3d044b5-32b5-488c-9cb2-10860ba768c0	a32952fd-b573-4f9b-a58c-e6eca1d669d7	IQOO	A cordless mouse is a wireless input device that lets you interact with your computer without the constraint of a physical cable. It relies on technologies like Bluetooth® or radio frequency to communicate with your computer, providing a more flexible and convenient experience. 	20000.00	5	\N	t	2025-06-04 17:21:00.1+05:30	2025-06-04 17:21:00.1+05:30	\N
eb85c4d3-d22b-424e-9b73-8da9a2d79549	488f76e6-b859-4150-8c57-8db74711c975	e3d044b5-32b5-488c-9cb2-10860ba768c0	a32952fd-b573-4f9b-a58c-e6eca1d669d7	IQOO 2	A cordless mouse is a wireless input device that lets you interact with your computer without the constraint of a physical cable. It relies on technologies like Bluetooth® or radio frequency to communicate with your computer, providing a more flexible and convenient experience. 	40000.00	5	https://res.cloudinary.com/dbxwglui1/image/upload/v1749038071/mh4zz9ylmkkorumqxwi4.jpg	t	2025-06-04 17:21:28.204+05:30	2025-06-04 17:24:32.42+05:30	2025-06-04 17:28:17.26+05:30
c9df5978-bfca-4892-92dc-a6787096708b	488f76e6-b859-4150-8c57-8db74711c975	e3d044b5-32b5-488c-9cb2-10860ba768c0	a32952fd-b573-4f9b-a58c-e6eca1d669d7	IQOO 2	A cordless mouse is a wireless input device that lets you interact with your computer without the constraint of a physical cable. It relies on technologies like Bluetooth® or radio frequency to communicate with your computer, providing a more flexible and convenient experience. 	40000.00	5	\N	t	2025-06-04 17:40:52.785+05:30	2025-06-04 17:40:52.785+05:30	\N
7af50e84-7d5a-4cc8-962f-e6868a02d308	488f76e6-b859-4150-8c57-8db74711c975	e3d044b5-32b5-488c-9cb2-10860ba768c0	a32952fd-b573-4f9b-a58c-e6eca1d669d7	IQOO z6	A cordless mouse is a wireless input device that lets you interact with your computer without the constraint of a physical cable. It relies on technologies like Bluetooth® or radio frequency to communicate with your computer, providing a more flexible and convenient experience. 	40000.00	5	https://res.cloudinary.com/dbxwglui1/image/upload/v1749039902/xo6d6thjzscqvcmazxi9.jpg	t	2025-06-04 17:54:44.239+05:30	2025-06-04 17:55:02.462+05:30	\N
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, order_id, product_id, seller_id, buyer_id, rating, comment, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sub_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_categories (id, seller_id, category_id, sub_category_name, is_active, created_at, updated_at, deleted_at) FROM stdin;
a32952fd-b573-4f9b-a58c-e6eca1d669d7	488f76e6-b859-4150-8c57-8db74711c975	e3d044b5-32b5-488c-9cb2-10860ba768c0	Mobile	t	2025-06-04 17:19:49.559+05:30	2025-06-04 17:19:49.559+05:30	\N
44cf3554-a346-42a8-8680-88c65d684c0e	488f76e6-b859-4150-8c57-8db74711c975	e3d044b5-32b5-488c-9cb2-10860ba768c0	Mobile 1	t	2025-06-04 17:19:55.846+05:30	2025-06-04 17:19:55.846+05:30	\N
2af0572c-af82-45b7-a62a-9118372f279d	488f76e6-b859-4150-8c57-8db74711c975	786dc2fc-64f3-420f-82e7-37b59a0bba0f	shirt updated	t	2025-06-05 09:34:18.664+05:30	2025-06-05 09:37:24.132+05:30	2025-06-05 09:37:46.626+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password_hash, role, phone_number, is_active, created_at, updated_at, deleted_at) FROM stdin;
488f76e6-b859-4150-8c57-8db74711c975	 Parth	Khambhadiya	parthkhmbhadiya1234@gmail.com	$2b$10$Bqo/d.LFXxrr6TTHbUIrdeIkfPKS2jx2NYNS5lBXS69CXeoybYrM.	buyer	+911234567890	t	2025-06-04 16:58:20.338+05:30	2025-06-05 12:21:33.724+05:30	\N
\.


--
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist (buyer_id, product_id, added_at, created_at, updated_at, deleted_at, id) FROM stdin;
488f76e6-b859-4150-8c57-8db74711c975	726f1512-65bc-465e-bdd8-55e312e1cc8e	2025-06-05 09:52:19.812+05:30	2025-06-05 09:52:19.812+05:30	2025-06-05 09:52:19.812+05:30	2025-06-05 09:53:53.962+05:30	96475b6f-23d7-452e-b888-0f19ea127c7d
488f76e6-b859-4150-8c57-8db74711c975	726f1512-65bc-465e-bdd8-55e312e1cc8e	2025-06-05 09:52:56.419+05:30	2025-06-05 09:52:56.419+05:30	2025-06-05 09:52:56.419+05:30	2025-06-05 09:53:53.962+05:30	554da997-75c3-415a-8a77-691677630386
488f76e6-b859-4150-8c57-8db74711c975	726f1512-65bc-465e-bdd8-55e312e1cc8e	2025-06-05 09:54:14.153+05:30	2025-06-05 09:54:14.153+05:30	2025-06-05 09:54:14.153+05:30	2025-06-05 09:55:30.159+05:30	5b3cc7a4-958d-4964-b61b-93fa196a695e
488f76e6-b859-4150-8c57-8db74711c975	726f1512-65bc-465e-bdd8-55e312e1cc8e	2025-06-05 09:56:09.524+05:30	2025-06-05 09:56:09.525+05:30	2025-06-05 09:56:09.525+05:30	2025-06-05 09:56:18.347+05:30	7624079e-074f-4626-96db-e812759c0fa7
488f76e6-b859-4150-8c57-8db74711c975	726f1512-65bc-465e-bdd8-55e312e1cc8e	2025-06-05 09:56:10.475+05:30	2025-06-05 09:56:10.475+05:30	2025-06-05 09:56:10.475+05:30	2025-06-05 09:56:18.347+05:30	42c6b01c-f9e6-4dcb-a9b5-8cb24a1647c6
488f76e6-b859-4150-8c57-8db74711c975	726f1512-65bc-465e-bdd8-55e312e1cc8e	2025-06-05 09:58:02.403+05:30	2025-06-05 09:58:02.404+05:30	2025-06-05 09:58:02.404+05:30	2025-06-05 09:58:11.348+05:30	fbf266cc-0d94-4b6b-9893-536445fdedd8
488f76e6-b859-4150-8c57-8db74711c975	726f1512-65bc-465e-bdd8-55e312e1cc8e	2025-06-05 09:58:03.236+05:30	2025-06-05 09:58:03.236+05:30	2025-06-05 09:58:03.236+05:30	2025-06-05 09:58:11.348+05:30	c14bd64e-c96f-464d-bea1-8271187bc3a8
\.


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (buyer_id, product_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id, seller_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: sub_categories sub_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_pkey PRIMARY KEY (id, seller_id, category_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (id);


--
-- Name: cart_items fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: wishlist fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: orders fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: payments fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: reviews fk_buyer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: products fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id, seller_id) REFERENCES public.categories(id, seller_id) ON DELETE SET NULL;


--
-- Name: order_items fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- Name: payments fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- Name: reviews fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- Name: cart_items fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: wishlist fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: order_items fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: reviews fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: products fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: orders fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: payments fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: reviews fk_seller; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: products fk_subcategory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_subcategory FOREIGN KEY (subcategory_id, seller_id, category_id) REFERENCES public.sub_categories(id, seller_id, category_id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

