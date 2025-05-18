import { prisma } from '../prisma/client';
import cron from 'node-cron';

export function CronJob() {
  cron.schedule('0 0 * * *', async () => {
    const now = new Date();
    try {
      const memberExpired = await prisma.member.updateMany({
        where: { expireDate: { lte: now }, status: { not: 'INACTIVE' } },
        data: { status: 'INACTIVE' },
      });
      console.log(`${memberExpired.count} members diactivated`);
    } catch (error: any) {
      console.log(error.message);
    }
  });
  console.log(`CronJob initialized completely`);
}
