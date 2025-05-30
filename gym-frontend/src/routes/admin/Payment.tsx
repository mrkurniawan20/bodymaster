import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useOutletContext } from 'react-router-dom';
import type { Payment } from '@/services/useUser';

// type Payment = {
//   id: number;
//   member: string;
//   date: string;
//   amount: number;
//   method: string;
// };

// const dummyPayments: Payment[] = Array.from({ length: 32 }, (_, i) => ({
//   id: i + 1,
//   member: `Member ${i + 1}`,
//   date: `2025-05-${((i % 30) + 1).toString().padStart(2, '0')}`,
//   amount: 250000,
//   method: ['Cash', 'Transfer', 'Card'][i % 3],
// }));

const ITEMS_PER_PAGE = 10;

const formatDate = (date: Date): string => date.toISOString().split('T')[0];

export default function PaymentPage() {
  const { allPayment } = useOutletContext<{ allPayment: Payment[] }>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const formattedDate = formatDate(selectedDate);

  // Filter payments by selected date
  // const filteredPayments = allPayment.filter((p) => String(new Date(p.paymentAt)).split('T')[0] == selectedDate.toJSON().split('T')[0]);
  const filteredPayments = allPayment.filter((p) => {
    const paymentDate = new Date(p.paymentAt).toLocaleDateString();
    const selected = selectedDate.toLocaleDateString();
    return paymentDate == selected;
  });
  // console.log(String(allPayment[0].paymentAt).split('T')[0]);
  // console.log(selectedDate.toJSON().split('T')[0]);
  // console.log(String(allPayment[0].paymentAt).split('T')[0] == selectedDate.toJSON().split('T')[0]);
  console.log(filteredPayments);
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
  const paginated = filteredPayments.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  // console.log(paginated);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
    setPage(1); // reset to first page when date changes
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Payments</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <input type="date" value={formattedDate} onChange={handleDateChange} className="border rounded-md px-3 py-2" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-xl font-semibold">Rp 8.000.000</p>
            </div>
            <DollarSign className="h-6 w-6 text-green-500" />
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">+ Add Payment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const newPayment = {
                member: (form.elements.namedItem('member') as HTMLInputElement).value,
                amount: parseInt((form.elements.namedItem('amount') as HTMLInputElement).value, 10),
                method: (form.elements.namedItem('method') as HTMLInputElement).value,
              };
              console.log('New Payment:', newPayment);
              // TODO: Add to state or send to backend
              form.reset();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member" className="mb-2">
                  Member
                </Label>
                <Input name="member" required />
              </div>
              <div>
                <Label htmlFor="amount" className="mb-2">
                  Amount
                </Label>
                <Input name="amount" type="number" required />
              </div>
              <div>
                <Label htmlFor="method" className="mb-2">
                  Method
                </Label>
                <Select name="method" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="QR">QR Code</SelectItem>
                    <SelectItem value="ATM">ATM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="submit">Save Payment</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {paginated.length > 0 ? (
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-200 text-left text-xs uppercase font-semibold text-gray-600">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Keterangan</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Method</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-b">
                  {/* <td className="px-4 py-2">{p.member.split(' ')[1]}</td> */}
                  <td className="px-4 py-2">{p.memberId}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">No payments on this date.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button variant="secondary" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button variant="secondary" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
