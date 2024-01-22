import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
async function main() {
    await prisma.roles.createMany({
        data: [
            { id: 'ADMIN', name: 'ADMIN' },
            { id: 'USER', name: 'USER' },
            { id: 'HARUNA', name: 'HARUNA' },
        ]
    });
    await prisma.audiences.createMany({
        data: [
            { name: 'UNISEX' },
            { name: 'MEN' },
            { name: 'WOMEN' },
            { name: 'KID' },
            { name: 'TEEN' },
        ]
    });
    await prisma.categories.createMany({
        data: [
            {
                name: 't-shirt',
                slug: 'express-yourself',
                description: 'Discover unique expressions with Abibas T-shirt collection.',
                images: []
            },
            {
                name: 'shoe',
                slug: 'step-out-in-style',
                description: 'Step out in style with Abibas Shoe collection.',
                images: []
            },
            {
                name: 'belt',
                slug: 'accessorize-your-outfit',
                description: 'Complete your look with Abibas Belt.',
                images: []
            },
            {
                name: 'jean',
                slug: 'stay-comfortable-and-stylish',
                description: 'Stay comfortable and stylish with Abibas Jean.',
                images: []
            },
            {
                name: 'pant',
                slug: 'elevate-your-look',
                description: 'Elevate your look with Abibas Pant collection.',
                images: []
            },
            {
                name: 'hat',
                slug: 'top-off-your-style',
                description: 'Top off your style with Abibas Hat.',
                images: []
            },
            {
                name: 'sock',
                slug: 'complete-your-outfit',
                description: 'Complete your outfit with Abibas Sock.',
                images: []
            },
            {
                name: 'jacket',
                slug: 'stay-warm-and-stylish',
                description: 'Stay warm and stylish with Abibas Jacket.',
                images: []
            },
            {
                name: 'short',
                slug: 'stay-cool-and-comfortable',
                description: 'Stay cool and comfortable with Abibas Short.',
                images: []
            },
            {
                name: 'sandal',
                slug: 'relax-your-feet',
                description: 'Relax your feet with Abibas Sandal collection.',
                images: []
            },
            {
                name: 'watch',
                slug: 'complete-your-look',
                description: 'Complete your look with Abibas Watch.',
                images: []
            },
            {
                name: 'glove',
                slug: 'protect-your-hands',
                description: 'Protect your hands with Abibas Glove.',
                images: []
            },
            {
                name: 'cap',
                slug: 'stay-cool-and-stylish',
                description: 'Stay cool and stylish with Abibas Cap.',
                images: []
            },
            {
                name: 'backpack',
                slug: 'carry-your-essentials',
                description: 'Carry your essentials with Abibas Backpack.',
                images: []
            },
            {
                name: 'jersey',
                slug: 'support-your-team',
                description: 'Support your team with Abibas Jersey.',
                images: []
            },
            {
                name: 'legging',
                slug: 'stay-active-and-stylish',
                description: 'Stay active and stylish with Abibas Legging.',
                images: []
            },
            {
                name: 'sunglass',
                slug: 'protect-your-eyes',
                description: 'Protect your eyes with Abibas Sunglass.',
                images: []
            },
            {
                name: 'Bottle',
                slug: 'stay-hydrated',
                description: 'Stay hydrated with Abibas Bottle.',
                images: []
            },
            {
                name: 'headband',
                slug: 'complete-your-look',
                description: 'Complete your look with Abibas Headband.',
                images: []
            },
            {
                name: 'tie',
                slug: 'elevate-your-formal-style',
                description: 'Elevate your formal style with Abibas Tie.',
                images: []
            }
        ]
    });
    await prisma.genres.createMany({
        data: [
            {
                name: 'lifestyle',
                slug: 'make your move with abibas',
                description: 'abibas life style products is suitable for your great move!',
                images: []
            },
            {
                name: 'running',
                slug: 'running',
                description: 'elevate your running experience with abibas running collection.',
                images: []
            },
            {
                name: 'training',
                slug: 'training',
                description: 'reach your fitness goals with abibas training gear.',
                images: []
            },
            {
                name: 'soccer',
                slug: 'soccer',
                description: 'score goals in style with abibas soccer essentials.',
                images: []
            },
            {
                name: 'basketball',
                slug: 'basketball',
                description: 'dominate the court with abibas basketball gear.',
                images: []
            },
            {
                name: 'outdoor',
                slug: 'outdoor',
                description: 'conquer the outdoors with abibas outdoor collection.',
                images: []
            },
            {
                name: 'golf',
                slug: 'golf',
                description: 'perfect your swing with abibas golf essentials.',
                images: []
            },
            {
                name: 'cycling',
                slug: 'cycling',
                description: 'ride in style with abibas cycling gear.',
                images: []
            },
            {
                name: 'fitness',
                slug: 'fitness',
                description: 'achieve your fitness goals with abibas fitness collection.',
                images: []
            },
            {
                name: 'tennis',
                slug: 'tennis',
                description: 'ace every match with abibas tennis essentials.',
                images: []
            },
            {
                name: 'yoga',
                slug: 'yoga',
                description: 'find inner peace and balance with abibas yoga gear.',
                images: []
            },
            {
                name: 'hiking',
                slug: 'hiking',
                description: 'explore the great outdoors with abibas hiking essentials.',
                images: []
            },
            {
                name: 'swimming',
                slug: 'swimming',
                description: 'dive into style with abibas swimming gear.',
                images: []
            },
            {
                name: 'snowboarding',
                slug: 'snowboarding',
                description: 'conquer the snowy slopes with abibas snowboarding gear.',
                images: []
            },
            {
                name: 'skateboarding',
                slug: 'skateboarding',
                description: 'ride the streets in style with abibas skateboarding essentials.',
                images: []
            },
            {
                name: 'surfing',
                slug: 'surfing',
                description: 'catch the waves with abibas surfing collection.',
                images: []
            },
            {
                name: 'volleyball',
                slug: 'volleyball',
                description: 'spike and serve with abibas volleyball essentials.',
                images: []
            },
            {
                name: 'martial arts',
                slug: 'martial-arts',
                description: 'master the art with abibas martial arts gear.',
                images: []
            },
            {
                name: 'cricket',
                slug: 'cricket',
                description: 'hit it out of the park with abibas cricket essentials.',
                images: []
            },
            {
                name: 'baseball',
                slug: 'baseball',
                description: 'play ball with abibas baseball gear.',
                images: []
            },
            {
                name: 'rugby',
                slug: 'rugby',
                description: 'tackle the field with abibas rugby essentials.',
                images: []
            },
        ]
    });
    await prisma.series.createMany({
        data: [
            {
                name: 'night starfall mk1',
                slug: 'night-starfall-mk1',
                description: 'this is abibas nighty',
            },
            {
                name: 'firestorm x',
                slug: 'firestorm-x',
                description: 'experience the power of firestorm x series.',
            },
            {
                name: 'lunar eclipse pro',
                slug: 'lunar-eclipse-pro',
                description: 'unleash the darkness with lunar eclipse pro.',
            },
            {
                name: 'thunderbolt z',
                slug: 'thunderbolt-z',
                description: 'feel the thunder with thunderbolt z series.',
            },
            {
                name: 'technova horizon',
                slug: 'technova-horizon',
                description: 'explore the limitless possibilities with technova horizon.',
            },
            {
                name: 'stealth phantom x',
                slug: 'stealth-phantom-x',
                description: 'enter the world of stealth phantom x series.',
            },
            {
                name: 'quantum fusion 9',
                slug: 'quantum-fusion-9',
                description: 'experience quantum-level performance with quantum fusion 9.',
            },
            {
                name: 'solar flare v2',
                slug: 'solar-flare-v2',
                description: 'ignite your gaming experience with solar flare v2.',
            },
            {
                name: 'aeroblade pro',
                slug: 'aeroblade-pro',
                description: 'achieve new heights with aeroblade pro series.',
            },
            {
                name: 'hyperdrive max',
                slug: 'hyperdrive-max',
                description: 'boost your productivity with hyperdrive max series.',
            },
            {
                name: 'eternal frost elite',
                slug: 'eternal-frost-elite',
                description: 'embrace the coolness with eternal frost elite.',
            },
            {
                name: 'spectra wave x',
                slug: 'spectra-wave-x',
                description: 'ride the waves of innovation with spectra wave x series.',
            },
            {
                name: 'blitzkrieg pro',
                slug: 'blitzkrieg-pro',
                description: 'dominate the battlefield with blitzkrieg pro series.',
            },
            {
                name: 'zenith prime',
                slug: 'zenith-prime',
                description: 'reach the pinnacle of performance with zenith prime series.',
            },
            {
                name: 'inferno fury gt',
                slug: 'inferno-fury-gt',
                description: 'feel the heat with inferno fury gt series.',
            },
            {
                name: 'nebula force x',
                slug: 'nebula-force-x',
                description: 'unleash the cosmic power with abibas nebula force x.',
            },
            {
                name: 'quantum hypernova',
                slug: 'quantum-hypernova',
                description: 'experience the next level of quantum gaming with abibas quantum hypernova.',
            },
            {
                name: 'stealth recon 5',
                slug: 'stealth-recon-5',
                description: 'dominate the gaming battlefield with abibas stealth recon 5.',
            },
            {
                name: 'titan vanguard',
                slug: 'titan-vanguard',
                description: 'conquer new gaming heights with abibas titan vanguard series.',
            },
            {
                name: 'nova blaze x',
                slug: 'nova-blaze-x',
                description: 'ignite your gaming passion with abibas nova blaze x.',
            },
            {
                name: 'shadowblade elite',
                slug: 'shadowblade-elite',
                description: 'enter the elite world of gaming with abibas shadowblade elite series.',
            },
            {
                name: 'quantum sonic pro',
                slug: 'quantum-sonic-pro',
                description: 'immerse yourself in the sonic experience with abibas quantum sonic pro.',
            },
            {
                name: 'horizon spark x',
                slug: 'horizon-spark-x',
                description: 'spark your gaming journey with abibas horizon spark x.',
            },
            {
                name: 'nebula blaze v2',
                slug: 'nebula-blaze-v2',
                description: 'upgrade your gaming experience with abibas nebula blaze v2.',
            },
            {
                name: 'quantum strike gt',
                slug: 'quantum-strike-gt',
                description: 'achieve gaming greatness with abibas quantum strike gt.',
            },
            {
                name: 'solar burst pro',
                slug: 'solar-burst-pro',
                description: 'burst into the gaming scene with abibas solar burst pro.',
            },
            {
                name: 'aeroflare elite',
                slug: 'aeroflare-elite',
                description: 'experience elite gaming with abibas aeroflare elite series.',
            },
            {
                name: 'hyperdrive alpha x',
                slug: 'hyperdrive-alpha-x',
                description: 'alpha-level performance with abibas hyperdrive alpha x.',
            },
            {
                name: 'inferno blaze mk2',
                slug: 'inferno-blaze-mk2',
                description: 'upgrade your gaming firepower with abibas inferno blaze mk2.',
            },
            {
                name: 'zenithss spectra v3',
                slug: 'zenith-spectra-v3',
                description: 'elevate your gaming with abibas zenith spectra v3.',
            },
            {
                name: 'quantumss fusion elite',
                slug: 'quantum-fusion-elite',
                description: 'elite gaming fusion with abibas quantum fusion elite.',
            },
        ],
    });
    await prisma.events.createMany({
        data: [
            {
                name: 'ready set-go! festival',
                slug: 'millennium science school halo festival now on!',
                description: 'join the excitement of the ready set-go! festival with abibas.',
                images: [],
                status: true,
                beginDate: new Date('2023-12-20T00:00:00Z'),
                endDate: new Date('2024-01-10T23:59:59Z'),
            },
            {
                name: 'christmas sale',
                slug: 'christmas-sale',
                description: 'celebrate christmas with special discounts!',
                images: [],
                status: false,
                beginDate: new Date('2023-12-25T00:00:00Z'),
                endDate: new Date('2023-12-25T23:59:59Z'),
            },
            {
                name: 'jingle bell on jings!',
                slug: 'ning nung.. who is there?',
                description: 'jings your surprise discount on christmast sale',
                images: [],
                status: true,
                beginDate: new Date('2023-12-20T00:00:00Z'),
                endDate: new Date('2024-01-10T23:59:59Z'),
            },
            {
                name: 'new year new me',
                slug: 'new year a new me',
                description: 'welcome the new year with showcases of talents and festivities!',
                images: [],
                status: true,
                beginDate: new Date('2023-12-26T00:00:00Z'),
                endDate: new Date('2024-01-05T23:59:59Z'),
            },
            {
                name: 'where all miracle begin',
                slug: 'where all miracle begin',
                description: 'where all miracle begin',
                images: [],
                status: false,
                beginDate: new Date('2024-01-11T00:00:00Z'),
                endDate: new Date('2024-01-20T23:59:59Z'),
            },
            {
                name: 'mystical masquerade',
                slug: 'mystical-masquerade',
                description: 'unmask the mysteries at the mystical masquerade! a ball of intrigue and glamour awaits you.',
                images: [],
                status: false,
                beginDate: new Date('2024-01-21T00:00:00Z'),
                endDate: new Date('2024-01-30T23:59:59Z'),
            },
            {
                name: 'starlit ethereum',
                slug: 'starlit ethereum',
                description: 'starlit ethereum',
                images: [],
                status: false,
                beginDate: new Date('2024-01-31T00:00:00Z'),
                endDate: new Date('2024-02-10T23:59:59Z'),
            },
            {
                name: 'starry night revelry',
                slug: 'starry night revelry',
                description: 'starry night revelry',
                images: [],
                status: false,
                beginDate: new Date('2024-01-26T00:00:00Z'),
                endDate: new Date('2024-02-05T23:59:59Z'),
            },
            {
                name: 'bunny chaser on board',
                slug: 'bunny chaser on board',
                description: 'bunny chaser on board',
                images: [],
                status: false,
                beginDate: new Date('2024-02-06T00:00:00Z'),
                endDate: new Date('2024-02-15T23:59:59Z'),
            },
            {
                name: 'kda all out!',
                slug: 'kda all out!',
                description: 'kda all out!',
                images: [],
                status: false,
                beginDate: new Date('2024-02-16T00:00:00Z'),
                endDate: new Date('2024-02-25T23:59:59Z'),
            },
            {
                name: 'an unconcealed heart',
                slug: 'an unconcealed heart',
                description: 'an unconcealed heart',
                images: [],
                status: false,
                beginDate: new Date('2024-02-10T00:00:00Z'),
                endDate: new Date('2024-02-20T23:59:59Z'),
            },
            {
                name: 'starry serenity soirée',
                slug: 'starry serenity soirée',
                description: 'starry serenity soirée',
                images: [],
                status: false,
                beginDate: new Date('2024-02-21T00:00:00Z'),
                endDate: new Date('2024-02-29T23:59:59Z'),
            },
        ],
    });
    await prisma.user.createMany({
        data: [
            {
                fullname: 'Kurodate Haruna',
                email: 'kurodateHaruna@gehenna.sch.id',
                username: 'kurodateHaruna',
                password: await bcrypt.hash('buntut', 12),
                role: 'ADMIN',
                images: []
            },
            {
                fullname: 'Ushio Noa',
                email: 'ushionoa@millennium.sch.id',
                username: 'ushionoa',
                password: await bcrypt.hash('sayang', 12),
                role: 'ADMIN',
                images: []
            }
        ]
    });

    // return await prisma.$queryRaw`SELECT name FROM "Audiences" WHERE name LIKE ${ 'w%'.toUpperCase() }`;
}
main()
    .then(async () => {
        console.log();
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
