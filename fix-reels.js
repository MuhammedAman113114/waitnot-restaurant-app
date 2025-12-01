// Script to add reels to the database
const fs = require('fs');
const path = require('path');

const reelsPath = path.join(__dirname, 'server', 'data', 'reels.json');

const newReels = [
  {
    "_id": "reel_pizza_paradise_v3",
    "restaurantId": "midc8u9d91l99mo7yxq",
    "videoUrl": "/videos/v3.mp4",
    "dishName": "Margherita Pizza",
    "price": 300,
    "views": 0,
    "likes": 0,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "_id": "reel_spice_garden_v2",
    "restaurantId": "midc8u7tc3cqndc1r26",
    "videoUrl": "/videos/V2.mp4",
    "dishName": "Paneer Tikka",
    "price": 250,
    "views": 0,
    "likes": 0,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "_id": "reel_burger_hub_v1",
    "restaurantId": "midc8uax60xh1mcd1d",
    "videoUrl": "/videos/v1.mp4",
    "dishName": "Classic Burger",
    "price": 180,
    "views": 0,
    "likes": 0,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  }
];

try {
  // Read existing reels
  let existingReels = [];
  if (fs.existsSync(reelsPath)) {
    const data = fs.readFileSync(reelsPath, 'utf8');
    existingReels = JSON.parse(data);
  }

  // Remove any existing reels with the same IDs
  const filteredReels = existingReels.filter(reel => 
    !['reel_pizza_paradise_v3', 'reel_spice_garden_v2', 'reel_burger_hub_v1'].includes(reel._id)
  );

  // Add new reels
  const updatedReels = [...filteredReels, ...newReels];

  // Write back to file
  fs.writeFileSync(reelsPath, JSON.stringify(updatedReels, null, 2));

  console.log('✅ Reels added successfully!');
  console.log(`📊 Total reels: ${updatedReels.length}`);
  console.log('\n📹 Added reels:');
  newReels.forEach(reel => {
    console.log(`  - ${reel.dishName} (${reel.videoUrl})`);
  });
  console.log('\n🔄 Please restart the server to see changes.');

} catch (error) {
  console.error('❌ Error adding reels:', error.message);
  process.exit(1);
}
