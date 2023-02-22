const { faker } = require("@faker-js/faker");
const User = require("../models/User");

faker.locale = "en";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 3; i++) {
    users.push(
      new User({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        biography: faker.lorem.paragraph(),
        image: faker.image.avatar(),
      }),
    );
  }

  for (const user of users) {
    const followingCount = Math.floor(Math.random() * (users.length - 1)); // randomly select a number of users to follow between 0 and the number of users minus 1
    const followingSet = new Set(); // create a set to keep track of users already being followed

    while (followingSet.size < followingCount) {
      const randomUserIndex = Math.floor(Math.random() * users.length); // randomly select a user index

      if (randomUserIndex !== users.indexOf(user) && !followingSet.has(randomUserIndex)) {
        // ensure not following itself or a user that is already being followed
        const randomUser = users[randomUserIndex];
        user.following.push(randomUser._id); // add user to the following list
        randomUser.followers.push(user._id); // add the user to the followers list of the user being followed
        followingSet.add(randomUserIndex); // add user index to the set of users being followed
      }
    }

    await user.save();
  }
};

console.log("[Database] Se corrió el seeder de Users.");
