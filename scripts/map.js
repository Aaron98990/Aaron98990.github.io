"set strict"

var canvas = document.querySelector('canvas')
canvas.width = 500;
canvas.height = 600;



const splitData = `01 189 139	1. Barnacle Arch
02 246 316	2. Basketball Court
03 258 220	3. Beginner's Archery Area
04 328 483	4. Beginner's Wakeboarding Area
05 233 304	5. Bowling Alley
06 257 304	6. Broken Clock Tower
07 261 141	7. Cabana Lagoon
08 442 341	8. Camel Rock
09 334 154	9. Cedar-Tree Tunnel
10 359 100	10. Cliffside Ruins
11 398 273	11. Cocoba Hotel
12 53 511	12. Crab Rock
13 362 141	13. Dead-End Point
14 240 42	14. Deserted Island
15 175 49	15. Diving Spot
16 303 167	16. Duckling Lake
17 312 125	17. Entrance to the Mysterious Ruins
18 256 180	18. Evergreen Grove
19 194 456	19. Extreme Canoeist
20 280 508	20. Fireworks Launch Zone 1
21 421 488	21. Fireworks Launch Zone 2
22 300 232	22. Footbridge
23 255 205	23. Forest Monument
24 452 364	24. Frisbee Dog Park
25 431 62	25. Gateway to Wuhu
26 79 475	26. Golf Area A
27 74 559	27. Golf Area B
28 29 492	28. Golf Area C
29 345 174	29. Heart of Maka Wuhu
30 364 233	30. Heartbreak Peak
31 219 234	31. Hillside Cabins
32 324 238	32. Hilltop Overlook
33 399 208	33. Island Loop Tunnel #1
34 240 144	34. Island Loop Tunnel #2
35 369 176	35. Lava Monument
36 361 200	36. Lava Tube
37 387 155	37. Lone Cedar
38 367 165	38. Maka Wuhu
39 99 166	39. Miguel's Guide Plane*
40 300 136	40. Mountain Hikers
41 387 199	41. Mountain Monument
42 349 117	42. Mysterious Ruins
43 407 165	43. Needlepoint Spire
44 340 142	44. Off-Road Vehicle
45 378 278	45. Palm Boulevard
46 155 233	46. Pirate's Eye
47 408 263	47. Pool Patio
48 468 263	48. Power-Cruising Area
49 175 75	49. Private Island
50 317 298	50. Red Iron Bridge
51 261 270	51. Runner's Circle
52 100 292	52. Seaplane Team*
53 351 134	53. Sea Serpent Cavern
54 338 93	54. Serpent's Mouth
55 375 149	55. Silk Sands
56 122 352	56. Sportfishing Spot
57 280 317	57. Starboard Harbor
58 447 408	58. Starry Beach
59 264 163	59. Stillwater Grotto
60 415 310	60. Sugarsand Beach
61 315 185	61. Summerstone Castle
62 307 208	62. Summerstone Falls
63 201 255	63. Sundown Point
64 285 218	64. Swaying Bridge
65 411 512	65. Sweet Beach
66 216 291	66. Swordplay Colosseum
67 253 230	67. Talon Rock
68 402 247	68. Tennis Courts
69 182 220	69. The Candle
70 67 515	70. The Nineteenth Hole Hotel
71 267 335	71. The Queen Peach
72 193 394	72. The Sea Caddy*
73 294 380	73. The Whale Shark*
74 381 236	74. Toppled Monument
75 168 299	75. Undersea Cable Inspectors
76 288 208	76. Weathered Monument
77 101 513	77. Wedge Island Marina
78 316 33	78. Whale Watchers
79 220 205	79. Wind Orchard
80 264 290	80. Wishing Fountain`.split("\n")
console.log(splitData);

