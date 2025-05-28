
const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to ASTROM</h1>
        <p className="text-xl text-muted-foreground">Healthcare Command Center</p>
        <div className="mt-8 p-6 bg-card border border-border rounded-lg shadow-sm max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-foreground mb-2">Getting Started</h2>
          <p className="text-muted-foreground">
            Use the sidebar to navigate between different modules of the ASTROM platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
