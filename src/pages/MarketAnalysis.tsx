
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskChart } from "@/components/Dashboard/RiskChart";
import { marketIndicators } from "@/utils/mockData";
import { useProjects } from "@/context/ProjectContext";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MarketAnalysis = () => {
  const { projects } = useProjects();
  const [trendAnalysis, setTrendAnalysis] = useState("");
  const [impactAssessment, setImpactAssessment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const marketData = marketIndicators.map(indicator => ({
    name: indicator.name,
    value: indicator.value
  }));

  // Generate project-based prompt for AI
  const generatePrompt = () => {
    const projectNames = projects.map(p => p.name).join(", ");
    const projectStatuses = projects.map(p => `${p.name} (Status: ${p.status}, Risk Score: ${p.riskScore}/100)`).join("\n");
    
    return `
      As a market risk analyst, provide a concise analysis of current market trends that could affect the following projects:
      ${projectStatuses}
      
      First, provide a 200-word trend analysis summary of current market conditions that could impact these projects.
      
      Then, list 4 specific impact assessments showing how these market factors directly relate to the risk levels of our projects. Format each assessment as a JSON object with "factor", "trend", "impact", and "recommendation" fields.
    `;
  };

  // Fetch market trends using Gemini API
  useEffect(() => {
    const fetchMarketTrends = async () => {
      if (projects.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const prompt = generatePrompt();
        
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AIzaSyD2rpozaVorJTS_DDng4CA_FYdCF9aYMFw"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048
            }
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || "Failed to fetch market trends");
        }

        // Parse the response from Gemini
        const text = data.candidates[0].content.parts[0].text;
        
        // Extract trend analysis (first paragraph)
        const sections = text.split("\n\n");
        const trendSection = sections[0];
        setTrendAnalysis(trendSection);
        
        // Try to extract JSON objects from the text
        try {
          // Find all text between { and }
          const regex = /{[^{}]*}/g;
          const matches = text.match(regex);
          
          if (matches && matches.length > 0) {
            const parsedImpacts = matches.map(match => {
              try {
                return JSON.parse(match);
              } catch (e) {
                // If JSON parsing fails, create a structured object
                return { 
                  factor: "Market Factor", 
                  trend: "Trend Direction",
                  impact: match.replace(/{|}/g, "").trim(), 
                  recommendation: "Review project risks" 
                };
              }
            });
            setImpactAssessment(parsedImpacts.slice(0, 4));
          } else {
            // If no JSON format found, extract potential bullet points as impacts
            const bulletPoints = text.split("\n").filter(line => line.match(/^[•\-*]\s+/));
            const structuredImpacts = bulletPoints.slice(0, 4).map(point => ({
              factor: "Market Factor",
              trend: "Identified Trend",
              impact: point.replace(/^[•\-*]\s+/, ""),
              recommendation: "Monitor closely"
            }));
            setImpactAssessment(structuredImpacts);
          }
        } catch (e) {
          console.error("Error parsing impact assessments:", e);
          setImpactAssessment([{ 
            factor: "Analysis Error", 
            trend: "Unknown",
            impact: "Unable to parse impact assessments", 
            recommendation: "Please refresh and try again" 
          }]);
        }
      } catch (err) {
        console.error("Error fetching market trends:", err);
        setError(err.message || "Failed to fetch market trends");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketTrends();
  }, [projects]);

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
            <CardContent className="h-[300px] overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="prose prose-sm max-w-none">
                  {trendAnalysis ? (
                    <p>{trendAnalysis}</p>
                  ) : (
                    <p className="text-muted-foreground">No trend analysis available for the current projects.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">This section shows how market factors impact project risk levels.</p>
                  {impactAssessment.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {impactAssessment.map((impact, index) => (
                        <div key={index} className="border rounded-md p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{impact.factor}</h3>
                            <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              {impact.trend}
                            </span>
                          </div>
                          <p className="text-sm">{impact.impact}</p>
                          <div className="pt-2 border-t">
                            <span className="text-xs font-semibold">Recommendation:</span>
                            <p className="text-sm text-muted-foreground">{impact.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">No impact assessments available for the current projects.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketAnalysis;
