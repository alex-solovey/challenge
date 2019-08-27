#!/usr/bin/env node

const fs = require('fs')
const faker = require('faker')
const random = require('random')

const USERS = 1000;
const PRODUCTS = 200;
const ORDERS = 2000;

const INFLATION = 0.05;

const MONTH = 1000 * 60 * 60 * 24 * 30;

const ids = {}

function random_id()
{
    let id = faker.random.number();
    while (id in ids)
    {
        id = faker.random.number();
    }
    ids[id] = true;
    return id;
}

function selector(list, factor)
{
    let gen = random.normal(mu = list.length / 2, sigma = list.length / 2 / factor);
    return () => {
        let p = Math.floor(gen());
        if (p < 0 || p >= list.length)
        {
            p = Math.floor(Math.random() * list.length);
        }    
        return list[p];
    };
}

const users = [];

for (let i = 0; i < USERS; ++i)
{
    let user = {
        id: random_id(),
        name: faker.name.findName(),
        email: faker.internet.email(),
    };
    users.push(user);
}

const products = [];

for (let i = 0; i < PRODUCTS; ++i)
{
    let product = {
        id: random_id(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(2.0, 100.0, 2)) + 0.95,
    };
    products.push(product);
}

const orders = [];

const today = new Date().getTime();
const random_products = random.normal(mu = ORDERS / 12, sigma = ORDERS / 12 / 6);

const user_selector = selector(users, 2);
const product_selector = selector(products, 8);

const order_items_generator = random.normal(mu=5, sigma=2);

const items_count_generator = random.normal(mu=3, sigma=2);

for (let month = 12; month > 0; month--)
{
    let from = today - MONTH * month;
    let to = today - MONTH * (month - 1);
    let count = Math.floor(random_products());
    count = Math.max(count, ORDERS / 12 / 1.5);
    count = Math.min(count, (ORDERS / 12) * 1.5);
    for (let i = 0; i < count; ++i)
    {
        let user = user_selector();
        let items = [];
        let total = 0;

        let items_count = order_items_generator();
        if (items_count < 0 || items_count > 15)
        {
            items_count = 1 + Math.floor(Math.random() * 15);
        }

        for (let i = 0; i < items_count; ++i)
        {
            let product = product_selector();
            total += product.price;
            let count = Math.floor(items_count_generator());
            count = Math.max(count, 1);
            count = Math.min(count, 6);
            let item = {
                product_id: product.id,
                price: product.price,
                count: count
            };
            items.push(item);
        }

        let order = {
            id: random_id(),
            date: new Date(from + Math.floor(Math.random()*(to - from))),
            user_id: user.id,
            items: items,
            total: parseFloat(total.toFixed(2)),
        };
        orders.push(order);
    }
}

let db = {
    users,
    products,
    orders,
};

fs.writeFile('db.json', JSON.stringify(db), () => console.log("db.json created successfully"));
