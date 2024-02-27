const { IgApiClient } = require('instagram-private-api');
const rp = require('request-promise');

const ig = new IgApiClient();

const username = 'ben.stank'; // Replace with your Instagram username
const password = '1qaz2wsx3edc'; // Replace with your Instagram password
const captions = [
    'We are so back',
    'back from the dead',
    '🗿',
    '@ben.stank',
];
const videoUrl = 'https://instagram.flhe7-2.fna.fbcdn.net/v/t50.2886-16/430062664_2098651893842861_7957168227477617155_n.mp4?_nc_ht=instagram.flhe7-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=nrAkIIuN008AX943XEf&edm=APU89FABAAAA&ccb=7-5&oh=00_AfB6AojbQoWBj8X_IewCbDLgxivYs9KxvHwSthL_OZJXqA&oe=65DF147D&_nc_sid=bc0c2c';
const coverImageUrl = 'https://instagram.flhe7-2.fna.fbcdn.net/v/t51.2885-15/429576873_612007607781790_7547998002257569722_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.flhe7-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=520sTVxbDI0AX8OF0In&edm=APU89FABAAAA&ccb=7-5&oh=00_AfCmLdTuwCNuKAmTguHZFzbyp3Pe9NJxNZx37HFgtWyupg&oe=65DF4BA8&_nc_sid=bc0c2c';

// Function to choose a random caption
const getRandomCaption = () => captions[Math.floor(Math.random() * captions.length)];

async function postToInsta() {
    ig.state.generateDevice(username);
    await ig.account.login(username, password);

    const [videoBuffer, coverImageBuffer] = await Promise.all([
        downloadContent(videoUrl),
        downloadContent(coverImageUrl),
    ]);

    // Use a random caption for the post
    const caption = getRandomCaption();

    await ig.publish.video({
        video: videoBuffer,
        coverImage: coverImageBuffer,
        caption: caption,
    });
}

const downloadContent = async (url) => {
    const options = {
        uri: url,
        encoding: null,
    };
    return rp(options);
};

(async () => {
    try {
        console.log('Attempting to post video...');
        await postToInsta();
        console.log('Video posted successfully');
    } catch (error) {
        console.error('Failed to post video', error);
    }
})();
