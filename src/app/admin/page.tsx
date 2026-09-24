import React from 'react';
import { AdminPage } from '@/src/pages/AdminPage';
import { ProtectedRoute } from '@/src/components/auth/ProtectedRoute';

export const metadata = {
  title: 'Executive Admin Command Center | TAC GLOBAL',
  description: 'Manage service catalog, pricing, project pipeline Kanban, and admissions.',
};

export default function Page() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPage />
    </ProtectedRoute>
  );
}
