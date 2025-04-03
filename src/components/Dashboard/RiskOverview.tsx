
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle, Clock, FileClock } from "lucide-react";
import { StatusCard } from "./StatusCard";
import { RiskChart } from "./RiskChart";
import { marketIndicators, overallRiskMetrics } from "@/utils/mockData";

export function RiskOverview() {
  // Risk distribution for pie chart
  const riskDistribution = [
    { name: "Low", value: 2 },
    { name: "Medium", value: 2 },
    { name: "High", value: 2 },
    { name: "Critical", value: 1 }
  ];

  // Market indicators for bar chart
  const marketData = marketIndicators.map(indicator => ({
    name: indicator.name,
    value: indicator.value
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Risk Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard 
          title="Average Risk Score" 
          value={`${overallRiskMetrics.averageRiskScore}/100`} 
          icon={<Activity className="h-4 w-4" />}
          trend={{ direction: 'up', value: '12%' }}
        />
        <StatusCard 
          title="High Risk Projects" 
          value={overallRiskMetrics.highRiskProjects} 
          icon={<AlertTriangle className="h-4 w-4" />}
          description={`Out of ${3} total projects`}
        />
        <StatusCard 
          title="Open Risks" 
          value={overallRiskMetrics.openRisksCount} 
          icon={<Clock className="h-4 w-4" />}
        />
        <StatusCard 
          title="Mitigated Risks" 
          value={overallRiskMetrics.mitigatedRisksCount} 
          icon={<CheckCircle className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>
              Distribution of risks by severity level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiskChart 
              data={riskDistribution} 
              type="pie"
              colors={['#10B981', '#FBBF24', '#F59E0B', '#EF4444']}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Indicators</CardTitle>
            <CardDescription>
              External market factors affecting project risks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiskChart 
              data={marketData} 
              type="bar"
              colors={['#3B82F6']}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
