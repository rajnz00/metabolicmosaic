
import type { BlogPost } from '../types';

export const posts: BlogPost[] = [
  {
    slug: 'debunking-the-8-glasses-of-water-myth',
    title: 'Debunking the "8 Glasses of Water" Myth',
    author: 'Dr. Jane Smith',
    publishedDate: new Date('2023-10-26').toLocaleDateString('en-NZ', { dateStyle: 'medium' }),
    excerpt: 'Is the age-old advice to drink eight glasses of water per day backed by science? We dive into the research to find out what your body truly needs.',
    content: `
      <p class="mb-4">The recommendation to drink eight 8-ounce glasses of water a day, which equals about 2 liters, or half a gallon, is popularly known as the 8×8 rule. While staying hydrated is crucial for health, this specific quantity isn't a one-size-fits-all solution and isn't as scientifically grounded as many believe.</p>
      <h3 class="text-2xl font-bold my-4">Where Did the Myth Originate?</h3>
      <p class="mb-4">The origins are murky, but it's often traced back to a 1945 recommendation from the Food and Nutrition Board of the National Research Council, which stated that a suitable allowance of water for adults is 2.5 liters daily in most instances. However, a crucial part of that recommendation is often overlooked: "Most of this quantity is contained in prepared foods."</p>
      <h3 class="text-2xl font-bold my-4">Individual Needs Vary</h3>
      <p class="mb-4">Your actual water needs depend on several factors, including:</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Activity Level:</strong> If you exercise or have a physically demanding job, you'll need more water.</li>
        <li><strong>Climate:</strong> Hot or humid weather can make you sweat and requires additional fluid intake.</li>
        <li><strong>Health Status:</strong> Your body loses fluids when you have a fever, vomiting, or diarrhea. Certain conditions like bladder infections and kidney stones may also require increased water intake.</li>
        <li><strong>Pregnancy and Breastfeeding:</strong> Women who are pregnant or breastfeeding need additional fluids to stay hydrated.</li>
      </ul>
      <p>The best guide? Listen to your body. Thirst is a reliable indicator of dehydration for most healthy people. Also, checking the color of your urine—pale yellow or clear indicates good hydration, while darker yellow or amber is a sign you need more water.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/water/800/600',
  },
  {
    slug: 'the-truth-about-metabolic-flexibility',
    title: 'The Truth About Metabolic Flexibility',
    author: 'John Davis',
    publishedDate: new Date('2023-10-15').toLocaleDateString('en-NZ', { dateStyle: 'medium' }),
    excerpt: 'Metabolic flexibility is your body\'s ability to efficiently switch between fuel sources. Learn why it matters and how to improve it.',
    content: `
      <p class="mb-4">Metabolic flexibility is a term that’s gaining traction in health and wellness circles. But what does it actually mean? In simple terms, it refers to your metabolism's ability to adapt to different fuel sources—namely, carbohydrates (glucose) and fats.</p>
      <h3 class="text-2xl font-bold my-4">Why Is It Important?</h3>
      <p class="mb-4">A metabolically flexible person can easily switch from burning carbs after a high-carb meal to burning fat during a fast or after a high-fat meal. This adaptability is a hallmark of good health and is associated with:</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Better blood sugar control and insulin sensitivity.</li>
        <li>Stable energy levels throughout the day.</li>
        <li>Easier weight management.</li>
        <li>Improved athletic performance.</li>
      </ul>
      <h3 class="text-2xl font-bold my-4">How to Improve Metabolic Flexibility</h3>
      <p class="mb-4">Improving your metabolic flexibility involves lifestyle changes that challenge your metabolism to adapt. Key strategies include:</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Exercise:</strong> Both high-intensity interval training (HIIT) and endurance exercise have been shown to enhance metabolic flexibility.</li>
        <li><strong>Nutrient Timing:</strong> Experimenting with meal timing, such as intermittent fasting, can encourage your body to tap into fat stores for energy.</li>
        <li><strong>Dietary Composition:</strong> Avoid highly processed foods and focus on a whole-foods diet. Cycling between lower and higher carbohydrate intake can also be an effective strategy for some individuals.</li>
      </ul>
      <p>By making these adjustments, you can train your body to become a more efficient "hybrid engine," capable of running on whatever fuel is available.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/flexibility/800/600',
  },
  {
    slug: 'understanding-protein-intake-for-muscle-growth',
    title: 'Understanding Protein Intake for Muscle Growth',
    author: 'Sarah Chen',
    publishedDate: new Date('2023-09-28').toLocaleDateString('en-NZ', { dateStyle: 'medium' }),
    excerpt: 'How much protein do you really need to build muscle? We cut through the noise and look at the scientific consensus for optimal gains.',
    content: `
      <p class="mb-4">Protein is the building block of muscle, and adequate intake is non-negotiable if your goal is to increase muscle mass. However, the fitness industry is rife with conflicting advice on exactly how much protein you should consume.</p>
      <h3 class="text-2xl font-bold my-4">The General Consensus</h3>
      <p class="mb-4">For active individuals looking to build muscle, research suggests a daily protein intake of <strong>1.6 to 2.2 grams per kilogram of body weight</strong> (or 0.73 to 1.0 grams per pound) is optimal. Consuming more than this range has not been shown to provide any additional benefit for muscle growth.</p>
      <h3 class="text-2xl font-bold my-4">Timing and Quality Matter</h3>
      <p class="mb-4">While total daily intake is the most important factor, the timing and quality of your protein also play a role.</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Distribution:</strong> Spreading your protein intake evenly throughout the day, in about 3-4 meals, seems to be more effective for muscle protein synthesis than consuming the majority in one or two large meals.</li>
        <li><strong>Quality:</strong> Focus on high-quality, complete protein sources that contain all essential amino acids. Examples include lean meats, poultry, fish, eggs, dairy, and soy products. Leucine is a particularly important amino acid for triggering muscle protein synthesis.</li>
      </ul>
      <p>Ultimately, consistency is key. Hitting your protein target daily, combined with a structured resistance training program, is the proven formula for building muscle effectively.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/protein/800/600',
  }
];
