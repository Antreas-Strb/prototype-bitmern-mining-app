import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  HardDrive,
  Zap,
  Thermometer,
  DollarSign,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  Clock,
  AlertTriangle,
  Check,
  User,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const MarketplaceMinerDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const miner = {
    id: 1,
    name: 'Antminer S19 XP',
    image: 'https://images.pexels.com/photos/1432697/pexels-photo-1432697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 8499.99,
    hashrate: '140 TH/s',
    efficiency: '21.5 J/TH',
    power: '3010W',
    rating: 4.8,
    reviews: 156,
    seller: {
      name: 'MiningDirect',
      rating: 4.9,
      sales: 1250,
      joinedDate: '2022-01-15',
      responseTime: '< 24 hours',
      verificationStatus: 'verified'
    },
    condition: 'New',
    warranty: '180 days',
    stock: 5,
    shipping: {
      cost: 149.99,
      time: '3-5 business days',
      locations: ['United States', 'Canada', 'Europe']
    },
    description: 'The Antminer S19 XP is the latest and most efficient Bitcoin miner from Bitmain. Features improved power efficiency and enhanced cooling system for optimal performance.',
    features: [
      'Advanced cooling system',
      'Built-in power supply',
      'Ethernet interface',
      'Web management portal',
      'Real-time monitoring',
      'Automatic frequency control'
    ],
    specifications: {
      algorithm: 'SHA-256',
      dimensions: '400 x 195 x 290mm',
      weight: '14.2 kg',
      noise: '75 db',
      fans: '4 x 12038 fans',
      interface: 'Ethernet',
      temperature: '5-45°C',
      humidity: '5-95%'
    },
    images: [
      'https://images.pexels.com/photos/1432697/pexels-photo-1432697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/12876612/pexels-photo-12876612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11996726/pexels-photo-11996726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  };

  const similarMiners = [
    {
      id: 2,
      name: 'Whatsminer M50S',
      image: 'https://images.pexels.com/photos/12876612/pexels-photo-12876612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 7899.99,
      hashrate: '126 TH/s',
      efficiency: '26 J/TH',
      rating: 4.6,
      condition: 'New'
    },
    {
      id: 3,
      name: 'Antminer S19j Pro',
      image: 'https://images.pexels.com/photos/11996726/pexels-photo-11996726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 4999.99,
      hashrate: '96 TH/s',
      efficiency: '29.5 J/TH',
      rating: 4.3,
      condition: 'Refurbished'
    }
  ];

  const handleAddToCart = () => {
    addToCart({
      id: miner.id.toString(),
      name: miner.name,
      price: miner.price,
      image: miner.image
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/marketplace/purchase/shipping');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/marketplace" className="flex items-center text-light-700 hover:text-light-500">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Marketplace
        </Link>
        <div className="flex items-center space-x-2">
          <button className="btn btn-outline flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </button>
          <button className="btn btn-outline flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <img 
              src={miner.image} 
              alt={miner.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {miner.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${miner.name} view ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          </div>

          <div className="card">
            <h1 className="text-2xl font-bold mb-2">{miner.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-accent-500 mr-1" />
                <span className="font-medium">{miner.rating}</span>
                <span className="text-light-700 ml-1">({miner.reviews} reviews)</span>
              </div>
              <span className="text-light-700">|</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                miner.condition === 'New' ? 'bg-success-500/20 text-success-500' : 'bg-warning-500/20 text-warning-500'
              }`}>
                {miner.condition}
              </span>
              <span className="text-light-700">|</span>
              <span className="text-light-700">{miner.stock} in stock</span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-light-700">Hashrate</p>
                  <div className="flex items-center mt-1">
                    <HardDrive className="w-5 h-5 text-primary-400 mr-2" />
                    <p className="font-medium">{miner.hashrate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-light-700">Power Consumption</p>
                  <div className="flex items-center mt-1">
                    <Zap className="w-5 h-5 text-secondary-400 mr-2" />
                    <p className="font-medium">{miner.power}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-light-700">Efficiency</p>
                  <div className="flex items-center mt-1">
                    <Thermometer className="w-5 h-5 text-accent-400 mr-2" />
                    <p className="font-medium">{miner.efficiency}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-light-700">Warranty</p>
                  <div className="flex items-center mt-1">
                    <Shield className="w-5 h-5 text-success-500 mr-2" />
                    <p className="font-medium">{miner.warranty}</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-light-700 mb-8">{miner.description}</p>

            <h2 className="text-lg font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {miner.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-success-500 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(miner.specifications).map(([key, value]) => (
                <div key={key} className="p-3 bg-dark-700 rounded-lg">
                  <p className="text-sm text-light-700 capitalize">{key}</p>
                  <p className="font-medium mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold">${miner.price.toLocaleString()}</span>
              <span className="text-light-700 ml-2">USD</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-light-700">
                <Truck className="w-4 h-4 mr-2" />
                <span>Shipping: ${miner.shipping.cost}</span>
              </div>
              <div className="flex items-center text-sm text-light-700">
                <Clock className="w-4 h-4 mr-2" />
                <span>Delivery: {miner.shipping.time}</span>
              </div>
              <div className="flex items-center text-sm text-success-500">
                <Check className="w-4 h-4 mr-2" />
                <span>Free returns within 30 days</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleBuyNow}
                className="btn btn-primary w-full"
              >
                Buy Now
              </button>
              <button 
                onClick={handleAddToCart}
                className="btn btn-outline w-full flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Seller Information</h2>
              {miner.seller.verificationStatus === 'verified' && (
                <span className="px-2 py-1 bg-success-500/20 text-success-500 rounded-full text-xs">
                  Verified Seller
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="font-medium">{miner.seller.name}</p>
                  <div className="flex items-center text-sm text-light-700">
                    <Star className="w-4 h-4 text-accent-500 mr-1" />
                    <span>{miner.seller.rating} ({miner.seller.sales} sales)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-light-700">Member since</span>
                  <span>{new Date(miner.seller.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-700">Response time</span>
                  <span>{miner.seller.responseTime}</span>
                </div>
              </div>

              <button className="btn btn-outline w-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Seller
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Similar Products</h2>
              <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="space-y-4">
              {similarMiners.map((similar) => (
                <Link 
                  key={similar.id}
                  href={`/marketplace/${similar.id}`}
                  className="block p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
                >
                  <div className="flex items-center">
                    <img 
                      src={similar.image}
                      alt={similar.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-medium mb-1">{similar.name}</h3>
                      <p className="text-sm text-light-700 mb-2">{similar.hashrate}</p>
                      <p className="font-medium">${similar.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceMinerDetails;