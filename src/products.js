import proteinImg from './assets/protein.png';
import creatineImg from './assets/creatine.png';
import preWorkoutImg from './assets/pre-workout.png';
import weightGainerImg from './assets/weight-gainer.png';
import aminoImg from './assets/amino-acid.png';
import vitaminsImg from './assets/vitamins-and-minerals.png';

const products = [
    {
        id: 1,
        category: 'Protein',
        name: 'GEM Whey Protein',
        price: 79.99,
        image: proteinImg,
        rating: 4.8,
        description:
            'High-quality whey protein powder designed to help build lean muscle, improve recovery, and enhance strength after every workout.'
    },
    {
        id: 2,
        category: 'Creatine',
        name: 'GEM Micronized Creatine',
        price: 34.99,
        image: creatineImg,
        rating: 4.6,
        description:
            'Pure micronized creatine monohydrate that boosts ATP production for more power, endurance, and muscle growth during high-intensity workouts.'
    },
    {
        id: 3,
        category: 'Pre Workouts',
        name: 'GEM Power Rush Pre-Workout',
        price: 42.99,
        image: preWorkoutImg,
        rating: 4.7,
        description:
            'Explosive energy and focus formula with caffeine, beta-alanine, and L-citrulline to maximize your training performance and stamina.'
    },
    {
        id: 4,
        category: 'Weight Gainers',
        name: 'GEM Mass Gainer',
        price: 64.99,
        image: weightGainerImg,
        rating: 4.5,
        description:
            'High-calorie, nutrient-rich mass gainer blend loaded with protein, carbs, and essential vitamins to help you gain healthy weight and size.'
    },
    {
        id: 5,
        category: 'Amino Acid',
        name: 'GEM BCAA Complex',
        price: 29.99,
        image: aminoImg,
        rating: 4.4,
        description:
            'Advanced BCAA formula with L-Leucine, L-Isoleucine, and L-Valine to prevent muscle breakdown, support recovery, and boost endurance.'
    },
    {
        id: 6,
        category: 'Vitamins and Minerals',
        name: 'GEM Daily Multivitamin',
        price: 24.99,
        image: vitaminsImg,
        rating: 4.9,
        description:
            'A complete multivitamin packed with essential vitamins and minerals to maintain energy, immunity, and overall daily wellness.'
    }
];

export default products;