const quotes = [
    [
        "/wiki/Barnacle_Arch",
        "This sea arch is just begging for someone to fly under it...<br>An arched rock. Just looking makes one want to fly under it...",
        "There's another arch like this one around Wuhu Island.",
        "At night, this arch looks a little like a pair of rocky pants..."
    ],
    [
        "/wiki/Basketball_Court",
        "All of the basketball action on Wuhu Island happens here.<br>Heated basketball matches are played here in the daytime.",
        "Three-point contests are held here, but it's mostly quiet in the evening.",
        "At night, the 3-Point Contest is held here. Fans go wild!"
    ],
    [
        "/wiki/Beginner%27s_Archery_Area",
        "Even this easiest Archery range takes skill to master.Archery is a battle with yourself. Empty your mind...",
        "Wind can push the flight of the arrows. Planes probably don't help...",
        "Take aim and hold your breath...but not for too long!"
    ],
    [
        "/wiki/Beginner%27s_Wakeboarding_Area",
        "This stretch of sea is where the wakeboarders catch big air!Jump with grace and daring!",
        "The smooth water here attracts some world-class wakeboarders.",
        "The secret to wakeboarding is to land flat! OK, it's not such a secret..."
    ],
    [
        "/wiki/Bowling_Alley",
        "If you're into bowling, this is the place to be.<br>First game free! Knock those pins down and vent your stress!",
        "This island is proud to have one of the best bowling alleys around!",
        "Some people travel to Wuhu Island just to bowl here."
    ],
    [
        "/wiki/Broken_Clock_Tower",
        "Don't set your watch to this clock tower--it stopped!<br>Nobody relies on this clock anymore. It stopped!",
        "Some clock fanatic stole one of the clock's hands!",
        "They could repair it, but then it wouldn't have the same charm."
    ],
    [
        "/wiki/Cabana_Lagoon",
        "Quiet and laid-back, this is a place to put your feet up and relax.",
        "Nice and quiet, when the Power Cruisers aren't racing.",
        "It's even quieter here at night. Except for the occasional plane..."
    ],
    [
        "/wiki/Camel_Rock",
        "This rock used to look like more like a camel, you know...<br>It used to look more like a camel, you know.",
        "Over the years, the wind has worn away the camel's humps.",
        "Maybe they should change the name to Not-Quite-A-Camel-Rock?"
    ],
    [
        "/wiki/Cedar_Tree_Tunnel",
        "The tunnel leads to the Lone Cedar and the volcano entrance.<br>The tunnel leads to the cedar tree and the volcano entrance ",
        "The path snakes past the Lone Cedar and to the Mountain Monument.",
        "This path goes all the way round the top of the mountain."
    ],
    [
        "/wiki/Cliffside_Ruins",
        "How did they build this all the way up here?How on earth did they get all that stone up here?",
        "The stone blocks are perfectly laid-- you can hardly see any gaps!",
        "Ancient writing is chiseled into the rock, but it's getting faded."
    ],
    [
        "/wiki/Cocoba_Hotel",
        "Five-star accomodations. Sadly, they don't take coupons.<br>Top-rate hospitality. Sadly, they don't accept meal coupons here.",
        "World-class hospitality. Stop by to watch the evening cycle race.",
        "Only the finest sheets are soft enough for this hotel's fancy beds!"
    ],
    [
        "/wiki/Crab_Rock",
        "This unnatural-looking rock formation is popular with climbers.",
        "Tourists often ask why it's called Crab Rock. Locals only shrug.",
        "Local golfers have nicknamed this rock formation the Double Bogeys."
    ],
    [
        "/wiki/Dead_End_Point",
        "This is the end of the road. Better start the long hike back!<br>This is the end of the road. Going all the way back is a pain.<br>This is a challenging climb for even the fittest hikers.",
        "It may be a dead end, but it's got a great view of the ruins.",
        "It's getting dark! Those people better start heading back to town."
    ],
    [
        "/wiki/Deserted_Island",
        "It wouldn't be so bad to be stranded on this tropical island.",
        "This small island has never been inhabited.",
        "This tiny island remains as a slice of untouched paradise."
    ],
    [
        "/wiki/Diving_Spot",
        "Divers of all skill levels come to swim with the ocean life here.",
        "Divers go down to watch the undersea life at all hours.",
        "Diving at night must be pretty scary!"
    ],
    [
        "/wiki/Duckling_Lake",
        "This glassy mountain lake is popular with canoeists. Beautiful!<br>A glassy mountain lake popular with canoeists. Beautiful!",
        "The lake water at sunset looks just like orange juice!",
        "The water is so dark at night...is anything lurking down there?"
    ],
    [
        "/wiki/Entrance_to_the_Mysterious_Ruins",
        "This is as far as vehicles go; from here on up, you have to walk!<br>Cars can't go any further. From here, you have to walk.",
        "Lots of hikers come here, but most get tired and turn back.",
        "Sometimes you can hear eerie singing at night..."
    ],
    [
        "/wiki/Evergreen_Grove",
        "This untouched grove is filled with rare and exotic birds.",
        "It's getting dark, so the exotic birds that nest here are quieting down.",
        "At night, wild animals roam around these woods."
    ],
    [
        "/wiki/Extreme_Canoeist",
        "Wedge Island and back? A piece of cake!",
        "The view of the setting sun must be worth the effort to get out there!",
        "That's a long way to paddle. Must be lonely..."
    ],
    [
        "/wiki/Firework_Launch_Zone_1",
        "They launch fireworks off from here at night. It's quite a show!",
        "Firework teams compete on the island for the most dazzling show.",
        "Hey! You can't fly over here at night! It's dangerous!"
    ],
    [
        "/wiki/Firework_Launch_Zone_2",
        "One of two firework launch zones on Wuhu Island. Watch out at night!",
        "One of the best firework teams shoots off their fireworks from here.",
        "You can't fly over here at night! They launch fireworks from here!"
    ],
    [
        "/wiki/Footbridge",
        "When it's windy, you can get drenched by the waterfall mist!<br>Feel the refreshing spray of droplets from the falls!",
        "Occasionally, the bridge will get washed away after a big storm.",
        "On a hot night, people hang out on the bridge to cool off."
    ],
    [
        "/wiki/Forest_Monument",
        "This is one of three mysterious rock monuments on the island.",
        "It's almost like this monument was built to guard the forest.",
        "Who built this strange monument, or is it natural?"
    ],
    [
        "/wiki/Frisbee_Dog_Park",
        "Frisbee Dog competitions are held on this beach.",
        "The sand is perfectly manicured just for the dogs.",
        "The dogs on Wuhu Island are even more pampered than the guests!"
    ],
    [
        "/wiki/Gateway_to_Wuhu",
        "This needle-sharp rock juts straight out of the sea.",
        "At almost 200 ft. high, It's one of the tallest formations on the island.",
        "This tall spire doesn't look nearly as forbidding next to Maka Wuhu!"
    ],
    [
        "/wiki/Golf_Area_A",
        "Countless golfers have shaken their fists at these brutal water hazards.",
        "Golfers on this course quickly learn it pays to take a practice swing.",
        "Every blade of grass is meticulously cared for on this first-class course."
    ],
    [
        "/wiki/Golf_Area_B",
        "The groundskeepers can hardly keep up with the fast-growing grass.",
        "The wind can really pick up off the shore of Wedge Island.",
        "Even if you have a bad day on the course, there's always the view!"
    ],
    [
        "/wiki/Golf_Area_C",
        "Scuba divers often search off the coast of Wedge Island for stray balls.",
        "On some of these holes, you're one hook or slice from the sea!",
        "Pack extra golf balls when you're playing this course!"
    ],
    [
        "/wiki/Heart_of_Maka_Wahu",
        "This mountain tunnel bores right through the heart of the volcano.",
        "The rocks here are always wet and slippery--don't slip and fall in!",
        "Big, empty caves can be a little unnerving. Especially in a volcano!"
    ],
    [
        "/wiki/Heartbreak_Peak",
        "It's easy to see how this steep hill got its name.",
        "This is a top destination for people wanting a serious workout.",
        "It won't break your heart, but it will definitely make it pound!"
    ],
    [
        "/wiki/Hillside_Cabins",
        "These small vacation cabins are just a five-minute walk from town!",
        "These cabins are a great alternative to the bustle of downtown living.",
        "Sounds like someone's playing an NES, but they need some pointers..."
    ],
    [
        "/wiki/Hilltop_Overlook",
        "What a view! You can see the bridge, lighthouse, and Wedge Island.",
        "A great spot to admire the island at sunset.",
        "The town is nice, but people mostly come for the fireworks."
    ],
    [
        "/wiki/Island_Loop_Tunnel_1",
        "This tunnel burrows through the mountain to link the Island Loop road.",
        "Don't even think about trying to fly out between the pillars!",
        "Rumor has it, there are monsters living in this tunnel..."
    ],
    [
        "/wiki/Island_Loop_Tunnel_2",
        "The main road around Wuhu Island goes through this tunnel.",
        "Watch out for traffic!",
        "Slow down!"
    ],
    [
        "/wiki/Lava_Monument",
        "Nobody knows how these rocks got into this pool of lava.",
        "Maybe this volcano wasn't active when this monument was built.",
        "It's so hot in here! You could bake a pizza on these rocks..."
    ],
    [
        "/wiki/Lava_Tube",
        "What could have made this massive hole in the side of the volcano?",
        "Apparently, it wasn't made by lava at all... It's man-made!",
        "Archaeologists think this tunnel was built by ancient inhabitants."
    ],
    [
        "/wiki/Lone_Cedar",
        "It's a long hike up here, so don't forget anything!",
        "There's a path right into the volcano nearby.",
        "How did this big cedar grow so close to an active volcano?"
    ],
    [
        "/wiki/Maka_Wuhu",
        "Inside this active volcano, lava boils and churns all year round.",
        "This volcano is unusual--the center is completely hollow!",
        "This volcano is active, but it hasn't erupted in 200 years."
    ],
    [
        "/wiki/Miguel%27s_Guide_Plane",
        "I'm Miguel! If you follow me, I'll guide you to some of the iPoints!",
        "If you get lost, press 1 to fire a flare. I'll shoot one off too!",
        "I fly around to some of the island's sightseeing spots."
    ],
    [
        "/wiki/Mountain_Hikers",
        "It's a tough hike, but the view is worth it.",
        "It's starting to get dark. Those hikers better head back!",
        "Up here, you could almost reach out and and grab the stars from the sky."
    ],
    [
        "/wiki/Mountain_Monument",
        "This monument looks man-made, but how did they get the rocks up here?",
        "Shards of rock splintered off when the monument fell over.",
        "Legends say this monument will right itself one day."
    ],
    [
        "/wiki/Mysterious_Ruins",
        "Archaeologists have discovered piles of ancient coins in these ruins.",
        "These ruins have signs of ancient traps built to scare away thieves.",
        "A pit was discovered in the ruins, but everyone is too scared to explore it!"
    ],
    [
        "/wiki/Needlepoint_Spire",
        "This needle-sharp rock juts straight out of the sea.It looks a bit like a rose thorn sticking out of the sea.",
        "At almost 200 ft. high, It's one of the tallest formations on the island.",
        "This tall spire doesn't look nearly as forbidding next to Make Wuhu!"
    ],
    [
        "/wiki/Off-Road_Vehicle",
        "Only electric vehicles are allowed to drive on Wuhu Island.",
        "Looks like a dead battery! Hope they make it home before dark...",
        "Don't worry--somebody will come help them soon. Hopefully..."
    ],
    [
        "/wiki/Palm_Boulevard",
        "This seaside boulevard is lined with majestic palm trees.",
        "It's not that grand, but it creates a vacation atmosphere.",
        "The first cycling stage, Around the Island, starts here."
    ],
    [
        "/wiki/Pirate%27s_Eye",
        "The elements have cut a perfect hole in the side of this cliff.<br>It's so huge! Could it be a gateway to another world?",
        "Flying through the Eye is said to bring good luck. If you're lucky.",
        "Don't worry--there aren't any pirates in these waters!"
    ],
    [
        "/wiki/Pool_Patio",
        "Table-tennis fans play all day, then cool off on the pool patio.<br>Table tennis fans play all day, then cool down on the terrace.",
        "Somebody has to fish all of the stray balls out of the pool!",
        "The pool patio is a popular hangout at night."
    ],
    [
        "/wiki/Power-Cruising_Area",
        "This is where the Power Cruising races are held.",
        "You can press - before a race to cruise around the island.",
        "Try free cruising on the Lighthouse course to explore at night!"
    ],
    [
        "/wiki/Private_Island",
        "Before 80 iPoints: This island would be a perfect place to build a vacation home.<br>After 80 iPoints: Mii's resort house is here! The mark of a true islander!",
        "Before 80 iPoints: A house here would have an amazing view of the island and ocean.<br>After 80 iPoints: Mii's resort house is here. A little rustic, but what a view!",
        "Before 80 iPoints: How would a home out here get water and electricity?<br>After 80 iPoints: Mii's resort house is here. A little piece of paradise..."
    ],
    [
        "/wiki/Red_Iron_Bridge",
        "This massive bridge is a famous landmark of Wuhu Island.",
        "The evening sunset is dazzling for drivers heading into town.",
        "It's tempting to fly through it, but don't get clipped by cables!"
    ],
    [
        "/wiki/Runner%27s_Circle",
        "Die-hard runners meet up here before their daily run.",
        "Some people don't like to run in the day because of the island heat.",
        "Some people prefer to run in the night, when it is nice and cool."
    ],
    [
        "/wiki/Seaplane_Team",
        "We're the Blue Sky Acrobatics Club. You should join us sometime!",
        "We're the Sunset Acrobatics Club. Want to be a member?",
        "We're the Starry Sky Acrobatics Club. How about it--want to try?"
    ],
    [
        "/wiki/Sea_Serpent_Cavern",
        "This twisting sea cave snakes underneath the Mysterious Ruins.",
        "This spooky sea cave is now a playground for Power Cruisers.",
        "At night, the cave has a kind of calm, tranquil atmosphere."
    ],
    [
        "/wiki/Serpent%27s_Mouth",
        "This spooky cave entrance seems to be an entrance to the ruins.",
        "Don't even think about trying to fly a plane in there...",
        "Some say the waves hitting this cave entrance make a sound like a hiss..."
    ],
    [
        "/wiki/Silk_Sands",
        "The soft, smooth sand in this pit squishes between your toes.",
        "The unusual type of sand here sets like concrete when mixed with water.",
        "How did this pit of silky sand get up here, anyway?"
    ],
    [
        "/wiki/Sportfishing_Spot",
        "All of the sportfishing on Wuhu Island is catch and release.",
        "Being out on the beautiful ocean is half the fun of sportfishing.",
        "At night, the sportfishing types hang up their poles and swap stories."
    ],
    [
        "/wiki/Starboard_Harbor",
        "Fancy yachts from all over the world drop anchor here.",
        "Many boaters like to watch the sunset from their yachts.",
        "The harbor is full of life even late into the night."
    ],
    [
        "/wiki/Starry_Beach",
        "The sand grains are curiously shaped like stars.",
        "As you'd guess, this beach is also a great place to watch the night sky.",
        "They sell bottles of the star-shaped sand grains as souvenirs."
    ],
    [
        "/wiki/Stillwater_Grotto",
        "Watch out!",
        "Stop reading this and pay attention to not crashing!",
        "Are you sure you can make it?!"
    ],
    [
        "/wiki/Sugarsand_Beach",
        "A huge white beach with sand like powdered sugar.",
        "At sunset, the sky, sea, and sand blend into a golden glow.",
        "This is the place to go for hanging out after the sun goes down."
    ],
    [
        "/wiki/Summerstone_Castle",
        "It's not an easy hike, but the view from the castle is amazing!",
        "This castle has unbelievable views--especially at sunset!",
        "The high walls of the castle make for a perfect spot to watch fireworks."
    ],
    [
        "/wiki/Summerstone_Falls",
        "Seven tons of water cascade every second from a height of 330 ft.",
        "You really wouldn't want to go down this waterfall in a canoe!",
        "The water of Wuhu Island is full of healthy minerals. Delicious!"
    ],
    [
        "/wiki/Sundown_Point",
        "Every photo taken here ends up turning out like a postcard.",
        "The setting sun beyond the island makes for a breathtaking view.",
        "People come here at night just to see the moon over the sparkling sea."
    ],
    [
        "/wiki/Swaying_Bridge",
        "This rickety bridge is fun--and scary--to walk across.",
        "It takes a lot of guts to ride a bicycle across this bridge!",
        "In Swordplay Showdown, you have to fight across this bridge!"
    ],
    [
        "/wiki/Sweet_Beach",
        "This quiet, tranquil spot is one of the most romantic on the island.",
        "There's nothing but the soft sound of lapping waves. And planes.",
        "This gorgeous spot is featured on countless postcards."
    ],
    [
        "/wiki/Swordplay_Colosseum",
        "Swordplay duels are held in this specially built floating arena.<br>A special floating arena where Swordplay duels are held.<br>This floating arena was specially built to host swordplay duels.",
        "The spectators obviously enjoy watching people fall in the sea!",
        "Night is the only time the colosseum is quiet and tranquil."
    ],
    [
        "/wiki/Talon_Rock",
        "If you had wings, you could glide off this cliff all the way to town. It's easy to dream of flying off the cliff...",
        "You'd need a wingspan of 30 yards to fly...if you had wings.",
        "Some cyclists are brave enough to ride a bike off this cliff!"
    ],
    [
        "/wiki/Tennis_Court",
        "Unfortunately, the dogs on the beach ran off with all the tennis balls.<br>It's easy to lose tennis balls in the nearby sand!",
        "If you're in the mood for Table Tennis, head to the pool patio.<br>These clay courts get hot on sunny summer days!",
        "Hopefully, the dogs won't get the next shipment of tennis balls, too..."
    ],
    [
        "/wiki/The_Candle",
        "This lighthouse was mistakenly built at twice the planned size.",
        "Some say it was designed to look like a candle, but that's just a myth.",
        "This lighthouse shines as bright as 1,600,000 candles!<br>This lighthouse produces as much light as 1,600,000 candles!"
    ],
    [
        "/wiki/The_Nineteenth_Hole_Hotel",
        "Drop by the cafe for a bite to eat after a round of golf.",
        "Your golfing mishaps will melt away at the sauna and spa facilities.",
        "Most of the golfers who vacation here are early-morning types."
    ],
    [
        "/wiki/The_Queen_Peach",
        "This luxury cruiser is the picture of elegant opulence.",
        "While in port, the ship's extravagant swimming pool is closed.",
        "This ship hosts lavish parties every night. Sorry, no flip-flops."
    ],
    [
        "/wiki/The_Sea_Caddy",
        "This regular ferry service links Wuhu Island and Wedge Island.",
        "If you're lucky, you might spot a whale on your ferry ride!",
        "This is the last boat back to Wuhu Island today."
    ],
    [
        "/wiki/The_Whale_Shark",
        "Before 70 iPoints: Sky, sea, and sand!<br>After 70 iPoints: You did it, Mii! Hope you enjoyed flying around the island!",
        "Before 70 iPoint: Surfing, slicing, slaloming!<br>After 70 iPoints: Amazing, Mii! You were born to fly!",
        "Before 70 iPoints: Swinging, splashing, shooting!<br>After 70 iPoints: Wow, Mii! You know this island better than the locals!"
    ],
    [
        "/wiki/Toppled_Monument",
        "This ancient stone monument has toppled over.",
        "How many centuries did this monument stand before it fell over?",
        "Now the fallen rocks look as though they belong there."
    ],
    [
        "/wiki/Undersea_Cable_Inspectors",
        "Wedge Island is linked to the main island through undersea cables.",
        "Inspecting undersea cables can't be all that exciting...",
        "It's too dark to even see the cables, let alone inspect them!"
    ],
    [
        "/wiki/Weathered_Monument",
        "This ancient monument was built with massive blocks of stone.",
        "It's not entirely clear what this monument's original purpose was.",
        "The stone on top weighs an astonishing 120 tons."
    ],
    [
        "/wiki/Wedge_Island_Marina",
        "The people carrying small bags must be here for Frisbee Golf.",
        "The last ferry to the main island leaves at 8:30 p.m. Don't be late!",
        "The last ferry to the main island has already left."
    ],
    [
        "/wiki/Whale_Watchers",
        "Whales are often sighted off the island, especially in this area.",
        "The massive whales here make quite a splash.",
        "You can't see anything at night, but people come to watch anyway."
    ],
    [
        "/wiki/Wind_Orchard",
        "These massive windmills provide clean power for the whole island.<br>These windmills provide power for the whole island.",
        "A warm tropical breeze keeps these huge blades spinning.",
        "Imagine how fast your plane could go if it had a propeller that big..."
    ],
    [
        "/wiki/Wishing_Fountain",
        "Tourists throw coins in the fountain and make a wish.",
        "When the sun is right, all of the coins in the fountain sparkle.",
        "Nobody makes any promises about wishes coming true, you know!"
    ]
]


