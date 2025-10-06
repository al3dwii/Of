// /src/utils/getHighestUserTier.ts

/**
 * Fetches all active user packages and determines the highest subscription tier.
 * @param userId - The ID of the user.
 * @returns The highest subscription tier ('free', 'standard', or 'premium').
 * 
 * TODO: This function needs to be updated to work with the current Prisma schema
 * The UserPackage model doesn't exist in the current schema.
 * For now, it returns 'free' as a default.
 */

// Define a union type for user tiers
type Tier = 'free' | 'standard' | 'premium';

export const getHighestUserTier = async (userId: string): Promise<Tier> => {
  // TODO: Implement proper tier lookup from database when UserPackage model is added
  console.log('🟢 User Tier: free (default - UserPackage model not implemented)');
  return 'free';
};
