
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskChart } from "@/components/Dashboard/RiskChart";
import { marketIndicators } from "@/utils/mockData";

const MarketAnalysis = () => {
  const marketData = marketIndicators.map(indicator => ({
    name: indicator.name,
    value: indicator.value
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Market Analysis</h1>
          <p className="text-muted-foreground">Analyze market trends and external risk factors</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskChart 
                data={marketData} 
                type="bar"
                colors={['#3B82F6']}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed trend analysis will appear here</p>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">This section shows how market factors impact project risk levels.</p>
                <div className="h-[200px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Impact visualization coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketAnalysis;
