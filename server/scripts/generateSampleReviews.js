import { restaurantDB, reviewDB, initDB } from '../db.js';

const usernames = [
  'FoodLover', 'HungryTom', 'ChefMike', 'TastyFan', 
  'Gourmet123', 'FoodiePro', 'YummyEater', 'CuisineKing',
  'SpiceMaster', 'FlavorQueen', 'DishExpert', 'MealHunter',
  'TasteBuddy', 'FoodieLife', 'CulinaryFan', 'EpicEater'
];

const positiveComments = [
  'Absolutely delicious! Highly recommend.',
  'Great taste and perfect portion size.',
  'One of the best dishes I\'ve tried here.',
  'Fresh ingredients and amazing flavor.',
  'Worth every penny! Will order again.',
  'Exceeded my expectations!',
  'Perfect blend of spices.',
  'Cooked to perfection!',
  'My new favorite dish.',
  'Simply outstanding!',
  'Incredible taste and presentation.',
  'Best I\'ve had in a long time!',
  'Authentic and delicious.',
  'Perfectly seasoned and flavorful.',
  'A must-try dish!',
  'Absolutely loved it!',
  'Will definitely order again.',
  'Five stars all the way!',
  'Exceeded all expectations.',
  'Perfectly cooked and seasoned.'
];

const neutralComments = [
  'Good but could be better.',
  'Decent taste, nothing special.',
  'Not bad, but I\'ve had better.',
  'Average quality for the price.',
  'It was okay, might try something else next time.',
  'Satisfactory, but not exceptional.',
  'Fair enough for the price.',
  'Could use more seasoning.',
  'Decent portion size.',
  'Not my favorite, but okay.'
];

const generateRandomDate = () => {
  // Random date within last 60 days
  const now = Date.now();
  const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);
  const randomTime = sixtyDaysAgo + Math.random() * (now - sixtyDaysAgo);
  return new Date(randomTime);
};

const generateReviewsForItem = async (restaurantId, item, count = 5) => {
  const reviews = [];
  
  for (let i = 0; i < count; i++) {
    // 80% chance of 4-5 stars, 20% chance of 3 stars
    const rating = Math.random() < 0.8 
      ? Math.floor(Math.random() * 2) + 4  // 4-5 stars
      : 3;  // 3 stars
    
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const comments = rating >= 4 ? positiveComments : neutralComments;
    const comment = comments[Math.floor(Math.random() * comments.length)];
    
    const review = await reviewDB.create({
      restaurantId,
      itemId: item._id,
      itemName: item.name,
      userId: `sample_${Date.now()}_${i}`,
      username,
      rating,
      comment,
      createdAt: generateRandomDate()
    });
    
    reviews.push(review);
  }
  
  return reviews;
};

const generateAllReviews = async () => {
  try {
    console.log('🚀 Starting sample reviews generation...\n');
    
    // Initialize database
    await initDB();
    
    // Get all restaurants
    const restaurants = await restaurantDB.findAll();
    console.log(`📍 Found ${restaurants.length} restaurants\n`);
    
    let totalReviews = 0;
    
    for (const restaurant of restaurants) {
      console.log(`🍽️  Processing: ${restaurant.name}`);
      
      if (!restaurant.menu || restaurant.menu.length === 0) {
        console.log(`   ⚠️  No menu items found, skipping...\n`);
        continue;
      }
      
      for (const item of restaurant.menu) {
        // Generate 3-7 reviews per item
        const reviewCount = Math.floor(Math.random() * 5) + 3;
        const reviews = await generateReviewsForItem(restaurant._id, item, reviewCount);
        totalReviews += reviews.length;
        
        console.log(`   ✅ ${item.name}: ${reviews.length} reviews`);
      }
      
      console.log('');
    }
    
    console.log(`\n🎉 Success! Generated ${totalReviews} sample reviews for ${restaurants.length} restaurants!`);
    console.log(`\n📊 Average: ${(totalReviews / restaurants.length).toFixed(1)} reviews per restaurant`);
    
  } catch (error) {
    console.error('❌ Error generating reviews:', error);
    process.exit(1);
  }
};

// Run the script
generateAllReviews().then(() => {
  console.log('\n✨ Done!');
  process.exit(0);
});
