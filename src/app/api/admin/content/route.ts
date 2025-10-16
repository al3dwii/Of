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

    let presentations: any[] = [];
    let dubbing: any[] = [];
    let totalPresentations = 0;
    let totalDubbing = 0;

    // Fetch recent presentations with fallback
    try {
      presentations = await prisma.presentationMirror.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          org: {
            include: {
              members: {
                include: {
                  user: true,
                },
                take: 1,
              },
            },
          },
        },
      });

      totalPresentations = await prisma.presentationMirror.count();
    } catch (err) {
      console.error('Error fetching presentations:', err);
    }

    // Fetch recent dubbing with fallback
    try {
      dubbing = await prisma.dubbingMirror.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          org: {
            include: {
              members: {
                include: {
                  user: true,
                },
                take: 1,
              },
            },
          },
        },
      });

      totalDubbing = await prisma.dubbingMirror.count();
    } catch (err) {
      console.error('Error fetching dubbing:', err);
    }

    // Combine and sort by date with fallbacks
    const allContent = [
      ...presentations.map((p) => {
        try {
          return {
            id: p.id || '',
            title: p.title || `Presentation ${(p.planId || 'unknown').substring(0, 8)}`,
            user: p.org?.members?.[0]?.user?.displayName || 'Unknown User',
            type: 'presentation' as const,
            created: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString(),
            status: p.status || 'unknown',
            language: p.language || 'unknown',
            slidesCount: p.slidesCount || 0,
          };
        } catch (err) {
          console.error('Error transforming presentation:', err);
          return {
            id: p.id || '',
            title: 'Error loading presentation',
            user: 'Unknown',
            type: 'presentation' as const,
            created: new Date().toISOString(),
            status: 'error',
            language: 'unknown',
            slidesCount: 0,
          };
        }
      }),
      ...dubbing.map((d) => {
        try {
          return {
            id: d.id || '',
            title: `Dubbing ${(d.jobId || 'unknown').substring(0, 8)}`,
            user: d.org?.members?.[0]?.user?.displayName || 'Unknown User',
            type: 'dubbing' as const,
            created: d.createdAt ? d.createdAt.toISOString() : new Date().toISOString(),
            status: d.status || 'unknown',
            sourceLang: d.sourceLang || 'unknown',
            targetLang: d.targetLang || 'unknown',
          };
        } catch (err) {
          console.error('Error transforming dubbing:', err);
          return {
            id: d.id || '',
            title: 'Error loading dubbing',
            user: 'Unknown',
            type: 'dubbing' as const,
            created: new Date().toISOString(),
            status: 'error',
            sourceLang: 'unknown',
            targetLang: 'unknown',
          };
        }
      }),
    ]
      .sort((a, b) => {
        try {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        } catch {
          return 0;
        }
      })
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      content: allContent,
      total: totalPresentations + totalDubbing,
      presentations: totalPresentations,
      dubbing: totalDubbing,
      hasData: allContent.length > 0,
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    
    // Return empty data instead of error to prevent UI crash
    return NextResponse.json({
      success: false,
      content: [],
      total: 0,
      presentations: 0,
      dubbing: 0,
      error: 'Failed to fetch content',
      hasData: false,
    });
  }
}
