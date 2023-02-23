// seeders/userSeeder.js

const { faker } = require("@faker-js/faker");
const User = require("../models/User");

faker.locale = "en";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
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
    const randomFollowAmount = faker.datatype.number({ min: 0, max: users.length });
    for (let i = 0; i < randomFollowAmount; i++) {
      const randomUser = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
      if (
        users.indexOf(randomUser) !== users.indexOf(user) &&
        !user.following.includes(randomUser._id)
      ) {
        user.following.push(randomUser._id);
        randomUser.followers.push(user._id);
        await randomUser.save();
      }
    }
    await user.save();
  }
};

console.log("[Database] Se corrió el seeder de Users.");
