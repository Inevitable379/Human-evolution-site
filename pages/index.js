import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import MilestoneSection from '../components/MilestoneSection';
import Timeline from '../components/Timeline';
import DataViz from '../components/DataViz';
import Footer from '../components/Footer';

const milestones = [
  {
    id: 'bipedalism',
    stage: 'bipedalism',
    era: '~6 million years ago',
    title: 'Walking Upright',
    description:
      'Bipedalism was the first great leap. By standing on two legs, our ancestors freed their hands for carrying food, crafting tools, and eventually reshaping the world. This single adaptation changed everything — from our spine and pelvis to how we see the horizon.',
    fact: 'Walking upright may have evolved to help early hominins travel efficiently across open savanna landscapes as forests shrank in East Africa.',
    factIcon: '🦶',
    reversed: false,
  },
  {
    id: 'tools',
    stage: 'tools',
    era: '~2.6 million years ago',
    title: 'Shaping Stone, Shaping Minds',
    description:
      'The creation of stone tools marks the birth of technology. Homo habilis earned the name "handy man" for chipping rocks into cutting edges. This wasn\'t just manual skill — it required foresight, planning, and an understanding of cause and effect.',
    fact: 'The Oldowan tools found in Gona, Ethiopia are the oldest known stone tools, showing deliberate flaking techniques.',
    factIcon: '🪨',
    reversed: true,
  },
  {
    id: 'fire',
    stage: 'fire',
    era: '~1 million years ago',
    title: 'Harnessing Fire',
    description:
      'Fire transformed human life. Cooking made food safer and more nutritious, fueling the energy-hungry brain. Firelight extended the day, creating time for storytelling, bonding, and the first social traditions that would become culture.',
    fact: 'Cooking food effectively "pre-digests" it, allowing humans to extract up to 50% more calories — a key driver of brain expansion.',
    factIcon: '🔥',
    reversed: false,
  },
  {
    id: 'language',
    stage: 'language',
    era: '~100,000 years ago',
    title: 'The Power of Words',
    description:
      'Language is perhaps humanity\'s most powerful tool. Complex speech enabled abstract thought, shared knowledge, and collective imagination. With language, humans could plan for the future, teach the young, and create shared myths that bound thousands together.',
    fact: 'The FOXP2 gene, sometimes called the "language gene," shows signs of strong natural selection unique to the human lineage.',
    factIcon: '💬',
    reversed: true,
  },
  {
    id: 'agriculture',
    stage: 'agriculture',
    era: '~10,000 years ago',
    title: 'Planting Roots',
    description:
      'The Agricultural Revolution was a turning point. By domesticating plants and animals, humans could settle in one place, build permanent communities, and develop the complex societies that led to cities, writing, and civilization as we know it.',
    fact: 'The Fertile Crescent (modern Iraq, Syria, and Turkey) was among the first regions where wheat, barley, and livestock were domesticated.',
    factIcon: '🌾',
    reversed: false,
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Human Evolution — What Makes Us Human?</title>
        <meta
          name="description"
          content="An interactive journey through millions of years of human evolution. Discover the milestones that made us who we are."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a href="#hero" className="sr-only">
        Skip to main content
      </a>

      <Navigation />

      <main role="main">
        <Hero />

        {milestones.map((milestone) => (
          <MilestoneSection key={milestone.id} {...milestone} />
        ))}

        <Timeline />

        <DataViz />
      </main>

      <Footer />
    </>
  );
}
