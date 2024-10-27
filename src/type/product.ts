export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}


export interface Nutrient {
  name: string
  amount: number
  unit: string
  percentOfDailyNeeds: number
}

export interface ProductDetail {
  title: string
  image: string
  category: string
  price: number
  likes: number
  badges: string[]
  nutrition: {
    nutrients: Nutrient[]
  }
  description: string
  upc: string
  images: string[]
}
