// backend/data.js

export const products = [
  {
    catId: 1,
    category: 'Protein',
    image: 'http://localhost:5000/images/protein1.png',
    products: [
      {
        productId: 11,
        name: "Nitrotech Ripped Whey Protein",
        price: 26000,
        flavor: ['Chocolate'],
        weight: '1.82kg',
        image: 'http://localhost:5000/images/protein1.png',
      },
      {
        productId: 12,
        name: "Rule One Whey Protein",
        price: 23000,
        flavor: '',
        weight: '',
        image: 'http://localhost:5000/images/protein2.png',
      },
      {
        productId: 13,
        name: "On Whey Protein 80 servings",
        price: 34000,
        flavor: ['Chocolate'],
        weight: '2.27kg',
        image: 'http://localhost:5000/images/protein3.png',
      },
      {
        productId: 14,
        name: "Kevin Levrone Gold Whey Protein",
        price: 24000,
        flavor: ['Chocolate'],
        weight: '2kg',
        image: 'http://localhost:5000/images/protein4.png',
      },
    ]
  },
  {
    catId: 2,
    category: 'Creatine',
    image: 'http://localhost:5000/images/creatine1.png',
    products: [
      {
        productId: 21,
        name: "Anobolic Creatine 60 Servings",
        price: 8000,
        weight: '300g',
        flavor: '',
        image: 'http://localhost:5000/images/creatine1.png',
      },
      {
        productId: 22,
        name: "RedRex Creatine 60 Servings",
        price: 23000,
        weight: '300g',
        flavor: 'Mango',
        image: 'http://localhost:5000/images/creatine2.png',
      },
      {
        productId: 23,
        name: "Gold Creatine 100 Servings",
        price: 11000,
        weight: '300g',
        flavor: '',
        image: 'http://localhost:5000/images/creatine3.png',
      },
    ]
  },
  {
    catId: 3,
    category: 'Pre Workouts',
    image: 'http://localhost:5000/images/preworkout1.png',
    products: [
      {
        productId: 31,
        name: "Yeah Buddy Preworkout",
        price: 7000,
        weight: '270g',
        flavor: '',
        image: 'http://localhost:5000/images/preworkout1.png',
      },
      {
        productId: 32,
        name: "C4 Preworkout",
        price: 7000,
        weight: '227g',
        flavor: '',
        image: 'http://localhost:5000/images/preworkout2.png',
      },
    ]
  },
  {
    catId: 4,
    category: 'Weight Gainers',
    image: 'http://localhost:5000/images/weight-gainer1.png',
    products: [
      {
        productId: 41,
        name: "Anabolic Mass Gainer",
        price: 28000,
        weight: '7kg',
        flavor: '',
        image: 'http://localhost:5000/images/weight-gainer1.png',
      },
    ]
  },
];
