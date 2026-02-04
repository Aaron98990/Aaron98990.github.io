import { useState, useEffect } from 'react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { useRoomCounts } from '../../hooks/useRoomCounts';
import Header from '../../components/Header/Header';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import styles from './Home.module.css';

const Home = () => {
  const { counts } = useRoomCounts();
  const [currentImage, setCurrentImage] = useState('/assets/me.png');

  const imageChange = (imageName, horizontalPercent) => {
    const newSrc = `/assets/${imageName}`;
    setCurrentImage(newSrc);
  };

  // Make all links open in new tab
  useEffect(() => {
    const links = document.links;
    for (let i = 0; i < links.length; i++) {
      links[i].target = "_blank";
    }
  }, []);

  const projects = [
    {
      title: "Tip Of the Tongue",
      description: "Play Jeopardy, remotely! Three individuals compete in this game with a buzzer & scoring system!",
      buttonText: "Website",
      buttonUrl: "http://buzzin.feleke.xyz/",
      roomCount: counts.buzzInCount,
      image: "game.jpg",
      isAnimated: true
    },
    {
      title: "City Wanderer",
      description: "Multiplayer game to guess the location on a map based on a video of someone walking in the city.",
      buttonText: "Website", 
      buttonUrl: "https://www.city-wanderer.com/geo",
      roomCount: counts.geoCount,
      image: "wander.png",
      isAnimated: true
    },
    {
      title: "Wii Inspect",
      description: "Decode memories from the binary file to find high scores, stamps, and recent plays from Wii Sports Resort!",
      buttonText: "GitHub",
      buttonUrl: "https://github.com/Aaron98990/wii-inspect",
      roomCount: counts.wiiInspectCount,
      image: "wii.png"
    },
    {
      title: "Red Card Report",
      description: "Customized for college (NCAA), high school (NFHS), and worldwide (IFAB+FIFA) soccer rules.",
      buttonText: "Website",
      buttonUrl: "/ejection",
      image: "ejection-reason.png",
      isInternal: true
    },
    {
      title: "Wuhu Island Map",
      description: "An interactive map with location information & route planning for Wuhu Islands in Wii Sports Resort.",
      buttonText: "Website",
      buttonUrl: "/map",
      image: "wuhu-map.png",
      isInternal: true
    },
    {
      title: "Offside Quiz",
      description: "Calling offside as an assistant referee in soccer is very challenging. Are you ready for the challenge?",
      buttonText: "Website",
      buttonUrl: "/offside",
      image: "offside-line.png",
      isInternal: true
    },
    {
      title: "Jeopardy Board Editor",
      description: "Create, share, customize, and print your Jeopardy Board. Drag & Drop Clues.",
      buttonText: "Website",
      buttonUrl: "/board",
      image: "edit-board.png",
      isInternal: true
    },
    {
      title: "Ways of the Game",
      description: "Connecting different concepts in the Laws for soccer and linking relevant videos/articles.",
      buttonText: "Website",
      buttonUrl: "http://www.feleke.xyz/ways-of-the-game",
      image: "ball.png"
    },
    {
      title: "Bookmarks Extension",
      description: "No ads. No news. Just your links. 100's of them. On every new tab.",
      buttonText: "Show Me a Preview",
      buttonUrl: "/assets/bookmarks-preview.png",
      image: "bookmarks-preview.png"
    }
  ];

  return (
    <ThemeProvider>
      <div className={styles.homeContainer}>
        <Header onImageChange={imageChange} />
        
        <div>
          <div className={styles.flexContainer}>
            {projects.map((project, index) => (
              <ProjectTile
                key={index}
                title={project.title}
                description={project.description}
                buttonText={project.buttonText}
                buttonUrl={project.buttonUrl}
                roomCount={project.roomCount || 0}
                onMouseOver={() => imageChange(project.image)}
                isAnimated={project.isAnimated}
                isInternal={project.isInternal}
              />
            ))}
          </div>

          <h2 className={styles.booksTitle}>Books I've read</h2>

          <div className={styles.grGridContainer}>
            <div className="gr_grid_book_container"><a title="How We Know What Isn't So: The Fallibility of Human Reason in Everyday Life" rel="nofollow" href="https://www.goodreads.com/book/show/125819.How_We_Know_What_Isn_t_So"><img alt="How We Know What Isn't So: The Fallibility of Human Reason in Everyday Life" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348628996l/125819._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Wisdom of Crowds" rel="nofollow" href="https://www.goodreads.com/book/show/68143.The_Wisdom_of_Crowds"><img alt="The Wisdom of Crowds" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388211043l/68143._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Steve Jobs" rel="nofollow" href="https://www.goodreads.com/book/show/11084145-steve-jobs"><img alt="Steve Jobs" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1511288482l/11084145._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Defining Decade: Why Your Twenties Matter—And How to Make the Most of Them Now" rel="nofollow" href="https://www.goodreads.com/book/show/40603783-the-defining-decade"><img alt="The Defining Decade: Why Your Twenties Matter—And How to Make the Most of Them Now" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529594243l/40603783._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Brady vs Manning: The Untold Story of the Rivalry That Transformed the NFL" rel="nofollow" href="https://www.goodreads.com/book/show/25241647-brady-vs-manning"><img alt="Brady vs Manning: The Untold Story of the Rivalry That Transformed the NFL" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1441143962l/25241647._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Playing Against the House: The Dramatic World of an Undercover Union Organizer" rel="nofollow" href="https://www.goodreads.com/book/show/25814350-playing-against-the-house"><img alt="Playing Against the House: The Dramatic World of an Undercover Union Organizer" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1455468916l/25814350._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Never Lost Again: The Google Mapping Revolution That Sparked New Industries and Augmented Our Reality – The Essential Application's Creation Story from Keyhole" rel="nofollow" href="https://www.goodreads.com/book/show/35820393-never-lost-again"><img alt="Never Lost Again: The Google Mapping Revolution That Sparked New Industries and Augmented Our Reality – The Essential Application's Creation Story from Keyhole" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519634010l/35820393._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Bad Blood: Secrets and Lies in a Silicon Valley Startup" rel="nofollow" href="https://www.goodreads.com/book/show/37976541-bad-blood"><img alt="Bad Blood: Secrets and Lies in a Silicon Valley Startup" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1523311515l/37976541._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Bitcoin Billionaires: A True Story of Genius, Betrayal, and Redemption" rel="nofollow" href="https://www.goodreads.com/book/show/41433284-bitcoin-billionaires"><img alt="Bitcoin Billionaires: A True Story of Genius, Betrayal, and Redemption" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1552506265l/41433284._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Permanent Record" rel="nofollow" href="https://www.goodreads.com/book/show/46223297-permanent-record"><img alt="Permanent Record" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1564666396l/46223297._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Cult of Glory: The Bold and Brutal History of the Texas Rangers" rel="nofollow" href="https://www.goodreads.com/book/show/48812040-cult-of-glory"><img alt="Cult of Glory: The Bold and Brutal History of the Texas Rangers" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1573779119l/48812040._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Beautiful Things: A Memoir" rel="nofollow" href="https://www.goodreads.com/book/show/50542126-beautiful-things"><img alt="Beautiful Things: A Memoir" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1612712713l/50542126._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Comfort Crisis: Embrace Discomfort To Reclaim Your Wild, Happy, Healthy Self" rel="nofollow" href="https://www.goodreads.com/book/show/55120630-the-comfort-crisis"><img alt="The Comfort Crisis: Embrace Discomfort To Reclaim Your Wild, Happy, Healthy Self" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1601481119l/55120630._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Playing Through the Pain: Ken Caminiti and the Steroids Confession That Changed Baseball Forever" rel="nofollow" href="https://www.goodreads.com/book/show/58667466-playing-through-the-pain"><img alt="Playing Through the Pain: Ken Caminiti and the Steroids Confession That Changed Baseball Forever" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1651323875l/58667466._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Elon Musk" rel="nofollow" href="https://www.goodreads.com/book/show/122765395-elon-musk"><img alt="Elon Musk" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1692288251l/122765395._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Lost Subways of North America: A Cartographic Guide to the Past, Present, and What Might Have Been" rel="nofollow" href="https://www.goodreads.com/book/show/123012869-the-lost-subways-of-north-america"><img alt="The Lost Subways of North America: A Cartographic Guide to the Past, Present, and What Might Have Been" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1681006320l/123012869._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Humans Need Not Apply: A Guide to Wealth and Work in the Age of Artificial Intelligence" rel="nofollow" href="https://www.goodreads.com/book/show/24945487-humans-need-not-apply"><img alt="Humans Need Not Apply: A Guide to Wealth and Work in the Age of Artificial Intelligence" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1430944590l/24945487._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="The Jakarta Method: Washington's Anticommunist Crusade and the Mass Murder Program that Shaped Our World" rel="nofollow" href="https://www.goodreads.com/book/show/53054943-the-jakarta-method"><img alt="The Jakarta Method: Washington's Anticommunist Crusade and the Mass Murder Program that Shaped Our World" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575565282l/53054943._SX98_SY160_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Black Prophetic Fire" rel="nofollow" href="https://www.goodreads.com/book/show/20588663-black-prophetic-fire"><img alt="Black Prophetic Fire" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1406511617l/20588663._SX98_.jpg" /></a></div>
            <div className="gr_grid_book_container"><a title="Busting Vegas: The MIT Whiz Kid Who Brought the Casinos to Their Knees" rel="nofollow" href="https://www.goodreads.com/book/show/174540.Busting_Vegas"><img alt="Busting Vegas: The MIT Whiz Kid Who Brought the Casinos to Their Knees" border="0" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442969041l/174540._SX98_.jpg" /></a></div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;