var c = canvas.getContext('2d');
const size = 9
const half_size = size / 2
var distance = 0

c.fillStyle = "black";
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return x + " " + y
}
var arr = []
for(var line = 0; line < splitData.length; line++){
	var x1 = splitData[line].split(" ")
	var x = parseInt(x1[1])
	var y = parseInt(x1[2])
	arr.push(x1[0] + " " + x1[1] + " " + y)
	console.log(x);
	c.fillRect(x - half_size, y - half_size, size, size);
    }

var visited = []
canvas.addEventListener('mousedown', function(e) {
    var clicking = getCursorPosition(canvas, e)
c.fillStyle = "red";

var clickx = clicking.split(" ")[0]
var clicky = clicking.split(" ")[1]
for(var line = 0; line < arr.length; line++){
var x = arr[line].split(" ")[1]
var y = arr[line].split(" ")[2]
	if (Math.abs(clickx - x) <= half_size && Math.abs(clicky - y) <= half_size) {
console.log("ok " + x + "/" + clicky + " " + y + "/" + clicky)
c.fillStyle = "red";
c.fillRect(x - half_size, y - half_size, size, size);
extraInfo(line)
updateVisited(line)

 
}

}
console.log("click:" + clicking)
})

function resetButton(){
visited = []
distance = 0
document.getElementById("distance").innerHTML = distance
document.getElementById("visited").innerHTML = ""
document.getElementById("counter").innerHTML = visited.length
for(var line = 0; line < splitData.length; line++){
	var x1 = splitData[line].split(" ")
	var x = parseInt(x1[1])
	var y = parseInt(x1[2])
c.fillStyle = "black";
	c.fillRect(x - half_size, y - half_size, size, size);

    }

}


