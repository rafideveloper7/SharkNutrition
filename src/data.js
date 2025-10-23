
import protein1 from './assets/protein1.png'
import protein2 from './assets/protein2.png'
import protein3 from './assets/protein3.png'
import protein4 from './assets/protein4.png'
import creatine1 from './assets/creatine1.png'
import creatine2 from './assets/creatine2.png'
import creatine3 from './assets/creatine3.png'
import preworkout1 from './assets/preworkout1.png'
import preworkout2 from './assets/preworkout2.png'
import weightGainer1 from './assets/weight-gainer1.png'

const products = [
    {
        catId: 1,
        category: 'Protein',
        image: protein1,
        products: [
            {
                productId: 11,
                name: "Nitrotech Ripped Whey Protein",
                price: 26000,
                flavor: ['Chocolate'],
                weight: '1.82kg',
                image: protein1,
                description: 'High-quality whey protein powder designed to help build lean muscle, improve recovery, and enhance strength after every workout.',
            },
            {
                productId: 12,
                name: "Rule One Whey Protein",
                price: 23000,
                flavor: '',
                weight: '',
                image: protein2,
                description: 'High-quality whey protein powder designed to help build lean muscle, improve recovery, and enhance strength after every workout.',
            },
            {
                productId: 13,
                name: "On Whey Protein 80 servings",
                price: 34000,
                flavor: ['Chocolate'],
                weight: '2.27kg',
                image: protein3,
                description: 'High-quality whey protein powder designed to help build lean muscle, improve recovery, and enhance strength after every workout.',
            },
            {
                productId: 14,
                name: "Kevin Levrone Gold Whey Protein",
                price: 24000,
                flavor: ['Chocolate'],
                weight: '2kg',
                image: protein4,
                description: 'High-quality whey protein powder designed to help build lean muscle, improve recovery, and enhance strength after every workout.',
            },
        ]
    },
    {
        catId: 2,
        category: 'Creatine',
        image: creatine1,
        products: [
            {
                productId: 21,
                name: "Anobolic Creatine 60 Servings",
                price: 8000,
                weight: '300g',
                flavor: '',
                image: creatine1,
                description: 'Pure micronized creatine monohydrate that boosts ATP production for more power, endurance, and muscle growth during high-intensity workouts.',
            },
            {
                productId: 22,
                name: "RedRex Creatine 60 Servings",
                price: 23000,
                weight: '300g',
                flavor: 'Mango',
                image: creatine2,
                description: 'Pure micronized creatine monohydrate that boosts ATP production for more power, endurance, and muscle growth during high-intensity workouts.',
            },
            {
                productId: 23,
                name: "Gold Creatine 100 Servings",
                price: 11000,
                weight: '300g',
                flavor: '',
                image: creatine3,
                description: 'Pure micronized creatine monohydrate that boosts ATP production for more power, endurance, and muscle growth during high-intensity workouts.',
            },
        ]
    },
    {
        catId: 3,
        category: 'Pre Workouts',
        image: preworkout1,
        products: [
            {
                productId: 31,
                name: "Yeah Buddy Preworkout",
                price: 7000,
                weight: '270g',
                flavor: '',
                image: preworkout1,
                description: 'Explosive energy and focus formula with caffeine, beta-alanine, and L-citrulline to maximize your training performance and stamina.',
            },
            {
                productId: 32,
                name: "C4 Preworkout",
                price: 7000,
                weight: '227g',
                flavor: '',
                image: preworkout2,
                description: 'Explosive energy and focus formula with caffeine, beta-alanine, and L-citrulline to maximize your training performance and stamina.',
            },
        ]
    },
    {
        catId: 4,
        category: 'Weight Gainers',
        image: weightGainer1,
        products: [
            {
                productId: 41,
                name: "Anabolic Mass Gainer",
                price: 28000,
                weight: '7kg',
                flavor: '',
                image: weightGainer1,
                description: 'High-calorie, nutrient-rich mass gainer blend loaded with protein, carbs, and essential vitamins to help you gain healthy weight and size.',
            },
        ]
    },
];


export { products };
