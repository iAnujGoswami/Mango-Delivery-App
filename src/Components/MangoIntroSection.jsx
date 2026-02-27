import mangoImage from "../assets/mango.jpg"; // Add image here

function MangoIntroSection() {
  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-2 items-center mt-20">
      
      <div className="space-y-6">
        <h1 className="text-6xl font-light text-[#ff6f00] tenor-sans">
          Fresh Farm Mangoes
        </h1>

        <p className="text-xl text-[#555555] tenor-sans">
          Tropical Mangoes Delivered to Your Doorstep
          Within 10 minutes
        </p>

        <button className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
          Shop Now
        </button>
      </div>

      <div className="flex justify-center">
        <img
          src={mangoImage}
          alt="Mangoes"
          className="w-[400px]"
        />
      </div>
    </section>
  );
}

export default MangoIntroSection;