function replayButton(){
var indexCount = 0
var totalTime = 300 * visited.length + 1000

var tid = setInterval(function(){

var x = visited[indexCount].split(" ")[1]
var y = visited[indexCount].split(" ")[2]
indexCount += 1
c.fillStyle = "#66ff66";
c.fillRect(x - half_size, y - half_size, size, size);
}, 300); 


setTimeout(function(){
     clearInterval(tid);
for(var line = 0; line < visited.length; line++){
var x = visited[line].split(" ")[1]
var y = visited[line].split(" ")[2]
c.fillStyle = "red";
	c.fillRect(x - half_size, y - half_size, size, size);

    }
},totalTime);
}

function undoButton(){
if (visited.length > 0){
    subtractDistance()
var old = visited.pop()
document.getElementById("counter").innerHTML = visited.length 
document.getElementById("visited").innerHTML = document.getElementById("visited").innerHTML.split("<br>").slice(0,visited.length+1).join("<br>")


var x = old.split(" ")[1]
var y = old.split(" ")[2]
c.fillStyle = "black"
c.fillRect(x - half_size, y - half_size, size, size)
console.log(x + " " + y)
}
}



for(var line = 0; line < splitData.length; line++){
var x1 = splitData[line].split(" ")
let tableRef = document.getElementById("ipoints")
let newRow = tableRef.insertRow(-1)
let newCell = newRow.insertCell(0);
let newText = document.createTextNode(x1.slice(3,x1.length).join(" "));
newCell.onclick = (function(line) {
return function() {
colorEffect(line);
updateVisited(line)
extraInfo(line)
};})(line);
newCell.appendChild(newText);

}


