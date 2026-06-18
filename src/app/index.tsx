import { Redirect } from 'expo-router';
import { useProfileStore } from '@/stores/profileStore';

/**
 * Entry point — redirects to onboarding if not completed, else tabs (home dashboard).
 */
export default function Index() {
  const isOnboarded = useProfileStore((s) => s.isOnboarded);
  
  if (!isOnboarded) {
    return <Redirect href="/(onboarding)/welcome" />;
  }
  
  return <Redirect href="/(tabs)" />;
}
