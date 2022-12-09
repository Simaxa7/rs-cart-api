--create table if not exists carts (
--	id uuid primary key default uuid_generate_v4(),
--	created_at date not null,
--	updated_at date not null
--)

--create table if not exists cart_items (
--	product_id uuid,
--	title text not null,
--	description text,
--	price integer,
--	cart_id uuid,
--	count integer,
--	foreign key ("cart_id") references "carts" ("id")
--)


--insert into carts (id, created_at, updated_at) values
--('838af134-3cba-4931-12aa-11406ff111c5','2022-01-22', '2022-03-22')


--insert into cart_items (product_id, cart_id, count, title, description, price) values
--('7f48b51a-870e-4f08-bfdc-9386f242c830', '838af134-3cba-4931-12aa-11406ff111c5', 2, 'Wallpaper modern', 'Product 102', 104),
--('228c66b8-e608-4a1f-b206-bb7a46aa9230', '838af134-3cba-4931-12aa-11406ff111c5', 3, 'Wallpaper for kitchen', 'Product 103', 56),
--('d1003e61-601b-4b7d-bd40-beeef964edba', '838af134-3cba-4931-12aa-11406ff111c5', 4, 'Wallpaper for disco', 'Product 104', 74),
--('09faf952-1c2e-4c08-99ec-081dc9a953d8', '838af134-3cba-4931-12aa-11406ff111c5', 1, 'Wallpaper for garage', 'Product 105',13),
--('e8b85028-6e8e-44b2-bbf4-752743edd42a', '838af134-3cba-4931-12aa-11406ff111c5', 1, 'Wallpaper for you', 'Product 106',27),
--('d4b84e5a-a16e-44fc-aa41-9544dfdb520a', '838af134-3cba-4931-12aa-11406ff111c5', 1, 'Wallpaper for space', 'Product 109',32)
