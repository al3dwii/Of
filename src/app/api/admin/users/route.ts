import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add admin role check

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100); // Max 100
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || '';

    // Fetch users with optional search and fallback
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { displayName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    let users = [];
    let total = 0;

    try {
      // Try to fetch users
      users = await prisma.userProfile.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          orgMemberships: {
            include: {
              org: {
                include: {
                  presentations: true,
                  dubbing: true,
                },
              },
            },
          },
        },
      });

      total = await prisma.userProfile.count({ where });
    } catch (dbError) {
      console.error('Database error fetching users:', dbError);
      // Return empty array instead of throwing error
      return NextResponse.json({
        success: false,
        users: [],
        total: 0,
        limit,
        offset,
        error: 'Database connection failed',
        hasData: false,
      });
    }

    // Transform data for frontend with fallbacks
    const usersData = users.map((user) => {
      try {
        const totalProjects = user.orgMemberships?.reduce(
          (acc, membership) =>
            acc +
            (membership.org?.presentations?.length || 0) +
            (membership.org?.dubbing?.length || 0),
          0
        ) || 0;

        // Determine status based on recent activity
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const hasRecentActivity = user.updatedAt >= thirtyDaysAgo;

        return {
          id: user.id || '',
          userId: user.userId || '',
          name: user.displayName || 'Unknown User',
          email: user.email || 'No email',
          status: hasRecentActivity ? 'active' : 'inactive',
          joined: user.createdAt ? user.createdAt.toISOString().split('T')[0] : 'Unknown',
          projects: totalProjects,
          orgs: user.orgMemberships?.length || 0,
          lastActive: user.updatedAt ? user.updatedAt.toISOString() : new Date().toISOString(),
        };
      } catch (transformError) {
        console.error('Error transforming user data:', transformError);
        return {
          id: user.id || '',
          userId: user.userId || '',
          name: 'Error loading user',
          email: user.email || '',
          status: 'inactive',
          joined: 'Unknown',
          projects: 0,
          orgs: 0,
          lastActive: new Date().toISOString(),
        };
      }
    });

    return NextResponse.json({
      success: true,
      users: usersData,
      total,
      limit,
      offset,
      hasData: usersData.length > 0,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    
    // Return empty data instead of error to prevent UI crash
    return NextResponse.json({
      success: false,
      users: [],
      total: 0,
      limit: 10,
      offset: 0,
      error: 'Failed to fetch users',
      hasData: false,
    });
  }
}