function iPointsFilter(){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("ipoints");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

}

function randomButton(){
var line = -1
while (visited.length != 80 && (line == -1 || visited.includes(arr[line]))){
line = Math.floor(Math.random()*80)
}
extraInfo(line)
console.log(splitData[line])
colorEffect(line)
updateVisited(line)
}

function updateVisited(line) {
if (!visited.includes(arr[line])){
visited.push(arr[line])
document.getElementById("visited").innerHTML +=  "<br>" + splitData[line].split(" ").slice(3,splitData.length).join(" ") 
document.getElementById("counter").innerHTML = visited.length
updateDistance()

} else {
c.font = "30px Arial";
c.fillStyle = "red";
c.fillText("Already Visited", 10, 30);
setTimeout(function(){
c.fillStyle = "transparent";
c.clearRect(0, 0, 250, 38);
}, 3000)
}
}


function colorEffect(line){
var num = 1 
var x1 = splitData[line].split(" ")
var x = parseInt(x1[1]) - half_size
var y = parseInt(x1[2]) - half_size
var origLength = visited.length
var tid = setInterval(function(){

if (num == 1){
c.fillStyle = "red";
c.fillRect(x, y, size, size);
num = 2
} else {
c.fillStyle = "black";
c.fillRect(x, y, size, size);
num = 1
}

}, 150); 

setTimeout(function(){
     clearInterval(tid);
c.fillStyle = "red";
c.fillRect(x, y, size, size);

},3000);


}

