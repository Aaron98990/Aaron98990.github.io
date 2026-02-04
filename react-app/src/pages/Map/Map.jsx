import { useState, useEffect, useRef } from 'react';
import styles from './Map.module.css';

const Map = () => {
  const canvasRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [visitedPoints, setVisitedPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoint, setSelectedPoint] = useState(null);

  // iPoints data - all 80 points with descriptions
  const iPoints = [
    { id: 1, x: 189, y: 139, name: "Barnacle Arch", daytime: "This sea arch is just begging for someone to fly under it...", evening: "There's another arch like this one around Wuhu Island.", night: "At night, this arch looks a little like a pair of rocky pants..." },
    { id: 2, x: 246, y: 316, name: "Basketball Court", daytime: "All of the basketball action on Wuhu Island happens here.", evening: "Three-point contests are held here, but it's mostly quiet in the evening.", night: "At night, the 3-Point Contest is held here. Fans go wild!" },
    { id: 3, x: 258, y: 220, name: "Beginner's Archery Area", daytime: "Even this easiest Archery range takes skill to master.", evening: "Wind can push the flight of the arrows. Planes probably don't help...", night: "Take aim and hold your breath...but not for too long!" },
    { id: 4, x: 328, y: 483, name: "Beginner's Wakeboarding Area", daytime: "This stretch of sea is where the wakeboarders catch big air!", evening: "The smooth water here attracts some world-class wakeboarders.", night: "The secret to wakeboarding is to land flat! OK, it's not such a secret..." },
    { id: 5, x: 233, y: 304, name: "Bowling Alley", daytime: "If you're into bowling, this is the place to be.", evening: "This island is proud to have one of the best bowling alleys around!", night: "Some people travel to Wuhu Island just to bowl here." },
    { id: 6, x: 257, y: 304, name: "Broken Clock Tower", daytime: "Don't set your watch to this clock tower--it stopped!", evening: "Some clock fanatic stole one of the clock's hands!", night: "They could repair it, but then it wouldn't have the same charm." },
    { id: 7, x: 261, y: 141, name: "Cabana Lagoon", daytime: "Quiet and laid-back, this is a place to put your feet up and relax.", evening: "Nice and quiet, when the Power Cruisers aren't racing.", night: "It's even quieter here at night. Except for the occasional plane..." },
    { id: 8, x: 442, y: 341, name: "Camel Rock", daytime: "This rock used to look like more like a camel, you know...", evening: "Over the years, the wind has worn away the camel's humps.", night: "Maybe they should change the name to Not-Quite-A-Camel-Rock?" },
    { id: 9, x: 334, y: 154, name: "Cedar-Tree Tunnel", daytime: "The tunnel leads to the Lone Cedar and the volcano entrance.", evening: "The path snakes past the Lone Cedar and to the Mountain Monument.", night: "This path goes all the way round the top of the mountain." },
    { id: 10, x: 359, y: 100, name: "Cliffside Ruins", daytime: "How did they build this all the way up here?", evening: "The stone blocks are perfectly laid-- you can hardly see any gaps!", night: "Ancient writing is chiseled into the rock, but it's getting faded." },
    { id: 11, x: 398, y: 273, name: "Cocoba Hotel", daytime: "It's like a 5-star hotel, only with more stars!", evening: "The hotel lobby is where the rich and famous gather for cocktails.", night: "The hotel never sleeps--there's always someone checking in or out." },
    { id: 12, x: 53, y: 511, name: "Crab Rock", daytime: "The local crabs use this rock as a meeting place.", evening: "At low tide, you can walk out to this rock.", night: "Moonlight makes this rock look even more mysterious." },
    { id: 13, x: 362, y: 141, name: "Dead-End Point", daytime: "This cliff offers amazing views...if you don't mind heights!", evening: "Some say this is the most romantic spot on the island.", night: "The waves crash loudly against the rocks below." },
    { id: 14, x: 240, y: 42, name: "Deserted Island", daytime: "This tiny island looks completely uninhabited.", evening: "Perfect for a romantic picnic...if you can get there!", night: "Sometimes you can see lights from this island at night. Spooky!" },
    { id: 15, x: 175, y: 49, name: "Diving Spot", daytime: "The crystal-clear water here is perfect for diving.", evening: "Watch out for jellyfish in the evening!", night: "Diving at night? That takes some serious guts!" },
    { id: 16, x: 303, y: 167, name: "Duckling Lake", daytime: "A family of ducks has made this lake their home.", evening: "The ducklings practice their swimming here every evening.", night: "The ducks sleep peacefully here at night." },
    { id: 17, x: 312, y: 125, name: "Entrance to the Mysterious Ruins", daytime: "What ancient civilization built these mysterious ruins?", evening: "Strange echoes can be heard from within the ruins.", night: "Some say the ruins are haunted...but that's just a rumor." },
    { id: 18, x: 256, y: 180, name: "Evergreen Grove", daytime: "These trees have been growing here for hundreds of years.", evening: "The grove provides perfect shade on hot summer days.", night: "Owls nest in these ancient trees." },
    { id: 19, x: 194, y: 456, name: "Extreme Canoeist", daytime: "Only the bravest canoeists tackle these rough waters!", evening: "The waves are calmer in the evening for beginners.", night: "Canoeing at night? Now that's extreme!" },
    { id: 20, x: 280, y: 508, name: "Fireworks Launch Zone 1", daytime: "Fireworks are prepared here for the evening shows.", evening: "The first fireworks show launches from here!", night: "The night sky lights up with beautiful fireworks from here!" },
    { id: 21, x: 421, y: 488, name: "Fireworks Launch Zone 2", daytime: "The second fireworks launch site for double the spectacle!", evening: "Synchronized shows launch from both zones!", night: "Amazing fireworks displays light up the entire island!" },
    { id: 22, x: 300, y: 232, name: "Footbridge", daytime: "This quaint bridge connects two sides of the stream.", evening: "A perfect spot for an evening stroll.", night: "The bridge is beautifully lit up at night." },
    { id: 23, x: 255, y: 205, name: "Forest Monument", daytime: "An ancient stone monument hidden in the forest.", evening: "Moss and vines have started to cover the old stone.", night: "The monument has an eerie presence at night." },
    { id: 24, x: 452, y: 364, name: "Frisbee Dog Park", daytime: "Dogs love to catch frisbees on this grassy field!", evening: "The dogs get extra playful in the cooler evening air.", night: "Even the dogs need their beauty sleep eventually." },
    { id: 25, x: 431, y: 62, name: "Gateway to Wuhu", daytime: "Welcome to Wuhu Island! Your adventure begins here.", evening: "The gateway looks majestic in the sunset light.", night: "The lit gateway beacon guides travelers safely home." },
    { id: 26, x: 79, y: 475, name: "Golf Area A", daytime: "The first of three challenging golf areas on Wedge Island.", evening: "Perfect weather for an evening round of golf.", night: "The golf course is closed, but the greens are beautifully maintained." },
    { id: 27, x: 74, y: 559, name: "Golf Area B", daytime: "The second golf course offers different challenges.", evening: "Many golfers prefer the cooler evening temperatures.", night: "Golf carts line up neatly for tomorrow's games." },
    { id: 28, x: 29, y: 492, name: "Golf Area C", daytime: "The most challenging of the three golf courses!", evening: "Only expert golfers dare play this course in low light.", night: "The 19th hole is calling...time for dinner!" },
    { id: 29, x: 345, y: 174, name: "Heart of Maka Wuhu", daytime: "The very heart of the ancient volcano.", evening: "The crater glows with the last light of day.", night: "Strange sounds echo from deep within the volcano." },
    { id: 30, x: 364, y: 233, name: "Heartbreak Peak", daytime: "Legend says this peak was named after a tragic love story.", evening: "The peak casts a heart-shaped shadow at sunset.", night: "Lovers come here to make wishes on shooting stars." },
    { id: 31, x: 219, y: 234, name: "Hillside Cabins", daytime: "Cozy cabins offer the perfect mountain getaway.", evening: "Smoke rises from the cabin chimneys.", night: "Warm lights glow from the cabin windows." },
    { id: 32, x: 324, y: 238, name: "Hilltop Overlook", daytime: "The best panoramic view of the entire island!", evening: "Photographers love the golden hour lighting from here.", night: "City lights twinkle like stars from this vantage point." },
    { id: 33, x: 399, y: 208, name: "Island Loop Tunnel #1", daytime: "The first tunnel in the scenic island loop drive.", evening: "Cool and refreshing after a hot day in the sun.", night: "The tunnel is lit with atmospheric blue lighting." },
    { id: 34, x: 240, y: 144, name: "Island Loop Tunnel #2", daytime: "The second tunnel continues the scenic route.", evening: "Listen for the echo of your voice in the tunnel.", night: "Mysterious shadows dance on the tunnel walls." },
    { id: 35, x: 369, y: 176, name: "Lava Monument", daytime: "Built from actual lava rock from Maka Wuhu!", evening: "The dark volcanic rock contrasts beautifully with the sunset.", night: "The monument seems to absorb the moonlight." },
    { id: 36, x: 361, y: 200, name: "Lava Tube", daytime: "This natural tube was formed by flowing lava long ago.", evening: "Cool air flows through the tube, creating natural air conditioning.", night: "Bats use this tube as their nighttime highway." },
    { id: 37, x: 387, y: 155, name: "Lone Cedar", daytime: "A single, majestic cedar tree stands guard on the mountain.", evening: "The tree's silhouette is striking against the evening sky.", night: "Legends say this tree grants wishes to those pure of heart." },
    { id: 38, x: 367, y: 165, name: "Maka Wuhu", daytime: "The mighty volcano that formed this beautiful island.", evening: "The crater rim glows orange in the setting sun.", night: "Steam rises mysteriously from the volcanic vents." },
    { id: 39, x: 99, y: 166, name: "Miguel's Guide Plane*", daytime: "Miguel's plane shows visitors the best sights!", evening: "Miguel knows all the best sunset viewing spots.", night: "Even Miguel's plane needs rest between tours." },
    { id: 40, x: 300, y: 136, name: "Mountain Hikers", daytime: "Brave hikers tackle the challenging mountain trails.", evening: "The hikers are heading back down as the sun sets.", night: "Mountain rescue keeps watch over nighttime hikers." },
    { id: 41, x: 387, y: 199, name: "Mountain Monument", daytime: "An ancient monument built at the mountain's peak.", evening: "The monument's peak catches the last rays of sunlight.", night: "The monument stands as a silent guardian in the darkness." },
    { id: 42, x: 349, y: 117, name: "Mysterious Ruins", daytime: "Ancient ruins hold secrets of a lost civilization.", evening: "Shadows grow long between the ancient stone columns.", night: "Some say ghostly figures walk among the ruins at night." },
    { id: 43, x: 407, y: 165, name: "Needlepoint Spire", daytime: "This sharp spire reaches toward the sky like a needle.", evening: "The spire casts a long, thin shadow across the landscape.", night: "Lightning often strikes this tall spire during storms." },
    { id: 44, x: 340, y: 142, name: "Off-Road Vehicle", daytime: "Adventure seekers explore the rugged terrain here.", evening: "The vehicles kick up clouds of dust in the dry evening air.", night: "Headlights cut through the darkness on night expeditions." },
    { id: 45, x: 378, y: 278, name: "Palm Boulevard", daytime: "A beautiful avenue lined with swaying palm trees.", evening: "The palms rustle gently in the evening breeze.", night: "The boulevard is romantically lit with string lights." },
    { id: 46, x: 155, y: 233, name: "Pirate's Eye", daytime: "Legend says pirates once used this cove as a hideout.", evening: "The cove entrance looks like a giant eye at sunset.", night: "Some say pirate ghosts still guard their buried treasure here." },
    { id: 47, x: 408, y: 263, name: "Pool Patio", daytime: "A luxurious pool area perfect for relaxation.", evening: "The pool area is popular for evening cocktail parties.", night: "The pool is beautifully illuminated for night swimming." },
    { id: 48, x: 468, y: 263, name: "Power-Cruising Area", daytime: "High-speed boats race across these waters!", evening: "The waters calm down for more leisurely evening cruises.", night: "Navigation lights twinkle on the anchored boats." },
    { id: 49, x: 175, y: 75, name: "Private Island", daytime: "An exclusive private island for VIP guests only.", evening: "The island's mansion glows warmly in the sunset.", night: "Privacy and luxury combine in this secluded paradise." },
    { id: 50, x: 317, y: 298, name: "Red Iron Bridge", daytime: "This sturdy iron bridge is painted bright red.", evening: "The bridge's red color looks even more vibrant at sunset.", night: "The bridge is dramatically lit from below at night." },
    { id: 51, x: 261, y: 270, name: "Runner's Circle", daytime: "Joggers love this scenic circular running path.", evening: "The circle fills with evening runners escaping the heat.", night: "Dedicated runners continue their workouts even at night." },
    { id: 52, x: 100, y: 292, name: "Seaplane Team*", daytime: "The seaplane team offers aerial tours of the island.", evening: "Seaplanes return from their sunset tour flights.", night: "The seaplanes are secured for the night at their dock." },
    { id: 53, x: 351, y: 134, name: "Sea Serpent Cavern", daytime: "This twisting sea cave snakes underneath the Mysterious Ruins.", evening: "This spooky sea cave is now a playground for Power Cruisers.", night: "At night, the cave has a kind of calm, tranquil atmosphere." },
    { id: 54, x: 338, y: 93, name: "Serpent's Mouth", daytime: "This spooky cave entrance seems to be an entrance to the ruins.", evening: "Don't even think about trying to fly a plane in there...", night: "Some say the waves hitting this cave entrance make a sound like a hiss..." },
    { id: 55, x: 375, y: 149, name: "Silk Sands", daytime: "The soft, smooth sand in this pit squishes between your toes.", evening: "The unusual type of sand here sets like concrete when mixed with water.", night: "How did this pit of silky sand get up here, anyway?" },
    { id: 56, x: 122, y: 352, name: "Sportfishing Spot", daytime: "All of the sportfishing on Wuhu Island is catch and release.", evening: "Being out on the beautiful ocean is half the fun of sportfishing.", night: "At night, the sportfishing types hang up their poles and swap stories." },
    { id: 57, x: 280, y: 317, name: "Starboard Harbor", daytime: "Fancy yachts from all over the world drop anchor here.", evening: "Many boaters like to watch the sunset from their yachts.", night: "The harbor is full of life even late into the night." },
    { id: 58, x: 447, y: 408, name: "Starry Beach", daytime: "The sand grains are curiously shaped like stars.", evening: "As you'd guess, this beach is also a great place to watch the night sky.", night: "They sell bottles of the star-shaped sand grains as souvenirs." },
    { id: 59, x: 264, y: 163, name: "Stillwater Grotto", daytime: "Watch out!", evening: "Stop reading this and pay attention to not crashing!", night: "Are you sure you can make it?!" },
    { id: 60, x: 415, y: 310, name: "Sugarsand Beach", daytime: "A huge white beach with sand like powdered sugar.", evening: "At sunset, the sky, sea, and sand blend into a golden glow.", night: "This is the place to go for hanging out after the sun goes down." },
    { id: 61, x: 315, y: 185, name: "Summerstone Castle", daytime: "It's not an easy hike, but the view from the castle is amazing!", evening: "This castle has unbelievable views--especially at sunset!", night: "The high walls of the castle make for a perfect spot to watch fireworks." },
    { id: 62, x: 307, y: 208, name: "Summerstone Falls", daytime: "Seven tons of water cascade every second from a height of 330 ft.", evening: "You really wouldn't want to go down this waterfall in a canoe!", night: "The water of Wuhu Island is full of healthy minerals. Delicious!" },
    { id: 63, x: 201, y: 255, name: "Sundown Point", daytime: "Every photo taken here ends up turning out like a postcard.", evening: "The setting sun beyond the island makes for a breathtaking view.", night: "People come here at night just to see the moon over the sparkling sea." },
    { id: 64, x: 285, y: 218, name: "Swaying Bridge", daytime: "This rickety bridge is fun--and scary--to walk across.", evening: "It takes a lot of guts to ride a bicycle across this bridge!", night: "In Swordplay Showdown, you have to fight across this bridge!" },
    { id: 65, x: 411, y: 512, name: "Sweet Beach", daytime: "This quiet, tranquil spot is one of the most romantic on the island.", evening: "There's nothing but the soft sound of lapping waves. And planes.", night: "This gorgeous spot is featured on countless postcards." },
    { id: 66, x: 216, y: 291, name: "Swordplay Colosseum", daytime: "Swordplay duels are held in this specially built floating arena.", evening: "The spectators obviously enjoy watching people fall in the sea!", night: "Night is the only time the colosseum is quiet and tranquil." },
    { id: 67, x: 253, y: 230, name: "Talon Rock", daytime: "If you had wings, you could glide off this cliff all the way to town.", evening: "You'd need a wingspan of 30 yards to fly...if you had wings.", night: "Some cyclists are brave enough to ride a bike off this cliff!" },
    { id: 68, x: 402, y: 247, name: "Tennis Courts", daytime: "Unfortunately, the dogs on the beach ran off with all the tennis balls.", evening: "If you're in the mood for Table Tennis, head to the pool patio.", night: "Hopefully, the dogs won't get the next shipment of tennis balls, too..." },
    { id: 69, x: 182, y: 220, name: "The Candle", daytime: "This lighthouse was mistakenly built at twice the planned size.", evening: "Some say it was designed to look like a candle, but that's just a myth.", night: "This lighthouse shines as bright as 1,600,000 candles!" },
    { id: 70, x: 67, y: 515, name: "The Nineteenth Hole Hotel", daytime: "Drop by the cafe for a bite to eat after a round of golf.", evening: "Your golfing mishaps will melt away at the sauna and spa facilities.", night: "Most of the golfers who vacation here are early-morning types." },
    { id: 71, x: 267, y: 335, name: "The Queen Peach", daytime: "This luxury cruiser is the picture of elegant opulence.", evening: "While in port, the ship's extravagant swimming pool is closed.", night: "This ship hosts lavish parties every night. Sorry, no flip-flops." },
    { id: 72, x: 193, y: 394, name: "The Sea Caddy*", daytime: "This regular ferry service links Wuhu Island and Wedge Island.", evening: "If you're lucky, you might spot a whale on your ferry ride!", night: "This is the last boat back to Wuhu Island today." },
    { id: 73, x: 294, y: 380, name: "The Whale Shark*", daytime: "Sky, sea, and sand!", evening: "Surfing, slicing, slaloming!", night: "Swinging, splashing, shooting!" },
    { id: 74, x: 381, y: 236, name: "Toppled Monument", daytime: "This ancient stone monument has toppled over.", evening: "How many centuries did this monument stand before it fell over?", night: "Now the fallen rocks look as though they belong there." },
    { id: 75, x: 168, y: 299, name: "Undersea Cable Inspectors", daytime: "Wedge Island is linked to the main island through undersea cables.", evening: "Inspecting undersea cables can't be all that exciting...", night: "It's too dark to even see the cables, let alone inspect them!" },
    { id: 76, x: 288, y: 208, name: "Weathered Monument", daytime: "This ancient monument was built with massive blocks of stone.", evening: "It's not entirely clear what this monument's original purpose was.", night: "The stone on top weighs an astonishing 120 tons." },
    { id: 77, x: 101, y: 513, name: "Wedge Island Marina", daytime: "The people carrying small bags must be here for Frisbee Golf.", evening: "The last ferry to the main island leaves at 8:30 p.m. Don't be late!", night: "The last ferry to the main island has already left." },
    { id: 78, x: 316, y: 33, name: "Whale Watchers", daytime: "Whales are often sighted off the island, especially in this area.", evening: "The massive whales here make quite a splash.", night: "You can't see anything at night, but people come to watch anyway." },
    { id: 79, x: 220, y: 205, name: "Wind Orchard", daytime: "These massive windmills provide clean power for the whole island.", evening: "A warm tropical breeze keeps these huge blades spinning.", night: "Imagine how fast your plane could go if it had a propeller that big..." },
    { id: 80, x: 264, y: 290, name: "Wishing Fountain", daytime: "Tourists throw coins in the fountain and make a wish.", evening: "When the sun is right, all of the coins in the fountain sparkle.", night: "Nobody makes any promises about wishes coming true, you know!" }
  ];

  const filteredIPoints = iPoints.filter(point =>
    point.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDistance = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const visitPoint = (point) => {
    // Always set selected point for description display
    setSelectedPoint(point);
    
    // Add to visited points if not already visited
    if (visitedPoints.find(p => p.id === point.id)) return;

    const newVisited = [...visitedPoints, point];
    setVisitedPoints(newVisited);

    if (visitedPoints.length > 0) {
      const lastPoint = visitedPoints[visitedPoints.length - 1];
      const additionalDistance = calculateDistance(lastPoint, point);
      setDistance(prev => prev + additionalDistance);
    }

    drawCanvas(newVisited);
  };

  const drawCanvas = (visited = visitedPoints) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections between visited points
    if (visited.length > 1) {
      ctx.strokeStyle = '#dc3545';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(visited[0].x, visited[0].y);
      for (let i = 1; i < visited.length; i++) {
        ctx.lineTo(visited[i].x, visited[i].y);
      }
      ctx.stroke();
    }

    // Draw all iPoints
    iPoints.forEach(point => {
      const isVisited = visited.find(p => p.id === point.id);
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = isVisited ? '#28a745' : '#007bff';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add number label
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(point.id, point.x, point.y + 3);
    });
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find closest iPoint
    let closestPoint = null;
    let minDistance = Infinity;

    iPoints.forEach(point => {
      const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
      if (dist < 15 && dist < minDistance) { // 15px click tolerance
        minDistance = dist;
        closestPoint = point;
      }
    });

    if (closestPoint) {
      visitPoint(closestPoint);
    }
  };

  const resetMap = () => {
    setVisitedPoints([]);
    setDistance(0);
    drawCanvas([]);
  };

  const undoLastPoint = () => {
    if (visitedPoints.length === 0) return;

    const newVisited = visitedPoints.slice(0, -1);
    setVisitedPoints(newVisited);

    // Recalculate distance
    let newDistance = 0;
    for (let i = 1; i < newVisited.length; i++) {
      newDistance += calculateDistance(newVisited[i - 1], newVisited[i]);
    }
    setDistance(newDistance);

    drawCanvas(newVisited);
  };

  const visitRandomPoint = () => {
    const unvisited = iPoints.filter(point => !visitedPoints.find(p => p.id === point.id));
    if (unvisited.length > 0) {
      const randomPoint = unvisited[Math.floor(Math.random() * unvisited.length)];
      visitPoint(randomPoint);
    }
  };

  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Wii Sports Resort Island Flyover</h1>
      
      <div className={styles.mapContainer}>
        <div className={styles.leftPanel}>
          <p>Welcome to Wuhu Islands and Wedge Island! Click square to visit iPoint.</p>
          
          <div className={styles.imageContainer}>
            <img src="/assets/map.png" alt="Wuhu Island Map" className={styles.mapImage} />
            <canvas
              ref={canvasRef}
              width={500}
              height={600}
              className={styles.canvas}
              onClick={handleCanvasClick}
            />
          </div>

          <div className={styles.highScores}>
            <p>
              Unconfirmed High Score: 
              <a href="https://www.youtube.com/watch?v=Zvgl3T-_nuY" target="_blank" rel="noopener noreferrer"> 69 iPoints</a> / 
              <a href="https://www.youtube.com/watch?v=XWYmRN3Wyv8" target="_blank" rel="noopener noreferrer"> No Crashes: 61 iPoints</a>
            </p>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.controls}>
            <button onClick={resetMap} className="btn btn-secondary">Reset</button>
            <button onClick={undoLastPoint} className="btn btn-warning">Undo</button>
            <button onClick={visitRandomPoint} className="btn btn-info">Random</button>
          </div>

          <div className={styles.stats}>
            <p><strong>Distance:</strong> {Math.round(distance)} units</p>
            <p><strong>Visited ({visitedPoints.length}):</strong></p>
            <div className={styles.visitedList}>
              {visitedPoints.map((point, index) => (
                <div key={point.id} className={styles.visitedItem}>
                  {index + 1}. {point.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.searchPanel}>
          <p>Click name to visit iPoint.</p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for iPoints..."
            className="form-control mb-3"
          />
          
          <div className={styles.iPointsList}>
            {filteredIPoints.map(point => {
              const isVisited = visitedPoints.find(p => p.id === point.id);
              return (
                <div
                  key={point.id}
                  className={`${styles.iPointItem} ${isVisited ? styles.visited : ''}`}
                  onClick={() => visitPoint(point)}
                >
                  {point.id}. {point.name}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.infoPanel}>
          {selectedPoint ? (
            <div className={styles.pointDescription}>
              <h1>{selectedPoint.name}</h1>
              
              <h4>Daytime Quote:</h4>
              <p>{selectedPoint.daytime}</p>
              
              <h4>Evening Quote:</h4>
              <p>{selectedPoint.evening}</p>
              
              <h4>Night Quote:</h4>
              <p>{selectedPoint.night}</p>
              
              <div className={styles.pointActions}>
                <button 
                  onClick={() => setSelectedPoint(null)} 
                  className="btn btn-secondary btn-sm"
                >
                  Back to Info
                </button>
                {!visitedPoints.find(p => p.id === selectedPoint.id) && (
                  <button 
                    onClick={() => visitPoint(selectedPoint)} 
                    className="btn btn-primary btn-sm"
                  >
                    Visit This iPoint
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.info}>
              <h3>About Wuhu Island</h3>
              <p>Here is the full list of iPoints on Wuhu Island and Wedge Island that can be found in Island Flyover in Wii Sports Resort, as well as in Pilotwings Resort. There are 80 different iPoints in total.</p>
              
              <h4>Collecting iPoints unlocks:</h4>
              <ul>
                <li><strong>10</strong> - You can now pop balloons!</li>
                <li><strong>20</strong> - You can now fly in the evening!</li>
                <li><strong>30</strong> - You can now use the double blaster!</li>
                <li><strong>40</strong> - You can now fly at night!</li>
                <li><strong>50</strong> - The islands are now lit up at night!</li>
                <li><strong>60</strong> - You can now fly a two-seater plane!</li>
                <li><strong>70</strong> - The Whale Shark has a new design!</li>
                <li><strong>80</strong> - A vacation house has been built for you!</li>
              </ul>

              <h4>Appearances</h4>
              <ul>
                <li><em>Wii Fit</em> (First appearance, 2007)</li>
                <li><em>Wii Sports Resort</em> (First major appearance, 2009)</li>
                <li><em>Wii Fit Plus</em> (2009)</li>
                <li><em>Pilotwings Resort</em> (2011)</li>
                <li><em>Mario Kart 7</em> (2011)</li>
                <li><em>Super Smash Bros. Ultimate</em> (Latest appearance, 2018)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;