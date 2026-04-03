import Navbar from "../Components/Navbar";
import MangoIntroSection from "../Components/MangoIntroSection";

function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fffdf6_0%,#fff5df_34%,#ffe8bf_72%,#ffdba1_100%)]">
      <Navbar />
      <MangoIntroSection />
    </div>
  );
}

export default Home;
