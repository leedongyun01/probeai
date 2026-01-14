interface StatusDashboardProps {
  mode: string;
  currentStep?: number;
  plan?: string[];
  status: string;
}

export function StatusDashboard({ mode, currentStep, plan, status }: StatusDashboardProps) {
  const totalSteps = plan?.length || 0;
  const progress = totalSteps > 0 ? ((currentStep || 0) / totalSteps) * 100 : 0;

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold capitalize">{mode.replace('_', ' ')} Mode</h3>
          <p className="text-sm text-muted-foreground">Status: <span className="text-primary font-medium">{status}</span></p>
        </div>
        {totalSteps > 0 && (
          <div className="text-right">
            <span className="text-sm font-bold">{currentStep} / {totalSteps} Steps</span>
          </div>
        )}
      </div>

      {totalSteps > 0 && (
        <div className="w-full bg-secondary rounded-full h-2.5 mb-6">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {plan && plan.length > 0 && (
        <div className="space-y-2">
          {plan.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${index < (currentStep || 0) ? 'bg-emerald-500' : index === currentStep ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`}></div>
              <span className={`text-sm ${index === currentStep ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{step}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
