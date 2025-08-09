import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db'
import { formatPriceFromCents } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'
import StatusDropdown from './StatusDropdown'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound()
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  })

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  })

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  })

  const WEEKLY_GOAL_CENTS = 500 * 100
  const MONTHLY_GOAL_CENTS = 2500 * 100

  return (
    <div className='flex min-h-screen w-full bg-muted/40'>
      <div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4'>
        <div className='flex flex-col gap-16'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>Last Week</CardDescription>
                <CardTitle className='text-4xl'>
                  {formatPriceFromCents(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'>
                  of {formatPriceFromCents(WEEKLY_GOAL_CENTS)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL_CENTS}
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>Last Month</CardDescription>
                <CardTitle className='text-4xl'>
                  {formatPriceFromCents(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'>
                  of {formatPriceFromCents(MONTHLY_GOAL_CENTS)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL_CENTS}
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className='text-4xl font-bold tracking-tight'>Incoming orders</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className='hidden sm:table-cell'>Status</TableHead>
                <TableHead className='hidden sm:table-cell'>
                  Purchase date
                </TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className='bg-accent'>
                  <TableCell>
                    <div className='font-medium'>
                      {order.shippingAddress?.name}
                    </div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatPriceFromCents(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Page
