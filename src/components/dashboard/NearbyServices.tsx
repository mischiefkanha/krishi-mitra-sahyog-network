
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Navigation, Phone, Store, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/LanguageContext';
import 'leaflet/dist/leaflet.css';

// We need to import Leaflet dynamically for SSR compatibility
interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'fertilizer' | 'pesticide' | 'seed' | 'equipment';
  address?: string;
  contact?: string;
  distance?: number;
}

const NearbyServices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [map, setMap] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || map) return;
    
    const initMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');
        
        // Create the map instance
        const mapInstance = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5); // Center of India
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        
        setMap(mapInstance);
        
        // Try to get user location
        getUserLocation();
      } catch (error) {
        console.error('Error initializing map:', error);
        toast({
          title: "Map Error",
          description: "Failed to load the map. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    initMap();
    
    // Cleanup function
    return () => {
      if (map) map.remove();
    };
  }, [mapContainerRef]);

  // Get user location and nearby services
  const getUserLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        if (map) {
          map.setView([latitude, longitude], 12);
          
          // Import Leaflet icon for markers
          const L = await import('leaflet');
          
          // Custom icon for user location
          const userIcon = L.divIcon({
            html: `<div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full border-2 border-white">
                    <span class="text-white">👨‍🌾</span>
                   </div>`,
            className: '',
          });
          
          // Add user marker
          L.marker([latitude, longitude], { icon: userIcon })
            .addTo(map)
            .bindPopup('Your location')
            .openPopup();
            
          // Fetch nearby services
          await fetchNearbyServices(latitude, longitude);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError(`Error getting your location: ${error.message}`);
        setIsLoading(false);
        
        // Set default view to center of India
        if (map) {
          map.setView([20.5937, 78.9629], 5);
        }
      }
    );
  };

  // Fetch nearby services (simulated)
  const fetchNearbyServices = async (lat: number, lng: number) => {
    try {
      // In a real app, this would be an API call to OpenStreetMap Overpass API 
      // or a custom backend that queries for agricultural services
      // For demo purpose, we'll simulate some data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate nearby points
      const mockServices: Location[] = [
        {
          name: "Krishna Fertilizers",
          lat: lat + 0.01,
          lng: lng + 0.01,
          type: "fertilizer",
          address: "123 Farm Road",
          contact: "+91 98765 43210",
          distance: 1.2
        },
        {
          name: "Shiva Pesticides",
          lat: lat - 0.008,
          lng: lng + 0.005,
          type: "pesticide",
          address: "45 Market Street",
          contact: "+91 87654 32109",
          distance: 0.9
        },
        {
          name: "Lakshmi Seeds",
          lat: lat + 0.005,
          lng: lng - 0.01,
          type: "seed",
          address: "78 Grain Road",
          contact: "+91 76543 21098",
          distance: 1.5
        },
        {
          name: "Ganesh Farm Equipment",
          lat: lat - 0.012,
          lng: lng - 0.007,
          type: "equipment",
          address: "90 Tractor Avenue",
          contact: "+91 65432 10987",
          distance: 2.1
        }
      ];
      
      setServices(mockServices);
      
      // Add markers for each service
      if (map) {
        const L = await import('leaflet');
        
        const getIconForType = (type: string) => {
          const iconMap: Record<string, string> = {
            fertilizer: '🌱',
            pesticide: '🐛',
            seed: '🌾',
            equipment: '🚜'
          };
          
          return L.divIcon({
            html: `<div class="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full border-2 border-white">
                    <span class="text-white">${iconMap[type] || '🏪'}</span>
                   </div>`,
            className: '',
          });
        };
        
        mockServices.forEach(service => {
          L.marker([service.lat, service.lng], { icon: getIconForType(service.type) })
            .addTo(map)
            .bindPopup(`
              <strong>${service.name}</strong><br>
              ${service.address}<br>
              ${service.contact}<br>
              <b>${service.distance} km away</b>
            `);
        });
      }
    } catch (error) {
      console.error("Error fetching nearby services:", error);
      toast({
        title: "Error",
        description: "Failed to load nearby services. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{t('nearbyAgricultureServices')}</CardTitle>
            <CardDescription>Find fertilizer, pesticide dealers and more near you</CardDescription>
          </div>
          {userLocation && (
            <Button variant="outline" size="sm" onClick={getUserLocation}>
              <Navigation className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {locationError && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md mb-4 flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-300">Location Error</h4>
              <p className="text-sm text-red-600 dark:text-red-400">{locationError}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={getUserLocation}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
        
        {/* Map Container */}
        <div className="h-[300px] w-full rounded-md overflow-hidden border mb-4" ref={mapContainerRef}>
          {isLoading && (
            <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          )}
        </div>
        
        {/* Services List */}
        <div className="space-y-2 mt-4">
          <h3 className="font-semibold">Nearby Services</h3>
          
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center p-3 rounded-md border">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))
          ) : services.length > 0 ? (
            <div className="divide-y">
              {services.map((service, index) => (
                <div key={index} className="flex items-start py-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                    {service.type === 'fertilizer' && <Store className="h-5 w-5 text-green-600" />}
                    {service.type === 'pesticide' && <Store className="h-5 w-5 text-orange-600" />}
                    {service.type === 'seed' && <Store className="h-5 w-5 text-yellow-600" />}
                    {service.type === 'equipment' && <Store className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{service.name}</h4>
                      <span className="text-sm text-muted-foreground">{service.distance} km</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center mt-0.5">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.address}
                    </div>
                    <div className="text-sm flex items-center mt-0.5">
                      <Phone className="h-3 w-3 mr-1" />
                      {service.contact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {!locationError && (
                <>
                  <p>No agriculture services found nearby.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={getUserLocation}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyServices;
