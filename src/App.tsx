import { WorkspaceProvider } from './store/workspaceStore';
import { WorkspaceLayout } from './components/layout/WorkspaceLayout';

export default function App() {
  return (
    <WorkspaceProvider>
      <WorkspaceLayout />
    </WorkspaceProvider>
  );
}
