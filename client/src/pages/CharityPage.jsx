import CharityList from "@/components/charity/CharityList";
import SearchBar from "@/components/searchbar/SearchBar";
const CharityPage = () => {
  return (
    <section>
      Charity Page
      <SearchBar/>
      <CharityList />
    </section>
  );
};

export default CharityPage;
