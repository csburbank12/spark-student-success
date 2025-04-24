
import { UserRole } from "@/types/roles";

export function initializeDemoData(userId: string, role: UserRole): void {
  // Check if we've already initialized data for this user
  const initializedUsers = JSON.parse(localStorage.getItem('initializedDemoUsers') || '{}');
  
  if (initializedUsers[userId]) {
    console.log(`Demo data already initialized for user ${userId}`);
    return;
  }
  
  console.log(`Initializing demo data for ${role} with ID: ${userId}`);
  
  // In a real app, this would make API calls to set up demo data
  // For our simple demo, we'll just mark this user as initialized
  
  // Record that we've initialized this user
  initializedUsers[userId] = {
    role,
    initializedAt: new Date().toISOString()
  };
  
  localStorage.setItem('initializedDemoUsers', JSON.stringify(initializedUsers));
}

export function resetDemoData(): void {
  localStorage.removeItem('initializedDemoUsers');
  // In a real app, this would make API calls to reset demo data
  console.log('Demo data has been reset');
}
