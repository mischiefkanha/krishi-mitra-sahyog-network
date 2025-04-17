
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { MapPinIcon, Phone, Globe, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

interface Service {
  id: string;
  name: string;
  type: 'fertilizer' | 'pesticide' | 'equipment' | 'seeds';
  distance: number;
  address: string;
  phone?: string;
  website?: string;
  hours?: string;
  rating: number;
  verified: boolean;
}

const NearbyServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Get user's location if available
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
          setLoading(false);
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('Unable to get your location. Please enable location services.');
          setLoading(false);
          
          // Load example data anyway
          loadExampleServices();
        }
      );
    } else {
      setError('Geolocation is not supported in your browser.');
      loadExampleServices();
    }
  }, []);
  
  useEffect(() => {
    if (location) {
      // In a real app, we would fetch services based on location
      // For now, just load example data with slight randomization based on location
      loadExampleServices();
    }
  }, [location]);
  
  const loadExampleServices = () => {
    // Example services data - in a real app, this would come from an API
    const exampleServices: Service[] = [
      {
        id: '1',
        name: 'Krishna Fertilizers',
        type: 'fertilizer',
        distance: 2.3,
        address: 'Main Road, Nashik, Maharashtra',
        phone: '+91 9876543210',
        website: 'https://example.com/krishna',
        hours: '9:00 AM - 6:00 PM',
        rating: 4.5,
        verified: true
      },
      {
        id: '2',
        name: 'Ganesh Agro Center',
        type: 'pesticide',
        distance: 3.7,
        address: 'Market Road, Nashik, Maharashtra',
        phone: '+91 9876543211',
        rating: 4.2,
        verified: true
      },
      {
        id: '3',
        name: 'Kisan Farm Equipment',
        type: 'equipment',
        distance: 5.1,
        address: 'Industrial Area, Nashik, Maharashtra',
        phone: '+91 9876543212',
        website: 'https://example.com/kisanequip',
        hours: '8:00 AM - 7:00 PM',
        rating: 3.9,
        verified: false
      },
      {
        id: '4',
        name: 'Bharat Seeds',
        type: 'seeds',
        distance: 4.2,
        address: 'Agricultural Complex, Nashik, Maharashtra',
        phone: '+91 9876543213',
        rating: 4.7,
        verified: true
      }
    ];
    
    // Add some randomization to distances
    const randomizedServices = exampleServices.map(service => ({
      ...service,
      distance: parseFloat((service.distance + (Math.random() * 2 - 1)).toFixed(1))
    }));
    
    // Sort by distance
    randomizedServices.sort((a, b) => a.distance - b.distance);
    
    setServices(randomizedServices);
  };
  
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'fertilizer':
        return '🌱';
      case 'pesticide':
        return '🧪';
      case 'equipment':
        return '🚜';
      case 'seeds':
        return '🌾';
      default:
        return '🏪';
    }
  };
  
  const getServiceTypeName = (type: string) => {
    switch (type) {
      case 'fertilizer':
        return t('fertilizer') || 'Fertilizer';
      case 'pesticide':
        return t('pesticide') || 'Pesticide';
      case 'equipment':
        return t('equipment') || 'Equipment';
      case 'seeds':
        return t('seeds') || 'Seeds';
      default:
        return type;
    }
  };
  
  const openDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-primary-600" />
          {t('nearbyAgriculturalServices') || 'Nearby Agricultural Services'}
        </CardTitle>
        <CardDescription>
          {t('servicesNearYourLocation') || 'Services near your location to help with your farming needs'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-6">
            <p>{t('loadingServices') || 'Loading nearby services...'}</p>
          </div>
        ) : error ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md mb-4">
            <p className="text-amber-700 dark:text-amber-400">{error}</p>
            <p className="text-sm mt-2">
              {t('showingDefaultServices') || 'Showing default services instead.'}
            </p>
          </div>
        ) : null}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="border rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-900/10 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getServiceIcon(service.type)}</div>
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>{getServiceTypeName(service.type)}</span>
                      <span>•</span>
                      <span>{service.distance} km</span>
                      {service.verified && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="px-1 py-0 text-[10px] font-normal text-green-600 border-green-400">
                            {t('verified') || 'Verified'}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-xs ${
                        i < Math.floor(service.rating) 
                          ? 'text-amber-500' 
                          : i < service.rating 
                          ? 'text-amber-300' 
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{service.address}</span>
                </div>
                
                {service.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`tel:${service.phone}`}
                      className="hover:text-primary-600 hover:underline"
                    >
                      {service.phone}
                    </a>
                  </div>
                )}
                
                {service.hours && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.hours}</span>
                  </div>
                )}
                
                {service.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={service.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 hover:underline"
                    >
                      {service.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => openDirections(service.address)}
                >
                  {t('getDirections') || 'Get Directions'}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {services.length === 0 && !loading && !error && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              {t('noServicesFound') || 'No agricultural services found nearby.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyServices;