// START REMOVING LINKS
var area = document.getElementById("extrainfo")
var all_links = area.querySelectorAll("a");

for(var i=0; i<all_links.length; i++){
    all_links[i].removeAttribute("href");
}
// END REMOVING LINKS

// START All links open in new tab
var links = document.querySelectorAll("a");
for(var i=0; i<all_links.length; i++){
    var att = document.createAttribute("target");
att.value = "_blank";
links[i].setAttribute("target", att)
}
// END All links open in new tab



function extraInfo(line) {
document.getElementById("extrainfo").innerHTML = " "
var a = document.createElement('h1');
var link = document.createTextNode(splitData[line].split(" ").slice(3,splitData[line].length).join(" "));
 a.appendChild(link);
document.getElementById("extrainfo").appendChild(a); 

var a = document.createElement('h4');
var link = document.createTextNode("Daytime Quote(s):");
a.appendChild(link);
document.getElementById("extrainfo").appendChild(a);
document.getElementById("extrainfo").innerHTML += quotes[line][1] + "<br>"


var a = document.createElement('h4');
var link = document.createTextNode("Evening Quote(s):");
a.appendChild(link);
document.getElementById("extrainfo").appendChild(a);
document.getElementById("extrainfo").innerHTML += quotes[line][2] + "<br>"

var a = document.createElement('h4');
var link = document.createTextNode("Night Quote(s):");
a.appendChild(link);
document.getElementById("extrainfo").appendChild(a);
document.getElementById("extrainfo").innerHTML += quotes[line][3] + "<br>" + "<br>"

var base = "https://wiisports.fandom.com"
var a = document.createElement('a'); 
var link = document.createTextNode("Click here");
a.target = "_blank"
 a.appendChild(link);
a.href = base + quotes[line][0]
document.getElementById("extrainfo").appendChild(a); 
document.getElementById("extrainfo").innerHTML += " for more  about "
document.getElementById("extrainfo").innerHTML += splitData[line].split(" ").slice(3,splitData[line].length).join(" ") + "."
nearby(line)
}


