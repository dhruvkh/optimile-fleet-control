
import React, { useState } from 'react';
import { Layout, Tab } from './components/Layout';
import { FleetPage } from './pages/FleetPage';
import { DriversPage } from './pages/DriversPage';
import { DispatchPage } from './pages/DispatchPage';
import { DashboardPage } from './pages/DashboardPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { FuelPage } from './pages/FuelPage';
import { CostHealthPage } from './pages/CostHealthPage';
import { TyrePage } from './pages/TyrePage';
import { LiveMapPage } from './pages/LiveMapPage';
import { CompliancePage } from './pages/CompliancePage';
import { DriverBehaviorPage } from './pages/DriverBehaviorPage';
import { ExceptionCenterPage } from './pages/ExceptionCenterPage';
import { OpsIntelligencePage } from './pages/OpsIntelligencePage';
import { DataCoveragePage } from './pages/DataCoveragePage';
import { ReconciliationPage } from './pages/ReconciliationPage';
import { InventoryPage } from './pages/InventoryPage';
import { VendorManagementPage } from './pages/VendorManagementPage';
import { GaragePage } from './pages/GaragePage';
import { BatteryPage } from './pages/BatteryPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <Layout activeTab={activeTab} onNavigate={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardPage onNavigate={setActiveTab} />}
      {activeTab === 'ops-intel' && <OpsIntelligencePage />}
      {activeTab === 'exceptions' && <ExceptionCenterPage />}
      {activeTab === 'coverage' && <DataCoveragePage />}
      {activeTab === 'reconciliation' && <ReconciliationPage />}
      {activeTab === 'live-map' && <LiveMapPage />}
      {activeTab === 'dispatch' && <DispatchPage />}
      {activeTab === 'fleet' && <FleetPage />}
      {activeTab === 'drivers' && <DriversPage />}
      {activeTab === 'maintenance' && <MaintenancePage />}
      {activeTab === 'garage' && <GaragePage />}
      {activeTab === 'batteries' && <BatteryPage />}
      {activeTab === 'vendors' && <VendorManagementPage />}
      {activeTab === 'inventory' && <InventoryPage />}
      {activeTab === 'fuel' && <FuelPage />}
      {activeTab === 'cost' && <CostHealthPage />}
      {activeTab === 'tyres' && <TyrePage />}
      {activeTab === 'compliance' && <CompliancePage />}
      {activeTab === 'behavior' && <DriverBehaviorPage />}
    </Layout>
  );
}
