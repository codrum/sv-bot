const mineflayer = require('mineflayer')
require('dotenv').config()

const delay = ms => new Promise(res => setTimeout(res, ms));

const createBot = () => {

    const bot1 = mineflayer.createBot({
        host: 'simplyvanilla.net', // minecraft server ip
        username: process.env.BOT1_USER, // minecraft username
        auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
        // port: 25565,                // only set if you need a port that isn't 25565
        // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
        // password: '12345678'        // set if you want to use password-based auth (may be unreliable)
    })
    const bot2 = mineflayer.createBot({
        host: 'simplyvanilla.net', // minecraft server ip
        username: process.env.BOT2_USER, // minecraft username
        auth: 'microsoft' // for offline mode servers, you can set this to 'offline'

    })
    bot1.on('spawn', function () {
        // bot1.loadPlugin(require('mineflayer-autoclicker'))
        // bot1.autoclicker.options = {
        //     max_distance: 3.5, // Max distance to hit entities (Default: 3.5)
        //     swing_through: ['experience_orb'], // Hit through entities (Default: ['experience_orb'])
        //     blacklist: ['player'], // Do not hit certain entities (Default: ['player'])
        //     stop_on_window: true, // Stop if a window is opened (Default: true)
        //     always_swing: false, // Always swing, even if there is no entity (Default: true)
        //     // delay: getRandomDelay()
        // }
        if (autoClicker.running) {
            autoClicker.stop();
            autoClicker.start();
        } else { autoClicker.start(); }
    });
    const autoClicker = {
        running: undefined,
        click_interval: 3000,
        // blacklist: ['experience_orb'],
        start: () => {
            if (autoClicker.running) return
            autoClicker.running = setInterval(async function () {
                const entity = bot1.entityAtCursor()
                if (!entity || autoClicker.blacklist.includes(entity.name)) return bot1.swingArm()
                bot1.attack(entity, true)
            }, autoClicker.click_interval)
        },
        stop: () => {
            autoClicker.running = clearInterval(autoClicker.running)
        }
    }

    bot1.on('error', (err) => console.log(err))
    bot1.on('kicked', console.log)
    bot1.on('end', restart)
    bot2.on('error', (err) => console.log(err))
    bot2.on('end', restart)
}

const restart = async () => {
    await delay(10000)
    createBot()
}

const getRandomDelay = () => {
    const random = Math.random() * (5000 - 700) + 700
    console.log(random)
    return random
}


createBot()
