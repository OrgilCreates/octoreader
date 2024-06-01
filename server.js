const express = require("express");
const app = express();
const port = 3000;

// Sample translations with explanations
const translations = {
    "Hi, I'm Leo.": {
        translation: "Сайн байна уу, би Лео байна.",
        explanation: "<strong>I am Leo</strong> = 'Би бол Лео' эсвэл 'Би Лео байна'"
    },
    "One bright and sunny morning, I decided to go on an adventure.": {
        translation: "Нэгэн гэгээлэг, нартай өглөө би адал явдалд гарахаар шийдсэн.",
        explanation: "<strong>Bright</strong> = гэгээлэг, гэгээтэй, тод. <strong>Аdventure</strong> = адал явдал. <strong>sunny</strong> = нарлаг / нартай"
    },
    "I had always wanted to explore the big park near my house.": {
        translation: "Би гэрийнхээ ойролцоох том цэцэрлэгт хүрээлэнгээр хэсэхийг үргэлж хүсдэг байсан.",
        explanation: "<strong>To explore</strong> = Судлах, шинжих, эрэл хайгуул хийх. <strong>Near</strong> = ойрхон"
    },
    "So I thought, 'Why not today?'.": {
        translation: "Тиймээс би “Яагаад өнөөдөр биш гэж?” гэж бодсон.",
        explanation: "<strong>Тhought</strong> = бодсон, бодол санаа (<strong>То think</strong> = бодох, сэтгэх)."
    },
    "I packed a small bag with my favourite snacks, a sandwich, and an apple and grabbed a bottle of water.": {
        translation: "Өөрийн дуртай зууш болох хавчуургатай талх, алим хийгээд лонхонд ус дүүргэж жижиг цүнхэндээ багласан.",
        explanation: "<strong>Grabbed</strong> = барьж авсан (<strong>To grab</strong> = барьж авах) <strong>Bottle</strong> = лонх. <strong>snack</strong> = зууш, идэх юм, ам зугаах зүйл. <strong>To pack</strong> = боож баглах, савлах"
    },
    "I set out on my adventure with a big smile, feeling excited.": {
        translation: "Томоохон нээмсэглэлтэйгээр догдлон адал явдалдаа би гарлаа.",
        explanation: "<strong>To set out</strong> = тодорхой зорилготойгоор аливаа зүйлийг эхлэх (<strong>To set</strong> = тогтоох, байршуулах, тааруулах. <strong>Out</strong> = Гадагш, гадаа <strong>Set out on a journey</strong> = Аян замдаа мордсон, Set-ын өнгөрсөн цаг хувирдаггүй Set хэвээрээ). <strong>Feeling excited</strong> = догдолсон мэдрэмжийг мэдрэн"
    },
    "The park was huge and full of surprises.": {
        translation: "Цэцэрлэгт хүрээлэн асар том байсан бөгөөд гайхшралаар дүүрэн байв.",
        explanation: "Huge = маш том. Surprises = гэнэтийн зүйлс."
    },
    "Tall trees seemed to touch the sky and colorful flowers were everywhere.": {
        translation: "Тэнд тэнгэр шүргэх мэт өндөр моднууд, хаа сайгүй өнгө өнгийн цэцэгс ургасан байв.",
        explanation: "Tall trees = өндөр моднууд. Colorful flowers = өнгөлөг цэцэгс"
    },
    "I heard birds singing and saw squirrels playing.": {
        translation: "Би шувуудын дууг сонсож, хэрэмнүүдийг тоглож байгааг харсан. Энэ нь үлгэрийн номонд байгаа юм шиг байсан.",
        explanation: "Birds singing = шувуудын дуу. Squirrels playing = хэрэмнүүд тоглож байна. Storybook = үлгэрийн ном"
    },
    "It was like being in a storybook.": {
        translation: "Би шувуудын дууг сонсож, хэрэмнүүдийг тоглож байгааг харсан. Энэ нь үлгэрийн номонд байгаа юм шиг байсан.",
        explanation: "Birds singing = шувуудын дуу. Squirrels playing = хэрэмнүүд тоглож байна. Storybook = үлгэрийн ном"
    },
    "I walked along the paths, deeper into the park, enjoying every moment.": {
        translation: "Би зам даган, цэцэрлэгт хүрээлэнгийн гүн рүү алхаж, мөч бүрийг таашаан алхсан.",
        explanation: "Paths = замууд. Deeper into the park = цэцэрлэгт хүрээлэнгийн гүн рүү. Enjoying every moment = мөч бүрийг таашаах"
    },
    "But after a while, I stopped and looked around.": {
        translation: "Гэхдээ хэсэг хугацааны дараа би зогсож, эргэн тойрноо харлаа. Замууд өөр харагдаж байсан. Моднууд танил бус санагдсан.",
        explanation: "Stopped = зогссон. Looked around = эргэн тойрноо харсан. Unfamiliar = танил бус"
    },
    "The paths looked different.": {
        translation: "Гэхдээ хэсэг хугацааны дараа би зогсож, эргэн тойрноо харлаа. Замууд өөр харагдаж байсан. Моднууд танил бус санагдсан.",
        explanation: "Stopped = зогссон. Looked around = эргэн тойрноо харсан. Unfamiliar = танил бус"
    },
    "The trees seemed unfamiliar.": {
        translation: "Гэхдээ хэсэг хугацааны дараа би зогсож, эргэн тойрноо харлаа. Замууд өөр харагдаж байсан. Моднууд танил бус санагдсан.",
        explanation: "Stopped = зогссон. Looked around = эргэн тойрноо харсан. Unfamiliar = танил бус"
    },
    "I had wandered off the main path and now didn't know where I was.": {
        translation: "Би гол замаасаа хазайж, одоо хаана байгаагаа мэдэхгүй байсан.",
        explanation: "Wandered off = хазайх, төөрөх. Main path = гол зам. Worry = санаа зоволт. Crept into my heart = зүрхэндээ мэдрэгдэх"
    },
    "A little worry crept into my heart.": {
        translation: "Зүрхэндээ бага зэрэг санаа зовсон.",
        explanation: "Wandered off = хазайх, төөрөх. Main path = гол зам. Worry = санаа зоволт. Crept into my heart = зүрхэндээ мэдрэгдэх"
    },
    "I sat down on a nearby bench to think.":{
        translation: "Би ойролцоох сандал дээр сууж бодлоо. “Би үүнийг ойлгож чадна” гэж өөртөө хэлсэн.",
        explanation: "Bench = сандал. To figure out = ойлгох, олж мэдэх"
    },
    "“I can figure this out,” I told myself.": {
        translation: "Би ойролцоох сандал дээр сууж бодлоо. “Би үүнийг ойлгож чадна” гэж өөртөө хэлсэн.",
        explanation: "Bench = сандал. To figure out = ойлгох, олж мэдэх"
    },
    "I tried to remember the way I came.": {
        translation: "Би ирсэн замаа санахыг хичээв. ",
        explanation: "Tried to remember = санахыг хичээсэн. Rises in the east = зүүнээс мандах. Sets in the west = баруунд жаргах"
    },
    "Then, I thought about the sun.":{
        translation: "Дараа нь нарыг бодлоо.",
        explanation: "Tried to remember = санахыг хичээсэн. Rises in the east = зүүнээс мандах. Sets in the west = баруунд жаргах"
    },
    "It rises in the east and sets in the west.": {
        translation: "Дараа нь нарыг бодлоо. Нар зүүнээс мандаж, баруунд жаргадаг.",
        explanation: "Tried to remember = санахыг хичээсэн. Rises in the east = зүүнээс мандах. Sets in the west = баруунд жаргах"
    },
    "So, if I followed the sun, it could guide me back.": {
        translation: "Тиймээс, хэрэв би нарыг дагавал, энэ нь намайг буцааж чиглүүлж чадна.",
        explanation: "Followed the sun = нарыг дагах. Guide me back = намайг буцааж чиглүүлэх"
    },
    "With this plan, I started walking, paying attention to the sun and the surroundings.": {
        translation: "Энэ төлөвлөгөөтэйгээр би алхаж эхэлсэн бөгөөд нар болон орчин тойронд анхаарлаа хандуулсан.",
        explanation: "Plan = төлөвлөгөө. Paying attention = анхаарах. Surroundings = орчин тойрон"
    },
    "Eventually, I recognized a part of the park near my house – the playground where I often played.": {
        translation: "Эцэст нь би гэрийнхээ ойролцоох цэцэрлэгт хүрээлэнгийн нэг хэсгийг таньсан - ихэвчлэн тоглодог тоглоомын талбайг.",
        explanation: "Recognized = таних. Playground = тоглоомын талбай. Often played = ихэвчлэн тоглодог байсан"
    },
    "As I walked out of the park, I felt relieved and happy.":{
        translation: "Би цэцэрлэгт хүрээлэнгээс гарч байхдаа хөнгөрсөн, аз жаргалтай мэдрэмж төрсөн.",
        explanation: "Relieved = хөнгөрсөн мэдрэмж. Happy = аз жаргалтай."
    },
    "I had found my way back all by myself.": {
        translation: "Би өөрөө замаа олсон.",
        explanation: "Found my way back = замаа олсон. All by myself = өөрөө"
    },
    "When I got home, I shared my adventure with my family.": {
        translation: "Би гэртээ ирэхэд, гэр бүлтэйгээ адал явдлаа хуваалцсан.",
        explanation: "Got home = гэртээ ирсэн. Shared my adventure = адал явдлаа хуваалцах"
    },
    "They were happy to see me and proud of my bravery.": {
        translation: "Тэд намайг хараад баярлаж, миний зоригийг бахархаж байсан.",
        explanation: "Happy to see me = намайг хараад баярлах. Proud of my bravery = миний зоригийг бахархах"
    },
    "I learned a lot that day.": {
        translation: "Тэр өдөр би их зүйлийг сурсан.",
        explanation: "Learned a lot = их зүйлийг сурсан. That day = тэр өдөр"
    },
    "I learned that it's fun to explore and see new things, but it's also important to stay calm and think when things don't go as planned.": {
        translation: "Судлах, шинэ зүйлсийг үзэх нь хөгжилтэй, гэхдээ бүх зүйл төлөвлөгөө ёсоор явахгүй үед тайван байж, бодох нь чухал гэдгийг би сурсан.",
        explanation: "Explore = судлах, шинжих. New things = шинэ зүйлс. Stay calm = тайван байх. Think = бодох. When things don't go as planned = бүх зүйл төлөвлөгөө ёсоор явахгүй үед"
    },
    "My adventure in the park was something I would always remember.": {
        translation: "Цэцэрлэгт хүрээлэн дэх миний адал явдал үргэлж санаанд минь үлдэх зүйл байсан.",
        explanation: "Adventure in the park = цэцэрлэгт хүрээлэн дэх адал явдал. Always remember = үргэлж санаанд үлдэх"
    }
};

app.use(express.static("public"));

app.get("/translate", (req, res) => {
    const sentence = req.query.sentence;
    const result = translations[sentence] || { translation: "Орчуулга олдсонгүй.", explanation: "Тайлбар олдсонгүй." };
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
