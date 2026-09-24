import React from 'react';
import { DashboardPage } from '@/src/pages/DashboardPage';
import { ProtectedRoute } from '@/src/components/auth/ProtectedRoute';

export const metadata = {
  title: 'Client Workspace | TAC GLOBAL & TAC STUDIOS',
  description: 'Real-time project tracking, briefs, deliverables, and communication pipeline.',
};

export default function Page() {
  return (
    <ProtectedRoute allowedRoles={['client', 'admin', 'team_member', 'ambassador']}>
      <DashboardPage />
    </ProtectedRoute>
  );
}
