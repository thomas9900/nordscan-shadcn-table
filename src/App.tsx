import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { DataTable } from './lib/nordscan-components/data-table';
import { Overview } from './lib/nordscan-components/overview';
import WorkCard from './lib/nordscan-components/work-card';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'rgb(173, 250, 29)' }}>Nordscan HR</h2>
        <div className="flex items-center justify-between space-y-2">
          <div className="ml-auto pb-2">
            <ModeToggle />
          </div>
        </div>
        <WorkCard />
        <Overview />
        <DataTable />
      </ThemeProvider>
    </>
  );
}

export default App;
