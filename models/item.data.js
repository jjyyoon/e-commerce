const items = [
  {
    name: "Brown Brim",
    imgUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25,
    category: "hats"
  },
  {
    name: "Blue Beanie",
    imgUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
    price: 18,
    category: "hats"
  },
  {
    name: "Brown Cowboy",
    imgUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
    price: 35,
    category: "hats"
  },
  {
    name: "Grey Brim",
    imgUrl: "https://i.ibb.co/RjBLWxB/grey-brim.png",
    price: 25,
    category: "hats"
  },
  {
    name: "Green Beanie",
    imgUrl: "https://i.ibb.co/YTjW3vF/green-beanie.png",
    price: 18,
    category: "hats"
  },
  {
    name: "Palm Tree Cap",
    imgUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png",
    price: 14,
    category: "hats"
  },
  {
    id: 7,
    name: "Red Beanie",
    imgUrl: "https://i.ibb.co/bLB646Z/red-beanie.png",
    price: 18,
    category: "hats"
  },
  {
    name: "Wolf Cap",
    imgUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
    price: 14,
    category: "hats"
  },
  {
    name: "Blue Snapback",
    imgUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png",
    price: 16,
    category: "hats"
  },
  {
    name: "Adidas NMD",
    imgUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
    price: 220,
    category: "sneakers"
  },
  {
    name: "Adidas Yeezy",
    imgUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
    price: 280,
    category: "sneakers"
  },
  {
    name: "Black Converse",
    imgUrl: "https://i.ibb.co/bPmVXyP/black-converse.png",
    price: 110,
    category: "sneakers"
  },
  {
    id: 13,
    name: "Nike White AirForce",
    imgUrl: "https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
    price: 160,
    category: "sneakers"
  },
  {
    name: "Nike Red High Tops",
    imgUrl: "https://i.ibb.co/QcvzydB/nikes-red.png",
    price: 160,
    category: "sneakers"
  },
  {
    name: "Nike Brown High Tops",
    imgUrl: "https://i.ibb.co/fMTV342/nike-brown.png",
    price: 160,
    category: "sneakers"
  },
  {
    name: "Air Jordan Limited",
    imgUrl: "https://i.ibb.co/w4k6Ws9/nike-funky.png",
    price: 190,
    category: "sneakers"
  },
  {
    id: 17,
    name: "Timberlands",
    imgUrl: "https://i.ibb.co/Mhh6wBg/timberlands.png",
    price: 200,
    category: "sneakers"
  },
  {
    name: "Black Jean Shearling",
    imgUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
    price: 125,
    category: "jackets"
  },
  {
    name: "Blue Jean Jacket",
    imgUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
    price: 90,
    category: "jackets"
  },
  {
    name: "Grey Jean Jacket",
    imgUrl: "https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
    price: 90,
    category: "jackets"
  },
  {
    name: "Brown Shearling",
    imgUrl: "https://i.ibb.co/s96FpdP/brown-shearling.png",
    price: 165,
    category: "jackets"
  },
  {
    name: "Tan Trench",
    imgUrl: "https://i.ibb.co/M6hHc3F/brown-trench.png",
    price: 185,
    category: "jackets"
  },
  {
    name: "Blue Tanktop",
    imgUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png",
    price: 25,
    category: "womens"
  },
  {
    name: "Floral Blouse",
    imgUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png",
    price: 20,
    category: "womens"
  },
  {
    name: "Floral Dress",
    imgUrl: "https://i.ibb.co/KV18Ysr/floral-skirt.png",
    price: 80,
    category: "womens"
  },
  {
    name: "Red Dots Dress",
    imgUrl: "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
    price: 80,
    category: "womens"
  },
  {
    name: "Striped Sweater",
    imgUrl: "https://i.ibb.co/KmSkMbH/striped-sweater.png",
    price: 45,
    category: "womens"
  },
  {
    name: "Yellow Track Suit",
    imgUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
    price: 135,
    category: "womens"
  },
  {
    name: "White Blouse",
    imgUrl: "https://i.ibb.co/qBcrsJg/white-vest.png",
    price: 20,
    category: "womens"
  },
  {
    name: "Camo Down Vest",
    imgUrl: "https://i.ibb.co/xJS0T3Y/camo-vest.png",
    price: 325,
    category: "mens"
  },
  {
    name: "Floral T-shirt",
    imgUrl: "https://i.ibb.co/qMQ75QZ/floral-shirt.png",
    price: 20,
    category: "mens"
  },
  {
    name: "Black & White Longsleeve",
    imgUrl: "https://i.ibb.co/55z32tw/long-sleeve.png",
    price: 25,
    category: "mens"
  },
  {
    name: "Pink T-shirt",
    imgUrl: "https://i.ibb.co/RvwnBL8/pink-shirt.png",
    price: 25,
    category: "mens"
  },
  {
    name: "Jean Long Sleeve",
    imgUrl: "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png",
    price: 40,
    category: "mens"
  },
  {
    name: "Burgundy T-shirt",
    imgUrl: "https://i.ibb.co/mh3VM1f/polka-dot-shirt.png",
    price: 25,
    category: "mens"
  }
];

module.exports = items;
