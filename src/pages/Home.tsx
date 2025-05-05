import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import aifrontpage from "../assets/aifrontpage.png";

function Home() {
  const navigate = useNavigate();

  const handleFindJobs = () => {
    navigate("/find-jobs");
  };

  return (
    <>
      <Navbar />
      {/* Background Image Wrapper */}
      <div
        className="min-h-screen bg-cover bg-center flex"
        style={{
          backgroundImage: `url(${aifrontpage})`,
        }}
      >
        {/* Left Side Overlay with Half-Oval Shape */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-start p-10 text-white"
          style={{
            backgroundColor: "rgba(109, 39, 100, 0.7)",
            clipPath: "ellipse(100% 100% at 0% 50%)", // Half-oval effect
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 𝕊𝕜𝕚𝕝𝕝𝕞𝕒𝕥𝕔𝕙𝕣 —  𝐀𝐈 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐉𝐨𝐛 𝐑𝐞𝐜𝐨𝐦𝐦𝐞𝐧𝐝𝐚𝐭𝐢𝐨𝐧𝐬
          </h1>

          {/* <p className="text-lg md:text-xl font-medium mb-8 max-w-md">
            Find the best job recommendations powered by AI, just for you.
          </p> */}
          <p className="text-lg md:text-xl font-medium mb-8 max-w-md">
          ᴅɪꜱᴄᴏᴠᴇʀ ᴘᴇʀꜱᴏɴᴀʟɪᴢᴇᴅ ᴊᴏʙ ᴏᴘᴘᴏʀᴛᴜɴɪᴛɪᴇꜱ ᴛᴀɪʟᴏʀᴇᴅ ᴛᴏ ʏᴏᴜʀ ꜱᴋɪʟʟꜱ,             ɪɴᴛᴇʀᴇꜱᴛꜱ, ᴀɴᴅ ᴄᴀʀᴇᴇʀ ɢᴏᴀʟꜱ — ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴅᴠᴀɴᴄᴇᴅ ᴀʀᴛɪꜰɪᴄɪᴀʟ             ɪɴᴛᴇʟʟɪɢᴇɴᴄᴇ.
          </p>
          <button
            onClick={handleFindJobs}
            className="bg-white text-[#6D2764] hover:bg-[#6D2764]  hover:text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Find Jobs
          </button>
        </div>

        {/* Right side stays blank, shows image only */}
        <div className="hidden md:block md:w-1/2"></div>
      </div>
    </>
  );
}

export default Home;
