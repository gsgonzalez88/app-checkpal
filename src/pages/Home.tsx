import checkPalLogo from "../assets/checkpal.png"
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="p-4">
      <Header/>
      <h1 className="text-2xl font-bold mb-4">CheckPal</h1>
      <img
          src={checkPalLogo}
          className="logo"
          alt="CheckPal logo"
        />

    </div>
  );
};

export default Home;
