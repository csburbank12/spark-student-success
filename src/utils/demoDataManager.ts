
import { supabase } from '@/lib/supabase';
import { demoUsers } from '@/data/demoUsers';
import { toast } from 'sonner';
import { UserRole } from '@/types/roles';

export const initializeDemoData = async (userId: string, role: UserRole) => {
  try {
    // Check if demo data already exists
    const { data: existingData } = await supabase
      .from('mood_check_ins')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (existingData?.length === 0) {
      // Create mood check-ins
      const moodTypes = ['happy', 'okay', 'sad', 'anxious', 'excited'];
      const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString();
      });

      const moodData = dates.map(date => ({
        user_id: userId,
        mood_type: moodTypes[Math.floor(Math.random() * moodTypes.length)],
        energy_level: Math.floor(Math.random() * 10) + 1,
        created_at: date,
        notes: "Demo mood check-in"
      }));

      await supabase.from('mood_check_ins').insert(moodData);

      // For students, create SEL progress
      if (role === UserRole.student) {
        await supabase.from('sel_progress').insert([
          {
            student_id: userId,
            lesson_id: '550e8400-e29b-41d4-a716-446655440000', // Example UUID
            progress: 75,
            completed: false
          }
        ]);
      }

      toast.success('Demo data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing demo data:', error);
    toast.error('Failed to initialize demo data');
  }
};

export const resetDemoData = async () => {
  try {
    await supabase.rpc('reset_demo_environment');
    toast.success('Demo environment reset successfully');
  } catch (error) {
    console.error('Error resetting demo environment:', error);
    toast.error('Failed to reset demo environment');
  }
};
