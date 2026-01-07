import express from 'express';
import Story from '../models/Story.js';
import Film from '../models/Film.js';
import PreWedding from '../models/PreWedding.js';
import Photobook from '../models/Photobook.js';
import Music from '../models/Music.js';
import User from '../models/User.js';
import Image from '../models/Image.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// --- Stories ---
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Not Found' });
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/stories', async (req, res) => {
    try {
        const newStory = new Story(req.body);
        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/stories/:id', async (req, res) => {
    try {
        const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/stories/:id', async (req, res) => {
    try {
        await Story.findByIdAndDelete(req.params.id);
        res.json({ message: 'Story deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Films ---
router.get('/films', async (req, res) => {
  try {
    const films = await Film.find().sort({ createdAt: -1 });
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/films', async (req, res) => {
    try {
        const newFilm = new Film(req.body);
        const savedFilm = await newFilm.save();
        res.status(201).json(savedFilm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/films/:id', async (req, res) => {
    try {
        const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFilm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/films/:id', async (req, res) => {
    try {
        await Film.findByIdAndDelete(req.params.id);
        res.json({ message: 'Film deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// --- PreWeddings ---
router.get('/pre-weddings', async (req, res) => {
  try {
    const preWeddings = await PreWedding.find().sort({ createdAt: -1 });
    res.json(preWeddings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/pre-weddings/:id', async (req, res) => {
  try {
    const preWedding = await PreWedding.findById(req.params.id);
    if (!preWedding) return res.status(404).json({ message: 'Not Found' });
    res.json(preWedding);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/pre-weddings', async (req, res) => {
    try {
        const newPreWedding = new PreWedding(req.body);
        const savedPreWedding = await newPreWedding.save();
        res.status(201).json(savedPreWedding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/pre-weddings/:id', async (req, res) => {
    try {
        const updatedPreWedding = await PreWedding.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPreWedding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/pre-weddings/:id', async (req, res) => {
    try {
        await PreWedding.findByIdAndDelete(req.params.id);
        res.json({ message: 'PreWedding deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// --- Photobooks ---
router.get('/photobooks', async (req, res) => {
  try {
    const photobooks = await Photobook.find().sort({ createdAt: -1 });
    res.json(photobooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/photobooks', async (req, res) => {
    try {
        const newPhotobook = new Photobook(req.body);
        const savedPhotobook = await newPhotobook.save();
        res.status(201).json(savedPhotobook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/photobooks/:id', async (req, res) => {
    try {
        const updatedPhotobook = await Photobook.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPhotobook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/photobooks/:id', async (req, res) => {
    try {
        await Photobook.findByIdAndDelete(req.params.id);
        res.json({ message: 'Photobook deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Music ---
router.get('/music', async (req, res) => {
  try {
    const music = await Music.find().sort({ createdAt: -1 });
    res.json(music);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/music', async (req, res) => {
    try {
        const newMusic = new Music(req.body);
        const savedMusic = await newMusic.save();
        res.status(201).json(savedMusic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Contact (Email) ---
router.post('/contact', async (req, res) => {
    const { name, weddingDates, eventDetails, venue, contactNumber, email, referral } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: 'sanojkumar2467467@gmail.com', // Destination email from user request
        subject: `New Contact Form Submission: ${name}`,
        html: `
            <h3>New Inquiry from CineSine Contact Form</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contactNumber}</p>
            <p><strong>Wedding Dates:</strong> ${weddingDates}</p>
            <p><strong>Venue:</strong> ${venue}</p>
            <p><strong>Referral Source:</strong> ${referral.join(', ')}</p>
            <br/>
            <p><strong>Event Details:</strong></p>
            <p>${eventDetails}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// --- User Profile ---
router.get('/user', async (req, res) => {
    try {
        let user = await User.findOne();
        if (!user) {
            // Create default if not exists
            user = await User.create({});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/user', async (req, res) => {
    try {
        let user = await User.findOne();
        if (!user) {
            user = new User(req.body);
            await user.save();
        } else {
            // Update fields
            Object.assign(user, req.body);
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Images (Gallery) ---
router.get('/images', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/images', async (req, res) => {
    try {
        const image = new Image(req.body);
        await image.save();
        res.status(201).json(image);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/images/:id', async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.json({ message: "Image deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- SEED ROUTE (Temporary/Dev) ---
router.get('/seed', async (req, res) => {
    try {
        await Story.deleteMany({});
        await Film.deleteMany({});
        await PreWedding.deleteMany({});
        await Photobook.deleteMany({});
        await Music.deleteMany({});
        await User.deleteMany({}); // Clear user to reset default

        console.log("Cleared existing data via API seed...");

        // Stories
        await Story.create([
            {
                title: "A ROYAL JAIPUR SAGA",
                coupleNames: "ADITI & VIKRAM",
                location: "UDAIPUR, RAJASTHAN",
                type: "Wedding",
                coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070",
                images: [
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
                    "https://images.unsplash.com/photo-1545231027-637d2f6210f8?q=80&w=800",
                    "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=800"
                ],
                description: "Amidst the grandeur of the City Palace, Aditi and Vikram's union was nothing short of a fairytale."
            },
            {
                title: "VOWS BY THE SHORE",
                coupleNames: "ALISHA & ROHAN",
                location: "GOA, INDIA",
                type: "Wedding",
                coverImage: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070",
                images: [
                     "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
                     "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800"
                ],
                description: "Where the sky meets the sea, Alisha and Rohan promised a lifetime of togetherness."
            },
            {
                title: "THE MOUNTAIN WHISPERS",
                coupleNames: "KAVYA & ARJUN",
                location: "MUSSOORIE",
                type: "Engagement",
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
                type: "Reception",
                coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
                images: [
                     "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800",
                     "https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?q=80&w=800"
                ],
                description: "A glamorous evening in the heart of Mumbai, celebrating modern love with a touch of classic elegance."
            }
        ]);

        // Films
        await Film.create([
            {
                title: "THE ETERNAL WALTZ",
                coupleName: "PRIYA & KARAN",
                videoUrl: "https://www.youtube.com/embed/P-M9HkR7tWc",
                tagline: "Love is the rhythm we dance to.",
                description: "A visual poetry of moments that defined their journey."
            },
             {
                title: "DESTINY'S CHILD",
                coupleName: "ANANYA & VIHAAN",
                videoUrl: "https://www.youtube.com/embed/S2qT6a6zJ2s",
                tagline: "Written in the stars, celebrated on Earth.",
                description: "Two families, one big heart."
            },
            {
                title: "MOMENTS IN TIME",
                coupleName: "RHEA & SID",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                tagline: "Capturing the unseen, feeling the unspoken.",
                description: "A candid narrative of laughter, tears, and pure joy."
            }
        ]);

        // PreWeddings
        await PreWedding.create([
            {
                coupleName: "SARTHAK & ADITI",
                city: "JAIPUR",
                videoId: "ScMzIvxBSi4",
                mainImage: "https://images.unsplash.com/photo-1623771988448-6c1d7638ad3a?q=80&w=2070",
                galleryImages: [
                     "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=800",
                     "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=800",
                     "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800"
                ],
                description: "The Pink City provided a canvas of history and color."
            },
             {
                coupleName: "KABIR & MEERA",
                city: "LADAKH",
                videoId: "P-M9HkR7tWc",
                mainImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
                galleryImages: [
                     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
                     "https://images.unsplash.com/photo-1504198266287-16594a556526?q=80&w=800"
                ],
                description: "Against the stark, breathtaking landscapes of Ladakh."
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
             }
        ]);

        res.json({ message: "Database seeded successfully via API!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
