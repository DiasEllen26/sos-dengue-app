import Routes from './src/routes/stack.route';

import "./global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function App() {
  return <GluestackUIProvider mode="light">
    <Routes />
    </GluestackUIProvider>;
}