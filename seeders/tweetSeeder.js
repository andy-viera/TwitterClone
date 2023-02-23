const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

faker.locale = "en";

module.exports = async () => {
  const tweets = [];

  for (let i = 0; i < 100; i++) {
    const randomUserlikesArray = [];
    const randomLikesAmount = faker.datatype.number({ min: 0, max: 10 });
    for (let i = 0; i < randomLikesAmount; i++) {
      let randomUserlike = await User.findOne().skip(faker.datatype.number({ min: 0, max: 9 }));
      randomUserlikesArray.push(randomUserlike);
    }

    const randomUser = await User.findOne().skip(faker.datatype.number({ min: 0, max: 9 }));

    const tweet = new Tweet({
      content: faker.lorem.paragraph({ min: 1, max: 4 }),
      author: randomUser,
      likes: randomUserlikesArray,
    });

    tweets.push(tweet);
    randomUser.tweetlist.push(tweet);
    await randomUser.save();
  }

  await Tweet.insertMany(tweets);
};