function nearby(line) {
var x2 = splitData[line].split(" ")
var _x = parseInt(x2[1])
var _y = parseInt(x2[2])
var nearbylength = 0
var maxLength = 30

var a = document.createElement('h4');
var link = document.createTextNode("Nearby:");
a.appendChild(link);
document.getElementById("extrainfo").appendChild(a);

var used = []
while (nearbylength == 0){

maxLength += 10
for(var i = 0; i < splitData.length; i++){
if (i != line){

	var x1 = splitData[i].split(" ")
	var x = parseInt(x1[1])
	var y = parseInt(x1[2])

var pythag = Math.sqrt((_x - x) * (_x - x) + (_y - y) * (_y - y))
if (pythag < maxLength){
    nearbylength += 1
document.getElementById("extrainfo").innerHTML += x1.slice(3,splitData.length).join(" ") + " " + "(" + Math.ceil(pythag) + " units)" + "<br>"
}
}
}
}
}

function highscore1(){
var arr = [71, 73, 72, 02, 06, 57, 39, 50, 45, 11, 47, 68, 74, 30, 36, 32, 22, 76, 59, 61, 62, 64, 03, 51, 80, 05, 66, 63, 46, 69, 79, 31, 67, 23, 18, 34, 01, 49, 15, 14, 07, 40, 17, 42, 10, 78, 54, 53, 13, 29, 16, 09, 44, 55, 37, 35, 38, 41, 43, 33, 48, 60, 08, 24, 58, 21, 65, 04, 20] 
resetButton()
for(var i = 0; i < arr.length; i++){
extraInfo(arr[i]-1)
updateVisited(arr[i]-1)
}
replayButton()
}

