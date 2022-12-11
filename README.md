# MYOS Shopping API

Steps to run this project:

1. Run `npm i` command
2. Run `npm run build` command
3. Run `npm start` command
4. The server by default starts at port 3000
5. Navigate to http://localhost:3000/graphql to test out the Product API

# GraphQL Queries

**Create order**
```
mutation create {
  createOrder(
    orders: [
      { id: "6fb77aa3-91a8-42a2-b2c4-567d6b545143", quantity: 1 }, // id has to be a valid product id
      { id: "3e6662aa-4534-4c06-8dde-e6dae5ce0cef", quantity: 5 }, // id has to be a valid product id
    ]
  ) {
    id
    quantity
  }
}
```

**Get Products sort by price desc**
```
query get {
  getProducts(orderBy:{ price: "desc"}) {
    id,
    title,
    description,
    price,
    picture,
    quantity
  }
}
```

**Get Products sort by price asc**
```
query get {
  getProducts(orderBy:{ price: "asc"}) {
    id,
    title,
    description,
    price,
    picture,
    quantity
  }
}
```

**Get Products without any filters**
```
query get {
  getProducts {
    id,
    title,
    description,
    price,
    picture,
    quantity
  }
}
```

**Get Products by Title**
```
query get {
  getProductsByTitleOrDescription(title: "Pizza") {
    id,
    title,
    description,
    price,
    picture,
    quantity
  }
}
```

**Get Products By Description**
```
query get {
  getProductsByTitleOrDescription(description: "Pizza") {
    id,
    title,
    description,
    price,
    picture,
    quantity
  }
}
```

**Get Products by Title & Description**
```
query get {
  getProductsByTitleOrDescription(title:"Burger", description: "Pizza") {
    id,
    title,
    description,
    price,
    picture,
    quantity
  }
}
```

**Sample Runs**
<img width="1674" alt="image" src="https://user-images.githubusercontent.com/46570018/206911234-c9c0f924-a11d-4cfa-bbb1-6277cc8a19c5.png">

<img width="1680" alt="image" src="https://user-images.githubusercontent.com/46570018/206911269-bba71ad9-7117-41ca-942b-d71d3235d4cd.png">


# Database

I've used sqlite3 for this app as it has the capability to serve as an in-memory database and to make the app easier to run. 
During each run, a seed script will be triggered to clear all data in the database and reinsert data in product table with new id.

# Unit Testing

Unit testing is added in the app using jest

<img width="785" alt="image" src="https://user-images.githubusercontent.com/46570018/206911007-19d5555a-5031-4165-ac94-7b664c7e8ee0.png">
