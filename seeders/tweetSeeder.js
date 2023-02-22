const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

faker.locale = "en";

module.exports = async () => {
  const tweets = [];

  for (let i = 0; i < 100; i++) {
    const randomUser = User.findOne().skip(math.random());
    tweets.push(
      new Tweet({
        content: faker.lorem.paragraph({ min: 1, max: 4 }),
        author: randomUser._id,
        likes: faker.dataType.number({ min: 0, max: 10 }),
      }),
    );

    randomUser.tweetlist.push(tweets);

    await randomUser.save();
  }

  await Tweets.insertMany(tweets);
};
