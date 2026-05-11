import Hero from "../../components/sections/home/Hero";
import Introduction from "../../components/sections/home/Introduction";
import RoomsPreview from "../../components/sections/home/RoomsPreview";
import Gastronomy from "../../components/sections/home/Gastronomy";
import ExperiencesPreview from "../../components/sections/home/ExperiencesPreview";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Introduction />
      <RoomsPreview />
      <Gastronomy />
      <ExperiencesPreview />
    </main>
  );
}