function highscore2(){
var arr = [72, 71, 02, 05, 66, 63, 73, 51, 80, 06, 57, 50, 39, 45, 11, 74, 30, 36, 55, 37, 35, 38, 41, 43, 53, 54, 10, 42, 17, 40, 07, 34, 18, 23, 67, 31, 46, 69, 79, 03, 64, 32, 22, 76, 62, 61, 16, 09, 44, 13, 33, 68, 47, 48, 60, 08, 24, 58, 21, 65, 04] 
resetButton()
for(var i = 0; i < arr.length; i++){
extraInfo(arr[i]-1)
updateVisited(arr[i]-1)
}
replayButton()
}


// Not actually a distance

function updateDistance(){
if (visited.length < 2){}
else {
	var x1 = splitData[parseInt(visited[visited.length - 1].substring(0,2))-1].split(" ")
	var x = parseInt(x1[1])
	var y = parseInt(x1[2])

var x2 = splitData[parseInt(visited[visited.length - 2].substring(0,2))-1].split(" ")
var _x = parseInt(x2[1])
var _y = parseInt(x2[2])
console.log(x,y,_x,_y, x1, x2, visited[visited.length - 1], visited[visited.length - 2])

var pythag = Math.sqrt((_x - x) * (_x - x) + (_y - y) * (_y - y))
distance += Math.ceil(pythag)
document.getElementById("distance").innerHTML = distance

}
}

function subtractDistance(){
    if (visited.length < 2){}
    else {
        var x1 = splitData[parseInt(visited[visited.length - 1].substring(0,2))-1].split(" ")
        var x = parseInt(x1[1])
        var y = parseInt(x1[2])
    
    var x2 = splitData[parseInt(visited[visited.length - 2].substring(0,2))-1].split(" ")
    var _x = parseInt(x2[1])
    var _y = parseInt(x2[2])
    console.log(x,y,_x,_y, x1, x2, visited[visited.length - 1], visited[visited.length - 2])
    
    var pythag = Math.sqrt((_x - x) * (_x - x) + (_y - y) * (_y - y))
    distance -= Math.ceil(pythag)
    document.getElementById("distance").innerHTML = distance
    
    }
    }
