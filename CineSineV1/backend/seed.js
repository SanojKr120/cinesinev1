import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from './models/Story.js';
import Film from './models/Film.js';
import PreWedding from './models/PreWedding.js';
import Photobook from './models/Photobook.js';
import Music from './models/Music.js';

dotenv.config();

console.log("Starting seed script...");
console.log("URI provided:", process.env.MONGODB_URI ? "YES (Cloud)" : "NO (Localhost Fallback)");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => {
      console.error('MongoDB Connection Error:', err)
      process.exit(1);
  });

const seedData = async () => {
    try {
        await Story.deleteMany({});
        await Film.deleteMany({});
        await PreWedding.deleteMany({});
        await Photobook.deleteMany({});
        await Music.deleteMany({});

        console.log("Cleared existing data...");

        // Stories (High Quality Editorial Style)
        await Story.create([
            {
                title: "A ROYAL JAIPUR SAGA",
                coupleNames: "ADITI & VIKRAM",
                location: "UDAIPUR, RAJASTHAN",
                type: "WEDDING",
                coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070",
                images: [
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
                    "https://images.unsplash.com/photo-1545231027-637d2f6210f8?q=80&w=800",
                    "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=800"
                ],
                description: "Amidst the grandeur of the City Palace, Aditi and Vikram's union was nothing short of a fairytale. The golden hues of the setting sun painted the perfect backdrop for a celebration steeped in tradition and royalty."
            },
            {
                title: "VOWS BY THE SHORE",
                coupleNames: "ALISHA & ROHAN",
                location: "GOA, INDIA",
                type: "WEDDING",
                coverImage: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070",
                images: [
                     "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
                     "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800"
                ],
                description: "Where the sky meets the sea, Alisha and Rohan promised a lifetime of togetherness. A minimalist beach wedding that focused on raw emotions and the sounds of the waves."
            },
            {
                title: "THE MOUNTAIN WHISPERS",
                coupleNames: "KAVYA & ARJUN",
                location: "MUSSOORIE",
                type: "ENGAGEMENT",
                coverImage: "https://images.unsplash.com/photo-1465220183275-1faa863377e3?q=80&w=2070",
                images: [
                     "https://images.unsplash.com/photo-1623771988448-6c1d7638ad3a?q=80&w=800",
                     "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800"
                ],
                description: "High up in the misty hills of Mussoorie, an intimate engagement ceremony that felt like a dream sequence."
            },
             {
                title: "URBAN CHIC",
                coupleNames: "SARA & ZAIN",
                location: "MUMBAI",
                type: "RECEPTION",
                coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
                images: [
                     "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800",
                     "https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?q=80&w=800"
                ],
                description: "A glamorous evening in the heart of Mumbai, celebrating modern love with a touch of classic elegance."
            }
        ]);

        // Films (Cinematic)
        await Film.create([
            {
                title: "THE ETERNAL WALTZ",
                coupleName: "PRIYA & KARAN",
                videoUrl: "https://www.youtube.com/embed/P-M9HkR7tWc", // A cinematic wedding placeholder
                tagline: "Love is the rhythm we dance to.",
                description: "A visual poetry of moments that defined their journey."
            },
             {
                title: "DESTINY'S CHILD",
                coupleName: "ANANYA & VIHAAN",
                videoUrl: "https://www.youtube.com/embed/Zf__nAYMuqw?si=-wdeUQl7LXExrr6J", // A wedding film placeholder
                tagline: "Written in the stars, celebrated on Earth.",
                description: "Two families, one big heart, and a celebration that echoed through the night."
            },
            {
                title: "MOMENTS IN TIME",
                coupleName: "RHEA & SID",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Classic placeholder
                tagline: "Capturing the unseen, feeling the unspoken.",
                description: "A candid narrative of laughter, tears, and pure joy."
            }
        ]);

        // PreWeddings (Editorial Visuals)
        await PreWedding.create([
            {
                coupleName: "SARTHAK & ADITI",
                city: "JAIPUR",
                videoId: "ScMzIvxBSi4",
                mainImage: "https://images.unsplash.com/photo-1623771988448-6c1d7638ad3a?q=80&w=2070",
                galleryImages: [
                     "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=800",
                     "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=800",
                     "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
                     "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800"
                ],
                description: "The Pink City provided a canvas of history and color for Sarthak and Aditi. We wandered through ancient corridors and vibrant markets, freezing moments where time seemed to stand still."
            },
             {
                title: "INTO THE WILD",
                coupleName: "KABIR & MEERA",
                city: "LADAKH",
                videoId: "P-M9HkR7tWc",
                mainImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
                galleryImages: [
                     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
                     "https://images.unsplash.com/photo-1504198266287-16594a556526?q=80&w=800",
                     "https://images.unsplash.com/photo-1534067783941-51c422f37c28?q=80&w=800"
                ],
                description: "Against the stark, breathtaking landscapes of Ladakh, Kabir and Meera's love shone brighter than the sun. An adventure to remember."
            },
            {
                coupleName: "ISHAAN & TARA",
                city: "PARIS",
                videoId: "S2qT6a6zJ2s",
                mainImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070",
                galleryImages: [
                    "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=800",
                    "https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?q=80&w=800"

                ],
                description: "A classic romance in the city of lights. Elegant, timeless, and utterly cinematic."
            }
        ]);

        // Photobooks
        await Photobook.create([
            {
                title: "THE REGAL COLLECTION",
                personName: "THE KAPOORS",
                coverImage: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=800",
                description: "A handcrafted leather photobook."
            },
            {
                title: "SEASIDE MEMORIES",
                personName: "THE MEHTAS",
                coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800",
                description: "Coffee table book style."
            },
            {
                title: "DESTINATION LOVE",
                personName: "ROHIT & SIMI",
                coverImage: "https://images.unsplash.com/photo-1516961642222-78102a9bd8b7?q=80&w=800",
                description: "Premium layflat album."
            }

        ]);
        
        // Music
        await Music.create([
             {
                title: "MORNING RAGA",
                description: "Gentle instrumental for rituals.",
                duration: "04:20",
                videoThemeUrl: "https://images.unsplash.com/photo-1510915361405-ef8a93d77fb1?q=80&w=400"
             },
             {
                 title: "CELEBRATION BEATS",
                 description: "High energy tracks for the Sangeet.",
                 duration: "03:15",
                 videoThemeUrl: "https://images.unsplash.com/photo-1483824368412-4541cb9c74db?q=80&w=400"
             },
             {
                 title: "SUFI SOUL",
                 description: "Deep, emotional melodies.",
                 duration: "05:10",
                 videoThemeUrl: "https://images.unsplash.com/photo-1420161900862-9e8a76f63434?q=80&w=400"
             }
        ]);

        console.log("Database seeded successfully with Editorial Content!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedData();
