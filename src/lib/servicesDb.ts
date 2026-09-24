import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';
import servicesData from '@/src/data/services.json';

export interface DbService {
  id: string;
  category: string;
  categoryName?: string;
  title: string;
  description: string;
  starting_price: number;
  currency: string;
  turnaround_time: string;
  deliverables: string[];
  inputs: string[];
  active: boolean;
  target_persona?: string;
  slug?: string;
  updated_at: string;
}

export async function seedInitialServicesIfNeeded(): Promise<void> {
  try {
    const servicesRef = collection(db, 'services');
    const snapshot = await getDocs(servicesRef);

    // If services collection already has data, do not overwrite
    if (!snapshot.empty) {
      return;
    }

    // Seed default services from services.json
    const batch = writeBatch(db);
    let count = 0;

    for (const category of servicesData.categories) {
      for (const svc of category.services) {
        const docRef = doc(db, 'services', svc.id);
        const item: DbService = {
          id: svc.id,
          category: category.id,
          categoryName: category.name,
          title: svc.title,
          description: svc.overview || svc.headline || '',
          starting_price: svc.startingPrice || 75,
          currency: svc.currency || 'USD',
          turnaround_time: svc.turnaroundTime || '3–5 days',
          deliverables: svc.deliverables || [],
          inputs: svc.clientInputsRequired || [],
          active: true,
          target_persona: (svc.targetPersona as string) || 'entrepreneur',
          slug: svc.slug,
          updated_at: new Date().toISOString(),
        };
        batch.set(docRef, item);
        count++;
      }
    }

    if (count > 0) {
      await batch.commit();
      console.log(`[TAC GLOBAL] Seeded ${count} native services to Firestore`);
    }
  } catch (err) {
    console.warn('[TAC GLOBAL] Service seed note:', err);
  }
}
