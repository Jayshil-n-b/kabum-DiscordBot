const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { token } = require("./config.json");

const fetch = require("node-fetch");

const myIntents = new Intents();
myIntents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MEMBERS
);

const client = new Client({ intents: myIntents });

client.once("ready", () => {
  console.log(
    `${client.user.username}(#${client.user.discriminator}) is online!`
  );
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "-hi") {
    msg.react("😍");
    msg.react("😂");
    msg.react("😁");
    function getRndThought() {
      const thought = [
        "I hope you bought pizzas!",
        "Lets rock it!",
        "You just discovered a wild bot!",
        "Have a great time ahead!",
        "I can s",
      ];
      return thought[Math.floor(Math.random() * thought.length)];
    }
    msg.reply(`Hii ${msg.author}!` + `\n${getRndThought()}`);
  }
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "-dog") {
    msg.react("🐕");
    msg.reply("Clicking dog's picture!!");
    const apiUrl = "https://random.dog/woof.json";
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data.fileSizeBytes);
        msg.reply({ files: [data.url] });
      })
      .catch((error) => {
        console.log(error);
        msg.reply("Sorry :(\n Cannot process your request");
      });
  }
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "-bored") {
    msg.react("😉");
    const apiUrl = "https://www.boredapi.com/api/activity/";
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => {
        msg.reply(data.activity);
      })
      .catch((error) => {
        console.log(error);
        msg.reply("Sorry :( \n Cannot process your request");
      });
  }
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "-cocktail") {
    const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => {
        const drinkName = data.drinks[0].strDrink;
        const imgRes = data.drinks[0].strDrinkThumb;
        const alcoholic =
          data.drinks[0].strAlcoholic === "Alcoholic" ? "👍" : "👎";
        const discription = data.drinks[0].strInstructions;

        // console.log(drinkName);
        // console.log(imgRes);
        // console.log(alcoholic);
        // console.log(discription);

        // console.log(data.drinks[0].strDrink);

        const cocktailEmbed = new MessageEmbed()
          .setColor("#ffa500")
          .setThumbnail(
            "https://www.thecocktaildb.com/images/cocktail_right.png"
          )
          .setAuthor("CocktailDB")
          .setDescription(`✨ This is for you my friend!! Enjoy!! ✨`)
          .setURL("https://www.thecocktaildb.com/")
          .setTitle("Cocktail Party")
          .addFields(
            { name: "\u200B", value: "\u200B" },
            { name: "Instructions", value: `${discription}` }
          )
          .addFields(
            { name: "\u200B", value: "\u200B" },
            { name: "Drink", value: `${drinkName}`, inline: true },
            { name: "Alcoholic", value: `${alcoholic}`, inline: true }
          )
          .setImage(imgRes)
          .setFooter("PS: Just for you!.");

        msg.reply({ embeds: [cocktailEmbed] });
      })
      .catch((error) => {
        console.log(error);
        msg.reply("Sorry :( \n Cannot process your request");
      });
  }
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "-player") {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("primary")
          .setLabel("Primary")
          .setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("secondary")
          .setLabel("Secondary")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("success")
          .setLabel("Success")
          .setStyle("SUCCESS")
      );

    msg.reply({ content: "Your content", components: [row] });
  }
});

client.login(token);
