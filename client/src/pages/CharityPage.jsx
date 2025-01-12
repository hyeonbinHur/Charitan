import CharityList from "../components/charity/CharityList";
import "./ProjectPage.css";
// import CharitySearchBar from "../components/searchbar/CharitySearchBar";

const CharityPage = () => {
  return (
    <main>
      <div className="hero-section">
        <img
          src="https://images.pexels.com/photos/933624/pexels-photo-933624.jpeg?cs=srgb&dl=pexels-suraphat-933624.jpg&fm=jpg" // Replace with your image URL
          alt="Charity banner"
          className="hero-image"
        />
        <div className="hero-description">
          <h1>Explore Our Charities</h1>
          <p>
            Discover impactful projects making a difference globally. Support
            causes that matter and contribute to creating a better world for
            everyone.
          </p>
        </div>
      </div>
      <CharityList />
      <div>
        <p></p>
      </div>
    </main>
  );
};

export default CharityPage;
