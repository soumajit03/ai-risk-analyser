
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project, Risk } from "@/utils/mockData";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { AlertTriangle, CalendarIcon, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Schema for project validation
const projectSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  status: z.enum(["On Track", "At Risk", "Delayed", "Completed"]),
  progress: z.number().min(0).max(100),
  budget: z.coerce.number().positive({ message: "Budget must be positive" }),
  spent: z.coerce.number().min(0, { message: "Spent amount cannot be negative" }),
  startDate: z.date(),
  endDate: z.date()
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface AddProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProject: (project: Project) => void;
}

export function AddProjectDialog({ open, onOpenChange, onAddProject }: AddProjectDialogProps) {
  const [risks, setRisks] = useState<Omit<Risk, "id" | "projectId">[]>([]);
  const [riskName, setRiskName] = useState("");
  const [riskDescription, setRiskDescription] = useState("");
  const [riskLevel, setRiskLevel] = useState<Risk["level"]>("Medium");
  const [riskCategory, setRiskCategory] = useState("");
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "On Track",
      progress: 0,
      budget: 0,
      spent: 0,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)) // Default to 3 months duration
    }
  });

  const handleAddRisk = () => {
    if (!riskName || !riskDescription || !riskCategory) {
      toast.error("Please fill in all risk fields");
      return;
    }

    setRisks([
      ...risks,
      {
        name: riskName,
        description: riskDescription,
        level: riskLevel,
        probability: 50, // Default values
        impact: 50,
        category: riskCategory,
        mitigation: "To be defined",
        status: "Open",
        dateIdentified: new Date().toISOString().split('T')[0]
      }
    ]);

    // Reset risk form
    setRiskName("");
    setRiskDescription("");
    setRiskCategory("");
    setRiskLevel("Medium");
    
    toast.success("Risk added to project");
  };

  const removeRisk = (index: number) => {
    const updatedRisks = [...risks];
    updatedRisks.splice(index, 1);
    setRisks(updatedRisks);
  };

  const onSubmit = (data: ProjectFormValues) => {
    const newProject: Project = {
      id: `p${Date.now()}`, // Generate a simple unique ID
      name: data.name,
      description: data.description,
      startDate: data.startDate.toISOString().split('T')[0],
      endDate: data.endDate.toISOString().split('T')[0],
      status: data.status,
      budget: data.budget,
      spent: data.spent,
      progress: data.progress,
      riskScore: calculateRiskScore(risks), // Calculate based on risks
      risks: risks.map((risk, index) => ({
        ...risk,
        id: `r${Date.now()}_${index}`,
        projectId: `p${Date.now()}`
      }))
    };

    onAddProject(newProject);
    onOpenChange(false);
    toast.success("Project added successfully");
    
    // Reset form
    form.reset();
    setRisks([]);
  };

  // Calculate risk score based on risk levels
  const calculateRiskScore = (projectRisks: Omit<Risk, "id" | "projectId">[]) => {
    if (projectRisks.length === 0) return 10; // Base risk score
    
    const riskWeights = {
      "Low": 20,
      "Medium": 50,
      "High": 75,
      "Critical": 100
    };
    
    const totalWeight = projectRisks.reduce((sum, risk) => sum + riskWeights[risk.level], 0);
    return Math.min(Math.round(totalWeight / projectRisks.length), 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new project. Add associated risks if applicable.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="On Track">On Track</SelectItem>
                        <SelectItem value="At Risk">At Risk</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter budget amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="spent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spent Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter spent amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Progress ({field.value}%)</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      max={100}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Risk Register
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel>Risk Name</FormLabel>
                  <Input 
                    placeholder="Enter risk name" 
                    value={riskName}
                    onChange={(e) => setRiskName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>Category</FormLabel>
                  <Input 
                    placeholder="E.g., Technical, Financial" 
                    value={riskCategory}
                    onChange={(e) => setRiskCategory(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <FormLabel>Description</FormLabel>
                <Textarea 
                  placeholder="Describe the risk"
                  value={riskDescription}
                  onChange={(e) => setRiskDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <FormLabel>Risk Level</FormLabel>
                <Select 
                  onValueChange={(value: Risk["level"]) => setRiskLevel(value)}
                  defaultValue={riskLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleAddRisk}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Risk
              </Button>
              
              {risks.length > 0 && (
                <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                  <h4 className="font-medium mb-2">Added Risks:</h4>
                  <ul className="space-y-2">
                    {risks.map((risk, index) => (
                      <li key={index} className="text-sm flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <span className={cn(
                            "inline-block w-2 h-2 rounded-full",
                            risk.level === "Low" ? "bg-green-500" :
                            risk.level === "Medium" ? "bg-yellow-500" :
                            risk.level === "High" ? "bg-orange-500" : "bg-red-500"
                          )} />
                          {risk.name} - {risk.category}
                        </span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeRisk(index)}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
