db.createUser(
    {
        user: "user",
        pwd: "9TF5KKZSu9kDQbxj",
        roles: [
            {
                role: "readWrite",
                db: "learnify"
            }
        ]
    }
);

db = db.getSiblingDB('learnify');

db.createCollection('users');
/*
db.users.createIndex( { name: 1 }, { unique: true } )
db.users.createIndex( { email: 1 }, { unique: true } )*/

db.users.insert(
    {
        "_id": {
            "$oid": "625e57b6c54aaf057108c5de"
        },
        "email": "user@battlecode.com",
        "username": "user",
        "salt": "76eea91b1c177fc1ab64682bcfeab77f1e0d64ccbcb2babb0327e4d8deea589c",
        "hash": "4a905843630d34428bfd1763c0113de09baa0225d1939c3db32a68333f2ecff21f94e93d5983a62b99baa044a28626c34a19b771e7716bd18972790cff694279825c9d9a645c6b52d99dde0380f30cac85dc6964daf4385dbb22b68d28ad58a70227896aa5b26110f1505fbf5b261d9d24617a2aec7cb2575061b9fc7dfab9953e6f186f920e838dd7a3f83e3b7fa40ee0b7bc18f72d533eb76846e9fe24939a0f0249c015ce20a7f20816792e69e3623452f0a1792c8e75c8e5fa40b0cca517862224bb9500acd4dc29a2cbbbe3db9fc7f1cba148eaefac485de001100612aca4e4cfa61aab405022c47d875dafad5d4afeade4df94289dd01c5e8a101a8261bb8f0412c333efc5733eaf27bb097a47224d7a26c02189f5bf083d44e27db1288067ebbf12c6bbc999ec0c4abd5a1983182690d7a3edd1e9c86cba00a866edb8cc2bd669b4f9af808b5fed9e6c7ff17ae73435ff406e81674f22a8159822851ae92448c185a64dd191dd8d068eee70aa41206b61760e8b0a0276bc0eb9ab49aecddbdb7cfe29c591ac3f009707518c64c9cc4410ff6f29ee1b8075509b6c4357ee5874a128af0c96be55c5b4f3740c710cf97a6fe9bc1468101496ce60448e01047aa83035497713cf7b8204e149e6d35e61d366d7932c9c45dc8e183813514afb1dd5b5e49fc9c541c91ecad8f58996dca8fe31ff7469d8da22c1bc1620bd2e",
        "__v": 0
    }
);