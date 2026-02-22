import type { VendorProfile } from '../types/profile.types';

// Placeholder — replace with real API calls when backend is ready
export const profileService = {
  getProfile: async (): Promise<VendorProfile> => {
    throw new Error('profileService.getProfile not yet implemented');
  },

  updateProfile: async (_data: Partial<VendorProfile>): Promise<VendorProfile> => {
    throw new Error('profileService.updateProfile not yet implemented');
  },
};
