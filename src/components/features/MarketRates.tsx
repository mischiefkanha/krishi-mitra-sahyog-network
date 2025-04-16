
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MarketPrice {
  crop: string;
  variety: string;
  price: number;
  unit: string;
  prevPrice: number;
  change: number;
  mandi: string;
}

const MarketRates = () => {
  const { language } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState<string>("rice");
  const [selectedMandi, setSelectedMandi] = useState<string>("all");

  // Mock market data - in a real app, this would come from an API
  const marketPrices: MarketPrice[] = [
    { crop: "rice", variety: "Basmati", price: 3800, unit: "quintal", prevPrice: 3650, change: 4.1, mandi: "Pune" },
    { crop: "wheat", variety: "Sharbati", price: 2200, unit: "quintal", prevPrice: 2100, change: 4.8, mandi: "Nashik" },
    { crop: "soybean", variety: "JS-335", price: 4500, unit: "quintal", prevPrice: 4200, change: 7.1, mandi: "Nagpur" },
    { crop: "cotton", variety: "J-34", price: 6300, unit: "quintal", prevPrice: 6500, change: -3.1, mandi: "Amravati" },
    { crop: "tomato", variety: "Hybrid", price: 2500, unit: "quintal", prevPrice: 2000, change: 25.0, mandi: "Pune" },
    { crop: "potato", variety: "Kufri", price: 1800, unit: "quintal", prevPrice: 1900, change: -5.3, mandi: "Nashik" },
    { crop: "onion", variety: "Red", price: 2200, unit: "quintal", prevPrice: 3000, change: -26.7, mandi: "Nashik" },
  ];

  const mockPriceHistory = [
    { date: "Jan", price: 2000 },
    { date: "Feb", price: 2200 },
    { date: "Mar", price: 2100 },
    { date: "Apr", price: 2300 },
    { date: "May", price: 2500 },
    { date: "Jun", price: 2400 },
    { date: "Jul", price: 2200 },
    { date: "Aug", price: 2000 },
    { date: "Sep", price: 1800 },
    { date: "Oct", price: 2100 },
    { date: "Nov", price: 2300 },
    { date: "Dec", price: 2500 },
  ];

  const filteredPrices = marketPrices.filter(
    item => selectedMandi === "all" || item.mandi === selectedMandi
  );

  const uniqueMandis = Array.from(new Set(marketPrices.map(item => item.mandi)));
  const uniqueCrops = Array.from(new Set(marketPrices.map(item => item.crop)));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Current Market Rates' : 'वर्तमान बाजार दर'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="mandi-select">
                  {language === 'en' ? 'Select Mandi' : 'मंडी निवडा'}
                </Label>
                <Select 
                  value={selectedMandi} 
                  onValueChange={setSelectedMandi}
                >
                  <SelectTrigger id="mandi-select">
                    <SelectValue placeholder={language === 'en' ? 'All Mandis' : 'सर्व मंडी'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'en' ? 'All Mandis' : 'सर्व मंडी'}</SelectItem>
                    {uniqueMandis.map(mandi => (
                      <SelectItem key={mandi} value={mandi}>{mandi}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium border-b">
                <div>{language === 'en' ? 'Crop' : 'पीक'}</div>
                <div className="text-right">{language === 'en' ? 'Price' : 'किंमत'}</div>
                <div className="text-right">{language === 'en' ? 'Change' : 'बदल'}</div>
                <div className="text-right">{language === 'en' ? 'Mandi' : 'मंडी'}</div>
              </div>
              {filteredPrices.length > 0 ? (
                <div className="divide-y">
                  {filteredPrices.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-4 p-3 text-sm">
                      <div>
                        <p className="font-medium capitalize">{item.crop}</p>
                        <p className="text-xs text-muted-foreground">{item.variety}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.price}</p>
                        <p className="text-xs text-muted-foreground">/{item.unit}</p>
                      </div>
                      <div className={`text-right ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                      </div>
                      <div className="text-right">{item.mandi}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  {language === 'en' 
                    ? 'No market data available for the selected filters.' 
                    : 'निवडलेल्या फिल्टरसाठी कोणताही बाजार डेटा उपलब्ध नाही.'}
                </div>
              )}
            </div>

            <p className="text-xs text-right text-muted-foreground mt-2">
              {language === 'en' ? 'Last updated: ' : 'शेवटचे अपडेट: '}
              {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'mr-IN')}
              {' '}
              {new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'mr-IN')}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Price Trends' : 'किंमत ट्रेंड्स'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="crop-select">
                {language === 'en' ? 'Select Crop' : 'पीक निवडा'}
              </Label>
              <Select 
                value={selectedCrop} 
                onValueChange={setSelectedCrop}
              >
                <SelectTrigger id="crop-select">
                  <SelectValue placeholder={language === 'en' ? 'Select Crop' : 'पीक निवडा'} />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCrops.map(crop => (
                    <SelectItem key={crop} value={crop} className="capitalize">{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockPriceHistory}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value}`}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value}`, language === 'en' ? 'Price' : 'किंमत']}
                    labelFormatter={(label) => language === 'en' ? `Month: ${label}` : `महिना: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2E7D32" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              {language === 'en' 
                ? '12-month price trend for' 
                : 'साठी 12-महिने किंमत ट्रेंड'} 
              <span className="font-medium capitalize"> {selectedCrop}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketRates;
