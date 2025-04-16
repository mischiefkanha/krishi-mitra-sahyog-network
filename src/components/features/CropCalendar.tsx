
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Droplet, 
  Sprout, 
  SunMedium, 
  Scissors, 
  Tractor, 
  Mountain, 
  Send 
} from "lucide-react";

const CropCalendar = () => {
  const { language } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock activities data - in a real app, this would come from a database
  const cropActivities = [
    {
      date: new Date(2025, 3, 18), // April 18, 2025
      type: "sowing",
      crop: "Wheat",
      description: "Sow wheat seeds with 15cm row spacing"
    },
    {
      date: new Date(2025, 3, 20), // April 20, 2025
      type: "irrigation",
      crop: "Rice",
      description: "First irrigation for rice nursery"
    },
    {
      date: new Date(2025, 3, 22), // April 22, 2025
      type: "fertilizer",
      crop: "Cotton",
      description: "Apply nitrogen fertilizer"
    },
    {
      date: new Date(2025, 3, 25), // April 25, 2025
      type: "pesticide",
      crop: "Tomato",
      description: "Apply organic pesticide for leaf borer"
    },
    {
      date: new Date(2025, 4, 5), // May 5, 2025
      type: "harvest",
      crop: "Onion",
      description: "Harvest mature onions in morning hours"
    }
  ];

  // Get activity for selected day
  const todayActivities = cropActivities.filter(
    activity => date && 
    activity.date.getDate() === date.getDate() && 
    activity.date.getMonth() === date.getMonth()
  );

  // Function to get the icon based on activity type
  const getActivityIcon = (type: string) => {
    switch(type) {
      case "sowing": 
        return <Sprout className="h-4 w-4" />;
      case "irrigation": 
        return <Droplet className="h-4 w-4" />;
      case "fertilizer": 
        return <Mountain className="h-4 w-4" />;
      case "pesticide": 
        return <Send className="h-4 w-4" />;
      case "harvest": 
        return <Scissors className="h-4 w-4" />;
      default: 
        return <Tractor className="h-4 w-4" />;
    }
  };

  // Function to get badge color based on activity type
  const getActivityColor = (type: string) => {
    switch(type) {
      case "sowing": return "bg-green-500 hover:bg-green-600";
      case "irrigation": return "bg-blue-500 hover:bg-blue-600";
      case "fertilizer": return "bg-amber-500 hover:bg-amber-600";
      case "pesticide": return "bg-red-500 hover:bg-red-600";
      case "harvest": return "bg-purple-500 hover:bg-purple-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Function to highlight dates with activities
  const highlightedDays = cropActivities.map(activity => activity.date);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="calendar">
            {language === 'en' ? 'Calendar' : 'दिनदर्शिका'}
          </TabsTrigger>
          <TabsTrigger value="list">
            {language === 'en' ? 'Activity List' : 'कार्य यादी'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Your Crop Calendar' : 'तुमची पीक दिनदर्शिका'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  highlighted: (date) => 
                    highlightedDays.some(
                      d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth()
                    )
                }}
                modifiersClassNames={{
                  highlighted: "bg-primary-100 font-bold text-primary-700"
                }}
              />

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? 'Activities for ' : 'या दिवसाच्या कार्ये '}
                  {date ? date.toLocaleDateString(language === 'en' ? 'en-US' : 'mr-IN', { 
                    day: 'numeric', 
                    month: 'long' 
                  }) : ''}
                </h3>

                {todayActivities.length > 0 ? (
                  <div className="space-y-3">
                    {todayActivities.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                        <Badge className={`${getActivityColor(activity.type)} flex gap-1 items-center`}>
                          {getActivityIcon(activity.type)}
                          <span>
                            {language === 'en' ? activity.type : 
                              activity.type === 'sowing' ? 'पेरणी' : 
                              activity.type === 'irrigation' ? 'सिंचन' : 
                              activity.type === 'fertilizer' ? 'खते' : 
                              activity.type === 'pesticide' ? 'कीटकनाशक' : 
                              'कापणी'}
                          </span>
                        </Badge>
                        <div>
                          <p className="font-medium">{activity.crop}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    {language === 'en' 
                      ? 'No activities scheduled for this date.' 
                      : 'या तारखेसाठी कोणतीही कार्ये नियोजित नाहीत.'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Upcoming Activities' : 'आगामी कार्ये'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cropActivities.sort((a, b) => a.date.getTime() - b.date.getTime()).map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="min-w-24 text-center">
                      <p className="text-sm font-semibold">{activity.date.toLocaleDateString(language === 'en' ? 'en-US' : 'mr-IN', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                      <Badge className={`${getActivityColor(activity.type)} mt-1 flex gap-1 items-center`}>
                        {getActivityIcon(activity.type)}
                        <span>
                          {language === 'en' ? activity.type : 
                            activity.type === 'sowing' ? 'पेरणी' : 
                            activity.type === 'irrigation' ? 'सिंचन' : 
                            activity.type === 'fertilizer' ? 'खते' : 
                            activity.type === 'pesticide' ? 'कीटकनाशक' : 
                            'कापणी'}
                        </span>
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">{activity.crop}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropCalendar;
